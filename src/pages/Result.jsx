import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ImpactStats from '../components/ImpactStats'
import PrepInstructions from '../components/PrepInstructions'
import UpcyclingIdeas from '../components/UpcyclingIdeas'
import WasteResult from '../components/WasteResult'
import { useApp } from '../context/AppContext'

export default function Result() {
  const navigate = useNavigate()
  const { lastScanResult, capturedImage, addRecycledItem, clearCapturedImage } = useApp()

  useEffect(() => {
    // Si no hay resultado, redirigir al escáner
    if (!lastScanResult) {
      navigate('/scan')
    }
  }, [lastScanResult, navigate])

  if (!lastScanResult) return null

  const handleConfirmRecycle = () => {
    addRecycledItem(lastScanResult)
    clearCapturedImage()
    navigate('/')
  }

  return (
    <div className="min-h-screen p-4 pt-8 pb-24">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <Link
          to="/scan"
          className="p-2 -ml-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>

        <h1 className="text-lg font-outfit font-semibold text-white">Resultado</h1>

        <Link
          to="/"
          className="p-2 -mr-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Link>
      </header>

      {/* Captured image preview */}
      {capturedImage && (
        <div className="mb-6 rounded-2xl overflow-hidden h-48 relative">
          <img
            src={capturedImage}
            alt="Scanned object"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-dark via-transparent to-transparent" />

          {/* Success badge */}
          <div className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-eco-green-500 text-white text-sm font-medium shadow-lg">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Identificado
          </div>
        </div>
      )}

      {/* Main result */}
      <section className="mb-8">
        <WasteResult waste={lastScanResult} />
      </section>

      {/* Impact stats */}
      <section className="mb-8">
        <ImpactStats waste={lastScanResult} />
      </section>

      {/* Preparation instructions */}
      <section className="mb-8">
        <PrepInstructions steps={lastScanResult.preparation} />
      </section>

      {/* Upcycling ideas */}
      <section className="mb-8">
        <UpcyclingIdeas ideas={lastScanResult.upcycling} />
      </section>

      {/* Action buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-deep-dark via-deep-dark to-transparent">
        <div className="flex gap-3 max-w-lg mx-auto">
          <Link
            to="/scan"
            className="flex-1 btn-secondary flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            </svg>
            Escanear otro
          </Link>
          <button
            onClick={handleConfirmRecycle}
            className="flex-1 btn-primary flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            ¡Reciclado!
          </button>
        </div>
      </div>
    </div>
  )
}
