import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MainLayout from './components/layout/MainLayout';
import ChartsShowcase from './pages/ChartsShowcase';
import ComponentShowcase from './pages/ComponentShowcase';
import GalleryPage from './pages/GalleryPage';
import HomePage from './pages/HomePage';
import ManageTrapsPage from './pages/ManageTrapsPage';
import ReportsPage from './pages/ReportsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main app routes with layout */}
        <Route
          path="/"
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />
        <Route
          path="/gallery"
          element={
            <MainLayout>
              <GalleryPage />
            </MainLayout>
          }
        />
        <Route
          path="/reports"
          element={
            <MainLayout>
              <ReportsPage />
            </MainLayout>
          }
        />
        <Route
          path="/manage-traps"
          element={
            <MainLayout>
              <ManageTrapsPage />
            </MainLayout>
          }
        />
        
        {/* Component showcase (for testing) */}
        <Route path="/showcase" element={<ComponentShowcase />} />
        <Route path="/charts" element={<ChartsShowcase />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
