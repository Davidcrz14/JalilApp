export default function PrepInstructions({ steps }) {
  if (!steps || steps.length === 0) return null

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-outfit font-semibold text-white flex items-center gap-2">
        <span>📝</span>
        Preparación
      </h3>

      <div className="space-y-2">
        {steps.map((step, index) => (
          <div
            key={step.step}
            className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10
                       hover:bg-white/10 transition-colors animate-slide-in-right"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Step number */}
            <div className="w-8 h-8 rounded-full bg-eco-green-500/20 border border-eco-green-500/50
                          flex items-center justify-center text-eco-green-400 font-semibold text-sm">
              {step.step}
            </div>

            {/* Icon */}
            <span className="text-2xl">{step.icon}</span>

            {/* Content */}
            <div className="flex-1">
              <p className="text-white font-medium">{step.action}</p>
              <p className="text-sm text-gray-400">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
