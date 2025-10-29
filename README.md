# 🦟 CRB Smart Trap Monitoring Dashboard

A modern, real-time monitoring dashboard for Coconut Rhinoceros Beetle (CRB) smart traps, built with React, Vite, and Supabase.

## 📋 Overview

This dashboard provides comprehensive monitoring and management capabilities for CRB smart trap systems, including:

- **Real-time Monitoring**: Live trap status updates every 30 seconds
- **Gender Ratio Analysis**: Visual breakdown of male vs female captures
- **Image Gallery**: Organized trap images with advanced filtering
- **Alert System**: Immediate notifications for fallen traps and maintenance needs
- **Trap Management**: Full CRUD operations for administrators
- **Reports & Analytics**: Data visualization and trend analysis

## 🚀 Tech Stack

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS 4
- **State Management**: React Context API
- **Database**: Supabase (PostgreSQL)
- **Charts**: Recharts
- **Routing**: React Router DOM v7
- **Icons**: Lucide React

## 📁 Project Structure

```
src/
├── components/       # Reusable React components
│   ├── ui/          # Design system components
│   ├── layout/      # Layout components
│   ├── charts/      # Chart components
│   ├── features/    # Feature-specific components
│   └── auth/        # Authentication components
├── context/         # React Context providers
├── hooks/           # Custom React hooks
├── pages/           # Page components
├── services/        # API services & mock data
├── styles/          # Global styles & theme
└── utils/           # Utility functions
```

## 🎨 Design System

The project includes a comprehensive design system with:
- **Color Palette**: Primary green, male blue, female pink, status colors
- **Typography**: Inter font family with defined scale
- **Spacing**: Consistent 4px increment system
- **Components**: Reusable UI components with variants

See `src/styles/theme.js` for complete design tokens.

## 📊 Features

### ✅ Implemented (Phase 1)
- [x] Complete folder structure
- [x] Design system & theme
- [x] Mock data generators
- [x] Utility functions
- [x] Comprehensive documentation

### 🔄 In Development
- [ ] UI component library
- [ ] Layout & navigation
- [ ] Chart components
- [ ] Feature components
- [ ] Context providers
- [ ] Supabase integration
- [ ] Pages & routing

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account (for production)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/drewsix9/crb-dashboard.git
cd crb-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your Supabase credentials
```

4. Start development server:
```bash
npm run dev
```

5. Open http://localhost:5173 in your browser

## 🔧 Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

## 📚 Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)**: Complete technical architecture
- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)**: Quick reference guide
- **[COMPONENT_MAP.md](./COMPONENT_MAP.md)**: Component structure
- **[ROADMAP.md](./ROADMAP.md)**: Development roadmap
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)**: Current status

## 🗄️ Mock Data

The project includes comprehensive mock data for development:
- **15 traps** (TRAP-001 to TRAP-015)
- **~227 captures** (last 30 days)
- **47 captures today** (28 male, 19 female)
- **5 sample alerts**
- **Complete statistics**

Access mock data:
```javascript
import { getMockStatistics, mockTraps } from '@/services/mockData';
```

## 🎯 Key Features

### Trap Monitoring
- Real-time status updates
- Battery level monitoring
- Location tracking
- Status indicators (active, offline, maintenance, fallen)

### Gender Analysis
- Male vs Female ratio visualization
- Pie chart representation
- Historical trends
- Real-time updates

### Image Gallery
- Filter by trap ID
- Sort by date or trap ID
- Date range filters (day, week, month)
- Lazy loading for performance

### Alert System
- Notification bell with badge
- Critical alerts (trap fallen)
- Maintenance reminders
- Real-time notifications

### Administration
- Add/Edit/Delete traps (admin only)
- Role-based access control
- User management
- System configuration

## 🔐 User Roles

- **Admin**: Full access + trap management
- **Viewer**: Read-only access to all data

## 🌐 Environment Variables

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_USE_MOCK_DATA=true          # Use mock data during development
VITE_FASTAPI_URL=fastapi-server   # FastAPI backend for image uploads
VITE_REALTIME_INTERVAL=30000      # Update interval (30 seconds)
```

## 🧪 Testing

Testing framework to be set up in Phase 12. Planned testing includes:
- Unit tests for utilities
- Integration tests for components
- E2E tests for user flows

## 📱 Responsive Design

Mobile-first approach with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 Deployment

Recommended platforms:
- **Vercel** (recommended)
- Netlify
- AWS Amplify

See [ROADMAP.md](./ROADMAP.md) Phase 13 for deployment guide.

## 👥 Team

Built for a thesis project by a team of 8:
- Frontend developers (4)
- Backend/Data developers (2)
- QA Engineer (1)
- Project Lead (1)

## 📅 Development Timeline

- **Phase 1**: Foundation & Planning ✅ (Complete)
- **Phase 2-5**: Components & Features (2-3 weeks)
- **Phase 6-7**: State & Services (1-2 weeks)
- **Phase 8-10**: Pages & Integration (2-3 weeks)
- **Phase 11-13**: Polish & Deploy (1-2 weeks)

**Estimated Total**: 6-10 weeks

## 📄 License

This project is part of a thesis work.

## 🤝 Contributing

This is a thesis project. Contributions are currently limited to the development team.

## 📧 Contact

For questions or support, contact the development team.

## 🙏 Acknowledgments

- Supabase for the excellent backend platform
- Recharts for data visualization
- Tailwind CSS for the styling framework
- The entire React ecosystem

---

**Version**: 1.0.0  
**Status**: Phase 1 Complete  
**Last Updated**: October 29, 2025
