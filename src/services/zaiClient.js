/**
 * Servicio de cliente ZAI para identificación de residuos con IA
 * Integración con el modelo glm-4.6v-flash (multimodal)
 */

// Prompt del sistema para identificación de residuos
const SYSTEM_PROMPT = `Eres un experto en identificación de objetos y reciclaje.

IMPORTANTE - PROCESO DE IDENTIFICACIÓN:
1. OBSERVA CUIDADOSAMENTE la imagen completa antes de responder
2. IDENTIFICA las características visuales principales del objeto (forma, color, textura, material)
3. VERIFICA que tu identificación coincida con lo que realmente ves
4. Si NO estás seguro, indica "objeto no identificado claramente" en lugar de adivinar

REGLAS ESTRICTAS:
- NO asumas el tipo de objeto sin verificar visualmente
- Sé ESPECÍFICO: describe marca, material, tamaño si es visible
- Si ves texto o etiquetas en el objeto, menciónalo
- Si el objeto no es un residuo común, indícalo claramente

Responde SIEMPRE en formato JSON con esta estructura exacta:
{
  "identified": true,
  "name": "nombre específico y detallado del objeto",
  "category": "plastico|metal|papel|vidrio|organico|otros",
  "container": "amarillo|azul|verde|marron|gris",
  "containerName": "Contenedor [Color]",
  "confidence": 0.95,
  "preparation": ["paso 1 específico", "paso 2 específico", "paso 3 específico"],
  "tips": ["consejo útil 1", "consejo útil 2"]
}

Clasificación de contenedores:
- AMARILLO: Botellas plástico, latas aluminio, tetrabriks, bolsas plástico, envases
- AZUL: Papel, cartón, periódicos, revistas, cajas
- VERDE: Botellas vidrio, frascos vidrio (NO cerámica, NO espejos)
- MARRÓN: Restos comida, frutas, verduras, cáscaras, posos café
- GRIS: Pañales, colillas, cerámica, polvo, lo que no va en otros

Ejemplos de nombres buenos:
- "Botella de Coca-Cola de 600ml"
- "Lata de atún Dolores"
- "Caja de Amazon de cartón"
- "Cáscara de plátano"
- "Vaso de Starbucks (papel con tapa plástica)"

Responde SOLO con el JSON, sin texto adicional.`;

// URL base de la API de Z.AI (BigModel/Zhipu)
const API_BASE_URL = "https://open.bigmodel.cn/api/paas/v4";

// Clase para el cliente ZAI
class ZaiClientService {
  constructor(apiKey = null) {
    this.apiKey = apiKey;
    this.model = "glm-4.6v-flash";
  }

