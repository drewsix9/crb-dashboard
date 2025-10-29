// Mock Data for Traps
// CRB Smart Trap Monitoring Dashboard

import { TRAP_STATUS } from '../../utils/constants';

export const mockTraps = [
  {
    id: '1',
    trap_id: 'TRAP-001',
    name: 'North Field Trap 1',
    status: TRAP_STATUS.ACTIVE,
    latitude: 14.5995,
    longitude: 120.9842,
    installed_date: '2024-12-01',
    last_maintenance: '2025-01-15',
    last_update: '2025-01-15T14:30:25',
    battery_level: 85,
  },
  {
    id: '2',
    trap_id: 'TRAP-002',
    name: 'North Field Trap 2',
    status: TRAP_STATUS.ACTIVE,
    latitude: 14.6012,
    longitude: 120.9856,
    installed_date: '2024-12-01',
    last_maintenance: '2025-01-14',
    last_update: '2025-01-15T14:28:15',
    battery_level: 92,
  },
  {
    id: '3',
    trap_id: 'TRAP-003',
    name: 'East Field Trap 1',
    status: TRAP_STATUS.ACTIVE,
    latitude: 14.5978,
    longitude: 120.9901,
    installed_date: '2024-12-02',
    last_maintenance: '2025-01-13',
    last_update: '2025-01-15T14:25:40',
    battery_level: 78,
  },
  {
    id: '4',
    trap_id: 'TRAP-004',
    name: 'East Field Trap 2',
    status: TRAP_STATUS.OFFLINE,
    latitude: 14.5965,
    longitude: 120.9915,
    installed_date: '2024-12-02',
    last_maintenance: '2025-01-10',
    last_update: '2025-01-14T08:15:22',
    battery_level: 15,
  },
  {
    id: '5',
    trap_id: 'TRAP-005',
    name: 'South Field Trap 1',
    status: TRAP_STATUS.ACTIVE,
    latitude: 14.5942,
    longitude: 120.9867,
    installed_date: '2024-12-03',
    last_maintenance: '2025-01-12',
    last_update: '2025-01-15T14:29:50',
    battery_level: 88,
  },
  {
    id: '6',
    trap_id: 'TRAP-006',
    name: 'South Field Trap 2',
    status: TRAP_STATUS.MAINTENANCE,
    latitude: 14.5928,
    longitude: 120.9878,
    installed_date: '2024-12-03',
    last_maintenance: '2024-12-28',
    last_update: '2025-01-15T12:45:18',
    battery_level: 45,
  },
  {
    id: '7',
    trap_id: 'TRAP-007',
    name: 'West Field Trap 1',
    status: TRAP_STATUS.ACTIVE,
    latitude: 14.5988,
    longitude: 120.9815,
    installed_date: '2024-12-04',
    last_maintenance: '2025-01-11',
    last_update: '2025-01-15T14:27:35',
    battery_level: 91,
  },
  {
    id: '8',
    trap_id: 'TRAP-008',
    name: 'West Field Trap 2',
    status: TRAP_STATUS.ACTIVE,
    latitude: 14.5975,
    longitude: 120.9798,
    installed_date: '2024-12-04',
    last_maintenance: '2025-01-09',
    last_update: '2025-01-15T14:26:42',
    battery_level: 82,
  },
  {
    id: '9',
    trap_id: 'TRAP-009',
    name: 'Central Field Trap 1',
    status: TRAP_STATUS.ACTIVE,
    latitude: 14.5968,
    longitude: 120.9865,
    installed_date: '2024-12-05',
    last_maintenance: '2025-01-08',
    last_update: '2025-01-15T14:31:10',
    battery_level: 76,
  },
  {
    id: '10',
    trap_id: 'TRAP-010',
    name: 'Central Field Trap 2',
    status: TRAP_STATUS.ACTIVE,
    latitude: 14.5955,
    longitude: 120.9852,
    installed_date: '2024-12-05',
    last_maintenance: '2025-01-07',
    last_update: '2025-01-15T14:24:28',
    battery_level: 95,
  },
  {
    id: '11',
    trap_id: 'TRAP-011',
    name: 'North Boundary Trap',
    status: TRAP_STATUS.ACTIVE,
    latitude: 14.6025,
    longitude: 120.9875,
    installed_date: '2024-12-06',
    last_maintenance: '2025-01-06',
    last_update: '2025-01-15T14:22:55',
    battery_level: 68,
  },
  {
    id: '12',
    trap_id: 'TRAP-012',
    name: 'South Boundary Trap',
    status: TRAP_STATUS.ACTIVE,
    latitude: 14.5915,
    longitude: 120.9845,
    installed_date: '2024-12-06',
    last_maintenance: '2025-01-05',
    last_update: '2025-01-15T14:28:40',
    battery_level: 89,
  },
  {
    id: '13',
    trap_id: 'TRAP-013',
    name: 'East Boundary Trap',
    status: TRAP_STATUS.OFFLINE,
    latitude: 14.5968,
    longitude: 120.9928,
    installed_date: '2024-12-07',
    last_maintenance: '2025-01-04',
    last_update: '2025-01-13T18:22:12',
    battery_level: 8,
  },
  {
    id: '14',
    trap_id: 'TRAP-014',
    name: 'West Boundary Trap',
    status: TRAP_STATUS.MAINTENANCE,
    latitude: 14.5982,
    longitude: 120.9782,
    installed_date: '2024-12-07',
    last_maintenance: '2024-12-25',
    last_update: '2025-01-15T11:15:35',
    battery_level: 42,
  },
  {
    id: '15',
    trap_id: 'TRAP-015',
    name: 'Reserve Field Trap',
    status: TRAP_STATUS.ACTIVE,
    latitude: 14.5948,
    longitude: 120.9888,
    installed_date: '2024-12-08',
    last_maintenance: '2025-01-03',
    last_update: '2025-01-15T14:32:18',
    battery_level: 87,
  },
];

// Helper function to get trap by ID
export const getTrapById = (id) => {
  return mockTraps.find(trap => trap.id === id || trap.trap_id === id);
};

// Helper function to get traps by status
export const getTrapsByStatus = (status) => {
  return mockTraps.filter(trap => trap.status === status);
};

// Get trap statistics
export const getTrapStatistics = () => {
  const activeTraps = getTrapsByStatus(TRAP_STATUS.ACTIVE).length;
  const offlineTraps = getTrapsByStatus(TRAP_STATUS.OFFLINE).length;
  const maintenanceTraps = getTrapsByStatus(TRAP_STATUS.MAINTENANCE).length;
  
  return {
    total: mockTraps.length,
    active: activeTraps,
    offline: offlineTraps,
    maintenance: maintenanceTraps,
  };
};

export default mockTraps;
