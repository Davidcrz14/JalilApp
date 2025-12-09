export default function ImpactStats({ waste }) {
  if (!waste) return null

  const stats = [
    {
      icon: '🌿',
      value: waste.co2Impact,
      unit: 'kg',
      label: 'CO₂ ahorrado',
      color: 'eco-green'
    },
    {
      icon: '⚡',
      value: waste.energyImpact,
      unit: 'kWh',
      label: 'Energía ahorrada',
      color: 'solar-yellow'
    },
    {
      icon: '💧',
      value: waste.waterImpact,
      unit: 'L',
      label: 'Agua ahorrada',
      color: 'ocean-blue'
    },
  ]

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-outfit font-semibold text-white flex items-center gap-2">
        <span>📊</span>
        Impacto Ambiental
      </h3>

      <div className="grid grid-cols-3 gap-2">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`
              p-3 rounded-xl text-center
              bg-gradient-to-br from-${stat.color}-500/20 to-${stat.color}-600/10
              border border-${stat.color}-500/30
              animate-slide-up
            `}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <span className="text-2xl block mb-1">{stat.icon}</span>
            <p className={`text-xl font-bold font-outfit text-${stat.color}-400`}>
              {stat.value}
            </p>
            <p className="text-xs text-gray-400">{stat.unit}</p>
          </div>
        ))}
      </div>

      {/* Fact box */}
      {waste.facts && waste.facts.length > 0 && (
        <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10">
          <p className="text-sm text-gray-300 flex items-start gap-2">
            <span className="text-eco-green-400">💡</span>
            <span>{waste.facts[Math.floor(Math.random() * waste.facts.length)]}</span>
          </p>
        </div>
      )}
    </div>
  )
}
