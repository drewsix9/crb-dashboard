# 🗺️ CRB Dashboard - Development Roadmap

## Overview
This roadmap outlines the step-by-step implementation plan for the CRB Smart Trap Monitoring Dashboard, broken down into manageable phases.

---

## ✅ Phase 1: Foundation & Planning (COMPLETED)

**Duration**: 1 day  
**Status**: ✅ Complete

### Deliverables:
- [x] Complete folder structure
- [x] Design system & theme configuration
- [x] Utility functions (formatters, helpers, constants)
- [x] Mock data generators (traps, captures, images, alerts, statistics)
- [x] Comprehensive documentation
- [x] Environment configuration template

### Files Created: 18
### Documentation: 4 comprehensive guides

---

## 🔄 Phase 2: UI Component Library

**Duration**: 2-3 days  
**Status**: 📋 Ready to start

### Goal:
Build reusable, styled components that will be used throughout the application.

### Components to Build:

#### 2.1 Basic Components (Day 1)
- [ ] **Button** (`src/components/ui/Button/`)
  - Variants: primary, secondary, outline, danger
  - Sizes: sm, md, lg
  - Loading state, icon support
  - Disabled state

- [ ] **Card** (`src/components/ui/Card/`)
  - CardHeader, CardContent, CardFooter
  - Variants: default, elevated, bordered
  - Padding options

- [ ] **Badge** (`src/components/ui/Badge/`)
  - Color variants for status
  - Size variations
  - Icon support

#### 2.2 Form Components (Day 2)
- [ ] **Input** (`src/components/ui/Input/`)
  - Text, number, email, password types
  - Error state, icon support
  - Label and helper text

- [ ] **Select** (`src/components/ui/Select/`)
  - Dropdown component
  - Search functionality
  - Multi-select option

- [ ] **TextArea** (`src/components/ui/TextArea/`)
  - For longer text inputs
  - Character count
  - Auto-resize option

#### 2.3 Feedback Components (Day 3)
- [ ] **Modal** (`src/components/ui/Modal/`)
  - Overlay backdrop
  - Size variants
  - Close on escape/backdrop click

- [ ] **Spinner** (`src/components/ui/Spinner/`)
  - Loading indicator
  - Size and color variants

- [ ] **Toast/Alert** (`src/components/ui/Toast/`)
  - Success, error, warning, info variants
  - Auto-dismiss option
  - Position variants

- [ ] **IconButton** (`src/components/ui/IconButton/`)
  - Circle or square
  - Size variants
  - Tooltip support

### Testing:
- [ ] Create Storybook or component showcase page
- [ ] Test all variants and states
- [ ] Ensure accessibility (keyboard navigation, ARIA labels)
- [ ] Responsive behavior

---

## 🏗️ Phase 3: Layout & Navigation

**Duration**: 2 days  
**Status**: 📋 Pending Phase 2

### Goal:
Create the main layout structure with navigation and header.

### Components to Build:

#### 3.1 Layout Components (Day 1)
- [ ] **Sidebar** (`src/components/layout/Sidebar/`)
  - Logo section
  - Navigation items (Home, Gallery, Reports, Traps)
  - Active state highlighting
  - Mobile: Hamburger menu
  - Desktop: Fixed sidebar
  - Role-based menu items (admin vs viewer)

- [ ] **SidebarItem** (`src/components/layout/Sidebar/SidebarItem.jsx`)
  - Icon + label
  - Active state
  - Hover effects
  - Link component integration

#### 3.2 Header Components (Day 2)
- [ ] **Header** (`src/components/layout/Header/`)
  - System status indicator
  - Last updated timestamp
  - Notification bell
  - User profile (optional)
  - Mobile: Hamburger trigger

- [ ] **NotificationBell** (`src/components/layout/Header/NotificationBell.jsx`)
  - Bell icon with badge
  - Unread count
  - Dropdown with alerts
  - Mark as read functionality
  - "View all" link

- [ ] **MainLayout** (`src/components/layout/MainLayout/`)
  - Combines Sidebar + Header + Content
  - Responsive grid system
  - Mobile menu overlay

- [ ] **Container** (`src/components/layout/Container/`)
  - Content wrapper
  - Max-width constraints
  - Padding management

### Testing:
- [ ] Test responsive behavior (mobile, tablet, desktop)
- [ ] Test navigation between pages
- [ ] Test notification system
- [ ] Verify accessibility

