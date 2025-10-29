import { AlertTriangle, Bell } from 'lucide-react';
import PropTypes from 'prop-types';
import Badge from '../../ui/Badge';
import Button from '../../ui/Button';

/**
 * Alerts List component
 */
const AlertsList = ({ 
  alerts = [],
  onAlertClick,
  onDismiss,
  className = '',
}) => {
  if (alerts.length === 0) {
    return (
      <div className="text-center py-8 bg-white rounded-lg border border-gray-200">
        <Bell size={32} className="text-gray-300 mx-auto mb-2" />
        <p className="text-gray-500">No active alerts</p>
      </div>
    );
  }

  const getAlertIcon = (type) => {
    switch (type) {
      case 'trap_fallen':
        return <AlertTriangle size={20} className="text-red-600" />;
      case 'maintenance_due':
        return <Bell size={20} className="text-orange-600" />;
      default:
        return <Bell size={20} className="text-gray-600" />;
    }
  };

  const getAlertVariant = (type) => {
    switch (type) {
      case 'trap_fallen':
        return 'danger';
      case 'maintenance_due':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start gap-3">
            {/* Icon */}
            <div className="flex-shrink-0 mt-0.5">
              {getAlertIcon(alert.type)}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant={getAlertVariant(alert.type)} size="sm">
                  {alert.type.replace('_', ' ')}
                </Badge>
                <span className="text-xs text-gray-500">
                  {new Date(alert.created_at).toLocaleString()}
                </span>
              </div>
              
              <h4 className="font-semibold text-gray-900 mb-1">
                {alert.trap_id}
              </h4>
              
              <p className="text-sm text-gray-600">
                {alert.message}
              </p>
            </div>

            {/* Actions */}
            {onDismiss && (
              <div className="flex-shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDismiss(alert.id)}
                >
                  Dismiss
                </Button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

AlertsList.propTypes = {
  alerts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      trap_id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
    })
  ).isRequired,
  onAlertClick: PropTypes.func,
  onDismiss: PropTypes.func,
  className: PropTypes.string,
};

export default AlertsList;
