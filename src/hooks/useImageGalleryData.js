// useImageGalleryData Hook
// Fetches and manages image gallery data with hybrid mock/live mode support

import { useCallback, useEffect, useState } from "react";
import { useDataMode } from "../contexts/DataModeContext";
import { createImagesService } from "../services/dataAdapter";
import { mockTraps } from "../services/mockData/traps.mock";
import { supabaseTrapsService } from "../services/supabaseServices";

const REFRESH_INTERVAL = 10 * 60 * 1000; // 10 minutes

/**
 * Hook to fetch gallery data (images with detection results + trap list)
 * Supports both mock and live Supabase modes with caching
 */
export const useImageGalleryData = () => {
  const { mode } = useDataMode();
  const [images, setImages] = useState([]);
  const [traps, setTraps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetch all data
   */
  const fetchData = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);

      const imagesService = createImagesService(mode);
      const trapsService =
        mode === "live"
          ? supabaseTrapsService
          : { getAll: async () => mockTraps };

      // Fetch images and traps in parallel
      const [allImages, allTraps] = await Promise.all([
        imagesService.getAll ? imagesService.getAll() : imagesService.getAll(),
        trapsService.getAll(),
      ]);

      setImages(allImages || []);
      setTraps(allTraps || []);
    } catch (err) {
      console.error("Error fetching gallery data:", err);
      setError(err.message || "Failed to load gallery data");
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

  /**
   * Extract available genders from images
   */
  const genders = Array.from(
    new Set(
      images
        .map((img) => img.metadata?.gender || img.metadata?.gender)
        .filter((g) => g && g !== "unknown"),
    ),
  );

  return {
    images,
    traps,
    genders,
    loading,
    error,
    refetch: fetchData,
  };
};
