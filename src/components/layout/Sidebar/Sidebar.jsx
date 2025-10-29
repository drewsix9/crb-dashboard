import { FileText, Home, Image, Settings } from 'lucide-react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

/**
 * Sidebar navigation component
 * Mobile: Collapsible overlay
 * Desktop: Fixed sidebar
 */
const Sidebar = ({ isOpen, onClose }) => {
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/gallery', icon: Image, label: 'Gallery' },
    { path: '/reports', icon: FileText, label: 'Reports' },
    { path: '/manage-traps', icon: Settings, label: 'Manage Traps' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-primary-700 text-white z-50
          transition-transform duration-300 ease-in-out
          w-64 lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo/Brand */}
        <div className="flex items-center justify-between p-6 border-b border-primary-600">
          <div>
            <h1 className="text-xl font-bold">CRB Monitor</h1>
            <p className="text-xs text-primary-200">Smart Trap Dashboard</p>
          </div>
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-primary-600 rounded-lg transition-colors"
            aria-label="Close sidebar"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-primary-800 text-white'
                          : 'text-primary-100 hover:bg-primary-600'
                      }`
                    }
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-primary-600">
          <div className="text-xs text-primary-200">
            <p>v1.0.0</p>
            <p>© 2025 CRB Monitor</p>
          </div>
        </div>
      </aside>
    </>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Sidebar;
