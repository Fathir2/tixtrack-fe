import React from 'react';

const StatisticCard = ({ title, value, change, changeType, icon: Icon }) => {
  const getChangeColor = () => {
    if (changeType === 'increase') return 'text-green-600';
    if (changeType === 'decrease') return 'text-red-600';
    return 'text-gray-600';
  };

  const getChangeIcon = () => {
    if (changeType === 'increase') return '↗';
    if (changeType === 'decrease') return '↘';
    return '';
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        {Icon && (
          <div className="p-3 bg-blue-50 rounded-full">
            <Icon className="w-6 h-6 text-blue-600" />
          </div>
        )}
      </div>
      {change && (
        <div className="mt-4 flex items-center">
          <span className={`text-sm font-medium ${getChangeColor()}`}>
            {getChangeIcon()} {change}
          </span>
          <span className="text-sm text-gray-500 ml-2">vs bulan lalu</span>
        </div>
      )}
    </div>
  );
};

export default StatisticCard;