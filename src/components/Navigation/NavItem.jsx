import { NavLink } from "react-router-dom";

const NavItem = ({ item, isCollapsed, isActive, onClick }) => {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.href}
      onClick={onClick}
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
      
      {/* Tooltip untuk collapsed state */}
      {isCollapsed && (
        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
          {item.name}
        </div>
      )}
    </NavLink>
  );
};

export default NavItem;