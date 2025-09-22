import React from 'react';
import { useAuth } from '../context/AuthContext';
import Statistics from '../components/common/Statistic';
import { NavLink } from 'react-router-dom';


const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.name}!
        </h1>
        <div className="flex items-center space-x-4 ">
          {user?.role === 'user' && (
            <NavLink
              to="/tickets/create"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium mr-13 transition-colors"
            >
              Create Ticket
            </NavLink>
          )}
        </div>
      </div>
      
      
      <Statistics />
    </div>
  );
};

export default Dashboard;