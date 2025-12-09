import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CameraView from '../components/CameraView'
import { useApp } from '../context/AppContext'
import { getRandomWaste } from '../data/wasteDatabase'
import { zaiClient } from '../services/zaiClient'

export default function Scan() {
  const navigate = useNavigate()
  const { setCapturedImage, saveScanResult, setIsAnalyzing, isAnalyzing } = useApp()
  const [showCamera, setShowCamera] = useState(true)
  const [capturedPhoto, setCapturedPhoto] = useState(null)
  const [analyzeProgress, setAnalyzeProgress] = useState(0)
  const [analysisStatus, setAnalysisStatus] = useState('')
  const [useAI, setUseAI] = useState(zaiClient.hasApiKey())

  const handleCapture = (imageData) => {
    setCapturedPhoto(imageData)
    setCapturedImage(imageData)
    setShowCamera(false)
    startAnalysis(imageData)
  }

  const startAnalysis = async (imageData) => {
    setIsAnalyzing(true)
    setAnalyzeProgress(0)
    setAnalysisStatus('Preparando imagen...')

    // Simular progreso inicial
    const progressInterval = setInterval(() => {
      setAnalyzeProgress(prev => {
        if (prev >= 90) {
          return 90 // Mantenerse en 90% hasta que termine el análisis real
        }
        return prev + Math.random() * 10
      })
    }, 300)

    let result

    try {
      if (useAI && zaiClient.hasApiKey()) {
        // Usar IA real
        setAnalysisStatus('Conectando con IA...')
        await new Promise(resolve => setTimeout(resolve, 500))

        setAnalysisStatus('Analizando imagen con IA...')
        result = await zaiClient.analyzeImage(imageData)

        setAnalysisStatus('Procesando resultados...')
      } else {
        // Modo simulado
        setAnalysisStatus('Analizando (modo demo)...')
        await new Promise(resolve => setTimeout(resolve, 1500))
        result = getRandomWaste()
      }

      clearInterval(progressInterval)
      setAnalyzeProgress(100)
      setAnalysisStatus('¡Identificado!')

      saveScanResult(result)

      setTimeout(() => {
        setIsAnalyzing(false)
        navigate('/result')
      }, 500)

    } catch (error) {
      console.error('Error en análisis:', error)
      clearInterval(progressInterval)

      // Fallback a simulado en caso de error
      setAnalysisStatus('Usando modo alternativo...')
      result = getRandomWaste()
      saveScanResult(result)

      setTimeout(() => {
        setIsAnalyzing(false)
        navigate('/result')
      }, 500)
    }
  }

  const retakePhoto = () => {
    setCapturedPhoto(null)
    setShowCamera(true)
    setAnalyzeProgress(0)
    setAnalysisStatus('')
  }

  return (
    <div className="min-h-screen bg-deep-dark">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4">
        <Link
          to="/"
          className="p-2 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Link>

        <div className="flex items-center gap-2">
          <h1 className="text-lg font-outfit font-semibold text-white">Escanear</h1>
          {useAI && (
            <span className="px-2 py-0.5 rounded-full bg-eco-green-500/20 border border-eco-green-500/50 text-eco-green-400 text-xs">
              IA Activa
            </span>
          )}
        </div>

        <div className="w-10" /> {/* Spacer */}
      </header>

      {/* Main content */}
      <div className="h-screen pt-16 pb-8 px-4">
        {showCamera ? (
          <CameraView onCapture={handleCapture} isActive={showCamera} />
        ) : (
          <div className="h-full flex flex-col">
            {/* Captured image */}
            <div className="flex-1 relative rounded-3xl overflow-hidden mb-4">
              <img
                src={capturedPhoto}
                alt="Captured"
                className="w-full h-full object-cover"
              />

              {/* Analysis overlay */}
              {isAnalyzing && (
                <div className="absolute inset-0 bg-deep-dark/80 backdrop-blur-sm flex flex-col items-center justify-center">
                  {/* Animated scanner */}
                  <div className="relative w-32 h-32 mb-6">
                    {/* Outer ring */}
                    <div className="absolute inset-0 rounded-full border-4 border-eco-green-500/30" />

                    {/* Spinning ring */}
                    <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-eco-green-500 animate-spin" />

                    {/* Second spinning ring */}
                    <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-ocean-blue-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />

                    {/* Inner glow */}
                    <div className="absolute inset-4 rounded-full bg-eco-green-500/20 animate-pulse" />

                    {/* Center icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl">{useAI ? '🤖' : '🔍'}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-outfit font-semibold text-white mb-2">
                    {useAI ? 'Analizando con IA...' : 'Analizando...'}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 text-center px-8">
                    {analysisStatus}
                  </p>

                  {/* Progress bar */}
                  <div className="w-48 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-eco-green-500 to-ocean-blue-500 transition-all duration-300"
                      style={{ width: `${Math.min(analyzeProgress, 100)}%` }}
                    />
                  </div>
                  <p className="text-eco-green-400 text-sm mt-2">
                    {Math.min(Math.round(analyzeProgress), 100)}%
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            {!isAnalyzing && (
              <div className="flex gap-3">
                <button
                  onClick={retakePhoto}
                  className="flex-1 btn-secondary flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Volver a tomar
                </button>
                <button
                  onClick={() => startAnalysis(capturedPhoto)}
                  className="flex-1 btn-primary flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  {useAI ? 'Analizar con IA' : 'Analizar'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