---

## 📊 Phase 4: Charts & Visualizations

**Duration**: 1-2 days  
**Status**: 📋 Pending Phase 3

### Goal:
Implement data visualizations using Recharts.

### Components to Build:

- [ ] **GenderRatioPieChart** (`src/components/charts/GenderRatioPieChart/`)
  - Male (blue) vs Female (pink)
  - Percentage labels
  - Responsive sizing
  - Tooltips
  - Animation

- [ ] **TrendLineChart** (`src/components/charts/TrendLineChart/`)
  - Multi-line support (male, female, total)
  - X-axis: dates
  - Y-axis: count
  - Legend
  - Tooltips
  - Responsive

- [ ] **BarChart** (`src/components/charts/BarChart/`)
  - Trap performance comparison
  - Horizontal or vertical
  - Color customization
  - Tooltips
  - Responsive

### Testing:
- [ ] Test with mock data
- [ ] Verify responsive behavior
- [ ] Check accessibility
- [ ] Performance with large datasets

---

## 🎯 Phase 5: Feature Components

**Duration**: 2-3 days  
**Status**: 📋 Pending Phase 4

### Goal:
Build domain-specific components for CRB dashboard features.

### Components to Build:

#### 5.1 Dashboard Components (Day 1)
- [ ] **StatsCard** (`src/components/features/StatsCard/`)
  - Title, value, icon
  - Trend indicator
  - Color customization
  - Loading state

- [ ] **TrapStatusCard** (`src/components/features/TrapStatusCard/`)
  - Trap info display
  - Status badge
  - Battery level
  - Last update time
  - Click for details

- [ ] **StatusIndicator** (`src/components/features/StatusIndicator/`)
  - Colored dot/badge
  - Pulsing animation for critical
  - Label option

#### 5.2 Trap Management (Day 2)
- [ ] **TrapList** (`src/components/features/TrapList/`)
  - Grid/list view toggle
  - Search/filter
  - Sort options
  - Pagination

- [ ] **TrapListItem** (`src/components/features/TrapList/TrapListItem.jsx`)
  - Compact trap info
  - Action buttons (edit, delete)
  - Status indicator

- [ ] **TrapForm** (`src/components/features/TrapForm/`)
  - Add/Edit trap modal
  - Form validation
  - Location inputs
  - Status selector

#### 5.3 Image Gallery (Day 3)
- [ ] **ImageGrid** (`src/components/features/ImageGrid/`)
  - Responsive grid layout
  - Lazy loading
  - Masonry layout option
  - Loading skeleton

- [ ] **ImageCard** (`src/components/features/ImageGrid/ImageCard.jsx`)
  - Image with overlay
  - Trap ID badge
  - Date stamp
  - Click to enlarge

- [ ] **ImageModal** (`src/components/features/ImageGrid/ImageModal.jsx`)
  - Full-size image view
  - Previous/next navigation
  - Close button
  - Metadata display

- [ ] **ImageFilters** (`src/components/features/ImageFilters/`)
  - Trap ID dropdown
  - Sort by dropdown
  - Date range selector

#### 5.4 Alerts (Day 3)
- [ ] **AlertsList** (`src/components/features/AlertsList/`)
  - Alert items list
  - Filter by read/unread
  - Sort by date/severity

- [ ] **AlertItem** (`src/components/features/AlertsList/AlertItem.jsx`)
  - Alert icon (by type)
  - Message
  - Timestamp
  - Mark as read button
  - Severity color coding

### Testing:
- [ ] Integration with mock data
- [ ] User interactions
- [ ] Form validation
- [ ] Loading states

---

## 🔌 Phase 6: Context & State Management

**Duration**: 2 days  
**Status**: 📋 Pending Phase 5

### Goal:
Implement React Context providers and custom hooks.

### 6.1 Context Providers (Day 1)

- [ ] **AuthContext** (`src/context/AuthContext.jsx`)
  - User state
  - Role management (admin/viewer)
  - Login/logout functions
  - Auth checking

- [ ] **TrapsContext** (`src/context/TrapsContext.jsx`)
  - Traps state (array)
  - CRUD operations
  - Loading state
  - Error handling
  - Realtime subscription

- [ ] **StatisticsContext** (`src/context/StatisticsContext.jsx`)
  - Dashboard statistics
  - Fetch function
  - Auto-refresh (30s interval)
  - Gender ratio calculation

