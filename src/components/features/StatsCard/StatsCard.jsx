import PropTypes from 'prop-types';

/**
 * Stats Card component for displaying key metrics
 */
const StatsCard = ({ 
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendDirection = 'up',
  color = 'primary',
  className = '',
}) => {
  const colorStyles = {
    primary: 'text-primary-700 bg-primary-50',
    male: 'text-[#60a5fa] bg-blue-50',
    female: 'text-[#f472b6] bg-pink-50',
    success: 'text-green-700 bg-green-50',
    warning: 'text-orange-700 bg-orange-50',
    danger: 'text-red-700 bg-red-50',
  };

  const trendColorStyles = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-gray-600',
  };

  return (
    <div className={`bg-white p-6 rounded-lg border border-gray-200 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          <p className={`text-3xl font-bold mt-2 ${colorStyles[color]?.split(' ')[0] || 'text-gray-900'}`}>
            {value}
          </p>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
          {trend && (
            <p className={`text-xs font-medium mt-2 ${trendColorStyles[trendDirection]}`}>
              {trendDirection === 'up' && '↑ '}
              {trendDirection === 'down' && '↓ '}
              {trend}
            </p>
          )}
        </div>
        {Icon && (
          <div className={`p-3 rounded-lg ${colorStyles[color] || 'bg-gray-100'}`}>
            <Icon size={24} />
          </div>
        )}
      </div>
    </div>
  );
};

StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  subtitle: PropTypes.string,
  icon: PropTypes.elementType,
  trend: PropTypes.string,
  trendDirection: PropTypes.oneOf(['up', 'down', 'neutral']),
  color: PropTypes.oneOf(['primary', 'male', 'female', 'success', 'warning', 'danger']),
  className: PropTypes.string,
};

export default StatsCard;
