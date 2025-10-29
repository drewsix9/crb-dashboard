import PropTypes from 'prop-types';
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

/**
 * Trend Line Chart
 * Shows capture trends over time
 */
const TrendLineChart = ({ 
  data = [],
  showMale = true,
  showFemale = true,
  className = '' 
}) => {
  return (
    <div className={className}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Capture Trends</h3>
        <p className="text-sm text-gray-600">Daily capture counts over time</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="date" 
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
          
          {showMale && (
            <Line
              type="monotone"
              dataKey="male"
              stroke="#60a5fa"
              strokeWidth={2}
              dot={{ fill: '#60a5fa', r: 4 }}
              activeDot={{ r: 6 }}
              name="Male"
            />
          )}
          
          {showFemale && (
            <Line
              type="monotone"
              dataKey="female"
              stroke="#f472b6"
              strokeWidth={2}
              dot={{ fill: '#f472b6', r: 4 }}
              activeDot={{ r: 6 }}
              name="Female"
            />
          )}
          
          <Line
            type="monotone"
            dataKey="total"
            stroke="#15803d"
            strokeWidth={2}
            dot={{ fill: '#15803d', r: 4 }}
            activeDot={{ r: 6 }}
            name="Total"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

TrendLineChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      male: PropTypes.number,
      female: PropTypes.number,
      total: PropTypes.number.isRequired,
    })
  ).isRequired,
  showMale: PropTypes.bool,
  showFemale: PropTypes.bool,
  className: PropTypes.string,
};

export default TrendLineChart;
