// TrapsMap Component
// Interactive map displaying all traps with their locations, colors based on status

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { Spinner } from "../../ui/Spinner";
import { MapMarker } from "../MapMarker";

/**
 * Default map center (Philippines - where the trap data is located)
 * Based on mock data coordinates: ~14.59°N, 120.98°E
 */
const DEFAULT_CENTER = [14.5995, 120.9842];
const DEFAULT_ZOOM = 12;

/**
 * Calculate map bounds to fit all trap markers
 */
const calculateBounds = (traps) => {
  if (!traps || traps.length === 0) {
    return null;
  }

  let minLat = traps[0].latitude;
  let maxLat = traps[0].latitude;
  let minLng = traps[0].longitude;
  let maxLng = traps[0].longitude;

  traps.forEach((trap) => {
    if (trap.latitude != null && trap.longitude != null) {
      minLat = Math.min(minLat, trap.latitude);
      maxLat = Math.max(maxLat, trap.latitude);
      minLng = Math.min(minLng, trap.longitude);
      maxLng = Math.max(maxLng, trap.longitude);
    }
  });

  return L.latLngBounds([minLat, minLng], [maxLat, maxLng]);
};

/**
 * Inner component that handles map bounds fitting
 * Must be inside MapContainer to use useMap hook
 */
const MapFitBounds = ({ traps }) => {
  const map = useMap();
  const hasZoomedRef = useRef(false);

  /**
   * Fit map bounds to show all traps when they load
   * Waits for map to be fully initialized before fitting bounds
   */
  useEffect(() => {
    if (!map || traps.length === 0) {
      hasZoomedRef.current = false;
      return;
    }

    // Prevent multiple zoom operations
    if (hasZoomedRef.current) {
      return;
    }

    /**
     * Wait for map to be ready before fitting bounds
     * Uses a small delay and checks if map is initialized
     */
    const fitMapBounds = () => {
      try {
        const bounds = calculateBounds(traps);
        if (bounds && map._size && map._size.x > 0) {
          hasZoomedRef.current = true;
          map.fitBounds(bounds, { padding: [50, 50] });
        } else if (!hasZoomedRef.current) {
          // If map isn't ready yet, try again after a delay
          setTimeout(fitMapBounds, 100);
        }
      } catch (err) {
        console.error("Error fitting map bounds:", err);
      }
    };

    // Use requestAnimationFrame to wait for map rendering
    const animFrameId = requestAnimationFrame(() => {
      setTimeout(fitMapBounds, 50);
    });

    return () => cancelAnimationFrame(animFrameId);
  }, [map, traps]);

  return null;
};

/**
 * TrapsMap component
 * Renders an interactive Leaflet map with all traps as markers
 * Auto-fits the map to show all trap markers with status-based color coding
 * Waits for GPS data to load before rendering the map
 */
export const TrapsMap = ({ traps = [], loading = false, error = null }) => {
  const [isMapReady, setIsMapReady] = useState(false);

  /**
   * Show loading state while data is being fetched
   * Don't render map until data is loaded
   */
  if (loading || !traps.length) {
    if (loading) {
      return (
        <div className="w-full h-96 flex items-center justify-center bg-gray-50 rounded-lg">
          <div className="text-center">
            <Spinner />
            <p className="text-gray-600 mt-2 text-sm">
              Loading trap locations...
            </p>
          </div>
        </div>
      );
    }

    if (traps.length === 0) {
      return (
        <div className="w-full h-96 flex items-center justify-center bg-gray-50 rounded-lg">
          <div className="text-center">
            <p className="text-gray-600 font-semibold">No traps found</p>
            <p className="text-gray-500 text-sm">
              Add traps with location data to display on the map
            </p>
          </div>
        </div>
      );
    }
  }

  if (error) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-gray-50 rounded-lg">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-2">Error loading map</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full h-screen relative rounded-lg overflow-hidden shadow-lg"
      style={{ height: "calc(100vh - 120px)" }}
    >
      <MapContainer
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        className="w-full h-full"
        style={{ zIndex: 0 }}
        onLoad={() => setIsMapReady(true)}
      >
        {/* OpenStreetMap tiles */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          maxZoom={19}
        />

        {/* Fit bounds when traps data is available and map is ready */}
        {isMapReady && traps.length > 0 && <MapFitBounds traps={traps} />}

        {/* Render markers for all traps */}
        {traps.map((trap) => (
          <MapMarker key={trap.id || trap.trap_id} trap={trap} />
        ))}
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-6 left-6 bg-white rounded-lg shadow-lg p-4 z-10 max-w-xs">
        <h3 className="font-semibold text-gray-900 mb-3 text-sm">
          Trap Status Legend
        </h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: "#4ade80" }}
            />
            <span className="text-xs text-gray-700">Active</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: "#ef4444" }}
            />
            <span className="text-xs text-gray-700">Inactive</span>
          </div>
        </div>
      </div>

      {/* Trap count */}
      <div className="absolute top-6 right-6 bg-white rounded-lg shadow-lg px-4 py-2 z-10">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">{traps.length}</span> Traps
        </p>
      </div>
    </div>
  );
};

TrapsMap.propTypes = {
  traps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      trap_id: PropTypes.string,
      name: PropTypes.string,
      status: PropTypes.oneOf(["ACTIVE", "OFFLINE", "MAINTENANCE", "FALLEN"]),
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      battery_level: PropTypes.number,
    }),
  ),
  loading: PropTypes.bool,
  error: PropTypes.string,
};

export default TrapsMap;
