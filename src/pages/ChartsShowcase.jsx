import { GenderRatioPieChart, TrapPerformanceChart, TrendLineChart } from '../components/charts';
import Container from '../components/layout/Container';

const ChartsShowcase = () => {
  // Mock data for Gender Ratio
  const genderData = {
    male: 28,
    female: 19,
  };

  // Mock data for Trend Line Chart (last 7 days)
  const trendData = [
    { date: 'Oct 23', male: 15, female: 10, total: 25 },
    { date: 'Oct 24', male: 18, female: 12, total: 30 },
    { date: 'Oct 25', male: 22, female: 15, total: 37 },
    { date: 'Oct 26', male: 20, female: 14, total: 34 },
    { date: 'Oct 27', male: 25, female: 18, total: 43 },
    { date: 'Oct 28', male: 23, female: 16, total: 39 },
    { date: 'Oct 29', male: 28, female: 19, total: 47 },
  ];

  // Mock data for Trap Performance
  const trapPerformanceData = [
    { trapId: 'TRAP-001', male: 8, female: 5 },
    { trapId: 'TRAP-002', male: 6, female: 4 },
    { trapId: 'TRAP-003', male: 5, female: 3 },
    { trapId: 'TRAP-004', male: 7, female: 6 },
    { trapId: 'TRAP-005', male: 4, female: 2 },
    { trapId: 'TRAP-006', male: 9, female: 7 },
    { trapId: 'TRAP-007', male: 6, female: 3 },
    { trapId: 'TRAP-008', male: 5, female: 4 },
  ];

  return (
    <Container maxWidth="2xl">
      <div className="py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Charts Showcase</h1>
        <p className="text-gray-600 mb-8">
          Testing Recharts components with mock data
        </p>

        <div className="space-y-8">
          {/* Gender Ratio Pie Chart */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <GenderRatioPieChart 
              maleCount={genderData.male} 
              femaleCount={genderData.female} 
            />
          </div>

          {/* Trend Line Chart */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <TrendLineChart data={trendData} />
          </div>

          {/* Trap Performance Bar Chart */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <TrapPerformanceChart data={trapPerformanceData} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ChartsShowcase;