- [ ] **AlertsContext** (`src/context/AlertsContext.jsx`)
  - Alerts state
  - Unread count
  - Mark as read function
  - Realtime subscription

- [ ] **ImagesContext** (`src/context/ImagesContext.jsx`)
  - Images state
  - Filter state
  - Fetch with filters
  - Pagination

- [ ] **AppProvider** (`src/context/AppProvider.jsx`)
  - Combine all providers
  - Provider composition

### 6.2 Custom Hooks (Day 2)

- [ ] **useAuth** (`src/hooks/useAuth.js`)
  - Access AuthContext
  - Convenience functions

- [ ] **useTraps** (`src/hooks/useTraps.js`)
  - Access TrapsContext
  - Filtering utilities

- [ ] **useStatistics** (`src/hooks/useStatistics.js`)
  - Access StatisticsContext
  - Computed values

- [ ] **useAlerts** (`src/hooks/useAlerts.js`)
  - Access AlertsContext
  - Alert utilities

- [ ] **useImages** (`src/hooks/useImages.js`)
  - Access ImagesContext
  - Filter/sort utilities

- [ ] **useRealtime** (`src/hooks/useRealtime.js`)
  - Supabase realtime subscriptions
  - Auto-cleanup

- [ ] **useDebounce** (`src/hooks/useDebounce.js`)
  - Debounce hook for search

- [ ] **useMediaQuery** (`src/hooks/useMediaQuery.js`)
  - Responsive breakpoint detection

### Testing:
- [ ] Context provider functionality
- [ ] Hook return values
- [ ] State updates
- [ ] Error handling

---

## 🗄️ Phase 7: Services & API Integration

**Duration**: 2 days  
**Status**: 📋 Pending Phase 6

### Goal:
Create service layer for Supabase integration.

### Services to Create:

- [ ] **Supabase Client** (`src/services/supabase/client.js`)
  - Initialize Supabase client
  - Environment variable configuration

- [ ] **Auth Service** (`src/services/supabase/auth.service.js`)
  - Login function
  - Logout function
  - Get current user
  - Get user role
  - Password reset

- [ ] **Traps Service** (`src/services/supabase/traps.service.js`)
  - fetchTraps()
  - getTrapById()
  - createTrap()
  - updateTrap()
  - deleteTrap()

- [ ] **Images Service** (`src/services/supabase/images.service.js`)
  - fetchImages()
  - getImagesByTrapId()
  - getImagesByDateRange()
  - uploadImage() (if needed)

- [ ] **Alerts Service** (`src/services/supabase/alerts.service.js`)
  - fetchAlerts()
  - markAsRead()
  - markAllAsRead()
  - createAlert()

- [ ] **Realtime Service** (`src/services/supabase/realtime.service.js`)
  - subscribeTrapChanges()
  - subscribeAlerts()
  - unsubscribeAll()

### Database Setup:
- [ ] Create Supabase tables (from ARCHITECTURE.md schema)
- [ ] Set up Row Level Security policies
- [ ] Create database functions (if needed)
- [ ] Seed initial data

### Testing:
- [ ] API calls with mock Supabase
- [ ] Error handling
- [ ] Realtime subscriptions
- [ ] Data transformation

---

## 📱 Phase 8: Pages & Routes

**Duration**: 3-4 days  
**Status**: 📋 Pending Phase 7

### Goal:
Build all application pages and configure routing.

### 8.1 Routing Setup (Day 1)

- [ ] **Route Config** (`src/routes/routeConfig.js`)
  - Define all routes
  - Route metadata

- [ ] **Router Setup** (`src/routes/index.jsx`)
  - React Router configuration
  - Protected routes
  - Admin routes

- [ ] **ProtectedRoute** (`src/components/auth/ProtectedRoute/`)
  - Check authentication
  - Redirect to login if not authenticated
  - Role-based access

### 8.2 Pages (Days 2-4)

- [ ] **Login Page** (`src/pages/Login/`)
  - LoginForm component
  - Form validation
  - Error display
  - Remember me option
  - Redirect after login

- [ ] **Home Page** (`src/pages/Home/`)
  - Stats cards row (4 cards)
  - Gender ratio chart
  - Trap status list/grid
  - Real-time updates
  - Loading states

