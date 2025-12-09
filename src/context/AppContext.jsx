import { createContext, useContext, useEffect, useState } from 'react'
import { storageService } from '../services/storageService'

const AppContext = createContext()

export function useApp() {
  return useContext(AppContext)
}

export function AppProvider({ children }) {
  // Cargar estadísticas desde localStorage
  const [stats, setStats] = useState(() => storageService.getStats())

  // Cargar historial desde localStorage
  const [scanHistory, setScanHistory] = useState(() => storageService.getHistory())

  // Resultado del último escaneo
  const [lastScanResult, setLastScanResult] = useState(null)

  // Imagen capturada
  const [capturedImage, setCapturedImage] = useState(null)

  // Estado de carga del análisis
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // Sincronizar estadísticas con localStorage cuando cambien
  useEffect(() => {
    storageService.saveStats(stats)
  }, [stats])

  // Sincronizar historial con localStorage cuando cambie
  useEffect(() => {
    storageService.saveHistory(scanHistory)
  }, [scanHistory])

  // Añadir item reciclado y actualizar estadísticas
  const addRecycledItem = (item) => {
    // Actualizar estadísticas
    const newStats = storageService.addRecycledItem(item)
    setStats(newStats)

    // Actualizar historial
    const newHistory = storageService.addToHistory(item)
    setScanHistory(newHistory)
  }

  // Guardar resultado de escaneo
  const saveScanResult = (result) => {
    setLastScanResult(result)
  }

  // Limpiar imagen capturada
  const clearCapturedImage = () => {
    setCapturedImage(null)
  }

  // Resetear estadísticas
  const resetStats = () => {
    const newStats = storageService.resetStats()
    setStats(newStats)
  }

  // Limpiar historial
  const clearHistory = () => {
    storageService.clearHistory()
    setScanHistory([])
  }

  // Exportar todos los datos
  const exportData = () => {
    return storageService.exportData()
  }

  // Importar datos
  const importData = (data) => {
    const success = storageService.importData(data)
    if (success) {
      setStats(storageService.getStats())
      setScanHistory(storageService.getHistory())
    }
    return success
  }

  const value = {
    stats,
    scanHistory,
    lastScanResult,
    capturedImage,
    isAnalyzing,
    setCapturedImage,
    clearCapturedImage,
    setIsAnalyzing,
    addRecycledItem,
    saveScanResult,
    resetStats,
    clearHistory,
    exportData,
    importData,
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}
