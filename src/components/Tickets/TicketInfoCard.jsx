import React from 'react';
import { 
  UserCircleIcon,
  CalendarIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { getStatusIcon, getStatusColor, getPriorityColor } from '../../utils/ticketUtils';
import { formatDateTime } from '../../utils/dateUtils';

const TicketInfoCard = ({ ticket, onImageClick }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="p-6">
        {/* Ticket Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-2xl font-bold text-gray-900">{ticket.code}</span>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(ticket.status)}`}>
                {getStatusIcon(ticket.status)}
                <span className="ml-2">{ticket.status.replace('_', ' ').toUpperCase()}</span>
              </span>
              <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(ticket.priority)}`}>
                {ticket.priority.toUpperCase()}
              </span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{ticket.title}</h2>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <UserCircleIcon className="w-4 h-4 mr-1" />
                <span>Oleh: {ticket.user_id.name}</span>
              </div>
              <div className="flex items-center">
                <CalendarIcon className="w-4 h-4 mr-1" />
                <span>{formatDateTime(ticket.created_at)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Deskripsi Masalah</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-700 whitespace-pre-wrap">{ticket.description}</p>
          </div>
        </div>

        {/* Image */}
        {ticket.image && (
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Lampiran</h3>
            <div className="relative">
              <img
                src={ticket.image}
                alt="Ticket attachment"
                className="max-w-full h-64 object-cover rounded-lg border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity"
                onClick={onImageClick}
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMTgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMzUgNzVIMTQ1Vjg1SDE0NVY3NVpNMTQ1IDEwNUgxMzVWMTE1SDE0NVYxMDVaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0xNzUgNzVIMTg1Vjg1SDE4NVY3NVpNMTg1IDEwNUgxNzVWMTE1SDE4NVYxMDVaIiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPgo=';
                }}
              />
              <button
                onClick={onImageClick}
                className="absolute top-2 right-2 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-colors"
              >
                <EyeIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketInfoCard;