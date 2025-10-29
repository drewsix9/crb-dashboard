import { Calendar, Filter, Search } from 'lucide-react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import Select from '../../ui/Select';

/**
 * Image Filters component for gallery
 */
const ImageFilters = ({ 
  onFilterChange,
  traps = [],
  className = '',
}) => {
  const [filters, setFilters] = useState({
    search: '',
    trapId: '',
    gender: '',
    dateFrom: '',
    dateTo: '',
    sortBy: 'date_desc',
  });

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      search: '',
      trapId: '',
      gender: '',
      dateFrom: '',
      dateTo: '',
      sortBy: 'date_desc',
    };
    setFilters(resetFilters);
    onFilterChange?.(resetFilters);
  };

  const trapOptions = [
    { value: '', label: 'All Traps' },
    ...traps.map(trap => ({ value: trap.trap_id, label: trap.trap_id })),
  ];

  const genderOptions = [
    { value: '', label: 'All Genders' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ];

  const sortOptions = [
    { value: 'date_desc', label: 'Newest First' },
    { value: 'date_asc', label: 'Oldest First' },
    { value: 'trap_id', label: 'Trap ID' },
  ];

  return (
    <div className={`bg-white p-4 rounded-lg border border-gray-200 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <Filter size={20} className="text-gray-600" />
        <h3 className="font-semibold text-gray-900">Filters</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Search */}
        <Input
          placeholder="Search images..."
          value={filters.search}
          onChange={(value) => handleFilterChange('search', value)}
          icon={<Search size={18} />}
          iconPosition="left"
        />

        {/* Trap ID */}
        <Select
          options={trapOptions}
          value={filters.trapId}
          onChange={(value) => handleFilterChange('trapId', value)}
          placeholder="Select trap"
        />

        {/* Gender */}
        <Select
          options={genderOptions}
          value={filters.gender}
          onChange={(value) => handleFilterChange('gender', value)}
          placeholder="Select gender"
        />

        {/* Date From */}
        <Input
          type="date"
          label="From Date"
          value={filters.dateFrom}
          onChange={(value) => handleFilterChange('dateFrom', value)}
          icon={<Calendar size={18} />}
          iconPosition="left"
        />

        {/* Date To */}
        <Input
          type="date"
          label="To Date"
          value={filters.dateTo}
          onChange={(value) => handleFilterChange('dateTo', value)}
          icon={<Calendar size={18} />}
          iconPosition="left"
        />

        {/* Sort By */}
        <Select
          label="Sort By"
          options={sortOptions}
          value={filters.sortBy}
          onChange={(value) => handleFilterChange('sortBy', value)}
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-200">
        <Button variant="ghost" size="sm" onClick={handleReset}>
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

ImageFilters.propTypes = {
  onFilterChange: PropTypes.func,
  traps: PropTypes.array,
  className: PropTypes.string,
};

export default ImageFilters;