- [ ] **Image Gallery Page** (`src/pages/ImageGallery/`)
  - ImageFilters component
  - ImageGrid component
  - Pagination
  - Image modal
  - Loading skeleton

- [ ] **Reports Page** (`src/pages/Reports/`)
  - Date range selector
  - TrendLineChart (captures over time)
  - BarChart (trap performance)
  - Gender distribution chart
  - Data tables
  - Loading states

- [ ] **Trap Management Page** (`src/pages/TrapManagement/`)
  - TrapList component
  - Add trap button
  - TrapForm modal
  - Edit functionality
  - Delete confirmation
  - Admin only access

### Testing:
- [ ] Navigation between pages
- [ ] Protected route functionality
- [ ] Role-based access
- [ ] Loading states
- [ ] Error states

---

## 🔐 Phase 9: Authentication & Authorization

**Duration**: 1-2 days  
**Status**: 📋 Pending Phase 8

### Goal:
Implement complete authentication flow.

### Tasks:

- [ ] **Login Flow**
  - Login form submission
  - Token storage
  - User role retrieval
  - Redirect to dashboard

- [ ] **Logout Flow**
  - Clear session
  - Redirect to login
  - Clean up subscriptions

- [ ] **Auth Guard**
  - Check auth on app load
  - Auto-login if token valid
  - Redirect to login if needed

- [ ] **Role-Based UI**
  - Hide admin features from viewers
  - Show appropriate navigation
  - Disable restricted actions

- [ ] **Auth Components**
  - LoginForm with validation
  - Password reset (optional)
  - Profile management (optional)

### Testing:
- [ ] Login/logout flow
- [ ] Role switching
- [ ] Token expiration
- [ ] Protected routes

---

## 🔄 Phase 10: Real-time Features

**Duration**: 1-2 days  
**Status**: 📋 Pending Phase 9

### Goal:
Implement real-time updates and notifications.

### Tasks:

- [ ] **Trap Status Updates**
  - Subscribe to trap changes
  - Update UI on status change
  - Handle fallen traps
  - Battery level updates

- [ ] **Capture Updates**
  - Subscribe to new captures
  - Update statistics
  - Update gender ratio

- [ ] **Alert Notifications**
  - Subscribe to new alerts
  - Update notification bell
  - Show toast for critical alerts
  - Sound notification (optional)

- [ ] **Polling Fallback**
  - 30-second polling for non-realtime
  - Configurable interval
  - Pause when tab inactive

### Testing:
- [ ] Real-time subscription
- [ ] UI updates
- [ ] Notification display
- [ ] Performance

---

## 🎨 Phase 11: Polish & Optimization

**Duration**: 2-3 days  
**Status**: 📋 Pending Phase 10

### Goal:
Refine UI, optimize performance, fix bugs.

### Tasks:

- [ ] **UI Polish**
  - Animations and transitions
  - Loading skeletons
  - Empty states
  - Error boundaries
  - 404 page

- [ ] **Performance**
  - Code splitting
  - Lazy loading
  - Image optimization
  - Memoization
  - Bundle size analysis

- [ ] **Accessibility**
  - Keyboard navigation
  - Screen reader support
  - ARIA labels
  - Focus management
  - Color contrast

- [ ] **Responsive Design**
  - Test on mobile devices
  - Test on tablets
  - Test on different desktop sizes
  - Fix layout issues

- [ ] **Error Handling**
  - Network errors
  - API errors
  - Validation errors
  - User-friendly messages

### Testing:
- [ ] Cross-browser testing
- [ ] Mobile testing
- [ ] Accessibility audit
- [ ] Performance audit

---

## 🧪 Phase 12: Testing & QA

**Duration**: 2-3 days  
**Status**: 📋 Pending Phase 11

### Goal:
Comprehensive testing and quality assurance.

### Tasks:

- [ ] **Unit Tests**
  - Utility functions
  - Formatters
  - Helpers
  - Custom hooks

- [ ] **Integration Tests**
  - Context providers
  - Services
  - Page interactions

- [ ] **E2E Tests**
  - Login flow
  - Create trap flow
  - View images flow
  - Generate reports flow

- [ ] **Manual Testing**
  - Feature checklist
  - User scenarios
  - Edge cases
  - Error scenarios

- [ ] **Bug Fixes**
  - Prioritize bugs
  - Fix critical bugs
  - Fix medium/low bugs
  - Regression testing

