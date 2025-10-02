const SidebarFooter = ({ isCollapsed, user }) => {
  return (
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
  );
};

export default SidebarFooter;