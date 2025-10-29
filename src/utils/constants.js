// Application Constants
// CRB Smart Trap Monitoring Dashboard

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  VIEWER: 'viewer',
};

// Trap Status
export const TRAP_STATUS = {
  ACTIVE: 'active',
  OFFLINE: 'offline',
  MAINTENANCE: 'maintenance',
  FALLEN: 'fallen',
};

// Trap Status Labels
export const TRAP_STATUS_LABELS = {
  [TRAP_STATUS.ACTIVE]: 'Active',
  [TRAP_STATUS.OFFLINE]: 'Offline',
  [TRAP_STATUS.MAINTENANCE]: 'Maintenance',
  [TRAP_STATUS.FALLEN]: 'Fallen',
};

// Trap Status Colors (corresponding to theme colors)
export const TRAP_STATUS_COLORS = {
  [TRAP_STATUS.ACTIVE]: '#4ade80',
  [TRAP_STATUS.OFFLINE]: '#ef4444',
  [TRAP_STATUS.MAINTENANCE]: '#fb923c',
  [TRAP_STATUS.FALLEN]: '#dc2626',
};

// CRB Gender
export const CRB_GENDER = {
  MALE: 'male',
  FEMALE: 'female',
  UNKNOWN: 'unknown',
};

// Alert Types
export const ALERT_TYPES = {
  TRAP_FALLEN: 'trap_fallen',
  MAINTENANCE_DUE: 'maintenance_due',
  OFFLINE: 'offline',
  HIGH_ACTIVITY: 'high_activity',
};

// Alert Severity
export const ALERT_SEVERITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
};

// Alert Messages
export const ALERT_MESSAGES = {
  [ALERT_TYPES.TRAP_FALLEN]: 'Trap has fallen and needs attention',
  [ALERT_TYPES.MAINTENANCE_DUE]: 'Trap maintenance is due',
  [ALERT_TYPES.OFFLINE]: 'Trap is offline',
  [ALERT_TYPES.HIGH_ACTIVITY]: 'High capture activity detected',
};

// Image Sort Options
export const IMAGE_SORT_OPTIONS = {
  DATE: 'date',
  TRAP_ID: 'trap_id',
};

// Date Range Options
export const DATE_RANGE_OPTIONS = {
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month',
};

// Date Range Labels
export const DATE_RANGE_LABELS = {
  [DATE_RANGE_OPTIONS.DAY]: 'Today',
  [DATE_RANGE_OPTIONS.WEEK]: 'This Week',
  [DATE_RANGE_OPTIONS.MONTH]: 'This Month',
};

// Realtime Update Interval (milliseconds)
export const REALTIME_UPDATE_INTERVAL = 30000; // 30 seconds

// Pagination
export const ITEMS_PER_PAGE = {
  IMAGES: 12,
  TRAPS: 15,
  ALERTS: 10,
};

// Navigation Items
export const NAV_ITEMS = [
  {
    id: 'home',
    label: 'Home',
    path: '/',
    icon: 'Home',
  },
  {
    id: 'gallery',
    label: 'Image Gallery',
    path: '/gallery',
    icon: 'Images',
  },
  {
    id: 'reports',
    label: 'Reports',
    path: '/reports',
    icon: 'FileText',
  },
  {
    id: 'traps',
    label: 'Manage Traps',
    path: '/traps',
    icon: 'Settings',
    adminOnly: true,
  },
];

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'crb_auth_token',
  USER_ROLE: 'crb_user_role',
  THEME: 'crb_theme',
};

// API Endpoints (if using external API)
export const API_ENDPOINTS = {
  IMAGES_UPLOAD: '/api/images/upload',
  TRAPS_STATUS: '/api/traps/status',
};

export default {
  USER_ROLES,
  TRAP_STATUS,
  TRAP_STATUS_LABELS,
  TRAP_STATUS_COLORS,
  CRB_GENDER,
  ALERT_TYPES,
  ALERT_SEVERITY,
  ALERT_MESSAGES,
  IMAGE_SORT_OPTIONS,
  DATE_RANGE_OPTIONS,
  DATE_RANGE_LABELS,
  REALTIME_UPDATE_INTERVAL,
  ITEMS_PER_PAGE,
  NAV_ITEMS,
  STORAGE_KEYS,
  API_ENDPOINTS,
};