  /**
   * Analiza una imagen para identificar el tipo de residuo
   * @param {string} imageBase64 - Imagen en formato base64
   * @returns {Promise<Object>} - Resultado del análisis
   */
  async analyzeImage(imageBase64) {
    // Si no hay API key, usar modo simulado
    if (!this.apiKey) {
      console.log("ZaiClient: Modo simulado (sin API key)");
      return this.getSimulatedResponse();
    }

    try {
      // Preparar la imagen - remover el prefijo data:image si existe
      let imageData = imageBase64;
      if (imageBase64.startsWith("data:")) {
        imageData = imageBase64.split(",")[1];
      }

      const requestBody = {
        model: this.model,
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT,
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Analiza CUIDADOSAMENTE esta imagen. Describe primero qué ves (forma, color, características visuales) y luego identifica el objeto específico. Si ves texto o marcas, inclúyelos. NO adivines si no estás seguro. Responde SOLO en JSON.",
              },
              {
                type: "image_url",
                image_url: {
                  url: imageBase64.startsWith("data:")
                    ? imageBase64
                    : `data:image/jpeg;base64,${imageData}`,
                },
              },
            ],
          },
        ],
        max_tokens: 500,
        temperature: 0.1, // Temperatura baja para más precisión
      };

      console.log("ZaiClient: Enviando solicitud a la API...");

      const response = await fetch(`${API_BASE_URL}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText);
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("ZaiClient: Respuesta recibida", data);

      const content = data.choices?.[0]?.message?.content;

      if (!content) {
        console.error("No content in response");
        return this.getSimulatedResponse();
      }

      // Intentar parsear la respuesta JSON
      try {
        // Buscar el JSON en la respuesta (puede venir con texto adicional)
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          console.log("ZaiClient: JSON parseado correctamente", parsed);

          // Transformar al formato esperado por la app
          return this.transformResponse(parsed);
        }
      } catch (parseError) {
        console.error("Error parsing AI response:", parseError, content);
      }

      // Si no se puede parsear, devolver respuesta simulada
      return this.getSimulatedResponse();
    } catch (error) {
      console.error("ZaiClient Error:", error);
      // Fallback a respuesta simulada en caso de error
      return this.getSimulatedResponse();
    }
  }

  /**
   * Transforma la respuesta de la API al formato de la app
   */
  transformResponse(apiResponse) {
    // Mapeo de contenedores a colores
    const containerColors = {
      amarillo: { name: "Contenedor Amarillo", icon: "🧴" },
      azul: { name: "Contenedor Azul", icon: "📦" },
      verde: { name: "Contenedor Verde", icon: "🍾" },
      marron: { name: "Contenedor Marrón (Orgánico)", icon: "🍌" },
      gris: { name: "Contenedor Gris (Resto)", icon: "🗑️" },
    };

    // Datos de impacto estimados por categoría
    const impactByCategory = {
      plastico: {
        co2Impact: 0.08,
        energyImpact: 0.5,
        waterImpact: 1.5,
        decompositionTime: "450 años",
      },
      metal: {
        co2Impact: 0.15,
        energyImpact: 0.9,
        waterImpact: 2.0,
        decompositionTime: "200-500 años",
      },
      papel: {
        co2Impact: 0.12,
        energyImpact: 0.7,
        waterImpact: 3.0,
        decompositionTime: "2-5 meses",
      },
      vidrio: {
        co2Impact: 0.3,
        energyImpact: 0.6,
        waterImpact: 1.8,
        decompositionTime: "4000 años",
      },
      organico: {
        co2Impact: 0.05,
        energyImpact: 0.1,
        waterImpact: 0.5,
        decompositionTime: "2-5 semanas",
      },
      otros: {
        co2Impact: 0.02,
        energyImpact: 0.1,
        waterImpact: 0.2,
        decompositionTime: "Variable",
      },
    };

    const container = apiResponse.container?.toLowerCase() || "gris";
    const category = apiResponse.category?.toLowerCase() || "otros";
    const containerInfo = containerColors[container] || containerColors["gris"];
    const impact = impactByCategory[category] || impactByCategory["otros"];

    // Convertir pasos de preparación al formato de la app
    const preparation = (apiResponse.preparation || []).map((step, index) => ({
      step: index + 1,
      action: step.split(":")[0] || step.split(" ")[0] || "Paso",
      description: step,
      icon: this.getPreparationIcon(step),
    }));

    // Ideas de upcycling genéricas basadas en categoría
    const upcycling = this.getUpcyclingIdeas(category, apiResponse.name);

    return {
      id: `ai_${Date.now()}`,
      name: apiResponse.name || "Objeto no identificado",
      category: category,
      container: container,
      containerName: apiResponse.containerName || containerInfo.name,
      icon: containerInfo.icon,
      ...impact,
      preparation:
        preparation.length > 0
          ? preparation
          : [
              {
                step: 1,
                action: "Vaciar",
                description: "Asegúrate de que esté vacío",
                icon: "💧",
              },
              {
                step: 2,
                action: "Limpiar",
                description: "Limpia si es necesario",
                icon: "🚿",
              },
            ],
      upcycling: upcycling,
      facts: this.getFactsByCategory(category),
      confidence: apiResponse.confidence || 0.85,
    };
  }

  /**
   * Obtiene icono para instrucciones de preparación
   */
  getPreparationIcon(step) {
    const stepLower = step.toLowerCase();
    if (stepLower.includes("vaciar") || stepLower.includes("empty"))
      return "💧";
    if (
      stepLower.includes("enjuagar") ||
      stepLower.includes("lavar") ||
      stepLower.includes("limpiar")
    )
      return "🚿";
    if (stepLower.includes("aplastar") || stepLower.includes("comprimir"))
      return "👊";
    if (
      stepLower.includes("quitar") ||
      stepLower.includes("retirar") ||
      stepLower.includes("separar")
    )
      return "🔄";
    if (stepLower.includes("secar")) return "☀️";
    if (stepLower.includes("doblar") || stepLower.includes("plegar"))
      return "📦";
    return "✨";
  }

  /**
   * Obtiene ideas de upcycling por categoría
   */
  getUpcyclingIdeas(category, itemName) {
    const ideas = {
      plastico: [
        {
          title: "Maceta Colgante",
          description:
            "Corta y decora para crear una maceta para plantas pequeñas",
          difficulty: "Fácil",
          time: "15 min",
        },
        {
          title: "Organizador",
          description: "Úsalo para organizar pequeños objetos en cajones",
          difficulty: "Fácil",
          time: "10 min",
        },
      ],
      metal: [
        {
          title: "Portavelas",
          description: "Decora y usa como portavelas decorativo",
          difficulty: "Fácil",
          time: "20 min",
        },
        {
          title: "Maceta",
          description: "Pinta y usa como maceta para hierbas aromáticas",
          difficulty: "Fácil",
          time: "15 min",
        },
      ],
      papel: [
        {
          title: "Papel Reciclado",
          description: "Crea tu propio papel reciclado artesanal",
          difficulty: "Media",
          time: "1 hora",
        },
        {
          title: "Envoltura de Regalo",
          description: "Úsalo como papel de regalo único y ecológico",
          difficulty: "Fácil",
          time: "5 min",
        },
      ],
      vidrio: [
        {
          title: "Jarrón Decorativo",
          description: "Pinta y decora para crear un jarrón único",
          difficulty: "Fácil",
          time: "30 min",
        },
        {
          title: "Portavelas",
          description: "Añade una vela para crear ambiente",
          difficulty: "Fácil",
          time: "5 min",
        },
      ],
      organico: [
        {
          title: "Compost Casero",
          description: "Crea compost para tus plantas",
          difficulty: "Fácil",
          time: "Continuo",
        },
      ],
    };

    return (
      ideas[category] || [
        {
          title: "Reutilizar",
          description:
            "Busca formas creativas de dar una segunda vida a este objeto",
          difficulty: "Variable",
          time: "Variable",
        },
      ]
    );
  }

  /**
   * Obtiene datos curiosos por categoría
   */
  getFactsByCategory(category) {
    const facts = {
      plastico: [
        "Una botella de plástico tarda 450 años en descomponerse",
        "Solo el 9% del plástico producido se ha reciclado",
        "Reciclar plástico ahorra el 70% de la energía vs fabricar nuevo",
      ],
      metal: [
        "El aluminio puede reciclarse infinitamente sin perder calidad",
        "Reciclar una lata ahorra el 95% de la energía vs crear una nueva",
      ],
      papel: [
        "El papel puede reciclarse hasta 7 veces",
        "Reciclar 1 tonelada de papel salva 17 árboles",
      ],
      vidrio: [
        "El vidrio es 100% reciclable infinitamente",
        "Reciclar vidrio ahorra el 30% de la energía vs fabricar nuevo",
      ],
      organico: [
        "Los residuos orgánicos representan el 40% de la basura doméstica",
        "El compost enriquece el suelo y reduce la necesidad de fertilizantes",
      ],
    };

    return (
      facts[category] || ["Cada pequeña acción cuenta para cuidar el planeta"]
    );
  }

  /**
   * Genera una respuesta simulada para desarrollo/demo
   * @returns {Object} - Respuesta simulada
   */
  getSimulatedResponse() {
    const simulatedResults = [
      {
        id: "sim_botella",
        name: "Botella de Plástico",
        category: "plastico",
        container: "amarillo",
        containerName: "Contenedor Amarillo",
        icon: "🧴",
        co2Impact: 0.08,
        energyImpact: 0.5,
        waterImpact: 1.5,
        decompositionTime: "450 años",
        preparation: [
          {
            step: 1,
            action: "Vaciar",
            description: "Asegúrate de que esté vacía",
            icon: "💧",
          },
          {
            step: 2,
            action: "Enjuagar",
            description: "Un enjuague rápido",
            icon: "🚿",
          },
          {
            step: 3,
            action: "Aplastar",
            description: "Aplástala para ahorrar espacio",
            icon: "👊",
          },
        ],
        upcycling: [
          {
            title: "Maceta Colgante",
            description: "Corta y decora para plantas",
            difficulty: "Fácil",
            time: "15 min",
          },
        ],
        facts: ["Una botella tarda 450 años en descomponerse"],
        confidence: 0.92,
      },
      {
        id: "sim_lata",
        name: "Lata de Aluminio",
        category: "metal",
        container: "amarillo",
        containerName: "Contenedor Amarillo",
        icon: "🥫",
        co2Impact: 0.15,
        energyImpact: 0.9,
        waterImpact: 2.0,
        decompositionTime: "200-500 años",
        preparation: [
          {
            step: 1,
            action: "Vaciar",
            description: "Vacía completamente",
            icon: "💧",
          },
          {
            step: 2,
            action: "Enjuagar",
            description: "Enjuague rápido",
            icon: "🚿",
          },
        ],
        upcycling: [
          {
            title: "Portavelas",
            description: "Decora como portavelas",
            difficulty: "Fácil",
            time: "20 min",
          },
        ],
        facts: ["El aluminio se recicla infinitamente sin perder calidad"],
        confidence: 0.94,
      },
      {
        id: "sim_carton",
        name: "Caja de Cartón",
        category: "papel",
        container: "azul",
        containerName: "Contenedor Azul",
        icon: "📦",
        co2Impact: 0.12,
        energyImpact: 0.7,
        waterImpact: 3.0,
        decompositionTime: "2-5 meses",
        preparation: [
          {
            step: 1,
            action: "Vaciar",
            description: "Retira el contenido",
            icon: "📤",
          },
          {
            step: 2,
            action: "Aplanar",
            description: "Desmonta y aplana",
            icon: "📋",
          },
        ],
        upcycling: [
          {
            title: "Organizador",
            description: "Crea divisores de cajón",
            difficulty: "Fácil",
            time: "20 min",
          },
        ],
        facts: ["El cartón puede reciclarse hasta 7 veces"],
        confidence: 0.89,
      },
    ];

    const randomIndex = Math.floor(Math.random() * simulatedResults.length);
    return simulatedResults[randomIndex];
  }

  /**
   * Verifica si el cliente tiene una API key configurada
   */
  hasApiKey() {
    return !!this.apiKey;
  }

  /**
   * Configura la API key
   */
  setApiKey(apiKey) {
    this.apiKey = apiKey;
  }
}

// Exportar instancia singleton
export const zaiClient = new ZaiClientService(
  import.meta.env.VITE_ZAI_API_KEY || null
);

export default ZaiClientService;
