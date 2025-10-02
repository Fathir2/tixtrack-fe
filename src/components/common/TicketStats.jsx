import React from 'react';

const TicketStats = ({ tickets, filteredTickets }) => {
  const getStatusCount = (status) => {
    return filteredTickets.filter(ticket => ticket.status === status).length;
  };

  const stats = [
    {
      label: 'Total Tiket',
      value: tickets.length,
      filtered: filteredTickets.length,
      color: 'text-gray-600'
    },
    {
      label: 'Open',
      value: getStatusCount('open'),
      color: 'text-blue-600'
    },
    {
      label: 'In Progress',
      value: getStatusCount('in_progress'),
      color: 'text-yellow-600'
    },
    {
      label: 'Resolved',
      value: getStatusCount('resolved'),
      color: 'text-green-600'
    },
    {
      label: 'Rejected',
      value: getStatusCount('rejected'),
      color: 'text-red-600'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">Statistik Tiket</h3>
        {filteredTickets.length !== tickets.length && (
          <span className="text-xs text-gray-500">
            Menampilkan {filteredTickets.length} dari {tickets.length} tiket
          </span>
        )}
      </div>
      
      <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className={`text-lg font-semibold ${stat.color}`}>
              {stat.filtered !== undefined ? stat.filtered : stat.value}
            </div>
            <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketStats;