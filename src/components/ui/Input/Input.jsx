import PropTypes from 'prop-types';
import { forwardRef } from 'react';

/**
 * Input component with label, error state, and icon support
 * 
 * @example
 * <Input 
 *   label="Trap Name" 
 *   placeholder="Enter trap name"
 *   value={value}
 *   onChange={setValue}
 * />
 */
const Input = forwardRef(({ 
  type = 'text',
  label = '',
  placeholder = '',
  value = '',
  onChange = () => {},
  error = '',
  helperText = '',
  icon = null,
  iconPosition = 'left',
  disabled = false,
  required = false,
  fullWidth = true,
  className = '',
  ...props 
}, ref) => {
  // Base input styles
  const baseStyles = 'rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1';
  
  // State styles
  const stateStyles = error
    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
    : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500';
  
  // Disabled styles
  const disabledStyles = disabled 
    ? 'bg-gray-100 cursor-not-allowed opacity-60' 
    : 'bg-white';
  
  // Icon padding
  const iconPaddingStyles = icon 
    ? iconPosition === 'left' 
      ? 'pl-10 pr-4' 
      : 'pl-4 pr-10'
    : 'px-4';
  
  // Size styles
  const sizeStyles = 'py-2 text-base';
  
  // Width style
  const widthStyle = fullWidth ? 'w-full' : '';
  
  // Combine input styles
  const inputClasses = `
    ${baseStyles}
    ${stateStyles}
    ${disabledStyles}
    ${iconPaddingStyles}
    ${sizeStyles}
    ${widthStyle}
    ${className}
  `.trim().replace(/\s+/g, ' ');
  
  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={inputClasses}
          {...props}
        />
        
        {icon && iconPosition === 'right' && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1.5 text-sm text-red-600">{error}</p>
      )}
      
      {!error && helperText && (
        <p className="mt-1.5 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  type: PropTypes.oneOf(['text', 'email', 'password', 'number', 'tel', 'url', 'search', 'date']),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  error: PropTypes.string,
  helperText: PropTypes.string,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
};

export default Input;
