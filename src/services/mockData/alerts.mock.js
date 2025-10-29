// Mock Data for Alerts
// CRB Smart Trap Monitoring Dashboard

import { ALERT_SEVERITY, ALERT_TYPES } from '../../utils/constants';

// Generate mock alerts
const generateMockAlerts = () => {
  const alerts = [];
  let alertId = 1;
  
  // Alert 1: Trap fallen
  alerts.push({
    id: `${alertId++}`,
    trap_id: '4',
    trap_name: 'East Field Trap 2',
    type: ALERT_TYPES.TRAP_FALLEN,
    message: 'TRAP-004 has fallen and needs immediate attention',
    severity: ALERT_SEVERITY.CRITICAL,
    is_read: false,
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    read_at: null,
  });
  
  // Alert 2: Maintenance due
  alerts.push({
    id: `${alertId++}`,
    trap_id: '6',
    trap_name: 'South Field Trap 2',
    type: ALERT_TYPES.MAINTENANCE_DUE,
    message: 'TRAP-006 maintenance is overdue',
    severity: ALERT_SEVERITY.HIGH,
    is_read: false,
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    read_at: null,
  });
  
  // Alert 3: Offline trap
  alerts.push({
    id: `${alertId++}`,
    trap_id: '13',
    trap_name: 'East Boundary Trap',
    type: ALERT_TYPES.OFFLINE,
    message: 'TRAP-013 has been offline for 48 hours',
    severity: ALERT_SEVERITY.HIGH,
    is_read: false,
    created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
    read_at: null,
  });
  
  // Alert 4: Maintenance due
  alerts.push({
    id: `${alertId++}`,
    trap_id: '14',
    trap_name: 'West Boundary Trap',
    type: ALERT_TYPES.MAINTENANCE_DUE,
    message: 'TRAP-014 is due for maintenance',
    severity: ALERT_SEVERITY.MEDIUM,
    is_read: true,
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    read_at: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
  });
  
  // Alert 5: High activity
  alerts.push({
    id: `${alertId++}`,
    trap_id: '1',
    trap_name: 'North Field Trap 1',
    type: ALERT_TYPES.HIGH_ACTIVITY,
    message: 'TRAP-001 showing unusually high capture activity',
    severity: ALERT_SEVERITY.LOW,
    is_read: true,
    created_at: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(), // 1.5 days ago
    read_at: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(),
  });
  
  return alerts;
};

export const mockAlerts = generateMockAlerts();

// Helper functions
export const getAlertById = (id) => {
  return mockAlerts.find(alert => alert.id === id);
};

export const getUnreadAlerts = () => {
  return mockAlerts.filter(alert => !alert.is_read);
};

export const getAlertsByTrapId = (trapId) => {
  return mockAlerts.filter(alert => alert.trap_id === trapId);
};

export const getAlertsBySeverity = (severity) => {
  return mockAlerts.filter(alert => alert.severity === severity);
};

export const getAlertsByType = (type) => {
  return mockAlerts.filter(alert => alert.type === type);
};

export const getUnreadCount = () => {
  return getUnreadAlerts().length;
};

export const getCriticalAlerts = () => {
  return mockAlerts.filter(alert => 
    alert.severity === ALERT_SEVERITY.CRITICAL && !alert.is_read
  );
};

export default mockAlerts;
