import React from 'react';
import { UserCircleIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { formatDateTime } from '../../utils/dateUtils';

const RepliesList = ({ replies }) => {
  if (!replies || replies.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 mb-6">
        <ChatBubbleLeftRightIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
        <p>Belum ada komunikasi pada tiket ini</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 mb-6">
      {replies.map((reply) => (
        <div key={reply.id} className="border rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <UserCircleIcon className="w-10 h-10 text-gray-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className="font-medium text-gray-900">{reply.user.name}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  reply.user.role === 'admin' 
                    ? 'bg-purple-100 text-purple-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {reply.user.role === 'admin' ? 'Admin' : 'User'}
                </span>
                <span className="text-sm text-gray-500">
                  {formatDateTime(reply.created_at)}
                </span>
              </div>
              <div className="text-gray-700 whitespace-pre-wrap">{reply.content}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RepliesList;