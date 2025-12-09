import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom'
import Navigation from './components/Navigation'
import { AppProvider } from './context/AppContext'
import Home from './pages/Home'
import Learn from './pages/Learn'
import Result from './pages/Result'
import Scan from './pages/Scan'

function AppContent() {
  const location = useLocation()
  const hideNav = location.pathname === '/scan'

  return (
    <div className="min-h-screen bg-mesh flex flex-col">
      <main className="flex-1 pb-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/result" element={<Result />} />
          <Route path="/learn" element={<Learn />} />
        </Routes>
      </main>
      {!hideNav && <Navigation />}
    </div>
  )
}

function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  )
}

export default App
