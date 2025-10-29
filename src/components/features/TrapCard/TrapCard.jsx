import { Battery, MapPin, Signal, SignalZero } from 'lucide-react';
import PropTypes from 'prop-types';
import Badge from '../../ui/Badge';
import Card, { CardContent, CardHeader } from '../../ui/Card';

/**
 * Trap Status Card component
 */
const TrapCard = ({ 
  trap,
  onClick,
  className = '',
}) => {
  const getBatteryIcon = (level) => {
    return <Battery size={16} className={level < 20 ? 'text-red-600' : 'text-gray-600'} />;
  };

  const getSignalIcon = (status) => {
    if (status === 'offline') {
      return <SignalZero size={16} className="text-red-600" />;
    }
    return <Signal size={16} className="text-green-600" />;
  };

  return (
    <Card 
      className={className}
      onClick={onClick}
      hoverable={!!onClick}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{trap.trap_id}</h3>
          <Badge variant={trap.status} size="sm">
            {trap.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {/* Location */}
          {trap.location && (
            <div className="flex items-start gap-2 text-sm">
              <MapPin size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
              <span className="text-gray-600">{trap.location}</span>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-200">
            <div>
              <p className="text-xs text-gray-500">Today's Captures</p>
              <p className="text-lg font-semibold text-gray-900">
                {trap.captures_today || 0}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Captures</p>
              <p className="text-lg font-semibold text-gray-900">
                {trap.total_captures || 0}
              </p>
            </div>
          </div>

          {/* Battery & Signal */}
          <div className="flex items-center gap-4 pt-3 border-t border-gray-200">
            <div className="flex items-center gap-1.5">
              {getBatteryIcon(trap.battery_level)}
              <span className="text-xs text-gray-600">{trap.battery_level}%</span>
            </div>
            <div className="flex items-center gap-1.5">
              {getSignalIcon(trap.status)}
              <span className="text-xs text-gray-600 capitalize">{trap.status}</span>
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
    status: PropTypes.string.isRequired,
    location: PropTypes.string,
    battery_level: PropTypes.number,
    captures_today: PropTypes.number,
    total_captures: PropTypes.number,
    last_updated: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default TrapCard;
