import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar';
import Header from './header';

const Layout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;