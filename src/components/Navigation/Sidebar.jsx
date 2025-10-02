import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getNavigationByRole } from "./navigationConfig";
import MobileMenuButton from "./MobileMenu";
import SidebarHeader from "./SidebarHeader";
import NavigationList from "./NavList";
import SidebarFooter from "./SidebarFooter";

const Sidebar = () => {
  const { user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigation = getNavigationByRole(user?.role);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <MobileMenuButton 
        isOpen={isMobileOpen} 
        onClick={toggleMobileMenu} 
      />

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
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
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Header */}
        <SidebarHeader
          isCollapsed={isCollapsed}
          onToggle={toggleSidebar}
          user={user}
        />

        {/* Navigation */}
        <NavigationList
          navigation={navigation}
          isCollapsed={isCollapsed}
          onItemClick={closeMobileMenu}
        />

        {/* Footer */}
        <SidebarFooter 
          isCollapsed={isCollapsed} 
          user={user} 
        />
      </aside>
    </>
  );
};

export default Sidebar;