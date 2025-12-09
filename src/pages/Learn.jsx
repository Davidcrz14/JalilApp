import LearnTabs from '../components/LearnTabs'

export default function Learn() {
  return (
    <div className="min-h-screen p-4 pt-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-outfit font-bold text-gradient mb-2">
          Aprende a Reciclar
        </h1>
        <p className="text-gray-400">
          Guía completa para clasificar correctamente tus residuos
        </p>
      </header>

      {/* Quick stats */}
      <section className="mb-8">
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-4 rounded-xl bg-ocean-blue-500/20 border border-ocean-blue-500/30">
            <span className="text-3xl block mb-1">📦</span>
            <p className="text-xs text-ocean-blue-400 font-medium">Papel y Cartón</p>
            <p className="text-lg font-bold text-white">Azul</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-solar-yellow-500/20 border border-solar-yellow-500/30">
            <span className="text-3xl block mb-1">🧴</span>
            <p className="text-xs text-solar-yellow-400 font-medium">Plásticos</p>
            <p className="text-lg font-bold text-white">Amarillo</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-eco-green-500/20 border border-eco-green-500/30">
            <span className="text-3xl block mb-1">🍾</span>
            <p className="text-xs text-eco-green-400 font-medium">Vidrio</p>
            <p className="text-lg font-bold text-white">Verde</p>
          </div>
        </div>
      </section>

      {/* Main content tabs */}
      <section className="mb-8">
        <LearnTabs />
      </section>

      {/* Additional resources */}
      <section className="mb-8">
        <h3 className="text-lg font-outfit font-semibold text-white mb-4 flex items-center gap-2">
          <span>📚</span>
          Recursos Adicionales
        </h3>

        <div className="space-y-3">
          <a
            href="#"
            className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-2xl">
              🎓
            </div>
            <div className="flex-1">
              <h4 className="text-white font-medium group-hover:text-eco-green-400 transition-colors">
                Curso de Reciclaje
              </h4>
              <p className="text-sm text-gray-400">Aprende desde cero en 10 lecciones</p>
            </div>
            <svg className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>

          <a
            href="#"
            className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-2xl">
              🏆
            </div>
            <div className="flex-1">
              <h4 className="text-white font-medium group-hover:text-eco-green-400 transition-colors">
                Retos Semanales
              </h4>
              <p className="text-sm text-gray-400">Completa desafíos y gana recompensas</p>
            </div>
            <svg className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>

          <a
            href="#"
            className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center text-2xl">
              🗺️
            </div>
            <div className="flex-1">
              <h4 className="text-white font-medium group-hover:text-eco-green-400 transition-colors">
                Puntos Limpios
              </h4>
              <p className="text-sm text-gray-400">Encuentra el punto más cercano</p>
            </div>
            <svg className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>

      {/* Eco tip */}
      <section className="pb-4">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-eco-green-500/20 to-eco-green-600/10 border border-eco-green-500/30">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🌍</span>
            <div>
              <h4 className="text-white font-semibold mb-1">Regla de las 3R</h4>
              <p className="text-sm text-gray-300">
                <span className="text-eco-green-400 font-medium">Reducir</span> →
                <span className="text-ocean-blue-400 font-medium"> Reutilizar</span> →
                <span className="text-solar-yellow-400 font-medium"> Reciclar</span>
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Antes de tirar algo, pregúntate si puedes reducir su uso o darle una segunda vida.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
