import { ChevronDown } from 'lucide-react';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';

/**
 * Select dropdown component
 * 
 * @example
 * <Select
 *   label="Sort By"
 *   options={[
 *     { value: 'date', label: 'Date' },
 *     { value: 'trap_id', label: 'Trap ID' }
 *   ]}
 *   value={value}
 *   onChange={setValue}
 * />
 */
const Select = forwardRef(({ 
  label = '',
  options = [],
  value = '',
  onChange = () => {},
  placeholder = 'Select an option',
  error = '',
  helperText = '',
  disabled = false,
  required = false,
  fullWidth = true,
  className = '',
  ...props 
}, ref) => {
  // Base select styles
  const baseStyles = 'rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 appearance-none cursor-pointer';
  
  // State styles
  const stateStyles = error
    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
    : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500';
  
  // Disabled styles
  const disabledStyles = disabled 
    ? 'bg-gray-100 cursor-not-allowed opacity-60' 
    : 'bg-white';
  
  // Size styles
  const sizeStyles = 'py-2 pl-4 pr-10 text-base';
  
  // Width style
  const widthStyle = fullWidth ? 'w-full' : '';
  
  // Combine select styles
  const selectClasses = `
    ${baseStyles}
    ${stateStyles}
    ${disabledStyles}
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
        <select
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          required={required}
          className={selectClasses}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
          <ChevronDown size={20} />
        </div>
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

Select.displayName = 'Select';

Select.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
      disabled: PropTypes.bool,
    })
  ).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
};

export default Select;
