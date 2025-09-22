import React from 'react';
import { Link } from 'react-router-dom';

const TicketList = ({ tickets, title = "Tiket Terbaru", showAll = false, isAdmin = false }) => {
  const getStatusColor = (status) => {
    const colors = {
      'open': 'bg-blue-100 text-blue-800',
      'in_progress': 'bg-yellow-100 text-yellow-800',
      'resolved': 'bg-green-100 text-green-800',
      'rejected': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'low': 'bg-gray-100 text-gray-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'high': 'bg-red-100 text-red-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours} jam yang lalu`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} hari yang lalu`;
    }
  };

  // Show only first 5 tickets if showAll is false
  const displayTickets = showAll ? tickets : tickets.slice(0, 5);

  return (
    <div className="bg-white rounded-lg border-gray-400 shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          {!showAll && tickets.length > 5 && (
            <Link 
              to="/tickets" 
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              Lihat Semua
            </Link>
          )}
        </div>
      </div>
      
      <div className="divide-y divide-gray-200">
        {displayTickets.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            Tidak ada tiket ditemukan
          </div>
        ) : (
          displayTickets.map((ticket) => (
            <div key={ticket.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-medium text-gray-900">
                      {ticket.code}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(ticket.status)}`}>
                      {ticket.status.replace('_', ' ').toUpperCase()}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority.toUpperCase()}
                    </span>
                  </div>
                  
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    <Link 
                      to={`/tickets/${ticket.code}`}
                      className="hover:text-blue-600"
                    >
                      {ticket.title}
                    </Link>
                  </h4>
                  
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {ticket.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-4">
                      {isAdmin && (
                        <span>By: {ticket.user_id.name}</span>
                      )}
                      <span>{formatTime(ticket.created_at)}</span>
                    </div>
                    {ticket.replies && ticket.replies.length > 0 && (
                      <span>{ticket.replies.length} balasan</span>
                    )}
                  </div>
                </div>
                
                {ticket.image && (
                  <div className="ml-4 flex-shrink-0">
                    <img 
                     
                    />
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TicketList;