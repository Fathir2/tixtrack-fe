import React from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const PieChart = ({ data }) => {
  const total = data.open + data.in_progress + data.resolved + data.rejected;
  
  const chartData = [
    { label: 'Open', value: data.open, color: '#3B82F6' },
    { label: 'In Progress', value: data.in_progress, color: '#F59E0B' },
    { label: 'Resolved', value: data.resolved, color: '#10B981' },
    { label: 'Rejected', value: data.rejected, color: '#EF4444' }
  ].filter(item => item.value > 0);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Distribusi Status</h3>
      
      <div className="flex items-center justify-center">
        <div className="w-60 h-60 relative">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </RechartsPieChart>
          </ResponsiveContainer>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{total}</div>
              <div className="text-sm text-gray-500">Total</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        {chartData.map((segment) => (
          <div key={segment.label} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: segment.color }}></div>
              <span className="text-sm text-gray-600">{segment.label}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-900">{segment.value}</span>
              <span className="text-xs text-gray-500">
                ({total > 0 ? Math.round((segment.value / total) * 100) : 0}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChart;