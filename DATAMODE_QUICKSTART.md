---
title: "Developer Quick Start - Supabase Integration"
---

# 🚀 Quick Start Guide

## Toggle Data Mode

**In any page header, click the toggle:**

```
📋 Mock Data ←→ 🔴 Live DB
```

Persists to localStorage. Triggers page re-fetch with new data source.

---

## Using Real Supabase Data

### Prerequisites

```bash
# .env file must have:
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-key
```

### Test the Integration

1. **HomePage:** Stats should show real beetle counts from DB

   ```
   Toggle → 🔴 Live DB
   Stats cards update with real capture counts
   Trend chart shows real daily aggregations
   ```

2. **GalleryPage:** Images load from Supabase bucket

   ```
   Toggle → 🔴 Live DB
   Image grid populates from trap-images bucket
   Click image → Modal shows ML detection results
   ```

3. **ReportsPage:** Charts use real aggregations
   ```
   Toggle → 🔴 Live DB
   Summary cards calculate from detection_results
   Charts show real trap performance rankings
   ```

---

## Using Mock Data (Development)

**No setup required!** Default is `📋 Mock Data`.

- Pre-populated with realistic ~227 captures
- Gender distribution (~60% male, ~40% female)
- 15 sample traps with various statuses
- Hardcoded 30-day trends

---

## How the Data Layer Works

```javascript
// In any page using real data:

// 1. Get the data mode hook
const { mode } = useDataMode(); // 'mock' or 'live'

// 2. Use a data hook that switches automatically
const { images, loading, error } = useImageGalleryData();
// Internally handles:
// - createImagesService(mode)
// - Route to mock or Supabase
// - Cache management
// - Error handling

// 3. Render as normal
return (
  {loading && <Spinner />}
  {error && <ErrorAlert />}
  {images.map(img => <ImageCard key={img.id} image={img} />)}
)
```

---

## Detection Results in Modal

**What's displayed when viewing image details in Live DB mode:**

```javascript
{
  detection_results: {
    beetle_count: 15,           // Total beetles detected
    male_count: 9,              // Male beetles (%)
    female_count: 5,            // Female beetles (%)
    unknown_count: 1,           // Unclassified
    confidence_score: 0.92,     // Model confidence (92%)
    model_name: "YOLOv8",       // Model used
    model_version: "1.2.3",     // Version
    inference_time_ms: 245,     // Time to run detection (ms)
  }
}
```

---

## Cache Behavior

| Data Type  | TTL    | Notes                          |
| ---------- | ------ | ------------------------------ |
| Traps      | 5 min  | Refreshes HomePage/filters     |
| Statistics | 5 min  | Refreshes stats cards          |
| Images     | 10 min | Gallery loads once then cached |
| Charts     | 15 min | Reports load once then cached  |

**Force refresh:**

- Click "Refresh" button in UI (if available)
- Hard refresh browser (Ctrl+F5)
- Toggle mode (clears all caches)

---

## Adding New Data Hooks

**Template for new pages:**

```javascript
// src/hooks/useNewPageData.js
import { useState, useEffect } from "react";
import { useDataMode } from "../contexts/DataModeContext";
import { createTrapsService } from "../services/dataAdapter";

export const useNewPageData = () => {
  const { mode } = useDataMode();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const service = createTrapsService(mode);
        const result = await service.getAll();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [mode]); // Re-fetch when mode changes

  return { data, loading, error };
};
```

**Use in page:**

```javascript
const { data, loading, error } = useNewPageData();
```

---

## Supabase Queries Reference

**All available queries in `src/services/supabaseQueries.js`:**

```javascript
// Traps
getTrapsFromDB(); // All traps
getTrapFromDB(trapId); // Single trap
getTrapsByStatusFromDB(status); // Filter by status

// Images with Detection Results
getImageUploadsWithDetection(filters); // Full JOIN
getDetectionByImageId(imageId); // Single detection

// Statistics & Analytics
getTrapStatisticsFromDB(filters); // Aggregated counts
getChartDataFromDB((days = 30)); // Daily trends
getTrapPerformanceData(); // Top traps ranking

// Utilities
getImageUrl(trapId, imageFilename); // Construct bucket URL
```

---

## Common Patterns

### Pattern 1: Display Real Data with Fallback to Mock

```javascript
const { traps, error } = useHomePageData();
// If Supabase fails → falls back to mock data automatically
// Error message shown to user, but page still renders
```

### Pattern 2: Filter by Trap

```javascript
const { images } = useImageGalleryData();
const trapImages = images.filter((img) => img.trap_id === selectedTrap);
// Works the same in both mock and live modes
```

### Pattern 3: Show Detection Metadata

```javascript
{
  image.detection && (
    <div>
      <p>Beetles: {image.detection.beetle_count}</p>
      <p>Confidence: {(image.detection.confidence_score * 100).toFixed(1)}%</p>
      <p>
        Model: {image.detection.model_name} v{image.detection.model_version}
      </p>
    </div>
  );
}
```

---

## Debugging

### Check what mode is active

```javascript
console.log(localStorage.getItem("dataMode")); // 'mock' or 'live'
```

### Monitor Supabase queries

```
DevTools → Network → Filter by "supabase"
See all GraphQL/REST queries being sent
```

### Check cache contents

```javascript
// In browser console, before pages load detection results from Supabase
// The supabaseServices have CACHE object tracked internally
// Look at logs to see cache hit/miss behavior
```

### Test a query manually

```javascript
// In browser console:
import("./services/supabaseQueries").then((m) => {
  m.getTrapsFromDB().then(console.log);
});
```

---

## Environment Setup

**.env file:**

```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhd...
```

**Verify connection:**

```javascript
// In browser console:
import("./supabase").then((m) => console.log(m.supabase));
// Should show Supabase client instance
```

---

## Troubleshooting

| Problem             | Solution                                                                |
| ------------------- | ----------------------------------------------------------------------- |
| Images don't load   | Check bucket name is `trap-images`; verify URL construction in DevTools |
| Stats are zeros     | Verify DB has data; check detection_results table in Supabase dashboard |
| Toggle doesn't work | Check DataModeProvider wraps <App /> in App.jsx                         |
| Cache not clearing  | Manually toggle mode or Ctrl+F5 hard refresh                            |
| Auth errors         | Verify RLS policies allow authenticated read access                     |

---

## What to Commit

When ready to merge to main:

```bash
# New data layer files
git add src/services/dataAdapter.js
git add src/services/supabaseQueries.js
git add src/services/dataTransformers.js
git add src/services/supabaseServices.js

# New hooks & contexts
git add src/hooks/useHomePageData.js
git add src/hooks/useImageGalleryData.js
git add src/contexts/DataModeContext.jsx

# UI component
git add src/components/ui/DataModeToggle/

# Updated pages
git add src/pages/HomePage.jsx
git add src/pages/GalleryPage.jsx
git add src/pages/ReportsPage.jsx

# Updated root files
git add src/App.jsx
git add src/components/ui/index.js

# Documentation
git add SUPABASE_INTEGRATION_SUMMARY.md
```

---

**Status:** Ready for local testing  
**Next:** Verify Supabase connection and test in browser
