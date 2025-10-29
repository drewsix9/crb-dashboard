# CRB Smart Trap Monitoring Dashboard - Architecture Documentation

## 📁 Folder Structure

```
crb-dashboard/
├── public/
│   ├── placeholder-images/      # Placeholder images and generator
│   │   └── generator.js
│   └── favicon.ico
│
├── src/
│   ├── assets/                  # Static assets
│   │   ├── icons/              # Custom SVG icons
│   │   └── images/             # Images, logos
│   │
│   ├── components/             # React components
│   │   ├── ui/                # Base UI components (Design System)
│   │   │   ├── Button/
│   │   │   ├── Card/
│   │   │   ├── Badge/
│   │   │   ├── Input/
│   │   │   ├── Select/
│   │   │   ├── Modal/
│   │   │   ├── Spinner/
│   │   │   └── IconButton/
│   │   │
│   │   ├── layout/            # Layout components
│   │   │   ├── Sidebar/
│   │   │   ├── Header/
│   │   │   ├── MainLayout/
│   │   │   └── Container/
│   │   │
│   │   ├── charts/            # Chart components
│   │   │   ├── GenderRatioPieChart/
│   │   │   ├── TrendLineChart/
│   │   │   └── BarChart/
│   │   │
│   │   ├── features/          # Feature-specific components
│   │   │   ├── StatsCard/
│   │   │   ├── TrapStatusCard/
│   │   │   ├── TrapList/
│   │   │   ├── TrapForm/
│   │   │   ├── ImageGrid/
│   │   │   ├── ImageFilters/
│   │   │   ├── AlertsList/
│   │   │   └── StatusIndicator/
│   │   │
│   │   └── auth/              # Authentication components
│   │       ├── LoginForm/
│   │       └── ProtectedRoute/
│   │
│   ├── pages/                 # Page components
│   │   ├── Home/
│   │   ├── ImageGallery/
│   │   ├── Reports/
│   │   ├── TrapManagement/
│   │   └── Login/
│   │
│   ├── context/               # React Context providers
│   │   ├── AuthContext.jsx
│   │   ├── TrapsContext.jsx
│   │   ├── StatisticsContext.jsx
│   │   ├── AlertsContext.jsx
│   │   ├── ImagesContext.jsx
│   │   └── AppProvider.jsx
│   │
│   ├── hooks/                 # Custom React hooks
│   │   ├── useAuth.js
│   │   ├── useTraps.js
│   │   ├── useStatistics.js
│   │   ├── useAlerts.js
│   │   ├── useImages.js
│   │   ├── useRealtime.js
│   │   ├── useDebounce.js
│   │   └── useMediaQuery.js
│   │
│   ├── services/              # External services & API
│   │   ├── supabase/
│   │   │   ├── client.js
│   │   │   ├── auth.service.js
│   │   │   ├── traps.service.js
│   │   │   ├── images.service.js
│   │   │   ├── alerts.service.js
│   │   │   └── realtime.service.js
│   │   │
│   │   └── mockData/
│   │       ├── traps.mock.js
│   │       ├── captures.mock.js
│   │       ├── images.mock.js
│   │       ├── alerts.mock.js
│   │       ├── statistics.mock.js
│   │       └── index.js
│   │
│   ├── utils/                 # Utility functions
│   │   ├── constants.js
│   │   ├── formatters.js
│   │   ├── validators.js
│   │   └── helpers.js
│   │
│   ├── styles/                # Global styles & design tokens
│   │   ├── theme.js
│   │   ├── variables.css
│   │   ├── globals.css
│   │   └── utilities.css
│   │
│   ├── routes/                # Route configuration
│   │   ├── index.jsx
│   │   └── routeConfig.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── supabase.ts
│
├── .env.local
├── .env.example
├── tailwind.config.js
├── vite.config.js
└── package.json
```

## 🎨 Design System

### Color Palette

#### Primary Colors (Green - Nature Theme)
- **primary-50**: `#f0fdf4`
- **primary-500**: `#22c55e` (Main primary)
- **primary-700**: `#15803d` (Sidebar background)
- **primary-900**: `#14532d`

