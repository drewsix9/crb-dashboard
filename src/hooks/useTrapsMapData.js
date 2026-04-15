// useTrapsMapData Hook
// Fetches all traps from Supabase for map display with location data (lat/lng)

import { useCallback, useEffect, useState } from "react";
import { supabaseTrapsService } from "../services/supabaseServices";

const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes

/**
 * Hook to fetch all trap data for map display
 * Returns traps with location data (latitude, longitude) from Supabase only
 * Filters out traps without location data
 */
export const useTrapsMapData = () => {
  const [traps, setTraps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetch all traps data
   */
  const fetchData = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);

      // Fetch all traps from Supabase
      const allTraps = await supabaseTrapsService.getAll();

      // Filter out traps without location data
      const trapsWithLocation = allTraps.filter(
        (trap) => trap.latitude != null && trap.longitude != null,
      );

      setTraps(trapsWithLocation);
    } catch (err) {
      console.error("Error fetching map data:", err);
      setError(err.message || "Failed to load trap data");
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Initial fetch on mount
   */
  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
    loading,
    error,
    refetch: fetchData,
  };
};
