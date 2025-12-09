import { useState } from 'react'

export default function UpcyclingIdeas({ ideas }) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (!ideas || ideas.length === 0) return null

  const difficultyColors = {
    'Fácil': 'bg-eco-green-500/20 text-eco-green-400 border-eco-green-500/50',
    'Media': 'bg-solar-yellow-500/20 text-solar-yellow-400 border-solar-yellow-500/50',
    'Difícil': 'bg-red-500/20 text-red-400 border-red-500/50',
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-outfit font-semibold text-white flex items-center gap-2">
        <span>♻️</span>
        Ideas de Reutilización
      </h3>

      {/* Carousel */}
      <div className="relative">
        {/* Cards container */}
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
          {ideas.map((idea, index) => (
            <div
              key={index}
              className={`
                flex-shrink-0 w-[280px] p-4 rounded-2xl snap-center
                bg-gradient-to-br from-white/10 to-white/5
                border border-white/10
                transition-all duration-300
                ${index === activeIndex ? 'scale-100 opacity-100' : 'scale-95 opacity-70'}
              `}
              onClick={() => setActiveIndex(index)}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-white font-semibold">{idea.title}</h4>
                <span className={`
                  px-2 py-0.5 rounded-full text-xs font-medium border
                  ${difficultyColors[idea.difficulty] || difficultyColors['Fácil']}
                `}>
                  {idea.difficulty}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-4">{idea.description}</p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-gray-500 text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{idea.time}</span>
                </div>
                <button className="text-eco-green-400 text-sm font-medium hover:text-eco-green-300 transition-colors">
                  Ver más →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-2">
          {ideas.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`
                w-2 h-2 rounded-full transition-all duration-300
                ${index === activeIndex
                  ? 'bg-eco-green-400 w-6'
                  : 'bg-gray-600 hover:bg-gray-500'
                }
              `}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
