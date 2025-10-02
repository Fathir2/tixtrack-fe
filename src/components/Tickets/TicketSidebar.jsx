import React from 'react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { getStatusIcon, getStatusColor, getPriorityColor } from '../../utils/ticketUtils';
import { formatDateTime } from '../../utils/dateUtils';

const TicketSidebar = ({ ticket, user }) => {
  return (
    <div className="space-y-6">
      {/* Ticket Summary */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Ringkasan Tiket</h3>
        <div className="space-y-4">
          <div>
            <span className="block text-sm text-gray-500">Status</span>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border mt-1 ${getStatusColor(ticket.status)}`}>
              {getStatusIcon(ticket.status)}
              <span className="ml-2">{ticket.status.replace('_', ' ').toUpperCase()}</span>
            </span>
          </div>
          <div>
            <span className="block text-sm text-gray-500">Prioritas</span>
            <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border mt-1 ${getPriorityColor(ticket.priority)}`}>
              {ticket.priority.toUpperCase()}
            </span>
          </div>
          <div>
            <span className="block text-sm text-gray-500">Dibuat</span>
            <span className="block text-sm font-medium text-gray-900 mt-1">
              {formatDateTime(ticket.created_at)}
            </span>
          </div>
          {ticket.completed_at && (
            <div>
              <span className="block text-sm text-gray-500">Diselesaikan</span>
              <span className="block text-sm font-medium text-gray-900 mt-1">
                {formatDateTime(ticket.completed_at)}
              </span>
            </div>
          )}
          <div>
            <span className="block text-sm text-gray-500">Diperbarui</span>
            <span className="block text-sm font-medium text-gray-900 mt-1">
              {formatDateTime(ticket.updated_at)}
            </span>
          </div>
        </div>
      </div>

      {/* User Info (Admin Only) */}
      {user?.role === 'admin' && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Informasi Pelapor</h3>
          <div className="flex items-center space-x-3">
            <UserCircleIcon className="w-12 h-12 text-gray-400" />
            <div>
              <span className="block font-medium text-gray-900">{ticket.user_id.name}</span>
              <span className="block text-sm text-gray-500">{ticket.user_id.email}</span>
              <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                {ticket.user_id.role}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketSidebar;