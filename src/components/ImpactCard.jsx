import { useEffect, useState } from 'react'

export default function ImpactCard({ icon, value, unit, label, color = 'eco-green', delay = 0 }) {
  const [displayValue, setDisplayValue] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Delay animation start
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (!isVisible) return

    // Animate counter
    const duration = 1000
    const steps = 30
    const increment = value / steps
    let current = 0
    let step = 0

    const timer = setInterval(() => {
      step++
      current = Math.min(increment * step, value)
      setDisplayValue(current)

      if (step >= steps) {
        clearInterval(timer)
        setDisplayValue(value)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value, isVisible])

  const colorClasses = {
    'eco-green': 'from-eco-green-500/20 to-eco-green-600/10 border-eco-green-500/30',
    'ocean-blue': 'from-ocean-blue-500/20 to-ocean-blue-600/10 border-ocean-blue-500/30',
    'solar-yellow': 'from-solar-yellow-500/20 to-solar-yellow-600/10 border-solar-yellow-500/30',
  }

  const textColors = {
    'eco-green': 'text-eco-green-400',
    'ocean-blue': 'text-ocean-blue-400',
    'solar-yellow': 'text-solar-yellow-400',
  }

  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl p-4
        bg-gradient-to-br ${colorClasses[color]}
        border backdrop-blur-sm
        transform transition-all duration-500
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
      `}
    >
      {/* Background glow */}
      <div className={`absolute -top-10 -right-10 w-32 h-32 bg-${color}-500/10 rounded-full blur-3xl`} />

      <div className="relative">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">{icon}</span>
          <span className="text-xs text-gray-400 uppercase tracking-wide">{label}</span>
        </div>

        <div className="flex items-baseline gap-1">
          <span className={`text-3xl font-outfit font-bold ${textColors[color]}`}>
            {typeof value === 'number'
              ? displayValue.toFixed(value % 1 === 0 ? 0 : 1)
              : value
            }
          </span>
          <span className="text-sm text-gray-400">{unit}</span>
        </div>
      </div>
    </div>
  )
}
