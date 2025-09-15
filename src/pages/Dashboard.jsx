import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Welcome back, {user?.name}!
      </h1>
      
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Dashboard Overview</h2>
        <p className="text-gray-600">
          This is your dashboard. Here you can see your ticket statistics and recent activity.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;