### Testing Checklist:
- [ ] All features work as expected
- [ ] No console errors
- [ ] Responsive on all devices
- [ ] Accessible
- [ ] Performant

---

## 🚀 Phase 13: Deployment

**Duration**: 1-2 days  
**Status**: 📋 Pending Phase 12

### Goal:
Deploy application to production.

### Tasks:

- [ ] **Environment Setup**
  - Production environment variables
  - Supabase production project
  - Domain configuration

- [ ] **Build Optimization**
  - Production build
  - Bundle size optimization
  - Image optimization
  - Cache configuration

- [ ] **Deployment**
  - Choose platform (Vercel, Netlify, etc.)
  - Configure deployment
  - Set up CI/CD
  - Deploy to production

- [ ] **Post-Deployment**
  - Smoke testing
  - Monitor errors
  - Performance monitoring
  - User feedback collection

### Platform Options:
- Vercel (recommended for Vite/React)
- Netlify
- AWS Amplify
- Custom server

---

## 📊 Project Timeline Summary

| Phase | Duration | Status |
|-------|----------|--------|
| 1. Foundation | 1 day | ✅ Complete |
| 2. UI Components | 2-3 days | 📋 Ready |
| 3. Layout | 2 days | 📋 Pending |
| 4. Charts | 1-2 days | 📋 Pending |
| 5. Features | 2-3 days | 📋 Pending |
| 6. Context | 2 days | 📋 Pending |
| 7. Services | 2 days | 📋 Pending |
| 8. Pages | 3-4 days | 📋 Pending |
| 9. Auth | 1-2 days | 📋 Pending |
| 10. Realtime | 1-2 days | 📋 Pending |
| 11. Polish | 2-3 days | 📋 Pending |
| 12. Testing | 2-3 days | 📋 Pending |
| 13. Deployment | 1-2 days | 📋 Pending |

**Estimated Total**: 22-33 days (~5-7 weeks with a team of 8)

---

## 🎯 Priority Levels

### Must Have (MVP)
- ✅ Foundation
- 🔲 Basic UI components
- 🔲 Layout & navigation
- 🔲 Home page with stats
- 🔲 Gender ratio chart
- 🔲 Image gallery
- 🔲 Trap management (admin)
- 🔲 Authentication
- 🔲 Notification bell

### Should Have
- 🔲 Reports page
- 🔲 Real-time updates
- 🔲 Advanced filters
- 🔲 Responsive design
- 🔲 Error handling

### Nice to Have
- 🔲 Animations
- 🔲 PWA features
- 🔲 Offline mode
- 🔲 Advanced analytics
- 🔲 Data export

---

## 📝 Notes for Team of 8

### Suggested Team Split:

1. **Frontend Lead** (1 person)
   - Oversee architecture
   - Code reviews
   - Integration

2. **UI Components Team** (2 people)
   - Phase 2: UI component library
   - Phase 3: Layout components
   - Storybook/documentation

3. **Features Team** (2 people)
   - Phase 5: Feature components
   - Phase 8: Pages
   - User interactions

4. **Data/Backend Team** (2 people)
   - Phase 6: Context/state
   - Phase 7: Services
   - Supabase setup
   - Phase 10: Realtime

5. **QA/Testing** (1 person)
   - Testing framework setup
   - Write tests
   - Manual testing
   - Bug tracking

### Parallel Work Opportunities:
- UI components can be built in parallel
- Pages can be developed simultaneously
- Testing can start early with completed components
- Documentation throughout

---

## 🔄 Agile Approach

### Sprint Planning:
- **Sprint 1** (Week 1): Phases 2-3
- **Sprint 2** (Week 2): Phases 4-5
- **Sprint 3** (Week 3): Phases 6-7
- **Sprint 4** (Week 4): Phase 8
- **Sprint 5** (Week 5): Phases 9-10
- **Sprint 6** (Week 6): Phases 11-12
- **Sprint 7** (Week 7): Phase 13 + Buffer

### Daily Standups:
- What did you complete yesterday?
- What will you work on today?
- Any blockers?

### Sprint Reviews:
- Demo completed features
- Gather feedback
- Adjust priorities

---

**Last Updated**: October 29, 2025  
**Version**: 1.0.0  
**Status**: Foundation Complete, Ready for Phase 2
