import PropTypes from 'prop-types';
import { forwardRef } from 'react';

/**
 * IconButton component for icon-only buttons
 * 
 * @example
 * <IconButton variant="ghost" size="md">
 *   <EditIcon />
 * </IconButton>
 */
const IconButton = forwardRef(({ 
  variant = 'ghost',
  size = 'md',
  shape = 'circle',
  children,
  disabled = false,
  loading = false,
  className = '',
  type = 'button',
  tooltip = '',
  ...props 
}, ref) => {
  // Base styles
  const baseStyles = 'inline-flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed';
  
  // Variant styles
  const variantStyles = {
    primary: 'bg-primary-700 text-white hover:bg-primary-800 focus:ring-primary-500 active:bg-primary-900',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    outline: 'bg-transparent border-2 border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
  };
  
  // Size styles
  const sizeStyles = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3',
    xl: 'p-4',
  };
  
  // Icon size for loading spinner
  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
    xl: 'h-8 w-8',
  };
  
  // Shape styles
  const shapeStyles = {
    circle: 'rounded-full',
    square: 'rounded-lg',
  };
  
  // Combine all styles
  const buttonClasses = `
    ${baseStyles}
    ${variantStyles[variant] || variantStyles.ghost}
    ${sizeStyles[size] || sizeStyles.md}
    ${shapeStyles[shape] || shapeStyles.circle}
    ${className}
  `.trim().replace(/\s+/g, ' ');
  
  return (
    <button
      ref={ref}
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      title={tooltip}
      aria-label={tooltip}
      {...props}
    >
      {loading ? (
        <svg 
          className={`animate-spin ${iconSizes[size]}`}
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        children
      )}
    </button>
  );
});

IconButton.displayName = 'IconButton';

IconButton.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost', 'danger', 'outline']),
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  shape: PropTypes.oneOf(['circle', 'square']),
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  tooltip: PropTypes.string,
};

export default IconButton;
