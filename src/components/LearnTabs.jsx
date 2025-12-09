import { useState } from 'react'
import { learnContent } from '../data/wasteDatabase'

export default function LearnTabs() {
  const [activeTab, setActiveTab] = useState('reciclaje')

  const tabs = [
    { id: 'reciclaje', ...learnContent.reciclaje },
    { id: 'organico', ...learnContent.organico },
    { id: 'basura', ...learnContent.basura },
  ]

  const colorClasses = {
    'ocean-blue': {
      bg: 'bg-ocean-blue-500',
      bgLight: 'bg-ocean-blue-500/20',
      border: 'border-ocean-blue-500',
      text: 'text-ocean-blue-400',
    },
    'eco-green': {
      bg: 'bg-eco-green-500',
      bgLight: 'bg-eco-green-500/20',
      border: 'border-eco-green-500',
      text: 'text-eco-green-400',
    },
    'gray': {
      bg: 'bg-gray-500',
      bgLight: 'bg-gray-500/20',
      border: 'border-gray-500',
      text: 'text-gray-400',
    },
  }

  const activeContent = tabs.find(t => t.id === activeTab)
  const activeColor = colorClasses[activeContent.color]

  return (
    <div>
      {/* Tab buttons */}
      <div className="flex gap-2 mb-6 p-1 bg-white/5 rounded-xl">
        {tabs.map((tab) => {
          const color = colorClasses[tab.color]
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg
                font-medium text-sm transition-all duration-300
                ${activeTab === tab.id
                  ? `${color.bg} text-white shadow-lg`
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }
              `}
            >
              <span>{tab.icon}</span>
              <span className="hidden sm:inline">{tab.title}</span>
            </button>
          )
        })}
      </div>

      {/* Tab content */}
      <div className="space-y-6 animate-slide-up">
        {/* Header */}
        <div className={`p-4 rounded-2xl ${activeColor.bgLight} border ${activeColor.border}`}>
          <div className="flex items-center gap-3">
            <span className="text-4xl">{activeContent.icon}</span>
            <div>
              <h3 className={`text-xl font-outfit font-bold ${activeColor.text}`}>
                {activeContent.title}
              </h3>
              <p className="text-gray-400">{activeContent.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Categories */}
        {activeContent.items.map((category, catIndex) => (
          <div key={catIndex} className="space-y-3">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${activeColor.bg}`} />
              <h4 className="font-semibold text-white">{category.category}</h4>
              <span className="text-sm text-gray-500">- {category.description}</span>
            </div>

            {/* Allowed items */}
            <div className="grid grid-cols-2 gap-2">
              {category.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10
                           hover:bg-white/10 transition-colors"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-sm text-gray-300">{item.name}</span>
                </div>
              ))}
            </div>

            {/* Not allowed items */}
            {category.notAllowed && (
              <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                <p className="text-sm text-red-400 font-medium mb-2 flex items-center gap-2">
                  <span>⚠️</span> No depositar aquí:
                </p>
                <ul className="text-sm text-gray-400 space-y-1">
                  {category.notAllowed.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-red-500">✕</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tips */}
            {category.tips && (
              <div className="mt-4 p-4 rounded-xl bg-eco-green-500/10 border border-eco-green-500/30">
                <p className="text-sm text-eco-green-400 font-medium mb-2 flex items-center gap-2">
                  <span>💡</span> Consejos:
                </p>
                <ul className="text-sm text-gray-400 space-y-1">
                  {category.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-eco-green-500 mt-0.5">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
