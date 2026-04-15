// useHomePageData Hook
// Fetches and manages homepage data with hybrid mock/live mode support

import { useCallback, useEffect, useState } from "react";
import { useDataMode } from "../contexts/DataModeContext";
import {
  createStatisticsService,
  createTrapsService,
} from "../services/dataAdapter";

const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes

/**
 * Hook to fetch HomePage data (traps, statistics, chart data)
 * Supports both mock and live Supabase modes with caching
 */
export const useHomePageData = () => {
  const { mode } = useDataMode();
  const [traps, setTraps] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetch all data
   */
  const fetchData = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);

      const trapsService = createTrapsService(mode);
      const statsService = createStatisticsService(mode);

      // Fetch traps and statistics in parallel
      const [activeTraps, stats, charts] = await Promise.all([
        trapsService.getByStatus
          ? trapsService.getByStatus("active")
          : trapsService.getAll(),
        statsService.getTrapStatistics(),
        statsService.getChartData
          ? statsService.getChartData()
          : Promise.resolve(null),
      ]);

      // Slice to top 4 for display
      setTraps(activeTraps.slice(0, 4));
      setStatistics(stats);
      setChartData(charts);
    } catch (err) {
      console.error("Error fetching homepage data:", err);
      setError(err.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [mode]);

  /**
   * Initial fetch on mount
   */
  useEffect(() => {
    fetchData();
  }, [mode, fetchData]);

  /**
   * Set up periodic refresh
   */
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [fetchData]);

  return {
    traps,
    statistics,
    chartData,
    loading,
    error,
    refetch: fetchData,
  };
};
