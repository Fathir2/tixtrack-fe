import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ChartBarSquareIcon, TicketIcon, PlusCircleIcon, UserIcon } from '@heroicons/react/24/outline';

const Sidebar = () => {
  const { user } = useAuth(); // Meskipun tidak digunakan di sini, biarkan saja sesuai contoh

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: ChartBarSquareIcon }, // Menggunakan komponen ikon
    { name: 'Tickets', href: '/tickets', icon: TicketIcon },
    { name: 'Create Ticket', href: '/tickets/create', icon: PlusCircleIcon },
    { name: 'Profile', href: '/profile', icon: UserIcon },
  ];

  return (
    <aside className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
      <nav className="mt-8 px-4">
        <div className="space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-blue-100 text-blue-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <item.icon className="mr-3 h-6 w-6" /> {/* Render komponen ikon */}
              {item.name}
            </NavLink>
          ))}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;