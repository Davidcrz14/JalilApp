import { Link } from 'react-router-dom'
import ImpactCard from '../components/ImpactCard'
import QuickGuide from '../components/QuickGuide'
import { useApp } from '../context/AppContext'

export default function Home() {
  const { stats, scanHistory, resetStats } = useApp()

  // Datos curiosos rotativos basados en las estadísticas del usuario
  const getPersonalizedTip = () => {
    const tips = [
      {
        condition: stats.recycledItems >= 10,
        text: `¡Increíble! Has reciclado ${stats.recycledItems} objetos. Eso equivale a salvar ${stats.treesEquivalent.toFixed(2)} árboles. 🌳`
      },
      {
        condition: stats.co2Saved >= 1,
        text: `Has evitado ${stats.co2Saved.toFixed(1)} kg de CO₂. Es como plantar un árbol que crecerá por años. 🌱`
      },
      {
        condition: stats.byContainer?.amarillo > 5,
        text: `Has reciclado ${stats.byContainer?.amarillo || 0} plásticos. ¡Cada botella reciclada ahorra energía para 3 horas de TV! ⚡`
      },
      {
        condition: stats.byContainer?.azul > 3,
        text: `Con ${stats.byContainer?.azul || 0} items de papel reciclados, has ayudado a salvar árboles. 📦`
      },
      {
        condition: stats.recycledItems === 0,
        text: `¡Empieza a escanear objetos para ver tu impacto ambiental! Cada pequeña acción cuenta. ♻️`
      },
      {
        condition: true,
        text: `Reciclar una lata de aluminio ahorra suficiente energía para mantener un televisor encendido durante 3 horas.`
      }
    ]

    return tips.find(tip => tip.condition)?.text || tips[tips.length - 1].text
  }

  return (
    <div className="min-h-screen p-4 pt-8">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-3xl font-outfit font-bold text-gradient">
              EcoScan
            </h1>
            <p className="text-gray-400">Tu asistente de reciclaje inteligente</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-eco-green-500 to-eco-green-600 flex items-center justify-center text-2xl shadow-lg shadow-eco-green-500/30">
            🌱
          </div>
        </div>
      </header>

      {/* Impact Panel */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-outfit font-semibold text-white flex items-center gap-2">
            <span>📊</span>
            Tu Impacto Total
          </h2>
          {stats.recycledItems > 0 && (
            <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded-full">
              {stats.totalScans || stats.recycledItems} escaneos
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <ImpactCard
            icon="🌿"
            value={stats.co2Saved}
            unit="kg"
            label="CO₂ Ahorrado"
            color="eco-green"
            delay={0}
          />
          <ImpactCard
            icon="♻️"
            value={stats.recycledItems}
            unit="items"
            label="Reciclados"
            color="ocean-blue"
            delay={100}
          />
          <ImpactCard
            icon="⚡"
            value={stats.energySaved}
            unit="kWh"
            label="Energía"
            color="solar-yellow"
            delay={200}
          />
          <ImpactCard
            icon="💧"
            value={stats.waterSaved}
            unit="L"
            label="Agua"
            color="ocean-blue"
            delay={300}
          />
        </div>

        {/* Desglose por contenedor */}
        {stats.recycledItems > 0 && (
          <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-sm text-gray-400 mb-3">Desglose por contenedor:</p>
            <div className="flex flex-wrap gap-2">
              {stats.byContainer?.amarillo > 0 && (
                <span className="px-3 py-1 rounded-full bg-solar-yellow-500/20 text-solar-yellow-400 text-sm border border-solar-yellow-500/30">
                  🧴 Amarillo: {stats.byContainer.amarillo}
                </span>
              )}
              {stats.byContainer?.azul > 0 && (
                <span className="px-3 py-1 rounded-full bg-ocean-blue-500/20 text-ocean-blue-400 text-sm border border-ocean-blue-500/30">
                  📦 Azul: {stats.byContainer.azul}
                </span>
              )}
              {stats.byContainer?.verde > 0 && (
                <span className="px-3 py-1 rounded-full bg-eco-green-500/20 text-eco-green-400 text-sm border border-eco-green-500/30">
                  🍾 Verde: {stats.byContainer.verde}
                </span>
              )}
              {stats.byContainer?.marron > 0 && (
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-sm border border-amber-500/30">
                  🍌 Marrón: {stats.byContainer.marron}
                </span>
              )}
              {stats.byContainer?.gris > 0 && (
                <span className="px-3 py-1 rounded-full bg-gray-500/20 text-gray-400 text-sm border border-gray-500/30">
                  🗑️ Gris: {stats.byContainer.gris}
                </span>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Scan CTA */}
      <section className="mb-8">
        <Link
          to="/scan"
          className="block relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-eco-green-500 to-eco-green-700
                     transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]
                     shadow-xl shadow-eco-green-500/30"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-outfit font-bold text-white mb-1">
                Escanear con IA
              </h3>
              <p className="text-white/80 text-sm">
                Identifica y clasifica cualquier residuo
              </p>
            </div>
            <svg className="w-6 h-6 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
      </section>

      {/* Quick Guide */}
      <section className="mb-8">
        <QuickGuide />
      </section>

      {/* Recent scans */}
      {scanHistory.length > 0 && (
        <section className="mb-8">
          <h3 className="text-lg font-outfit font-semibold text-white mb-4 flex items-center gap-2">
            <span>🕐</span>
            Escaneos Recientes
          </h3>
          <div className="space-y-2">
            {scanHistory.slice(0, 5).map((item, index) => (
              <div
                key={item.id || index}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10
                         hover:bg-white/10 transition-colors animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="text-2xl">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{item.name}</p>
                  <p className="text-xs text-gray-400">{item.containerName}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-eco-green-400">-{item.co2Impact?.toFixed(2) || '0.05'} kg CO₂</p>
                  <p className="text-xs text-gray-500">
                    {new Date(item.timestamp).toLocaleTimeString('es', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {scanHistory.length > 5 && (
            <p className="text-center text-sm text-gray-500 mt-3">
              Y {scanHistory.length - 5} escaneos más...
            </p>
          )}
        </section>
      )}

      {/* Personalized tip */}
      <section className="pb-4">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-ocean-blue-500/20 to-ocean-blue-600/10 border border-ocean-blue-500/30">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h4 className="text-white font-semibold mb-1">
                {stats.recycledItems > 0 ? 'Tu impacto' : 'Sabías que...'}
              </h4>
              <p className="text-sm text-gray-300">
                {getPersonalizedTip()}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Debug/Reset button (solo para desarrollo) */}
      {stats.recycledItems > 0 && (
        <section className="pb-8">
          <button
            onClick={() => {
              if (confirm('¿Seguro que quieres resetear todas las estadísticas?')) {
                resetStats()
              }
            }}
            className="w-full py-2 text-sm text-gray-500 hover:text-gray-300 transition-colors"
          >
            Resetear estadísticas
          </button>
        </section>
      )}
    </div>
  )
}
