// MarkerPopupContent Component
// Displays trap information in a popup when a marker is clicked on the map

import { Battery } from "lucide-react";
import PropTypes from "prop-types";

/**
 * Status-to-color mapping for trap status badges
 */
const STATUS_COLORS = {
  ACTIVE: "bg-green-100 text-green-800 border-green-300",
  OFFLINE: "bg-red-100 text-red-800 border-red-300",
  MAINTENANCE: "bg-orange-100 text-orange-800 border-orange-300",
  FALLEN: "bg-gray-100 text-gray-800 border-gray-300",
};

/**
 * Gets the appropriate CSS classes for a trap status badge
 */
const getStatusBadgeClasses = (status) => {
  return STATUS_COLORS[status] || STATUS_COLORS.OFFLINE;
};

/**
 * MarkerPopupContent component
 * Displays trap details in a compact, readable format for map popups
 */
export const MarkerPopupContent = ({ trap }) => {
  if (!trap) return null;

  const { name, trap_id, status, battery_level } = trap;
  const batteryPercentage = battery_level ?? 0;

  return (
    <div className="p-3 min-w-48 space-y-2">
      {/* Trap Name */}
      <div className="font-semibold text-gray-900 text-sm">
        {name || "Unknown Trap"}
      </div>

      {/* Trap ID */}
      <div className="text-xs text-gray-600">
        <span className="font-medium">ID:</span> {trap_id || "N/A"}
      </div>

      {/* Status Badge */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-gray-700">Status:</span>
        <span
          className={`
            px-2 py-1 rounded text-xs font-semibold border
            ${getStatusBadgeClasses(status)}
          `}
        >
          {status || "UNKNOWN"}
        </span>
      </div>

      {/* Battery Level */}
      <div className="flex items-center gap-2">
        <Battery size={14} className="text-gray-600" />
        <span className="text-xs text-gray-700">
          <span className="font-medium">Battery:</span> {batteryPercentage}%
        </span>
        {/* Battery bar visualization */}
        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all ${
              batteryPercentage > 50
                ? "bg-green-500"
                : batteryPercentage > 20
                  ? "bg-yellow-500"
                  : "bg-red-500"
            }`}
            style={{ width: `${batteryPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

MarkerPopupContent.propTypes = {
  trap: PropTypes.shape({
    name: PropTypes.string,
    trap_id: PropTypes.string,
    status: PropTypes.oneOf(["ACTIVE", "OFFLINE", "MAINTENANCE", "FALLEN"]),
    battery_level: PropTypes.number,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }).isRequired,
};

export default MarkerPopupContent;
