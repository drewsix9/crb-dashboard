import { Battery, Signal, SignalZero } from "lucide-react";
import PropTypes from "prop-types";
import Card, { CardContent, CardHeader } from "../../ui/Card";

/**
 * Calculate battery percentage from voltage (mV)
 * @param {number} voltageMv - Battery voltage in millivolts
 * @returns {number} Battery percentage (0-100)
 */
const getBatteryPercentage = (voltageMv) => {
  const maxVolts = 4200;
  const minVolts = 3300;

  let percentage = ((voltageMv - minVolts) / (maxVolts - minVolts)) * 100;

  // Constrain between 0 and 100
  return Math.max(0, Math.min(100, Math.round(percentage)));
};

/**
 * Trap Status Card component
 */
const TrapCard = ({ trap, onClick, className = "" }) => {
  const batteryPercentage = trap.battery_voltage
    ? getBatteryPercentage(trap.battery_voltage)
    : trap.battery_level || 0;

  const getBatteryIcon = (level) => {
    return (
      <Battery
        size={16}
        className={level < 20 ? "text-red-600" : "text-gray-600"}
      />
    );
  };

  const getSignalIcon = (isActive) => {
    if (!isActive) {
      return <SignalZero size={16} className="text-red-600" />;
    }
    return <Signal size={16} className="text-green-600" />;
  };

  return (
    <Card className={className} onClick={onClick} hoverable={!!onClick}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            {trap.trap_id}
          </h3>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {/* Battery & Signal */}
          <div className="flex items-center gap-4 pt-3 border-t border-gray-200">
            <div className="flex items-center gap-1.5">
              {getBatteryIcon(batteryPercentage)}
              <span className="text-xs text-gray-600">
                {batteryPercentage}%
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              {getSignalIcon(trap.is_active)}
            </div>
          </div>

          {/* Last Updated */}
          {trap.last_updated && (
            <p className="text-xs text-gray-500 pt-2">
              Updated: {new Date(trap.last_updated).toLocaleTimeString()}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

TrapCard.propTypes = {
  trap: PropTypes.shape({
    trap_id: PropTypes.string.isRequired,
    is_active: PropTypes.bool.isRequired,
    battery_voltage: PropTypes.number.isRequired,
    battery_level: PropTypes.number,
    last_updated: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default TrapCard;
