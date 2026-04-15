// Supabase Services
// Wrapped Supabase queries with standardized interface matching mock services

import {
  getChartDataFromDB,
  getImageUploadsWithDetection,
  getTrapFromDB,
  getTrapPerformanceData,
  getTrapsByStatusFromDB,
  getTrapsFromDB,
  getTrapStatisticsFromDB,
} from "./supabaseQueries";

import {
  normalizeImageUploadsWithDetection,
  normalizeStatistics,
  normalizeTrapData,
} from "./dataTransformers";

// Cache configuration
const CACHE = {
  traps: { data: null, timestamp: null, ttl: 5 * 60 * 1000 }, // 5 min
  statistics: { data: null, timestamp: null, ttl: 5 * 60 * 1000 }, // 5 min
  images: { data: null, timestamp: null, ttl: 10 * 60 * 1000 }, // 10 min
  chartData: { data: null, timestamp: null, ttl: 15 * 60 * 1000 }, // 15 min
};

/**
 * Check if cache entry is still valid
 */
const isCacheValid = (cacheEntry) => {
  if (!cacheEntry.data || !cacheEntry.timestamp) return false;
  return Date.now() - cacheEntry.timestamp < cacheEntry.ttl;
};

/**
 * Traps service for Supabase
 */
export const supabaseTrapsService = {
  /**
   * Get all traps with caching
   */
  getAll: async () => {
    if (isCacheValid(CACHE.traps)) {
      return CACHE.traps.data;
    }

    try {
      const rawTraps = await getTrapsFromDB();
      const normalizedTraps = rawTraps.map(normalizeTrapData);
      CACHE.traps.data = normalizedTraps;
      CACHE.traps.timestamp = Date.now();
      return normalizedTraps;
    } catch (error) {
      console.error("Failed to fetch traps:", error);
      // Fallback: clear cache if error
      CACHE.traps.data = null;
      CACHE.traps.timestamp = null;
      throw error;
    }
  },

  /**
   * Get trap by ID
   */
  getById: async (id) => {
    try {
      const rawTrap = await getTrapFromDB(id);
      return rawTrap ? normalizeTrapData(rawTrap) : null;
    } catch (error) {
      console.error(`Failed to fetch trap ${id}:`, error);
      throw error;
    }
  },

  /**
   * Get traps by status with caching
   */
  getByStatus: async (status) => {
    try {
      const rawTraps = await getTrapsByStatusFromDB(status);
      const normalizedTraps = rawTraps.map(normalizeTrapData);
      return normalizedTraps;
    } catch (error) {
      console.error(`Failed to fetch traps by status ${status}:`, error);
      throw error;
    }
  },

  /**
   * Get trap statistics
   */
  getStatistics: async () => {
    if (isCacheValid(CACHE.statistics)) {
      return CACHE.statistics.data;
    }

    try {
      const rawStats = await getTrapStatisticsFromDB();
      const normalizedStats = normalizeStatistics(rawStats);
      CACHE.statistics.data = normalizedStats;
      CACHE.statistics.timestamp = Date.now();
      return normalizedStats;
    } catch (error) {
      console.error("Failed to fetch trap statistics:", error);
      CACHE.statistics.data = null;
      CACHE.statistics.timestamp = null;
      throw error;
    }
  },

  /**
   * Invalidate trap cache (call after updates)
   */
  invalidateCache: () => {
    CACHE.traps.data = null;
    CACHE.traps.timestamp = null;
  },
};

/**
 * Images service for Supabase
 */
export const supabaseImagesService = {
  /**
   * Get all images with detection results
   */
  getAll: async (limit = 1000) => {
    if (isCacheValid(CACHE.images)) {
      return CACHE.images.data;
    }

    try {
      const rawImages = await getImageUploadsWithDetection({ limit });
      const normalizedImages = normalizeImageUploadsWithDetection(rawImages);
      CACHE.images.data = normalizedImages;
      CACHE.images.timestamp = Date.now();
      return normalizedImages;
    } catch (error) {
      console.error("Failed to fetch images:", error);
      CACHE.images.data = null;
      CACHE.images.timestamp = null;
      throw error;
    }
  },

  /**
   * Get image by ID
   */
  getById: async (id) => {
    try {
      // If we have it in cache, return from cache
      if (isCacheValid(CACHE.images) && CACHE.images.data) {
        return CACHE.images.data.find((img) => img.id === id) || null;
      }

      // Otherwise fetch single image
      const rawImages = await getImageUploadsWithDetection({ limit: 1 });
      const matched = rawImages.find((img) => img.id === id);
      if (!matched) return null;

      const normalized = normalizeImageUploadsWithDetection([matched]);
      return normalized[0] || null;
    } catch (error) {
      console.error(`Failed to fetch image ${id}:`, error);
      throw error;
    }
  },

  /**
   * Get images by trap ID
   */
  getByTrapId: async (trapId, limit = 1000) => {
    try {
      const rawImages = await getImageUploadsWithDetection({
        trap_id: trapId,
        limit,
      });
      return normalizeImageUploadsWithDetection(rawImages);
    } catch (error) {
      console.error(`Failed to fetch images for trap ${trapId}:`, error);
      throw error;
    }
  },

  /**
   * Get images by date range
   */
  getByDateRange: async (startDate, endDate, limit = 1000) => {
    try {
      const rawImages = await getImageUploadsWithDetection({
        start_date: startDate || undefined,
        end_date: endDate || undefined,
        limit,
      });
      return normalizeImageUploadsWithDetection(rawImages);
    } catch (error) {
      console.error("Failed to fetch images by date range:", error);
      throw error;
    }
  },

  /**
   * Invalidate image cache (call after updates)
   */
  invalidateCache: () => {
    CACHE.images.data = null;
    CACHE.images.timestamp = null;
  },
};

/**
 * Statistics service for Supabase
 */
export const supabaseStatisticsService = {
  /**
   * Get trap statistics
   */
  getTrapStatistics: async () => {
    if (isCacheValid(CACHE.statistics)) {
      return CACHE.statistics.data;
    }

    try {
      const rawStats = await getTrapStatisticsFromDB();
      const normalizedStats = normalizeStatistics(rawStats);
      CACHE.statistics.data = normalizedStats;
      CACHE.statistics.timestamp = Date.now();
      return normalizedStats;
    } catch (error) {
      console.error("Failed to fetch trap statistics:", error);
      CACHE.statistics.data = null;
      CACHE.statistics.timestamp = null;
      throw error;
    }
  },

  /**
   * Get chart data for dashboard
   */
  getChartData: async (days = 30) => {
    if (isCacheValid(CACHE.chartData)) {
      return CACHE.chartData.data;
    }

    try {
      const chartData = await getChartDataFromDB(days);
      CACHE.chartData.data = chartData;
      CACHE.chartData.timestamp = Date.now();
      return chartData;
    } catch (error) {
      console.error("Failed to fetch chart data:", error);
      CACHE.chartData.data = null;
      CACHE.chartData.timestamp = null;
      throw error;
    }
  },

  /**
   * Get trap performance metrics
   */
  getTrapPerformance: async () => {
    try {
      const performance = await getTrapPerformanceData();
      return performance;
    } catch (error) {
      console.error("Failed to fetch trap performance data:", error);
      throw error;
    }
  },

  /**
   * Invalidate cache
   */
  invalidateCache: () => {
    CACHE.statistics.data = null;
    CACHE.statistics.timestamp = null;
    CACHE.chartData.data = null;
    CACHE.chartData.timestamp = null;
  },
};
