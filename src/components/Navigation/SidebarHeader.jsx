import { TicketIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const SidebarHeader = ({ isCollapsed, onToggle, user }) => {
  return (
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
        onClick={onToggle}
        className="hidden lg:flex p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
      >
        <ChevronRightIcon
          className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${
            isCollapsed ? "rotate-180" : ""
          }`}
        />
      </button>
    </div>
  );
};

export default SidebarHeader;