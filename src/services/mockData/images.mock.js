// Mock Data for Images
// CRB Smart Trap Monitoring Dashboard

import { mockCaptures } from './captures.mock';

// Generate images from captures
export const mockImages = mockCaptures.map((capture, index) => ({
  id: capture.id,
  trap_id: capture.trap_id,
  capture_id: capture.id,
  image_url: capture.image_url,
  thumbnail_url: capture.image_url, // In production, this would be a smaller version
  taken_at: capture.captured_at,
  uploaded_at: capture.captured_at,
  metadata: {
    gender: capture.gender,
    size: `${Math.floor(Math.random() * 500 + 1500)}KB`,
    resolution: '1920x1080',
    camera_id: `CAM-${String(Math.floor(index / 10) + 1).padStart(3, '0')}`,
  },
}));

// Helper functions
export const getImageById = (id) => {
  return mockImages.find(image => image.id === id);
};

export const getImagesByTrapId = (trapId) => {
  return mockImages.filter(image => image.trap_id === trapId);
};

export const getImagesByDateRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  return mockImages.filter(image => {
    const imageDate = new Date(image.taken_at);
    return imageDate >= start && imageDate <= end;
  });
};

export const getImagesToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return mockImages.filter(image => {
    const imageDate = new Date(image.taken_at);
    return imageDate >= today;
  });
};

export const getImagesThisWeek = () => {
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  weekAgo.setHours(0, 0, 0, 0);
  
  return mockImages.filter(image => {
    const imageDate = new Date(image.taken_at);
    return imageDate >= weekAgo;
  });
};

export const getImagesThisMonth = () => {
  const monthAgo = new Date();
  monthAgo.setDate(monthAgo.getDate() - 30);
  monthAgo.setHours(0, 0, 0, 0);
  
  return mockImages.filter(image => {
    const imageDate = new Date(image.taken_at);
    return imageDate >= monthAgo;
  });
};

// Sort images
export const sortImagesByDate = (images, order = 'desc') => {
  return [...images].sort((a, b) => {
    const dateA = new Date(a.taken_at);
    const dateB = new Date(b.taken_at);
    return order === 'desc' ? dateB - dateA : dateA - dateB;
  });
};

export const sortImagesByTrapId = (images, order = 'asc') => {
  return [...images].sort((a, b) => {
    return order === 'asc' 
      ? a.trap_id.localeCompare(b.trap_id)
      : b.trap_id.localeCompare(a.trap_id);
  });
};

export default mockImages;
