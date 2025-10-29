import PropTypes from 'prop-types';

/**
 * Card component for grouping related content
 * 
 * @example
 * <Card>
 *   <CardHeader>Title</CardHeader>
 *   <CardContent>Content here</CardContent>
 * </Card>
 */
const Card = ({ 
  variant = 'default',
  padding = 'md',
  children,
  className = '',
  onClick = null,
  hoverable = false,
  ...props 
}) => {
  // Base styles
  const baseStyles = 'bg-white rounded-lg transition-all duration-200';
  
  // Variant styles
  const variantStyles = {
    default: 'border border-gray-200',
    elevated: 'shadow-md hover:shadow-lg',
    bordered: 'border-2 border-gray-300',
  };
  
  // Padding styles
  const paddingStyles = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };
  
  // Hover and click styles
  const interactiveStyles = onClick || hoverable ? 'cursor-pointer hover:shadow-md' : '';
  
  // Combine all styles
  const cardClasses = `
    ${baseStyles}
    ${variantStyles[variant] || variantStyles.default}
    ${paddingStyles[padding] || paddingStyles.md}
    ${interactiveStyles}
    ${className}
  `.trim().replace(/\s+/g, ' ');
  
  return (
    <div
      className={cardClasses}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick(e) : undefined}
      {...props}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  variant: PropTypes.oneOf(['default', 'elevated', 'bordered']),
  padding: PropTypes.oneOf(['none', 'sm', 'md', 'lg']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  hoverable: PropTypes.bool,
};

/**
 * CardHeader component
 */
export const CardHeader = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`border-b border-gray-200 pb-3 mb-4 ${className}`}
      {...props}
    >
      <h3 className="text-lg font-semibold text-gray-900">{children}</h3>
    </div>
  );
};

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

/**
 * CardContent component
 */
export const CardContent = ({ children, className = '', ...props }) => {
  return (
    <div className={`text-gray-700 ${className}`} {...props}>
      {children}
    </div>
  );
};

CardContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

/**
 * CardFooter component
 */
export const CardFooter = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`border-t border-gray-200 pt-3 mt-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

CardFooter.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Card;
