import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  ChartBarSquareIcon,
  TicketIcon,
  PlusCircleIcon,
  ChevronRightIcon,
  Bars3Icon,
  XMarkIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Definisikan menu berdasarkan role
  const getNavigationByRole = (userRole) => {
    const baseNavigation = [
      {
        name: "Dashboard",
        href: "/dashboard",
        icon: ChartBarSquareIcon,
        description: "Overview & Stats",
      },
    ];

    const settingsNav = {
      name: "Settings",
      href: `/${userRole}/settings`,
      icon: Cog6ToothIcon,
      description: "Account Settings",
    };

    switch (userRole) {
      case "admin":
        return [
          ...baseNavigation,
          {
            name: "Tickets",
            href: "/admin/tickets",
            icon: TicketIcon,
            description: "Manage Tickets",
          },
          settingsNav,
        ];

      case "user":
      default:
        return [
          ...baseNavigation,
          {
            name: "Create Ticket",
            href: "/tickets/create",
            icon: PlusCircleIcon,
            description: "New Support Ticket",
          },
          settingsNav,
        ];
    }
  };

  const navigation = getNavigationByRole(user?.role);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Mobile Menu Button - Improved positioning */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl bg-white shadow-xl border border-gray-100 hover:bg-gray-50 transition-colors"
      >
        {isMobileOpen ? (
          <XMarkIcon className="h-5 w-5 text-gray-700" />
        ) : (
          <Bars3Icon className="h-5 w-5 text-gray-700" />
        )}
      </button>

      {/* Improved Mobile Overlay with animation */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Redesigned Sidebar */}
      <aside
        className={`
          ${
            isMobileOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
          fixed lg:sticky top-0 left-0 z-40 h-screen
          bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900
          shadow-2xl transition-all duration-300 ease-in-out
          ${isCollapsed ? "w-20" : "w-72"}
          flex flex-col
        `}
      >
        {/* Improved Header */}
        <div className="h-16 px-4 border-b border-gray-700/50 flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="relative flex-shrink-0">
                <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <TicketIcon className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="min-w-0">
                <h2 className="text-base font-bold text-white truncate">
                  {user?.role === "admin" ? "Admin Panel" : "TixTrack"}
                </h2>
              </div>
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="hidden lg:flex p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
          >
            <ChevronRightIcon
              className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${
                isCollapsed ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Improved Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <div className="space-y-1.5">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`
                    group relative flex items-center px-3 py-2.5 rounded-lg
                    transition-all duration-200 ease-out
                    ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }
                  `}
                >
                  <Icon
                    className={`h-5 w-5 flex-shrink-0 ${
                      isCollapsed ? "mx-auto" : "mr-3"
                    }`}
                  />
                  {!isCollapsed && (
                    <span className="text-sm font-medium truncate">
                      {item.name}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Profile Footer - Always visible */}
        <div className="p-4 border-t border-gray-700/50">
          {isCollapsed ? (
            // Collapsed profile view
            <div className="flex justify-center">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 cursor-pointer hover:scale-105 transition-transform">
                <span className="text-white font-medium text-sm">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          ) : (
            // Expanded profile view
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-medium text-sm">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-400 truncate capitalize">
                  {user?.role}
                </p>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;