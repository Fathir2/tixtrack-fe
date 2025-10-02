import React from 'react';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import RepliesList from './ReplyList';
import ReplyForm from './ReplyForm';
import ClosedTicketMessage from './ClosedTicketMessage';

const TicketReplies = ({ ticket, user, onReplyAdded }) => {
  const isTicketClosed = ticket.status === 'resolved' || ticket.status === 'rejected';

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-6">
          <ChatBubbleLeftRightIcon className="w-6 h-6 text-gray-500" />
          <h3 className="text-lg font-medium text-gray-900">
            Komunikasi ({ticket.replies ? ticket.replies.length : 0})
          </h3>
        </div>

        <RepliesList replies={ticket.replies} />

        {!isTicketClosed ? (
          <ReplyForm 
            ticket={ticket}
            user={user}
            onReplyAdded={onReplyAdded}
          />
        ) : (
          <ClosedTicketMessage status={ticket.status} />
        )}
      </div>
    </div>
  );
};

export default TicketReplies;