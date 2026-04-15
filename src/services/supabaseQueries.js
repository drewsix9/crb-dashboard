// Supabase Queries
// All database queries for traps, images, and detection results

import { supabase } from "../supabase";

/**
 * Fetch all traps from the database
 */
export const getTrapsFromDB = async () => {
  try {
    const { data, error } = await supabase
      .from("traps")
      .select("*")
      .order("trap_id", { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching traps:", error);
    throw error;
  }
};

/**
 * Fetch a single trap by ID or trap_id
 */
export const getTrapFromDB = async (trapId) => {
  try {
    const { data, error } = await supabase
      .from("traps")
      .select("*")
      .or(`id.eq.${trapId},trap_id.eq.${trapId}`)
      .single();

    if (error && error.code !== "PGRST116") throw error; // PGRST116 = no rows returned
    return data || null;
  } catch (error) {
    console.error("Error fetching trap:", error);
    throw error;
  }
};

/**
 * Fetch traps by status
 */
export const getTrapsByStatusFromDB = async (status) => {
  try {
    const { data, error } = await supabase
      .from("traps")
      .select("*")
      .eq("status", status)
      .order("trap_id", { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error(`Error fetching traps by status ${status}:`, error);
    throw error;
  }
};

/**
 * Fetch image uploads with detection results (LEFT JOIN)
 * Optionally filter by trap_id or date range
 */
export const getImageUploadsWithDetection = async (filters = {}) => {
  try {
    const { trap_id, start_date, end_date, limit = 1000, offset = 0 } = filters;

    let query = supabase
      .from("image_uploads")
      .select(
        `
        id,
        trap_id,
        captured_at,
        gps_lat,
        gps_lon,
        ldr_value,
        is_fallen,
        battery_voltage,
        image_path,
        image_filename,
        image_size_bytes,
        content_type,
        upload_status,
        solar_voltage,
        created_at,
        detection_results(
          id,
          beetle_count,
          male_count,
          female_count,
          unknown_count,
          classification_label,
          confidence_score,
          model_name,
          model_version,
          inference_time_ms,
          processed_at,
          remarks
        )
      `,
      )
      .order("captured_at", { ascending: false });

    if (trap_id) {
      query = query.eq("trap_id", trap_id);
    }

    if (start_date) {
      query = query.gte("captured_at", start_date);
    }

    if (end_date) {
      query = query.lte("captured_at", end_date);
    }

    query = query.range(offset, offset + limit - 1);

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching image uploads with detection:", error);
    throw error;
  }
};

/**
 * Fetch detection result for a specific image
 */
export const getDetectionByImageId = async (imageId) => {
  try {
    const { data, error } = await supabase
      .from("detection_results")
      .select("*")
      .eq("image_upload_id", imageId)
      .order("processed_at", { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== "PGRST116") throw error;
    return data || null;
  } catch (error) {
    console.error("Error fetching detection result:", error);
    throw error;
  }
};

/**
 * Get aggregated statistics from detection results
 * Grouped by gender and optionally by trap_id or date
 */
export const getTrapStatisticsFromDB = async (filters = {}) => {
  try {
    const { trap_id, start_date, end_date } = filters;

    // Fetch all detection results for aggregation
    let query = supabase
      .from("detection_results")
      .select(
        "beetle_count, male_count, female_count, unknown_count, processed_at, image_uploads(trap_id)",
      );

    if (start_date) {
      query = query.gte("processed_at", start_date);
    }

    if (end_date) {
      query = query.lte("processed_at", end_date);
    }

    const { data, error } = await query;

    if (error) throw error;

    // Aggregate statistics
    const stats = {
      total_beetles: 0,
      total_male: 0,
      total_female: 0,
      total_unknown: 0,
      detection_count: 0,
      traps_active: 0,
    };

    if (data && Array.isArray(data)) {
      data.forEach((detection) => {
        stats.total_beetles += detection.beetle_count || 0;
        stats.total_male += detection.male_count || 0;
        stats.total_female += detection.female_count || 0;
        stats.total_unknown += detection.unknown_count || 0;
        stats.detection_count += 1;
      });
    }

    // Calculate percentages
    if (stats.total_beetles > 0) {
      stats.male_percentage = Math.round(
        (stats.total_male / stats.total_beetles) * 100,
      );
      stats.female_percentage = Math.round(
        (stats.total_female / stats.total_beetles) * 100,
      );
    } else {
      stats.male_percentage = 0;
      stats.female_percentage = 0;
    }

    return stats;
  } catch (error) {
    console.error("Error fetching trap statistics:", error);
    throw error;
  }
};

/**
 * Get chart data: daily detections over 30 days
 */
export const getChartDataFromDB = async (days = 30) => {
  try {
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - days * 24 * 60 * 60 * 1000);

    const { data, error } = await supabase
      .from("detection_results")
      .select(
        "beetle_count, male_count, female_count, unknown_count, processed_at",
      )
      .gte("processed_at", startDate.toISOString())
      .lte("processed_at", endDate.toISOString())
      .order("processed_at", { ascending: true });

    if (error) throw error;

    // Aggregate by date
    const dailyData = {};
    (data || []).forEach((detection) => {
      const date = new Date(detection.processed_at).toISOString().split("T")[0];
      if (!dailyData[date]) {
        dailyData[date] = {
          date,
          beetles: 0,
          male: 0,
          female: 0,
          unknown: 0,
          count: 0,
        };
      }
      dailyData[date].beetles += detection.beetle_count || 0;
      dailyData[date].male += detection.male_count || 0;
      dailyData[date].female += detection.female_count || 0;
      dailyData[date].unknown += detection.unknown_count || 0;
      dailyData[date].count += 1;
    });

    const chartData = Object.values(dailyData);
    return {
      daily: chartData,
      weekly: aggregateToWeekly(chartData),
      trapPerformance: await getTrapPerformanceData(),
    };
  } catch (error) {
    console.error("Error fetching chart data:", error);
    throw error;
  }
};

/**
 * Get trap performance data: beetle detections per trap
 */
export const getTrapPerformanceData = async () => {
  try {
    const { data: detections, error: detectError } = await supabase
      .from("detection_results")
      .select("beetle_count, male_count, female_count, image_uploads(trap_id)");

    if (detectError) throw detectError;

    // Get trap names
    const { data: traps, error: trapError } = await supabase
      .from("traps")
      .select("trap_id, trap_name");

    if (trapError) throw trapError;

    // Aggregate detections by trap
    const trapMap = {};
    if (traps) {
      traps.forEach((trap) => {
        trapMap[trap.trap_id] = {
          trap_id: trap.trap_id,
          trap_name: trap.trap_name,
          beetles: 0,
          male: 0,
          female: 0,
          detections: 0,
        };
      });
    }

    if (detections) {
      detections.forEach((detection) => {
        const trapId = detection.image_uploads?.trap_id;
        if (trapId && trapMap[trapId]) {
          trapMap[trapId].beetles += detection.beetle_count || 0;
          trapMap[trapId].male += detection.male_count || 0;
          trapMap[trapId].female += detection.female_count || 0;
          trapMap[trapId].detections += 1;
        }
      });
    }

    return Object.values(trapMap)
      .sort((a, b) => b.beetles - a.beetles)
      .slice(0, 10); // Top 10 traps by beetle count
  } catch (error) {
    console.error("Error fetching trap performance data:", error);
    throw error;
  }
};

/**
 * Get public URL for image in trap-images bucket
 * Uses Supabase's built-in getPublicUrl for public buckets
 */
export const getImageUrl = (trapId, imageFilename) => {
  const path = `${trapId}/${imageFilename}`;
  const { data } = supabase.storage.from("trap-images").getPublicUrl(path);
  return data?.publicUrl || "";
};

/**
 * Helper: Aggregate daily chart data to weekly
 */
const aggregateToWeekly = (dailyData) => {
  const weeklyData = {};
  dailyData.forEach((day) => {
    const date = new Date(day.date);
    const weekStart = new Date(date);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay()); // Start of week (Sunday)
    const weekKey = weekStart.toISOString().split("T")[0];

    if (!weeklyData[weekKey]) {
      weeklyData[weekKey] = {
        weekStart: weekKey,
        beetles: 0,
        male: 0,
        female: 0,
        unknown: 0,
        count: 0,
      };
    }

    weeklyData[weekKey].beetles += day.beetles;
    weeklyData[weekKey].male += day.male;
    weeklyData[weekKey].female += day.female;
    weeklyData[weekKey].unknown += day.unknown;
    weeklyData[weekKey].count += day.count;
  });

  return Object.values(weeklyData);
};
