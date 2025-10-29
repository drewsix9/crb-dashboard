import { GenderRatioPieChart, TrendLineChart } from '../components/charts';
import Container from '../components/layout/Container';

/**
 * Home page - Dashboard overview
 */
const HomePage = () => {
  // Mock data - will be replaced with real data from Context/Supabase
  const genderData = {
    male: 28,
    female: 19,
  };

  const trendData = [
    { date: 'Oct 23', male: 15, female: 10, total: 25 },
    { date: 'Oct 24', male: 18, female: 12, total: 30 },
    { date: 'Oct 25', male: 22, female: 15, total: 37 },
    { date: 'Oct 26', male: 20, female: 14, total: 34 },
    { date: 'Oct 27', male: 25, female: 18, total: 43 },
    { date: 'Oct 28', male: 23, female: 16, total: 39 },
    { date: 'Oct 29', male: 28, female: 19, total: 47 },
  ];

  return (
    <Container>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            CRB Smart Trap Monitoring System
          </p>
        </div>

        {/* Stats Cards - Placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-600">Total CRB Today</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">47</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-600">Male</h3>
            <p className="text-3xl font-bold text-[#60a5fa] mt-2">28</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-600">Female</h3>
            <p className="text-3xl font-bold text-[#f472b6] mt-2">19</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <GenderRatioPieChart 
              maleCount={genderData.male} 
              femaleCount={genderData.female} 
            />
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="h-full flex flex-col">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Traps</h3>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-bold text-primary-700">12</span>
                <span className="text-gray-600">/ 15 traps online</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Active</span>
                  <span className="font-semibold text-green-600">10</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Offline</span>
                  <span className="font-semibold text-red-600">2</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Maintenance</span>
                  <span className="font-semibold text-orange-600">2</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Fallen</span>
                  <span className="font-semibold text-red-700">1</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trend Chart */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <TrendLineChart data={trendData} />
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
