# Component Architecture Map

## 📦 Component Hierarchy

```
App
├── AppProvider (Context wrapper)
│   ├── AuthProvider
│   ├── TrapsProvider
│   ├── StatisticsProvider
│   ├── AlertsProvider
│   └── ImagesProvider
│
└── Router
    ├── Login Page
    │   └── LoginForm
    │
    └── MainLayout
        ├── Sidebar
        │   ├── Logo
        │   └── SidebarItem (x4)
        │       ├── Home
        │       ├── Image Gallery
        │       ├── Reports
        │       └── Manage Traps (Admin only)
        │
        ├── Header
        │   ├── SystemStatus
        │   ├── LastUpdated
        │   └── NotificationBell
        │       └── AlertDropdown
        │           └── AlertItem (multiple)
        │
        └── Page Content
            ├── Home Page
            │   ├── StatsRow
            │   │   ├── StatsCard (Total CRB)
            │   │   ├── StatsCard (Male)
            │   │   ├── StatsCard (Female)
            │   │   └── StatsCard (Active Traps)
            │   │
            │   ├── ChartsSection
            │   │   └── GenderRatioPieChart
            │   │
            │   └── TrapSection
            │       └── TrapList
            │           └── TrapStatusCard (x15)
            │
            ├── Image Gallery Page
            │   ├── ImageFilters
            │   │   ├── TrapIdSelect
            │   │   ├── SortBySelect
            │   │   └── DateRangeSelect
            │   │
            │   └── ImageGrid
            │       ├── ImageCard (multiple)
            │       └── ImageModal (on click)
            │
            ├── Reports Page
            │   ├── DateRangeSelector
            │   ├── TrendLineChart
            │   ├── BarChart (Trap Performance)
            │   └── DataTable
            │
            └── Trap Management Page (Admin)
                ├── TrapList
                │   └── TrapListItem (x15)
                │       ├── EditButton
                │       └── DeleteButton
                │
                ├── AddTrapButton
                └── TrapForm (Modal)
                    ├── TrapIdInput
                    ├── NameInput
                    ├── LocationInputs
                    ├── StatusSelect
                    └── SubmitButton
```

---

## 🧩 UI Component Library

### Button Component
```jsx
<Button 
  variant="primary|secondary|outline|danger"
  size="sm|md|lg"
  icon={<Icon />}
  loading={boolean}
  disabled={boolean}
>
  Click Me
</Button>
```

**Variants**:
- `primary`: Green background, white text
- `secondary`: Gray background
- `outline`: Border only
- `danger`: Red background

---

### Card Component
```jsx
<Card 
  variant="default|elevated|bordered"
  padding="sm|md|lg"
  className={string}
>
  <CardHeader>Title</CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>
```

**Usage**: Stats cards, trap cards, alert cards

---

### Badge Component
```jsx
<Badge 
  variant="success|warning|danger|info"
  size="sm|md|lg"
>
  Active
</Badge>
```

**Mapping**:
- Active → `success` (green)
- Offline → `danger` (red)
- Maintenance → `warning` (orange)
- Fallen → `danger` (dark red)

---

### Input Component
```jsx
<Input 
  type="text|number|email|password"
  placeholder={string}
  value={string}
  onChange={function}
  error={string}
  icon={<Icon />}
  disabled={boolean}
/>
```

---

### Select Component
```jsx
<Select 
  options={array}
  value={string}
  onChange={function}
  placeholder={string}
  disabled={boolean}
/>
```

**Example**:
```jsx
<Select 
  options={[
    { value: 'date', label: 'Sort by Date' },
    { value: 'trap_id', label: 'Sort by Trap ID' },
  ]}
  value={sortBy}
  onChange={setSortBy}
/>
```

---

### Modal Component
```jsx
<Modal 
  isOpen={boolean}
  onClose={function}
  title={string}
  size="sm|md|lg|xl"
>
  <ModalContent>
    Content
  </ModalContent>
  <ModalFooter>
    <Button onClick={onClose}>Cancel</Button>
    <Button onClick={onSubmit}>Submit</Button>
  </ModalFooter>
</Modal>
```

---

### Spinner Component
```jsx
<Spinner 
  size="sm|md|lg"
  color="primary|white"
/>
```

---

## 📊 Chart Components

### GenderRatioPieChart
```jsx
<GenderRatioPieChart 
  male={28}
  female={19}
  width={300}
  height={300}
/>
```