#### Secondary Colors (Blue - Male Indicator)
- **secondary-400**: `#60a5fa` (Male indicator)
- **secondary-500**: `#3b82f6`

#### Accent Colors (Pink - Female Indicator)
- **accent-400**: `#f472b6` (Female indicator)
- **accent-500**: `#ec4899`

#### Status Colors
- **Active**: `#4ade80` (Green)
- **Offline**: `#ef4444` (Red)
- **Maintenance**: `#fb923c` (Orange)
- **Fallen**: `#dc2626` (Dark Red)

### Typography

#### Font Family
- **Sans**: Inter, system-ui, -apple-system, sans-serif
- **Mono**: Fira Code, monospace

#### Font Sizes (Mobile-First)
- **xs**: 0.75rem (12px)
- **sm**: 0.875rem (14px)
- **base**: 1rem (16px)
- **lg**: 1.125rem (18px)
- **xl**: 1.25rem (20px)
- **2xl**: 1.5rem (24px)
- **3xl**: 1.875rem (30px)
- **4xl**: 2.25rem (36px)

#### Font Weights
- **normal**: 400
- **medium**: 500
- **semibold**: 600
- **bold**: 700

### Spacing Scale
Based on 4px increments:
- **0**: 0
- **1**: 0.25rem (4px)
- **2**: 0.5rem (8px)
- **4**: 1rem (16px)
- **6**: 1.5rem (24px)
- **8**: 2rem (32px)
- **12**: 3rem (48px)

### Border Radius
- **sm**: 0.125rem (2px)
- **base**: 0.25rem (4px)
- **md**: 0.375rem (6px)
- **lg**: 0.5rem (8px)
- **xl**: 0.75rem (12px)
- **2xl**: 1rem (16px)
- **full**: 9999px

### Shadows
- **sm**: `0 1px 2px 0 rgba(0, 0, 0, 0.05)`
- **base**: `0 1px 3px 0 rgba(0, 0, 0, 0.1)`
- **md**: `0 4px 6px -1px rgba(0, 0, 0, 0.1)`
- **lg**: `0 10px 15px -3px rgba(0, 0, 0, 0.1)`
- **xl**: `0 20px 25px -5px rgba(0, 0, 0, 0.1)`

### Breakpoints (Mobile-First)
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

## 🧩 Component Architecture

### Component Naming Conventions
- **UI Components**: PascalCase (e.g., `Button`, `Card`)
- **Feature Components**: PascalCase with context (e.g., `TrapStatusCard`)
- **Hooks**: camelCase with "use" prefix (e.g., `useAuth`, `useTraps`)
- **Context**: PascalCase with "Context" suffix (e.g., `AuthContext`)
- **Services**: camelCase with ".service" suffix (e.g., `auth.service.js`)

### Component Structure Pattern

```javascript
// Component file structure
ComponentName/
├── ComponentName.jsx       # Main component
├── ComponentName.module.css # Component styles (if not using Tailwind)
└── index.js               # Export barrel

// Example component
import { forwardRef } from 'react';

const ComponentName = forwardRef(({ 
  variant = 'default',
  size = 'md',
  children,
  className = '',
  ...props 
}, ref) => {
  return (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  );
});

ComponentName.displayName = 'ComponentName';

export default ComponentName;
```

## 🔌 State Management (React Context)

### Context Structure

#### 1. AuthContext
- User authentication state
- User role (admin/viewer)
- Login/logout functions
- Role checking utilities

#### 2. TrapsContext
- Trap data (CRUD operations)
- Trap status updates
- Realtime trap subscriptions
- Trap statistics

#### 3. StatisticsContext
- Dashboard statistics
- Capture counts
- Gender ratios
- System status

#### 4. AlertsContext
- Alert notifications
- Unread count
- Mark as read functions
- Realtime alert subscriptions

#### 5. ImagesContext
- Image gallery data
- Filter and sort options
- Pagination state

### Context Usage Pattern

