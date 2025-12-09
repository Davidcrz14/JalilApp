import { NavLink } from 'react-router-dom'

export default function Navigation() {
  const navItems = [
    {
      to: '/',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      label: 'Inicio'
    },
    {
      to: '/scan',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: 'Escanear',
      special: true
    },
    {
      to: '/learn',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      label: 'Aprender'
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      {/* Blur background */}
      <div className="absolute inset-0 bg-deep-dark/80 backdrop-blur-xl border-t border-white/10" />

      {/* Navigation content */}
      <div className="relative flex justify-around items-center py-2 px-4 max-w-lg mx-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `
              relative flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all duration-300
              ${item.special
                ? 'transform -translate-y-4'
                : ''
              }
              ${isActive
                ? item.special
                  ? ''
                  : 'text-eco-green-400'
                : 'text-gray-400 hover:text-gray-200'
              }
            `}
          >
            {({ isActive }) => (
              <>
                {item.special ? (
                  <div className={`
                    relative p-4 rounded-full transition-all duration-300
                    ${isActive
                      ? 'bg-gradient-to-br from-eco-green-500 to-eco-green-600 shadow-lg shadow-eco-green-500/40'
                      : 'bg-gradient-to-br from-eco-green-600 to-eco-green-700 hover:from-eco-green-500 hover:to-eco-green-600'
                    }
                  `}>
                    {/* Pulse rings */}
                    {isActive && (
                      <>
                        <span className="absolute inset-0 rounded-full bg-eco-green-500/30 pulse-ring" />
                        <span className="absolute inset-0 rounded-full bg-eco-green-500/20 pulse-ring animate-delay-300" />
                      </>
                    )}
                    <span className="relative text-white">{item.icon}</span>
                  </div>
                ) : (
                  <span className="relative">
                    {item.icon}
                    {isActive && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-eco-green-400" />
                    )}
                  </span>
                )}
                <span className={`text-xs font-medium ${item.special ? 'text-white' : ''}`}>
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
