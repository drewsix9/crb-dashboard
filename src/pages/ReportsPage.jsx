import { TrapPerformanceChart, TrendLineChart } from '../components/charts';
import Container from '../components/layout/Container';

const ReportsPage = () => {
  // Mock data for charts
  const trendData = [
    { date: 'Oct 23', male: 15, female: 10, total: 25 },
    { date: 'Oct 24', male: 18, female: 12, total: 30 },
    { date: 'Oct 25', male: 22, female: 15, total: 37 },
    { date: 'Oct 26', male: 20, female: 14, total: 34 },
    { date: 'Oct 27', male: 25, female: 18, total: 43 },
    { date: 'Oct 28', male: 23, female: 16, total: 39 },
    { date: 'Oct 29', male: 28, female: 19, total: 47 },
  ];

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
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-2">
            Detailed capture statistics and trap performance
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-600">Total Captures</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">227</p>
            <p className="text-xs text-green-600 mt-1">↑ 12% vs last week</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-600">Avg per Trap</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">15.1</p>
            <p className="text-xs text-gray-500 mt-1">captures/trap</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-600">Best Performer</h3>
            <p className="text-2xl font-bold text-primary-700 mt-2">TRAP-006</p>
            <p className="text-xs text-gray-500 mt-1">16 captures</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-600">Male/Female Ratio</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">1.47</p>
            <p className="text-xs text-gray-500 mt-1">59.6% male</p>
          </div>
        </div>

        {/* Charts */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <TrendLineChart data={trendData} />
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <TrapPerformanceChart data={trapPerformanceData} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ReportsPage;