```javascript
// 1. Create context and provider
import { createContext, useState, useEffect } from 'react';

export const MyContext = createContext(null);

export const MyProvider = ({ children }) => {
  const [state, setState] = useState(initialState);
  
  // Methods and effects
  
  const value = {
    state,
    methods,
  };
  
  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  );
};

// 2. Create custom hook
import { useContext } from 'react';
import { MyContext } from '../context/MyContext';

export const useMyContext = () => {
  const context = useContext(MyContext);
  
  if (!context) {
    throw new Error('useMyContext must be used within MyProvider');
  }
  
  return context;
};

// 3. Use in components
const MyComponent = () => {
  const { state, methods } = useMyContext();
  
  // Use context data
};
```

## 🗄️ Mock Data Structure

### Traps
- 15 traps total (TRAP-001 to TRAP-015)
- Status: active, offline, maintenance, fallen
- Location coordinates
- Battery levels
- Last update timestamps

### Captures
- ~227 total captures (last month)
- 47 captures today (28 male, 19 female)
- Gender distribution
- Associated images
- Capture timestamps

### Images
- One image per capture
- Metadata (size, resolution, camera ID)
- Sortable by trap_id and date
- Filterable by date ranges

### Alerts
- 5 sample alerts
- Types: trap_fallen, maintenance_due, offline, high_activity
- Severity levels: low, medium, high, critical
- Read/unread status

## 🚀 Key Features

### 1. Realtime Updates
- 30-second polling interval
- Supabase realtime subscriptions
- Live trap status updates
- Live alert notifications

### 2. Gender Ratio Visualization
- PieChart using Recharts
- Male (blue) vs Female (pink)
- Percentage calculations
- Live updates

### 3. Trap Status Indicators
- Color-coded badges
- Active (green), Offline (red), Maintenance (orange), Fallen (dark red)
- Last update timestamps
- Battery levels

### 4. Image Gallery
- Filter by trap_id
- Sort by date or trap_id
- Date range filters (day, week, month)
- Grid layout (responsive)
- Lazy loading

### 5. Notification System
- Bell icon in header
- Unread count badge
- Alert dropdown
- Realtime updates
- Critical alerts highlighted

### 6. Role-Based Access
- Admin: Full CRUD on traps
- Viewer: Read-only access
- Protected routes
- Conditional UI rendering

### 7. Mobile-First Design
- Responsive sidebar (hamburger on mobile)
- Touch-friendly UI elements
- Optimized layouts for small screens
- Swipe gestures (future)

## 🔧 Development Guidelines

### File Organization
- One component per file
- Co-locate related files in folders
- Use index.js for clean imports
- Keep components small and focused

### Naming Conventions
- Files: PascalCase for components, camelCase for utilities
- Variables: camelCase
- Constants: UPPER_SNAKE_CASE
- CSS classes: kebab-case or use Tailwind

### Code Style
- Use functional components
- Prefer hooks over class components
- Use destructuring for props
- Keep functions pure when possible
- Comment complex logic

### Performance
- Lazy load components when possible
- Memoize expensive calculations
- Use React.memo for pure components
- Optimize images (thumbnails)
- Implement pagination

### Testing
- Unit tests for utilities
- Integration tests for features
- E2E tests for critical flows
- Mock external services

## 📝 Next Steps

### Phase 1: Foundation ✅
- [x] Folder structure
- [x] Design system setup
- [x] Mock data generation
- [x] Constants and utilities

### Phase 2: Core Components (Next)
- [ ] UI component library
- [ ] Layout components
- [ ] Chart components

### Phase 3: Context & Services
- [ ] React Context providers
- [ ] Custom hooks
- [ ] Supabase services

### Phase 4: Pages
- [ ] Home page
- [ ] Image Gallery
- [ ] Reports
- [ ] Trap Management
- [ ] Login

### Phase 5: Integration
- [ ] Routing setup
- [ ] Authentication flow
- [ ] Realtime subscriptions
- [ ] Deployment

## 📚 References

- **React**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **Recharts**: https://recharts.org
- **Supabase**: https://supabase.com/docs
- **React Router**: https://reactrouter.com
- **Lucide Icons**: https://lucide.dev

---

**Last Updated**: October 29, 2025
**Version**: 1.0.0
