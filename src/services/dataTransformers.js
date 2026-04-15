// Data Transformers
// Convert Supabase responses to match existing mock data structure

import { TRAP_STATUS } from "../utils/constants";
import { getImageUrl } from "./supabaseQueries";

/**
 * Transform Supabase trap row to mock trap shape
 * DB trap → mock trap (with normalized fields and computed properties)
 */
export const normalizeTrapData = (trapRow) => {
  if (!trapRow) return null;

  // Map DB status to normalized status
  const statusMap = {
    active: TRAP_STATUS.ACTIVE,
    offline: TRAP_STATUS.OFFLINE,
    maintenance: TRAP_STATUS.MAINTENANCE,
    fallen: TRAP_STATUS.FALLEN,
  };

  const normalizedStatus = statusMap[trapRow.status] || TRAP_STATUS.OFFLINE;

  // Convert battery voltage to percentage (rough estimate: 0-4.2V → 0-100%)
  const batteryLevel = trapRow.battery_voltage
    ? Math.min(100, Math.round((trapRow.battery_voltage / 4.2) * 100))
    : 0;

  return {
    id: trapRow.id,
    trap_id: trapRow.trap_id,
    name: trapRow.trap_name || trapRow.trap_id,
    status: normalizedStatus,
    latitude: trapRow.latitude,
    longitude: trapRow.longitude,
    installed_date: trapRow.installed_at
      ? new Date(trapRow.installed_at).toISOString().split("T")[0]
      : null,
    last_maintenance: trapRow.updated_at
      ? new Date(trapRow.updated_at).toISOString().split("T")[0]
      : null,
    last_update: trapRow.last_voltage_update || trapRow.created_at,
    battery_level: batteryLevel,
    solar_voltage: trapRow.solar_voltage,
    notes: trapRow.notes,
    // Add metadata for newer data
    created_at: trapRow.created_at,
    updated_at: trapRow.updated_at,
  };
};

/**
 * Transform image_upload + detection_result to mock image shape
 * Enriched with detection metadata
 */
export const normalizeImageUploadToImage = (
  imageUpload,
  detectionResult = null,
) => {
  if (!imageUpload) return null;

  const imageUrl = getImageUrl(imageUpload.trap_id, imageUpload.image_filename);

  const normalized = {
    id: imageUpload.id,
    trap_id: imageUpload.trap_id,
    capture_id: imageUpload.id, // Use image_upload id as capture_id
    image_url: imageUrl,
    thumbnail_url: imageUrl, // Same as image_url (could be different path if thumbnails exist)
    taken_at: imageUpload.captured_at,
    uploaded_at: imageUpload.created_at,
    metadata: {
      gender: null, // Will be populated from detection results
      size: imageUpload.image_size_bytes
        ? `${Math.round(imageUpload.image_size_bytes / 1024)}KB`
        : "Unknown",
      resolution: "1920x1080", // Default; could be stored in DB
      camera_id: `CAM-${imageUpload.trap_id}`,
      // Detection metadata
      detection_confidence: detectionResult?.confidence_score || 0,
      model_name: detectionResult?.model_name || "Unknown",
      model_version: detectionResult?.model_version || "Unknown",
      inference_time_ms: detectionResult?.inference_time_ms || 0,
    },
    // Image upload metadata
    image_path: imageUpload.image_path,
    image_filename: imageUpload.image_filename,
    content_type: imageUpload.content_type,
    gps_lat: imageUpload.gps_lat,
    gps_lon: imageUpload.gps_lon,
    ldr_value: imageUpload.ldr_value,
    is_fallen: imageUpload.is_fallen,
    battery_voltage: imageUpload.battery_voltage,
    solar_voltage: imageUpload.solar_voltage,
  };

  // Attach full detection result for detailed view
  if (detectionResult) {
    normalized.detection = {
      id: detectionResult.id,
      beetle_count: detectionResult.beetle_count || 0,
      male_count: detectionResult.male_count || 0,
      female_count: detectionResult.female_count || 0,
      unknown_count: detectionResult.unknown_count || 0,
      classification_label: detectionResult.classification_label,
      confidence_score: detectionResult.confidence_score,
      model_name: detectionResult.model_name,
      model_version: detectionResult.model_version,
      inference_time_ms: detectionResult.inference_time_ms,
      processed_at: detectionResult.processed_at,
      remarks: detectionResult.remarks,
    };

    // Infer gender from detection if majority count available
    const { male_count, female_count } = detectionResult;
    if (male_count > female_count) {
      normalized.metadata.gender = "male";
    } else if (female_count > male_count) {
      normalized.metadata.gender = "female";
    } else if (male_count === female_count && male_count > 0) {
      normalized.metadata.gender = "mixed";
    } else {
      normalized.metadata.gender = "unknown";
    }
  }

  return normalized;
};

/**
 * Batch transform image uploads with detection results
 * Handles nested detection_results from LEFT JOIN query
 */
export const normalizeImageUploadsWithDetection = (imageUploads) => {
  if (!Array.isArray(imageUploads)) return [];

  return imageUploads.map((imageUpload) => {
    // Handle nested detection_results array (from LEFT JOIN)
    const detectionResult = Array.isArray(imageUpload.detection_results)
      ? imageUpload.detection_results[0] // Get first/most recent
      : imageUpload.detection_results;

    return normalizeImageUploadToImage(imageUpload, detectionResult);
  });
};

/**
 * Transform detection statistics response to mock statistics format
 */
export const normalizeStatistics = (statsData) => {
  return {
    totalToday: statsData.detection_count || 0,
    maleCRB: statsData.total_male || 0,
    femaleCRB: statsData.total_female || 0,
    totalAllTime: statsData.total_beetles || 0,
    malePercentage: statsData.male_percentage || 0,
    femalePercentage: statsData.female_percentage || 0,
    unknownCount: statsData.total_unknown || 0,
  };
};

/**
 * Transform trap array to get active trap count and list
 */
export const normalizeActiveTrapsList = (traps) => {
  if (!Array.isArray(traps)) return [];

  return traps
    .filter((trap) => trap.status === TRAP_STATUS.ACTIVE)
    .map((trap) => normalizeTrapData(trap))
    .slice(0, 4); // Return top 4 for dashboard display
};
