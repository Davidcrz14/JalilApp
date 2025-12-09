// Base de datos de residuos comunes
export const wasteDatabase = {
  botella_plastico: {
    id: "botella_plastico",
    name: "Botella de Plástico",
    category: "plastico",
    container: "amarillo",
    containerName: "Contenedor Amarillo",
    icon: "🧴",
    co2Impact: 0.08, // kg CO₂ ahorrado por reciclar
    energyImpact: 0.5, // kWh ahorrados
    waterImpact: 1.5, // litros de agua ahorrados
    decompositionTime: "450 años",
    preparation: [
      {
        step: 1,
        action: "Vaciar",
        description: "Asegúrate de que la botella esté completamente vacía",
        icon: "💧",
      },
      {
        step: 2,
        action: "Enjuagar",
        description: "Un enjuague rápido para eliminar residuos",
        icon: "🚿",
      },
      {
        step: 3,
        action: "Aplastar",
        description: "Aplástala para ahorrar espacio",
        icon: "👊",
      },
      {
        step: 4,
        action: "Quitar tapa",
        description: "Retira la tapa y recíclala por separado",
        icon: "🔄",
      },
    ],
    upcycling: [
      {
        title: "Maceta Colgante",
        description:
          "Corta la botella por la mitad y úsala como maceta para plantas pequeñas",
        difficulty: "Fácil",
        time: "10 min",
      },
      {
        title: "Organizador de Lápices",
        description:
          "Decora la parte inferior de la botella para guardar útiles escolares",
        difficulty: "Fácil",
        time: "15 min",
      },
      {
        title: "Comedero para Pájaros",
        description:
          "Haz agujeros y llénala de semillas para alimentar a las aves",
        difficulty: "Media",
        time: "20 min",
      },
    ],
    facts: [
      "Una botella de plástico tarda 450 años en descomponerse",
      "Reciclar una botella ahorra suficiente energía para alimentar una bombilla por 3 horas",
      "El 91% del plástico no se recicla globalmente",
    ],
  },

  lata_aluminio: {
    id: "lata_aluminio",
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
        description: "Asegúrate de que esté completamente vacía",
        icon: "💧",
      },
      {
        step: 2,
        action: "Enjuagar",
        description: "Un enjuague rápido es suficiente",
        icon: "🚿",
      },
      {
        step: 3,
        action: "Aplastar",
        description: "Aplástala para ahorrar espacio (opcional)",
        icon: "👊",
      },
    ],
    upcycling: [
      {
        title: "Portavelas",
        description: "Decora la lata y coloca una vela pequeña dentro",
        difficulty: "Fácil",
        time: "15 min",
      },
      {
        title: "Huerto Vertical",
        description: "Crea un pequeño huerto con varias latas pintadas",
        difficulty: "Media",
        time: "30 min",
      },
    ],
    facts: [
      "El aluminio puede reciclarse infinitamente sin perder calidad",
      "Reciclar una lata ahorra el 95% de la energía necesaria para crear una nueva",
    ],
  },

  caja_carton: {
    id: "caja_carton",
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
        description: "Retira cualquier contenido de la caja",
        icon: "📤",
      },
      {
        step: 2,
        action: "Desmontar",
        description: "Aplana la caja para ahorrar espacio",
        icon: "📋",
      },
      {
        step: 3,
        action: "Quitar cinta",
        description: "Retira cinta adhesiva y etiquetas si es posible",
        icon: "✂️",
      },
    ],
    upcycling: [
      {
        title: "Organizador de Cajones",
        description: "Corta y forra para crear divisores de cajón",
        difficulty: "Fácil",
        time: "20 min",
      },
      {
        title: "Casa para Mascotas",
        description: "Construye una casita para gatos o perros pequeños",
        difficulty: "Media",
        time: "45 min",
      },
    ],
    facts: [
      "El cartón puede reciclarse hasta 7 veces",
      "Reciclar 1 tonelada de cartón salva 17 árboles",
    ],
  },

  botella_vidrio: {
    id: "botella_vidrio",
    name: "Botella de Vidrio",
    category: "vidrio",
    container: "verde",
    containerName: "Contenedor Verde",
    icon: "🍾",
    co2Impact: 0.3,
    energyImpact: 0.6,
    waterImpact: 1.8,
    decompositionTime: "4000 años",
    preparation: [
      {
        step: 1,
        action: "Vaciar",
        description: "Vacía completamente la botella",
        icon: "💧",
      },
      {
        step: 2,
        action: "Enjuagar",
        description: "Un enjuague ligero",
        icon: "🚿",
      },
      {
        step: 3,
        action: "Quitar tapa",
        description: "Retira tapas metálicas o de corcho",
        icon: "🔄",
      },
    ],
    upcycling: [
      {
        title: "Jarrón Decorativo",
        description: "Pinta la botella y úsala como florero",
        difficulty: "Fácil",
        time: "30 min",
      },
      {
        title: "Lámpara",
        description: "Añade luces LED para crear una lámpara única",
        difficulty: "Media",
        time: "45 min",
      },
    ],
    facts: [
      "El vidrio es 100% reciclable y puede reciclarse infinitamente",
      "Reciclar vidrio ahorra el 30% de energía respecto a crear nuevo",
    ],
  },

  cascara_fruta: {
    id: "cascara_fruta",
    name: "Cáscara de Fruta",
    category: "organico",
    container: "marron",
    containerName: "Contenedor Marrón (Orgánico)",
    icon: "🍌",
    co2Impact: 0.05,
    energyImpact: 0.1,
    waterImpact: 0.5,
    decompositionTime: "2-5 semanas",
    preparation: [
      {
        step: 1,
        action: "Separar",
        description: "Separa los restos orgánicos de otros residuos",
        icon: "♻️",
      },
      {
        step: 2,
        action: "Sin bolsa",
        description: "Deposita directamente o usa bolsa compostable",
        icon: "🛍️",
      },
    ],
    upcycling: [
      {
        title: "Compost Casero",
        description: "Crea tu propio compost para el jardín",
        difficulty: "Fácil",
        time: "Continuo",
      },
      {
        title: "Fertilizante Líquido",
        description: "Fermenta cáscaras de plátano en agua para plantas",
        difficulty: "Fácil",
        time: "2 semanas",
      },
    ],
    facts: [
      "Los residuos orgánicos representan el 40% de la basura doméstica",
      "El compost casero reduce emisiones de metano de los vertederos",
    ],
  },

  papel_periodico: {
    id: "papel_periodico",
    name: "Papel de Periódico",
    category: "papel",
    container: "azul",
    containerName: "Contenedor Azul",
    icon: "📰",
    co2Impact: 0.05,
    energyImpact: 0.3,
    waterImpact: 1.0,
    decompositionTime: "2-6 semanas",
    preparation: [
      {
        step: 1,
        action: "Secar",
        description: "Asegúrate de que esté seco",
        icon: "☀️",
      },
      {
        step: 2,
        action: "Apilar",
        description: "Apila ordenadamente para ahorrar espacio",
        icon: "📚",
      },
    ],
    upcycling: [
      {
        title: "Papel Maché",
        description: "Crea figuras decorativas con papel y cola",
        difficulty: "Media",
        time: "2 horas",
      },
      {
        title: "Envoltura de Regalo",
        description: "Usa páginas decorativas como papel de regalo único",
        difficulty: "Fácil",
        time: "5 min",
      },
    ],
    facts: [
      "El papel puede reciclarse hasta 5-7 veces",
      "Reciclar papel ahorra 70% de la energía vs fabricar nuevo",
    ],
  },

  envase_tetrabrik: {
    id: "envase_tetrabrik",
    name: "Envase Tetrabrik",
    category: "plastico",
    container: "amarillo",
    containerName: "Contenedor Amarillo",
    icon: "🧃",
    co2Impact: 0.1,
    energyImpact: 0.4,
    waterImpact: 1.2,
    decompositionTime: "30 años",
    preparation: [
      {
        step: 1,
        action: "Vaciar",
        description: "Vacía completamente el contenido",
        icon: "💧",
      },
      {
        step: 2,
        action: "Enjuagar",
        description: "Un enjuague rápido es suficiente",
        icon: "🚿",
      },
      {
        step: 3,
        action: "Plegar",
        description: "Pliega el envase para ahorrar espacio",
        icon: "📦",
      },
    ],
    upcycling: [
      {
        title: "Monedero",
        description: "Lava, seca y crea un monedero resistente al agua",
        difficulty: "Media",
        time: "30 min",
      },
    ],
    facts: [
      "Los tetrabriks están hechos de 75% cartón, 20% plástico y 5% aluminio",
      "Son 100% reciclables pero requieren procesamiento especial",
    ],
  },

  bolsa_plastico: {
    id: "bolsa_plastico",
    name: "Bolsa de Plástico",
    category: "plastico",
    container: "amarillo",
    containerName: "Contenedor Amarillo",
    icon: "🛍️",
    co2Impact: 0.03,
    energyImpact: 0.1,
    waterImpact: 0.3,
    decompositionTime: "150-500 años",
    preparation: [
      {
        step: 1,
        action: "Vaciar",
        description: "Asegúrate de que esté vacía y limpia",
        icon: "✨",
      },
      {
        step: 2,
        action: "Agrupar",
        description: "Junta varias bolsas en una sola",
        icon: "🛍️",
      },
    ],
    upcycling: [
      {
        title: "Trenzado Decorativo",
        description: "Trenza bolsas para crear cuerdas resistentes",
        difficulty: "Media",
        time: "1 hora",
      },
    ],
    facts: [
      "Se usan 5 billones de bolsas de plástico al año en el mundo",
      "Una bolsa de plástico se usa en promedio 12 minutos",
    ],
  },
};

