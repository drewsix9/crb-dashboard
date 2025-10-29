import PropTypes from 'prop-types';
import { useState } from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';

/**
 * Main layout component that wraps all pages
 * Includes responsive sidebar and header
 */
const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Header */}
        <Header onMenuClick={handleMenuClick} alertCount={1} />

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-4 px-4 lg:px-6">
          <div className="text-center text-sm text-gray-500">
            <p>CRB Smart Trap Monitoring System © 2025</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