**Features**:
- Uses Recharts PieChart
- Male: Blue (#60a5fa)
- Female: Pink (#f472b6)
- Shows percentage labels
- Animated transitions

---

### TrendLineChart
```jsx
<TrendLineChart 
  data={dailyData}
  xKey="date"
  lines={[
    { key: 'male', color: '#60a5fa', name: 'Male' },
    { key: 'female', color: '#f472b6', name: 'Female' },
  ]}
/>
```

---

### BarChart
```jsx
<BarChart 
  data={trapPerformance}
  xKey="trap_id"
  yKey="captures"
  color="#22c55e"
/>
```

---

## 🎯 Feature Components

### StatsCard
```jsx
<StatsCard 
  title="Total CRB Detected Today"
  value={47}
  icon={<TrendingUpIcon />}
  color="green"
  trend="+12%"
/>
```

**Props**:
- `title`: Card title
- `value`: Main statistic
- `icon`: Icon component
- `color`: Theme color
- `trend`: Optional trend indicator

---

### TrapStatusCard
```jsx
<TrapStatusCard 
  trap={{
    id: '1',
    trap_id: 'TRAP-001',
    name: 'North Field Trap 1',
    status: 'active',
    last_update: '2025-01-15T14:30:25',
    battery_level: 85,
  }}
  onClick={handleClick}
/>
```

**Display**:
- Trap ID (formatted)
- Trap name
- Status badge
- Last update (relative time)
- Battery indicator
- Click for details

---

### StatusIndicator
```jsx
<StatusIndicator 
  status="active|offline|maintenance|fallen"
  showLabel={boolean}
  size="sm|md|lg"
/>
```

**Visual**:
- Colored dot/circle
- Optional text label
- Pulsing animation for offline/fallen

---

### ImageCard
```jsx
<ImageCard 
  image={{
    id: '1',
    trap_id: '1',
    image_url: '/path/to/image.jpg',
    taken_at: '2025-01-15T10:23:00',
  }}
  onClick={handleClick}
/>
```

**Features**:
- Lazy loading
- Placeholder while loading
- Hover overlay
- Trap ID badge
- Date stamp
- Click to open modal

---

### ImageFilters
```jsx
<ImageFilters 
  filters={{
    trapId: null,
    sortBy: 'date',
    dateRange: 'month',
  }}
  onFilterChange={handleFilterChange}
  traps={trapList}
/>
```

**Controls**:
1. Trap ID dropdown (all traps + "All")
2. Sort by dropdown (date, trap_id)
3. Date range dropdown (day, week, month)

---

### AlertsList
```jsx
<AlertsList 
  alerts={alerts}
  onMarkAsRead={handleMarkAsRead}
  maxDisplay={5}
/>
```

**Display**:
- Alert icon (based on type)
- Alert message
- Trap ID
- Time ago
- Mark as read button
- Severity color coding

---

### NotificationBell
```jsx
<NotificationBell 
  unreadCount={3}
  alerts={recentAlerts}
  onMarkAsRead={handleMarkAsRead}
  onMarkAllAsRead={handleMarkAllAsRead}
/>
```

**Features**:
- Bell icon
- Unread badge (count)
- Click to toggle dropdown
- Shows recent alerts (max 5)
- "Mark all as read" button
- "View all" link

---

## 🔄 Context Usage Patterns

### useAuth Hook
```jsx
const MyComponent = () => {
  const { 
    user, 
    role, 
    isAdmin, 
    isViewer, 
    login, 
    logout 
  } = useAuth();
  
  if (!user) return <LoginForm />;
  
  return (
    <div>
      {isAdmin && <AdminPanel />}
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};
```

---

### useTraps Hook
```jsx
const MyComponent = () => {
  const { 
    traps, 
    loading, 
    error,
    fetchTraps,
    addTrap,
    updateTrap,
    deleteTrap,
  } = useTraps();
  
  useEffect(() => {
    fetchTraps();
  }, []);
  
  if (loading) return <Spinner />;
  if (error) return <Error message={error} />;
  
  return (
    <div>
      {traps.map(trap => (
        <TrapCard key={trap.id} trap={trap} />
      ))}
    </div>
  );
};
```

---

### useStatistics Hook
```jsx
const MyComponent = () => {
  const { 
    stats,
    fetchStatistics,
  } = useStatistics();
  
  return (
    <div>
      <StatsCard 
        title="Total Today"
        value={stats.totalToday}
      />
      <GenderRatioPieChart 
        male={stats.maleCRB}
        female={stats.femaleCRB}
      />
    </div>
  );
};
```

---

### useAlerts Hook
```jsx
const MyComponent = () => {
  const { 
    alerts,
    unreadCount,
    markAsRead,
    markAllAsRead,
  } = useAlerts();
  
  return (
    <NotificationBell 
      unreadCount={unreadCount}
      alerts={alerts}
      onMarkAsRead={markAsRead}
      onMarkAllAsRead={markAllAsRead}
    />
  );
};
```

---

### useImages Hook
```jsx
const MyComponent = () => {
  const { 
    images,
    filters,
    updateFilters,
    fetchImages,
  } = useImages();
  
  const handleFilterChange = (newFilters) => {
    updateFilters(newFilters);
    fetchImages(newFilters);
  };
  
  return (
    <>
      <ImageFilters 
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      <ImageGrid images={images} />
    </>
  );
};
```

---

## 🎨 Layout Structure

### MainLayout
```
┌─────────────────────────────────────────────────────┐
│ Header                                               │
│ [System Online] [Last Updated] [🔔 Notifications]   │
├──────────┬──────────────────────────────────────────┤
│          │                                          │
│ Sidebar  │ Page Content                            │
│          │                                          │
│ [Home]   │ (Dynamic based on route)                │
│ [Gallery]│                                          │
│ [Reports]│                                          │
│ [Traps]  │                                          │
│          │                                          │
└──────────┴──────────────────────────────────────────┘
```

### Mobile Layout
```
┌─────────────────────────────────┐
│ ☰ [Logo] [🔔]                  │ ← Header
├─────────────────────────────────┤
│                                 │
│ Page Content (Full Width)       │
│                                 │
│                                 │
│                                 │
│                                 │
│                                 │
└─────────────────────────────────┘

(Sidebar becomes drawer/overlay)
```

---

## 🔐 Protected Route Pattern

```jsx
<Routes>
  <Route path="/login" element={<Login />} />
  
  <Route element={<ProtectedRoute />}>
    <Route path="/" element={<Home />} />
    <Route path="/gallery" element={<ImageGallery />} />
    <Route path="/reports" element={<Reports />} />
    
    <Route element={<AdminRoute />}>
      <Route path="/traps" element={<TrapManagement />} />
    </Route>
  </Route>
</Routes>
```

---

**Version**: 1.0.0  
**Last Updated**: October 29, 2025
