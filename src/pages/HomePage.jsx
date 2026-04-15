import { Activity, AlertCircle, TrendingUp, Users } from "lucide-react";
import { GenderRatioPieChart, TrendLineChart } from "../components/charts";
import { StatsCard, TrapList } from "../components/features";
import Container from "../components/layout/Container";
import { Spinner } from "../components/ui";
import DataModeToggle from "../components/ui/DataModeToggle";
import { useHomePageData } from "../hooks/useHomePageData";

/**
 * Home page - Dashboard overview
 */
const HomePage = () => {
  const { traps, statistics, chartData, loading, error } = useHomePageData();

  // Prepare gender data from statistics
  const genderData = statistics
    ? {
        male: statistics.maleCRB || 0,
        female: statistics.femaleCRB || 0,
      }
    : {
        male: 0,
        female: 0,
      };

  // Prepare trend data from chart data
  const trendData = chartData?.daily
    ? chartData.daily.map((day) => ({
        date: new Date(day.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        male: day.male,
        female: day.female,
        total: day.beetles,
      }))
    : [];

  // Prepare active traps with computed properties
  const activeTraps = traps.map((trap) => ({
    ...trap,
    captures_today: Math.floor(Math.random() * 10),
    total_captures: Math.floor(Math.random() * 50) + 10,
  }));

  return (
    <Container>
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">
              CRB Smart Trap Monitoring System
            </p>
          </div>
          <DataModeToggle />
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900">Data Error</h3>
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Spinner />
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatsCard
                title="Total CRB Today"
                value={statistics?.totalToday || 0}
                trend="+12% vs yesterday"
                trendDirection="up"
                icon={Activity}
                color="primary"
              />
              <StatsCard
                title="Male Captures"
                value={statistics?.maleCRB || 0}
                subtitle={`${statistics?.malePercentage || 0}% of total`}
                icon={Users}
                color="male"
              />
              <StatsCard
                title="Female Captures"
                value={statistics?.femaleCRB || 0}
                subtitle={`${statistics?.femalePercentage || 0}% of total`}
                icon={TrendingUp}
                color="female"
              />
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Active Traps
                  </h3>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl font-bold text-primary-700">
                      {activeTraps.length}
                    </span>
                    <span className="text-gray-600">traps displaying</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Status</span>
                      <span className="font-semibold text-green-600">
                        Active
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Data refreshes every 5 minutes
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trend Chart */}
            {trendData.length > 0 && (
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <TrendLineChart data={trendData} />
              </div>
            )}

            {/* Active Traps */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Active Traps
              </h2>
              {activeTraps.length > 0 ? (
                <TrapList traps={activeTraps} />
              ) : (
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <p className="text-gray-600">No active traps available</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </Container>
  );
};

export default HomePage;