// Función para obtener un residuo aleatorio (para simulación)
export function getRandomWaste() {
  const wasteIds = Object.keys(wasteDatabase);
  const randomId = wasteIds[Math.floor(Math.random() * wasteIds.length)];
  return wasteDatabase[randomId];
}

// Función para obtener color del contenedor
export function getContainerColor(container) {
  const colors = {
    amarillo: {
      bg: "bg-solar-yellow-500/20",
      border: "border-solar-yellow-500",
      text: "text-solar-yellow-400",
      solid: "bg-solar-yellow-500",
      name: "Amarillo",
    },
    azul: {
      bg: "bg-ocean-blue-500/20",
      border: "border-ocean-blue-500",
      text: "text-ocean-blue-400",
      solid: "bg-ocean-blue-500",
      name: "Azul",
    },
    verde: {
      bg: "bg-eco-green-500/20",
      border: "border-eco-green-500",
      text: "text-eco-green-400",
      solid: "bg-eco-green-500",
      name: "Verde",
    },
    marron: {
      bg: "bg-amber-700/20",
      border: "border-amber-700",
      text: "text-amber-500",
      solid: "bg-amber-700",
      name: "Marrón",
    },
    gris: {
      bg: "bg-gray-500/20",
      border: "border-gray-500",
      text: "text-gray-400",
      solid: "bg-gray-500",
      name: "Gris",
    },
  };
  return colors[container] || colors.gris;
}

