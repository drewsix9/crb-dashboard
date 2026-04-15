import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AuthLayout from "./components/layout/AuthLayout";
import MainLayout from "./components/layout/MainLayout";
import { AuthProvider } from "./contexts/AuthContext";
import { DataModeProvider } from "./contexts/DataModeContext";
import ChartsShowcase from "./pages/ChartsShowcase";
import ComponentShowcase from "./pages/ComponentShowcase";
import GalleryPage from "./pages/GalleryPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ManageTrapsPage from "./pages/ManageTrapsPage";
import ReportsPage from "./pages/ReportsPage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataModeProvider>
          <Routes>
            {/* Login route - unprotected */}
            <Route
              path="/login"
              element={
                <AuthLayout>
                  <LoginPage />
                </AuthLayout>
              }
            />

            {/* Main app routes with layout - protected */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <HomePage />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/gallery"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <GalleryPage />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <ReportsPage />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <ReportsPage />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage-traps"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <ManageTrapsPage />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            {/* Component showcase (for testing) */}
            <Route path="/showcase" element={<ComponentShowcase />} />
            <Route path="/charts" element={<ChartsShowcase />} />
          </Routes>
        </DataModeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
