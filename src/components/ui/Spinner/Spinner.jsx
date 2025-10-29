import PropTypes from 'prop-types';

/**
 * Spinner/Loading component
 * 
 * @example
 * <Spinner size="md" color="primary" />
 */
const Spinner = ({ 
  size = 'md',
  color = 'primary',
  className = '',
  fullScreen = false,
  text = '',
  ...props 
}) => {
  // Size styles
  const sizeStyles = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-3',
    xl: 'h-16 w-16 border-4',
  };
  
  // Color styles
  const colorStyles = {
    primary: 'border-primary-600 border-t-transparent',
    secondary: 'border-gray-600 border-t-transparent',
    white: 'border-white border-t-transparent',
    success: 'border-green-600 border-t-transparent',
    danger: 'border-red-600 border-t-transparent',
  };
  
  // Combine styles
  const spinnerClasses = `
    inline-block rounded-full animate-spin
    ${sizeStyles[size] || sizeStyles.md}
    ${colorStyles[color] || colorStyles.primary}
    ${className}
  `.trim().replace(/\s+/g, ' ');
  
  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className={spinnerClasses} role="status" {...props} />
      {text && (
        <p className="text-sm text-gray-600 font-medium">{text}</p>
      )}
      <span className="sr-only">Loading...</span>
    </div>
  );
  
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50">
        {spinner}
      </div>
    );
  }
  
  return spinner;
};

Spinner.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  color: PropTypes.oneOf(['primary', 'secondary', 'white', 'success', 'danger']),
  className: PropTypes.string,
  fullScreen: PropTypes.bool,
  text: PropTypes.string,
};

export default Spinner;
