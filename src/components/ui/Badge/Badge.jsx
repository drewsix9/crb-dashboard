import PropTypes from 'prop-types';

/**
 * Badge component for status indicators and labels
 * 
 * @example
 * <Badge variant="success">Active</Badge>
 * <Badge variant="danger" size="sm">Offline</Badge>
 */
const Badge = ({ 
  variant = 'default',
  size = 'md',
  children,
  icon = null,
  pulse = false,
  className = '',
  ...props 
}) => {
  // Base styles
  const baseStyles = 'inline-flex items-center font-medium rounded-full';
  
  // Variant styles (matching trap status colors)
  const variantStyles = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-primary-100 text-primary-800',
    success: 'bg-green-100 text-green-800',
    danger: 'bg-red-100 text-red-800',
    warning: 'bg-orange-100 text-orange-800',
    info: 'bg-blue-100 text-blue-800',
    // Status-specific variants
    active: 'bg-green-100 text-green-800',
    offline: 'bg-red-100 text-red-800',
    maintenance: 'bg-orange-100 text-orange-800',
    fallen: 'bg-red-100 text-red-900',
  };
  
  // Size styles
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-2.5 py-1 text-sm gap-1.5',
    lg: 'px-3 py-1.5 text-base gap-2',
  };
  
  // Pulse animation for critical states
  const pulseStyle = pulse ? 'animate-pulse' : '';
  
  // Combine all styles
  const badgeClasses = `
    ${baseStyles}
    ${variantStyles[variant] || variantStyles.default}
    ${sizeStyles[size] || sizeStyles.md}
    ${pulseStyle}
    ${className}
  `.trim().replace(/\s+/g, ' ');
  
  return (
    <span className={badgeClasses} {...props}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  );
};

Badge.propTypes = {
  variant: PropTypes.oneOf([
    'default', 
    'primary', 
    'success', 
    'danger', 
    'warning', 
    'info',
    'active',
    'offline',
    'maintenance',
    'fallen',
  ]),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  children: PropTypes.node.isRequired,
  icon: PropTypes.node,
  pulse: PropTypes.bool,
  className: PropTypes.string,
};

export default Badge;
