// MapMarker Component
// Renders a single trap marker on the Leaflet map with status-based color

import L from "leaflet";
import PropTypes from "prop-types";
import { Marker, Popup } from "react-leaflet";
import { MarkerPopupContent } from "./MarkerPopupContent";

/**
 * Status-to-color mapping for trap markers
 * Maps to binary status: Active (green) or Inactive (red)
 */
const STATUS_COLORS = {
  ACTIVE: "#4ade80", // Green - active trap
  OFFLINE: "#ef4444", // Red - inactive trap
  MAINTENANCE: "#ef4444", // Red - inactive trap
  FALLEN: "#ef4444", // Red - inactive trap
};

/**
 * Create a custom Leaflet icon with the specified color
 */
const createColoredIcon = (color) => {
  const svgIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" 
         stroke="white" stroke-width="2" width="30" height="30">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
      <circle cx="12" cy="9" r="2.5" fill="white"/>
    </svg>
  `;

  return L.icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(svgIcon)}`,
    iconSize: [30, 40],
    iconAnchor: [15, 40],
    popupAnchor: [0, -40],
    className: "custom-marker",
  });
};

/**
 * MapMarker component
 * Renders a trap location marker on the map with custom color based on status
 *
 * @param {Object} trap - Trap object with location and status data
 */
export const MapMarker = ({ trap }) => {
  if (!trap || trap.latitude == null || trap.longitude == null) {
    return null;
  }

  const { latitude, longitude, status } = trap;
  const markerColor = STATUS_COLORS[status] || STATUS_COLORS.OFFLINE;
  const icon = createColoredIcon(markerColor);

  return (
    <Marker position={[latitude, longitude]} icon={icon}>
      <Popup closeButton={true}>
        <MarkerPopupContent trap={trap} />
      </Popup>
    </Marker>
  );
};

MapMarker.propTypes = {
  trap: PropTypes.shape({
    id: PropTypes.string,
    trap_id: PropTypes.string,
    name: PropTypes.string,
    status: PropTypes.oneOf(["ACTIVE", "OFFLINE", "MAINTENANCE", "FALLEN"]),
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    battery_level: PropTypes.number,
  }).isRequired,
};

export default MapMarker;
