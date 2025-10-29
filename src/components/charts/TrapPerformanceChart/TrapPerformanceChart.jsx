import PropTypes from 'prop-types';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

/**
 * Trap Performance Bar Chart
 * Shows capture counts by trap
 */
const TrapPerformanceChart = ({ 
  data = [],
  className = '' 
}) => {
  return (
    <div className={className}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Trap Performance</h3>
        <p className="text-sm text-gray-600">Capture counts by trap</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="trapId" 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
          />
          <Legend />
          
          <Bar 
            dataKey="male" 
            fill="#60a5fa" 
            name="Male"
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="female" 
            fill="#f472b6" 
            name="Female"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

TrapPerformanceChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      trapId: PropTypes.string.isRequired,
      male: PropTypes.number.isRequired,
      female: PropTypes.number.isRequired,
    })
  ).isRequired,
  className: PropTypes.string,
};

export default TrapPerformanceChart;
