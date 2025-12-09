import { useCallback, useEffect, useRef, useState } from 'react'

export default function CameraView({ onCapture, isActive }) {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const streamRef = useRef(null)
  const [hasCamera, setHasCamera] = useState(true)
  const [isReady, setIsReady] = useState(false)
  const [facingMode, setFacingMode] = useState('environment')

  const startCamera = useCallback(async () => {
    try {
      // Stop existing stream if any
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      })

      streamRef.current = stream

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play()
          setIsReady(true)
        }
      }

      setHasCamera(true)
    } catch (err) {
      console.error('Error accessing camera:', err)
      setHasCamera(false)
    }
  }, [facingMode])

  useEffect(() => {
    if (isActive) {
      startCamera()
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
    }
  }, [isActive, startCamera])

  const switchCamera = () => {
    setFacingMode(prev => prev === 'environment' ? 'user' : 'environment')
  }

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    context.drawImage(video, 0, 0)

    const imageData = canvas.toDataURL('image/jpeg', 0.8)
    onCapture(imageData)
  }

  if (!hasCamera) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-dark-surface rounded-3xl p-8">
        <div className="text-6xl mb-4">📷</div>
        <h3 className="text-lg font-semibold text-white mb-2">Cámara no disponible</h3>
        <p className="text-gray-400 text-center text-sm">
          Por favor, permite el acceso a la cámara o usa un dispositivo con cámara.
        </p>
        <button
          onClick={startCamera}
          className="mt-4 btn-secondary"
        >
          Reintentar
        </button>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full overflow-hidden rounded-3xl">
      {/* Video feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover"
      />

      {/* Hidden canvas for capture */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Overlay gradient */}
      <div className="absolute inset-0 camera-overlay pointer-events-none" />

      {/* Scan frame guide */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-64 h-64">
          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-eco-green-400 rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-eco-green-400 rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-eco-green-400 rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-eco-green-400 rounded-br-lg" />

          {/* Scan line animation */}
          {isReady && (
            <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-eco-green-400 to-transparent scan-line" />
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute top-4 left-0 right-0 text-center">
        <p className="text-white/80 text-sm bg-black/30 backdrop-blur-sm inline-block px-4 py-2 rounded-full">
          Centra el objeto en el marco
        </p>
      </div>

      {/* Switch camera button */}
      <button
        onClick={switchCamera}
        className="absolute top-4 right-4 p-3 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-black/50 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>

      {/* Capture button */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <button
          onClick={capturePhoto}
          disabled={!isReady}
          className={`
            relative w-20 h-20 rounded-full transition-all duration-300
            ${isReady
              ? 'bg-white hover:scale-110 active:scale-95'
              : 'bg-gray-500 cursor-not-allowed'
            }
          `}
        >
          {/* Inner circle */}
          <span className="absolute inset-2 rounded-full border-4 border-deep-dark" />

          {/* Pulse effect when ready */}
          {isReady && (
            <span className="absolute inset-0 rounded-full bg-white/50 pulse-ring" />
          )}
        </button>
      </div>
    </div>
  )
}
