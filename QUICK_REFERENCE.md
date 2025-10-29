# CRB Dashboard - Quick Reference Guide

## 🎯 Project Overview

**Name**: CRB Smart Trap Monitoring Dashboard  
**Tech Stack**: React 19, Vite, Tailwind CSS, Supabase, React Router, Recharts  
**State Management**: React Context API  
**Target**: Mobile-first responsive web application

---

## 📋 Key Requirements Summary

### Features
✅ Home Dashboard with statistics  
✅ Gender ratio visualization (pie chart)  
✅ Trap status indicators  
✅ Image Gallery (sorted by trap_id, date, week)  
✅ Reports page with charts  
✅ Notification bell for alerts  
✅ Admin: Trap management (CRUD)  
✅ Realtime updates (30-second interval)  
❌ No Trap Map page  
❌ No export features

### User Roles
- **Admin**: Full access + trap CRUD operations
- **Viewer**: Read-only access

### Alert Types
1. Trap fallen (critical)
2. Maintenance due (high/medium)

### Data
- **Traps**: 15 total (TRAP-001 to TRAP-015)
- **Captures**: ~227 (last month), 47 today (28M/19F)
- **Images**: Uploaded via FastAPI → Supabase
- **Mock Data**: Up to 1 month of historical data

---

## 🎨 Design System Quick Reference

### Colors

```
Primary Green:    #15803d  (sidebar)
Male Blue:        #60a5fa  
Female Pink:      #f472b6  
Active:           #4ade80  (green)
Offline:          #ef4444  (red)
Maintenance:      #fb923c  (orange)
Fallen:           #dc2626  (dark red)
```

### Typography

```
Font: Inter
Sizes: 12px | 14px | 16px | 18px | 20px | 24px | 30px | 36px
Weights: 400 (normal) | 500 (medium) | 600 (semibold) | 700 (bold)
```

### Spacing

```
4px | 8px | 12px | 16px | 24px | 32px | 48px
```

### Breakpoints

```
sm:  640px  (mobile)
md:  768px  (tablet)
lg:  1024px (desktop)
xl:  1280px (large desktop)
```

---

## 📁 Important File Locations

### Configuration
- Theme: `src/styles/theme.js`
- Constants: `src/utils/constants.js`
- Formatters: `src/utils/formatters.js`
- Helpers: `src/utils/helpers.js`

### Mock Data
- Traps: `src/services/mockData/traps.mock.js`
- Captures: `src/services/mockData/captures.mock.js`
- Images: `src/services/mockData/images.mock.js`
- Alerts: `src/services/mockData/alerts.mock.js`
- Statistics: `src/services/mockData/statistics.mock.js`
- Index: `src/services/mockData/index.js`

### Context (To be created)
- Auth: `src/context/AuthContext.jsx`
- Traps: `src/context/TrapsContext.jsx`
- Statistics: `src/context/StatisticsContext.jsx`
- Alerts: `src/context/AlertsContext.jsx`
- Images: `src/context/ImagesContext.jsx`
- Root: `src/context/AppProvider.jsx`

### Components (To be created)
- UI: `src/components/ui/`
- Layout: `src/components/layout/`
- Charts: `src/components/charts/`
- Features: `src/components/features/`

### Pages (To be created)
- Home: `src/pages/Home/`
- Gallery: `src/pages/ImageGallery/`
- Reports: `src/pages/Reports/`
- Admin: `src/pages/TrapManagement/`
- Login: `src/pages/Login/`

---

## 🔧 Common Utilities

### Format Trap ID
```javascript
import { formatTrapId } from '@/utils/formatters';
formatTrapId(1) // Returns: "TRAP-001"
```

### Format Date
```javascript
import { formatDate, formatRelativeTime } from '@/utils/formatters';
formatDate(date, 'datetime') // "Jan 15, 2025, 2:30 PM"
formatRelativeTime(date)     // "2 hours ago"
```

### Get Mock Data
```javascript
import { 
  getMockStatistics, 
  mockTraps, 
  getUnreadAlerts 
} from '@/services/mockData';

const stats = getMockStatistics();
const traps = mockTraps;
const alerts = getUnreadAlerts();
```

---

## 🚦 Trap Status

| Status | Color | Description |
|--------|-------|-------------|
| Active | Green (#4ade80) | Trap is operational |
| Offline | Red (#ef4444) | Trap is offline |
| Maintenance | Orange (#fb923c) | Needs maintenance |
| Fallen | Dark Red (#dc2626) | Trap has fallen |

---

## 📊 Statistics Overview

### Today's Stats
- Total CRB Detected: 47
- Male CRB: 28
- Female CRB: 19
- Active Traps: 12/15

### Gender Ratio
- Male: ~59.6%
- Female: ~40.4%

---

## 🔔 Alert System

### Alert Priorities
1. **Critical**: Trap fallen (immediate action)
2. **High**: Offline, maintenance overdue
3. **Medium**: Maintenance due soon
4. **Low**: Informational

### Notification Bell
- Location: Top-right header
- Shows: Unread count badge
- Click: Opens alert dropdown
- Updates: Real-time (30s interval)

---

## 🗺️ Navigation Structure

```
├── Home (/)
│   ├── Stats Cards
│   ├── Gender Ratio Chart
│   └── Trap Status List
│
├── Image Gallery (/gallery)
│   ├── Filter Controls
│   └── Image Grid
│
├── Reports (/reports)
│   ├── Charts
│   └── Data Tables
│
└── Manage Traps (/traps) [Admin Only]
    ├── Trap List
    ├── Add Trap
    ├── Edit Trap
    └── Delete Trap
```

---

## 🔐 Authentication Flow

```
1. User visits app
2. Check if authenticated
3. If NO → Redirect to /login
4. If YES → Load user role (admin/viewer)
5. Show appropriate UI based on role
6. Subscribe to realtime updates
```

---

## 📱 Responsive Breakpoints

### Mobile (< 768px)
- Sidebar: Hamburger menu
- Stats: 1 column
- Images: 1-2 columns
- Charts: Full width

### Tablet (768px - 1024px)
- Sidebar: Collapsed or overlay
- Stats: 2 columns
- Images: 2-3 columns
- Charts: Optimized

### Desktop (> 1024px)
- Sidebar: Fixed, visible
- Stats: 4 columns
- Images: 3-4 columns
- Charts: Full layout

---

## 🎯 Component Checklist

### ✅ Completed
- [x] Folder structure
- [x] Theme configuration
- [x] Constants and utilities
- [x] Mock data generators
- [x] Documentation

### 🔄 In Progress
- [ ] UI components
- [ ] Layout components
- [ ] Context providers
- [ ] Custom hooks

### 📝 To Do
- [ ] Pages
- [ ] Routing
- [ ] Supabase integration
- [ ] Realtime features
- [ ] Authentication

---

## 📞 Quick Commands

### Development
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Supabase (Future)
```bash
# Configure in .env.local
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

---

## 💡 Tips & Best Practices

1. **Always use formatTrapId()** for trap ID display
2. **Use theme.js colors** instead of hardcoding
3. **Import from index.js** for cleaner imports
4. **Mobile-first** when writing CSS
5. **Use Context hooks** for state access
6. **Lazy load** images and components
7. **Memoize** expensive calculations
8. **Test with mock data** before Supabase integration

---

**Version**: 1.0.0  
**Last Updated**: October 29, 2025
