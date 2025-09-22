import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  ChartBarSquareIcon, 
  HomeIcon,
  TicketIcon, 
  PlusCircleIcon, 
  UserIcon,
  ClipboardDocumentListIcon,
  UsersIcon,
  Cog6ToothIcon,
  ChevronRightIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Definisikan menu berdasarkan role
  const getNavigationByRole = (userRole) => {
    const baseNavigation = [
      { name: 'Dashboard', href: '/dashboard', icon: ChartBarSquareIcon },
    ];

    switch (userRole) {
      case 'admin':
        return [
          ...baseNavigation,
          { name: 'List Ticket', href: '/admin/tickets', icon: TicketIcon },
          { name: 'Profile', href: '/admin/tickets', icon: UserIcon },

        
      
        ];
      
      case 'user':
      default:
        return [
          ...baseNavigation,
          { name: 'Create Ticket', href: '/tickets/create', icon: PlusCircleIcon },
          { name: 'Profile', href: '/profile', icon: UserIcon },
        ];
    }
  };

  // Dapatkan navigation berdasarkan role user
  const navigation = getNavigationByRole(user?.role);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside className={`bg-gray-100 shadow-sm border-r border-gray-200 min-h-screen transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        {!isCollapsed && (
          <h2 className="text-lg font-semibold text-gray-900">
            {user?.role === 'admin' ? 'Admin Panel' : 'Help Desk'}
          </h2>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-gray-100 transition-colors"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronRightIcon className={`h-5 w-5 text-gray-500 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>
      
      {/* Navigation */}
      <nav className="mt-8 px-4">
        <div className="space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={`
                  group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200
                  ${isActive
                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
                title={isCollapsed ? item.name : ''}
              >
                <item.icon className={`h-5 w-5 flex-shrink-0 ${isCollapsed ? 'mx-auto' : 'mr-3'}`} />
                {!isCollapsed && (
                  <span className="transition-opacity duration-200">{item.name}</span>
                )}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity shadow-md z-10">
                    {item.name}
                  </div>
                )}
              </NavLink>
            );
          })}
        </div>
        
        {/* User info and logout */}
        <div className={`mt-8 ${isCollapsed ? 'px-2' : 'px-3'} py-3 bg-gray-50 rounded-lg`}>
          {!isCollapsed && (
            <>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Current Role
              </p>
              <p className="mt-1 text-sm font-medium text-gray-900 capitalize">
                {user?.role || 'user'}
              </p>
              <p className="mt-2 text-xs text-gray-500 truncate">
                {user?.email}
              </p>
            </>
          )}
          
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;