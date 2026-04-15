// Data Adapter Layer
// Provides factories for creating data services that can switch between mock and Supabase modes

import {
  supabaseImagesService,
  supabaseStatisticsService,
  supabaseTrapsService,
} from "./supabaseServices";

/**
 * Factory function to create a traps service based on mode
 * @param {string} mode - 'mock' or 'live'
 * @returns {object} Service with methods: getAll(), getById(), getByStatus(), getStatistics()
 */
export const createTrapsService = (mode = "mock") => {
  if (mode === "live") {
    return supabaseTrapsService;
  }
  return mockTrapsService;
};

/**
 * Factory function to create an images service based on mode
 * @param {string} mode - 'mock' or 'live'
 * @returns {object} Service with methods: getAll(), getById(), getByTrapId(), getByDateRange()
 */
export const createImagesService = (mode = "mock") => {
  if (mode === "live") {
    return supabaseImagesService;
  }
  return mockImagesService;
};

/**
 * Factory function to create a statistics service based on mode
 * @param {string} mode - 'mock' or 'live'
 * @returns {object} Service with methods: getTrapStatistics(), getChartData()
 */
export const createStatisticsService = (mode = "mock") => {
  if (mode === "live") {
    return supabaseStatisticsService;
  }
  return mockStatisticsService;
};

// Mock services wrappers that expose methods with consistent interface
export const mockTrapsService = {
  getAll: async () => {
    const { mockTraps } = await import("./mockData/traps.mock");
    return Promise.resolve(mockTraps);
  },
  getById: async (id) => {
    const { getTrapById } = await import("./mockData/traps.mock");
    return Promise.resolve(getTrapById(id));
  },
  getByStatus: async (status) => {
    const { getTrapsByStatus } = await import("./mockData/traps.mock");
    return Promise.resolve(getTrapsByStatus(status));
  },
  getStatistics: async () => {
    const { getTrapStatistics } = await import("./mockData/traps.mock");
    return Promise.resolve(getTrapStatistics());
  },
};

export const mockImagesService = {
  getAll: async () => {
    const { mockImages } = await import("./mockData/images.mock");
    return Promise.resolve(mockImages);
  },
  getById: async (id) => {
    const { getImageById } = await import("./mockData/images.mock");
    return Promise.resolve(getImageById(id));
  },
  getByTrapId: async (trapId) => {
    const { getImagesByTrapId } = await import("./mockData/images.mock");
    return Promise.resolve(getImagesByTrapId(trapId));
  },
  getByDateRange: async (startDate, endDate) => {
    const { getImagesByDateRange } = await import("./mockData/images.mock");
    return Promise.resolve(getImagesByDateRange(startDate, endDate));
  },
};

export const mockStatisticsService = {
  getTrapStatistics: async () => {
    const { getMockStatistics } = await import("./mockData/statistics.mock");
    return Promise.resolve(getMockStatistics());
  },
  getChartData: async () => {
    const { getMockChartData } = await import("./mockData/statistics.mock");
    return Promise.resolve(getMockChartData());
  },
};
