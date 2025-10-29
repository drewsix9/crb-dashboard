// Mock Data for CRB Captures
// CRB Smart Trap Monitoring Dashboard

import { CRB_GENDER } from '../../utils/constants';
import { getRandomItem, getRandomNumber } from '../../utils/helpers';

// Helper to generate random date within last month
const getRandomDateInLastMonth = () => {
  const now = new Date();
  const daysAgo = getRandomNumber(0, 30);
  const hours = getRandomNumber(0, 23);
  const minutes = getRandomNumber(0, 59);
  
  const date = new Date(now);
  date.setDate(date.getDate() - daysAgo);
  date.setHours(hours, minutes, 0, 0);
  
  return date.toISOString();
};

// Generate mock captures for the last month
const generateMockCaptures = () => {
  const captures = [];
  const trapIds = Array.from({ length: 15 }, (_, i) => `${i + 1}`);
  
  // Generate 47 captures for today (matching the dashboard stat)
  let captureId = 1;
  
  // Today's captures
  const today = new Date();
  for (let i = 0; i < 47; i++) {
    const hour = getRandomNumber(6, 18); // Between 6 AM and 6 PM
    const minute = getRandomNumber(0, 59);
    const capturedAt = new Date(today);
    capturedAt.setHours(hour, minute, 0, 0);
    
    captures.push({
      id: `${captureId}`,
      trap_id: getRandomItem(trapIds),
      gender: i < 28 ? CRB_GENDER.MALE : CRB_GENDER.FEMALE, // 28 males, 19 females
      captured_at: capturedAt.toISOString(),
      image_url: `/placeholder-images/crb-${captureId}.jpg`,
      notes: '',
    });
    captureId++;
  }
  
  // Generate captures for the past month (additional ~150-200 captures)
  for (let i = 0; i < 180; i++) {
    const gender = Math.random() > 0.4 ? CRB_GENDER.MALE : CRB_GENDER.FEMALE;
    
    captures.push({
      id: `${captureId}`,
      trap_id: getRandomItem(trapIds),
      gender,
      captured_at: getRandomDateInLastMonth(),
      image_url: `/placeholder-images/crb-${captureId}.jpg`,
      notes: i % 10 === 0 ? 'Large specimen' : '',
    });
    captureId++;
  }
  
  // Sort by date descending
  return captures.sort((a, b) => new Date(b.captured_at) - new Date(a.captured_at));
};

export const mockCaptures = generateMockCaptures();

// Helper functions
export const getCaptureById = (id) => {
  return mockCaptures.find(capture => capture.id === id);
};

export const getCapturesByTrapId = (trapId) => {
  return mockCaptures.filter(capture => capture.trap_id === trapId);
};

export const getCapturesByGender = (gender) => {
  return mockCaptures.filter(capture => capture.gender === gender);
};

export const getCapturesToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return mockCaptures.filter(capture => {
    const captureDate = new Date(capture.captured_at);
    return captureDate >= today;
  });
};

export const getCapturesThisWeek = () => {
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  weekAgo.setHours(0, 0, 0, 0);
  
  return mockCaptures.filter(capture => {
    const captureDate = new Date(capture.captured_at);
    return captureDate >= weekAgo;
  });
};

export const getCapturesThisMonth = () => {
  const monthAgo = new Date();
  monthAgo.setDate(monthAgo.getDate() - 30);
  monthAgo.setHours(0, 0, 0, 0);
  
  return mockCaptures.filter(capture => {
    const captureDate = new Date(capture.captured_at);
    return captureDate >= monthAgo;
  });
};

// Get capture statistics
export const getCaptureStatistics = () => {
  const today = getCapturesToday();
  const maleToday = today.filter(c => c.gender === CRB_GENDER.MALE).length;
  const femaleToday = today.filter(c => c.gender === CRB_GENDER.FEMALE).length;
  
  const allMale = mockCaptures.filter(c => c.gender === CRB_GENDER.MALE).length;
  const allFemale = mockCaptures.filter(c => c.gender === CRB_GENDER.FEMALE).length;
  const total = allMale + allFemale;
  
  return {
    totalToday: today.length,
    maleCRB: maleToday,
    femaleCRB: femaleToday,
    totalAllTime: mockCaptures.length,
    malePercentage: total > 0 ? (allMale / total) * 100 : 0,
    femalePercentage: total > 0 ? (allFemale / total) * 100 : 0,
  };
};

export default mockCaptures;
