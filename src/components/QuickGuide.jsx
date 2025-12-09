export default function QuickGuide() {
  const containers = [
    {
      name: 'Papel y Cartón',
      container: 'Azul',
      color: 'ocean-blue',
      icon: '📦',
      examples: ['Cajas', 'Periódicos', 'Revistas'],
      gradient: 'from-ocean-blue-500 to-ocean-blue-600',
    },
    {
      name: 'Plásticos y Envases',
      container: 'Amarillo',
      color: 'solar-yellow',
      icon: '🧴',
      examples: ['Botellas', 'Latas', 'Tetrabriks'],
      gradient: 'from-solar-yellow-500 to-solar-yellow-600',
    },
    {
      name: 'Orgánico',
      container: 'Marrón',
      color: 'amber',
      icon: '🍎',
      examples: ['Frutas', 'Verduras', 'Restos'],
      gradient: 'from-amber-600 to-amber-700',
    },
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-outfit font-semibold text-white flex items-center gap-2">
        <span>📋</span>
        Guía Rápida
      </h3>

      <div className="grid grid-cols-3 gap-3">
        {containers.map((item, index) => (
          <div
            key={item.container}
            className={`
              relative overflow-hidden rounded-2xl p-3
              bg-gradient-to-br ${item.gradient}
              transform transition-all duration-300 hover:scale-105
              animate-slide-up
            `}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-16 h-16 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
            </div>

            <div className="relative text-center">
              <span className="text-3xl mb-2 block">{item.icon}</span>
              <h4 className="text-xs font-semibold text-white mb-1 leading-tight">
                {item.name}
              </h4>
              <span className="inline-block px-2 py-0.5 rounded-full bg-white/20 text-xs text-white/90">
                {item.container}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Vidrio adicional */}
      <div className="flex gap-3">
        <div className="flex-1 rounded-xl p-3 bg-gradient-to-r from-eco-green-600 to-eco-green-700 flex items-center gap-3">
          <span className="text-2xl">🍾</span>
          <div>
            <h4 className="text-sm font-semibold text-white">Vidrio → Verde</h4>
            <p className="text-xs text-white/70">Botellas y frascos</p>
          </div>
        </div>
        <div className="flex-1 rounded-xl p-3 bg-gradient-to-r from-gray-600 to-gray-700 flex items-center gap-3">
          <span className="text-2xl">🗑️</span>
          <div>
            <h4 className="text-sm font-semibold text-white">Resto → Gris</h4>
            <p className="text-xs text-white/70">No reciclable</p>
          </div>
        </div>
      </div>
    </div>
  )
}
