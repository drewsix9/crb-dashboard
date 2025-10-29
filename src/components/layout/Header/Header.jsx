import { Bell, Menu, Wifi, WifiOff } from 'lucide-react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Badge from '../../ui/Badge';
import IconButton from '../../ui/IconButton';

/**
 * Header component with system status and notifications
 */
const Header = ({ onMenuClick, alertCount = 0 }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [lastUpdated] = useState(new Date());

  // Format last updated time
  const formatLastUpdated = () => {
    const now = new Date();
    const diff = Math.floor((now - lastUpdated) / 1000); // seconds
    
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 py-3 lg:px-6">
        {/* Left: Menu button (mobile) */}
        <div className="flex items-center gap-4">
          <IconButton
            onClick={onMenuClick}
            variant="ghost"
            size="md"
            tooltip="Open menu"
            className="lg:hidden"
          >
            <Menu size={24} />
          </IconButton>

          {/* Page title - hidden on mobile, shown on desktop */}
          <h2 className="hidden lg:block text-xl font-semibold text-gray-900">
            Dashboard
          </h2>
        </div>

        {/* Right: System status and notifications */}
        <div className="flex items-center gap-3">
          {/* System Status */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg">
            {isOnline ? (
              <>
                <Wifi size={16} className="text-green-600" />
                <span className="text-sm text-gray-700">Online</span>
              </>
            ) : (
              <>
                <WifiOff size={16} className="text-red-600" />
                <span className="text-sm text-gray-700">Offline</span>
              </>
            )}
          </div>

          {/* Last Updated */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg">
            <span className="text-xs text-gray-500">Updated:</span>
            <span className="text-sm font-medium text-gray-700">
              {formatLastUpdated()}
            </span>
          </div>

          {/* Notifications */}
          <div className="relative">
            <IconButton
              onClick={() => setShowNotifications(!showNotifications)}
              variant="ghost"
              size="md"
              tooltip="Notifications"
            >
              <Bell size={20} />
              {alertCount > 0 && (
                <span className="absolute top-0 right-0 flex h-5 w-5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 items-center justify-center">
                    <span className="text-xs text-white font-bold">
                      {alertCount > 9 ? '9+' : alertCount}
                    </span>
                  </span>
                </span>
              )}
            </IconButton>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {alertCount === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      No new notifications
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-100">
                      {/* Sample notification - will be replaced with real data */}
                      <div className="p-4 hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-start gap-3">
                          <Badge variant="danger" size="sm">
                            Alert
                          </Badge>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              Trap TRAP-003 has fallen
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              5 minutes ago
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {alertCount > 0 && (
                  <div className="p-3 border-t border-gray-200 bg-gray-50">
                    <button className="text-sm text-primary-700 hover:text-primary-800 font-medium w-full text-center">
                      View all notifications
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  onMenuClick: PropTypes.func.isRequired,
  alertCount: PropTypes.number,
};

export default Header;
