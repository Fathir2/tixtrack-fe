import { useLocation } from "react-router-dom";
import NavItem from "./NavItem";

const NavList = ({ navigation, isCollapsed, onItemClick }) => {
  const location = useLocation();

  return (
    <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4">
      <div className="space-y-1.5">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          
          return (
            <NavItem
              key={item.name}
              item={item}
              isCollapsed={isCollapsed}
              isActive={isActive}
              onClick={onItemClick}
            />
          );
        })}
      </div>
    </nav>
  );
};

export default NavList;