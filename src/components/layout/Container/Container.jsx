import PropTypes from 'prop-types';

/**
 * Container component for consistent page width and spacing
 */
const Container = ({ 
  children, 
  maxWidth = 'xl',
  className = '',
  ...props 
}) => {
  // Max width styles
  const maxWidthStyles = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-full',
  };

  return (
    <div
      className={`
        mx-auto w-full px-4 sm:px-6 lg:px-8
        ${maxWidthStyles[maxWidth] || maxWidthStyles.xl}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      {...props}
    >
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  maxWidth: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', '2xl', 'full']),
  className: PropTypes.string,
};

export default Container;
