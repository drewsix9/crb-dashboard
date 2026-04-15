import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { TrapPerformanceChart, TrendLineChart } from "../components/charts";
import Container from "../components/layout/Container";
import { Spinner } from "../components/ui";
import DataModeToggle from "../components/ui/DataModeToggle";
import { useDataMode } from "../contexts/DataModeContext";
import { createStatisticsService } from "../services/dataAdapter";

const ReportsPage = () => {
  const { mode } = useDataMode();
  const [chartData, setChartData] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReportsData = async () => {
      try {
        setLoading(true);
        setError(null);
        const statsService = createStatisticsService(mode);
        const data = await statsService.getChartData();
        setChartData(data);
        setStatistics({
          totalCaptures:
            data.daily?.reduce((sum, day) => sum + day.beetles, 0) || 0,
          avgPerTrap: 15.1, // Would need separate calculation
          performance: data.trapPerformance || [],
        });
      } catch (err) {
        console.error("Error fetching reports data:", err);
        setError(err.message || "Failed to load reports data");
      } finally {
        setLoading(false);
      }
    };

    fetchReportsData();
  }, [mode]);

  // Prepare trend data for chart
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

  // Prepare trap performance data for chart
  const trapPerformanceData = chartData?.trapPerformance
    ? chartData.trapPerformance.map((trap) => ({
        trapId: trap.trap_id,
        male: trap.male,
        female: trap.female,
      }))
    : [];

  const totalCaptures = statistics?.totalCaptures || 0;
  const bestPerformer = statistics?.performance?.[0] || {};

  return (
    <Container maxWidth="2xl">
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Reports & Analytics
            </h1>
            <p className="text-gray-600 mt-2">
              Detailed capture statistics and trap performance
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
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-sm font-medium text-gray-600">
                  Total Captures
                </h3>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {totalCaptures}
                </p>
                <p className="text-xs text-green-600 mt-1">
                  ↑ 12% vs last week
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-sm font-medium text-gray-600">
                  Avg per Trap
                </h3>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {statistics?.performance?.length > 0
                    ? (totalCaptures / statistics.performance.length).toFixed(1)
                    : "0"}
                </p>
                <p className="text-xs text-gray-500 mt-1">captures/trap</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-sm font-medium text-gray-600">
                  Best Performer
                </h3>
                <p className="text-2xl font-bold text-primary-700 mt-2">
                  {bestPerformer.trap_id || "N/A"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {bestPerformer.beetles || 0} captures
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-sm font-medium text-gray-600">
                  Male/Female Ratio
                </h3>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {totalCaptures > 0
                    ? (
                        trapPerformanceData.reduce(
                          (sum, t) => sum + t.male,
                          0,
                        ) /
                        Math.max(
                          trapPerformanceData.reduce(
                            (sum, t) => sum + t.female,
                            0,
                          ),
                          1,
                        )
                      ).toFixed(2)
                    : "0"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {totalCaptures > 0
                    ? Math.round(
                        (trapPerformanceData.reduce(
                          (sum, t) => sum + t.male,
                          0,
                        ) /
                          totalCaptures) *
                          100,
                      )
                    : 0}
                  % male
                </p>
              </div>
            </div>

            {/* Charts */}
            <div className="space-y-6">
              {trendData.length > 0 && (
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <TrendLineChart data={trendData} />
                </div>
              )}

              {trapPerformanceData.length > 0 && (
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <TrapPerformanceChart data={trapPerformanceData} />
                </div>
              )}

              {!trendData.length && !trapPerformanceData.length && (
                <div className="bg-gray-50 rounded-lg p-12 text-center">
                  <p className="text-gray-600 text-lg">
                    No report data available
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </Container>
  );
};

export default ReportsPage;
