import PropTypes from 'prop-types';
import TrapCard from '../TrapCard';

/**
 * Trap List component - displays a grid of trap cards
 */
const TrapList = ({ 
  traps = [],
  onTrapClick,
  className = '',
}) => {
  if (traps.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No traps found</p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ${className}`}>
      {traps.map((trap) => (
        <TrapCard
          key={trap.trap_id}
          trap={trap}
          onClick={onTrapClick ? () => onTrapClick(trap) : undefined}
        />
      ))}
    </div>
  );
};

TrapList.propTypes = {
  traps: PropTypes.array.isRequired,
  onTrapClick: PropTypes.func,
  className: PropTypes.string,
};

export default TrapList;
