import { getContainerColor } from '../data/wasteDatabase'

export default function WasteResult({ waste }) {
  if (!waste) return null

  const containerColor = getContainerColor(waste.container)

  return (
    <div className="animate-scale-in">
      {/* Header with icon and name */}
      <div className="flex items-center gap-4 mb-6">
        <div className={`
          w-20 h-20 rounded-2xl flex items-center justify-center text-4xl
          ${containerColor.bg} border-2 ${containerColor.border}
        `}>
          {waste.icon}
        </div>
        <div>
          <h2 className="text-2xl font-outfit font-bold text-white mb-1">
            {waste.name}
          </h2>
          <span className={`
            inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium
            ${containerColor.bg} ${containerColor.text} border ${containerColor.border}
          `}>
            <span className={`w-3 h-3 rounded-full ${containerColor.solid}`} />
            {waste.containerName}
          </span>
        </div>
      </div>

      {/* Container visual guide */}
      <div className={`
        relative overflow-hidden rounded-2xl p-4 mb-6
        ${containerColor.bg} border ${containerColor.border}
      `}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm ${containerColor.text} mb-1`}>Depositar en</p>
            <p className="text-xl font-outfit font-bold text-white">
              Contenedor {containerColor.name}
            </p>
          </div>
          <div className={`
            w-16 h-16 rounded-xl flex items-center justify-center
            ${containerColor.solid}
          `}>
            <span className="text-white text-2xl">🗑️</span>
          </div>
        </div>

        {/* Decorative glow */}
        <div className={`absolute -bottom-8 -right-8 w-32 h-32 ${containerColor.solid} opacity-20 rounded-full blur-2xl`} />
      </div>

      {/* Decomposition time */}
      {waste.decompositionTime && (
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 mb-4">
          <span className="text-2xl">⏰</span>
          <div>
            <p className="text-xs text-gray-400">Tiempo de descomposición</p>
            <p className="text-white font-semibold">{waste.decompositionTime}</p>
          </div>
        </div>
      )}
    </div>
  )
}
