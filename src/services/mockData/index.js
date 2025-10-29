// Mock Data Index
// Export all mock data from a single location

export {
    getTrapById, getTrapStatistics, getTrapsByStatus, mockTraps
} from './traps.mock';

export {
    getCaptureById, getCaptureStatistics, getCapturesByGender, getCapturesByTrapId, getCapturesThisMonth, getCapturesThisWeek, getCapturesToday, mockCaptures
} from './captures.mock';

export {
    getImageById, getImagesByDateRange, getImagesByTrapId, getImagesThisMonth, getImagesThisWeek, getImagesToday, mockImages, sortImagesByDate,
    sortImagesByTrapId
} from './images.mock';

export {
    getAlertById, getAlertsBySeverity, getAlertsByTrapId, getAlertsByType, getCriticalAlerts, getUnreadAlerts, getUnreadCount, mockAlerts
} from './alerts.mock';

export {
    getMockChartData, getMockStatistics
} from './statistics.mock';