// Datos educativos para la sección Learn
export const learnContent = {
  reciclaje: {
    title: "Reciclaje",
    subtitle: "Contenedor Azul y Amarillo",
    icon: "♻️",
    color: "ocean-blue",
    items: [
      {
        category: "Contenedor Azul",
        description: "Papel y Cartón",
        items: [
          { name: "Periódicos y revistas", icon: "📰" },
          { name: "Cajas de cartón", icon: "📦" },
          { name: "Papel de oficina", icon: "📄" },
          { name: "Bolsas de papel", icon: "🛍️" },
          { name: "Libros y cuadernos", icon: "📚" },
        ],
        notAllowed: [
          "Papel plastificado",
          "Pañales",
          "Papel de cocina sucio",
          "Bricks de leche (van al amarillo)",
        ],
      },
      {
        category: "Contenedor Amarillo",
        description: "Envases y Plásticos",
        items: [
          { name: "Botellas de plástico", icon: "🧴" },
          { name: "Latas de aluminio", icon: "🥫" },
          { name: "Tetrabriks", icon: "🧃" },
          { name: "Bolsas de plástico", icon: "🛍️" },
          { name: "Bandejas de poliexpán", icon: "🍱" },
        ],
        notAllowed: [
          "Juguetes de plástico",
          "Cubos o palanganas",
          "Electrodomésticos",
          "Cápsulas de café",
        ],
      },
    ],
  },
  organico: {
    title: "Orgánico",
    subtitle: "Contenedor Marrón",
    icon: "🌱",
    color: "eco-green",
    items: [
      {
        category: "Contenedor Marrón",
        description: "Residuos Orgánicos",
        items: [
          { name: "Restos de frutas y verduras", icon: "🍎" },
          { name: "Cáscaras de huevo", icon: "🥚" },
          { name: "Posos de café", icon: "☕" },
          { name: "Restos de jardinería", icon: "🌿" },
          { name: "Pan y bollería", icon: "🥖" },
        ],
        notAllowed: [
          "Aceite de cocina",
          "Pañales o compresas",
          "Colillas",
          "Excrementos de animales",
        ],
      },
    ],
  },
  basura: {
    title: "Resto",
    subtitle: "Contenedor Gris",
    icon: "🗑️",
    color: "gray",
    items: [
      {
        category: "Contenedor Gris",
        description: "Residuos No Reciclables",
        items: [
          { name: "Pañales y compresas", icon: "👶" },
          { name: "Colillas de cigarro", icon: "🚬" },
          { name: "Arena de gato", icon: "🐱" },
          { name: "Cerámica rota", icon: "🏺" },
          { name: "Polvo de aspiradora", icon: "🧹" },
        ],
        tips: [
          "Antes de tirar algo aquí, asegúrate de que no va en otro contenedor",
          "Reduce al máximo lo que tiras en este contenedor",
          "Algunos residuos como pilas o electrónica tienen puntos especiales",
        ],
      },
    ],
  },
};
