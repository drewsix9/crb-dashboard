// Mock Statistics Data
// CRB Smart Trap Monitoring Dashboard

import { getCaptureStatistics } from './captures.mock';
import { getTrapStatistics } from './traps.mock';

export const getMockStatistics = () => {
  const captureStats = getCaptureStatistics();
  const trapStats = getTrapStatistics();
  
  return {
    // Today's stats
    totalToday: captureStats.totalToday,
    maleCRB: captureStats.maleCRB,
    femaleCRB: captureStats.femaleCRB,
    
    // Trap stats
    activeTraps: trapStats.active,
    totalTraps: trapStats.total,
    offlineTraps: trapStats.offline,
    maintenanceTraps: trapStats.maintenance,
    
    // Gender ratio
    genderRatio: {
      male: captureStats.malePercentage,
      female: captureStats.femalePercentage,
    },
    
    // System status
    systemOnline: true,
    lastUpdated: new Date().toISOString(),
  };
};

// Generate chart data for reports
export const getMockChartData = () => {
  // Generate daily capture data for last 30 days
  const dailyData = [];
  const today = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const male = Math.floor(Math.random() * 20 + 10);
    const female = Math.floor(Math.random() * 15 + 5);
    
    dailyData.push({
      date: date.toISOString().split('T')[0],
      male,
      female,
      total: male + female,
    });
  }
  
  // Weekly aggregated data
  const weeklyData = [];
  for (let i = 3; i >= 0; i--) {
    const weekStart = new Date(today);
    weekStart.setDate(weekStart.getDate() - (i * 7));
    
    const male = Math.floor(Math.random() * 100 + 80);
    const female = Math.floor(Math.random() * 80 + 50);
    
    weeklyData.push({
      week: `Week ${4 - i}`,
      male,
      female,
      total: male + female,
    });
  }
  
  // Trap performance data
  const trapPerformance = Array.from({ length: 15 }, (_, i) => ({
    trap_id: `TRAP-${String(i + 1).padStart(3, '0')}`,
    captures: Math.floor(Math.random() * 50 + 10),
    efficiency: Math.floor(Math.random() * 40 + 60), // 60-100%
  }));
  
  return {
    daily: dailyData,
    weekly: weeklyData,
    trapPerformance,
  };
};

export default {
  getMockStatistics,
  getMockChartData,
};
