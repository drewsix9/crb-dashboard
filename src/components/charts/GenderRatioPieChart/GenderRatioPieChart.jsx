import PropTypes from 'prop-types';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

/**
 * Gender Ratio Pie Chart
 * Shows male vs female CRB distribution
 */
const GenderRatioPieChart = ({ 
  maleCount = 0, 
  femaleCount = 0,
  className = '' 
}) => {
  const data = [
    { name: 'Male', value: maleCount, color: '#60a5fa' },
    { name: 'Female', value: femaleCount, color: '#f472b6' },
  ];

  const total = maleCount + femaleCount;

  // Custom label
  const renderLabel = (entry) => {
    const percentage = total > 0 ? ((entry.value / total) * 100).toFixed(1) : 0;
    return `${entry.name}: ${percentage}%`;
  };

  return (
    <div className={className}>
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Gender Ratio</h3>
        <p className="text-sm text-gray-600">Total: {total} CRB</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#60a5fa]" />
          <span className="text-sm text-gray-700">
            Male: <span className="font-semibold">{maleCount}</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#f472b6]" />
          <span className="text-sm text-gray-700">
            Female: <span className="font-semibold">{femaleCount}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

GenderRatioPieChart.propTypes = {
  maleCount: PropTypes.number.isRequired,
  femaleCount: PropTypes.number.isRequired,
  className: PropTypes.string,
};

export default GenderRatioPieChart;
