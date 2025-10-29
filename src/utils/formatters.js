// Utility Functions for Formatting
// CRB Smart Trap Monitoring Dashboard

/**
 * Format date to readable string
 * @param {Date|string} date - Date to format
 * @param {string} format - Format type: 'short', 'long', 'time', 'datetime'
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = 'datetime') => {
  if (!date) return '-';
  
  const d = new Date(date);
  
  if (isNaN(d.getTime())) return '-';
  
  const options = {
    short: { year: 'numeric', month: 'short', day: 'numeric' },
    long: { year: 'numeric', month: 'long', day: 'numeric' },
    time: { hour: '2-digit', minute: '2-digit', second: '2-digit' },
    datetime: { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    },
  };
  
  return d.toLocaleDateString('en-US', options[format] || options.datetime);
};

/**
 * Format date to relative time (e.g., "2 hours ago")
 * @param {Date|string} date - Date to format
 * @returns {string} Relative time string
 */
export const formatRelativeTime = (date) => {
  if (!date) return '-';
  
  const d = new Date(date);
  const now = new Date();
  const diffInSeconds = Math.floor((now - d) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  
  return formatDate(d, 'short');
};

/**
 * Format number with commas
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export const formatNumber = (num) => {
  if (num === null || num === undefined) return '0';
  return num.toLocaleString('en-US');
};

/**
 * Format percentage
 * @param {number} value - Value to format
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted percentage
 */
export const formatPercentage = (value, decimals = 1) => {
  if (value === null || value === undefined) return '0%';
  return `${value.toFixed(decimals)}%`;
};

/**
 * Format trap ID (ensure TRAP-XXX format)
 * @param {string|number} id - Trap ID
 * @returns {string} Formatted trap ID
 */
export const formatTrapId = (id) => {
  if (!id) return '';
  
  // If already in correct format, return as is
  if (typeof id === 'string' && id.startsWith('TRAP-')) {
    return id;
  }
  
  // Convert number to TRAP-XXX format
  const numId = typeof id === 'number' ? id : parseInt(id);
  if (isNaN(numId)) return id;
  
  return `TRAP-${String(numId).padStart(3, '0')}`;
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Get initials from name
 * @param {string} name - Full name
 * @returns {string} Initials
 */
export const getInitials = (name) => {
  if (!name) return '??';
  
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

/**
 * Format file size
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

/**
 * Capitalize first letter
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Format gender ratio for display
 * @param {number} male - Male count
 * @param {number} female - Female count
 * @returns {object} Gender ratio data
 */
export const formatGenderRatio = (male, female) => {
  const total = male + female;
  
  if (total === 0) {
    return {
      male: 0,
      female: 0,
      malePercentage: 0,
      femalePercentage: 0,
    };
  }
  
  return {
    male,
    female,
    malePercentage: (male / total) * 100,
    femalePercentage: (female / total) * 100,
  };
};

export default {
  formatDate,
  formatRelativeTime,
  formatNumber,
  formatPercentage,
  formatTrapId,
  truncateText,
  getInitials,
  formatFileSize,
  capitalize,
  formatGenderRatio,
};
