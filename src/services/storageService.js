/**
 * Servicio de almacenamiento persistente para EcoScan
 * Usa localStorage para persistir datos entre sesiones
 */

const STORAGE_KEYS = {
  STATS: "ecoscan_stats",
  HISTORY: "ecoscan_history",
  SETTINGS: "ecoscan_settings",
};

// Estadísticas iniciales
const DEFAULT_STATS = {
  co2Saved: 0,
  recycledItems: 0,
  recycleRate: 0,
  energySaved: 0,
  waterSaved: 0,
  treesEquivalent: 0,
  totalScans: 0,
  // Contadores por categoría
  byCategory: {
    plastico: 0,
    metal: 0,
    papel: 0,
    vidrio: 0,
    organico: 0,
    otros: 0,
  },
  // Contadores por contenedor
  byContainer: {
    amarillo: 0,
    azul: 0,
    verde: 0,
    marron: 0,
    gris: 0,
  },
};

class StorageService {
  /**
   * Obtiene las estadísticas guardadas
   */
  getStats() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.STATS);
      if (stored) {
        return { ...DEFAULT_STATS, ...JSON.parse(stored) };
      }
      return { ...DEFAULT_STATS };
    } catch (error) {
      console.error("Error loading stats:", error);
      return { ...DEFAULT_STATS };
    }
  }

  /**
   * Guarda las estadísticas
   */
  saveStats(stats) {
    try {
      localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
      return true;
    } catch (error) {
      console.error("Error saving stats:", error);
      return false;
    }
  }

  /**
   * Actualiza las estadísticas con un nuevo item reciclado
   */
  addRecycledItem(item) {
    const stats = this.getStats();

    // Incrementar contadores principales
    stats.recycledItems += 1;
    stats.totalScans += 1;
    stats.co2Saved = parseFloat(
      (stats.co2Saved + (item.co2Impact || 0.05)).toFixed(2)
    );
    stats.energySaved = parseFloat(
      (stats.energySaved + (item.energyImpact || 0.3)).toFixed(2)
    );
    stats.waterSaved = parseFloat(
      (stats.waterSaved + (item.waterImpact || 1)).toFixed(2)
    );
    stats.treesEquivalent = parseFloat(
      (stats.treesEquivalent + 0.01).toFixed(3)
    );

    // Calcular tasa de reciclaje (items reciclables vs total)
    const recyclableContainers = ["amarillo", "azul", "verde", "marron"];
    const container = item.container?.toLowerCase() || "gris";
    const isRecyclable = recyclableContainers.includes(container);

    if (isRecyclable) {
      const recyclableItems =
        stats.recycledItems - (stats.byContainer?.gris || 0);
      stats.recycleRate = Math.round(
        (recyclableItems / stats.recycledItems) * 100
      );
    }

    // Actualizar contadores por categoría
    const category = item.category?.toLowerCase() || "otros";
    if (!stats.byCategory) stats.byCategory = { ...DEFAULT_STATS.byCategory };
    stats.byCategory[category] = (stats.byCategory[category] || 0) + 1;

    // Actualizar contadores por contenedor
    if (!stats.byContainer)
      stats.byContainer = { ...DEFAULT_STATS.byContainer };
    stats.byContainer[container] = (stats.byContainer[container] || 0) + 1;

    this.saveStats(stats);
    return stats;
  }

  /**
   * Obtiene el historial de escaneos
   */
  getHistory() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.HISTORY);
      if (stored) {
        return JSON.parse(stored);
      }
      return [];
    } catch (error) {
      console.error("Error loading history:", error);
      return [];
    }
  }

  /**
   * Guarda el historial de escaneos
   */
  saveHistory(history) {
    try {
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
      return true;
    } catch (error) {
      console.error("Error saving history:", error);
      return false;
    }
  }

  /**
   * Añade un item al historial
   */
  addToHistory(item) {
    const history = this.getHistory();

    // Crear entrada de historial
    const historyEntry = {
      id: `scan_${Date.now()}`,
      name: item.name,
      category: item.category,
      container: item.container,
      containerName: item.containerName,
      icon: item.icon,
      co2Impact: item.co2Impact,
      energyImpact: item.energyImpact,
      waterImpact: item.waterImpact,
      confidence: item.confidence,
      timestamp: new Date().toISOString(),
    };

    // Añadir al inicio y mantener máximo 50 items
    const updatedHistory = [historyEntry, ...history].slice(0, 50);
    this.saveHistory(updatedHistory);

    return updatedHistory;
  }

  /**
   * Obtiene configuraciones guardadas
   */
  getSettings() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (stored) {
        return JSON.parse(stored);
      }
      return {
        useAI: true,
        notifications: true,
        darkMode: true,
      };
    } catch (error) {
      console.error("Error loading settings:", error);
      return { useAI: true, notifications: true, darkMode: true };
    }
  }

  /**
   * Guarda configuraciones
   */
  saveSettings(settings) {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
      return true;
    } catch (error) {
      console.error("Error saving settings:", error);
      return false;
    }
  }

  /**
   * Resetea todas las estadísticas
   */
  resetStats() {
    this.saveStats({ ...DEFAULT_STATS });
    return { ...DEFAULT_STATS };
  }

  /**
   * Limpia el historial
   */
  clearHistory() {
    this.saveHistory([]);
    return [];
  }

  /**
   * Limpia todos los datos
   */
  clearAll() {
    localStorage.removeItem(STORAGE_KEYS.STATS);
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
  }

  /**
   * Exporta todos los datos como JSON
   */
  exportData() {
    return {
      stats: this.getStats(),
      history: this.getHistory(),
      settings: this.getSettings(),
      exportedAt: new Date().toISOString(),
    };
  }

  /**
   * Importa datos desde JSON
   */
  importData(data) {
    try {
      if (data.stats) this.saveStats(data.stats);
      if (data.history) this.saveHistory(data.history);
      if (data.settings) this.saveSettings(data.settings);
      return true;
    } catch (error) {
      console.error("Error importing data:", error);
      return false;
    }
  }
}

// Exportar instancia singleton
export const storageService = new StorageService();
export default StorageService;
