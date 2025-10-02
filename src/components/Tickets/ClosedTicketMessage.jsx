import React from 'react';

const ClosedTicketMessage = ({ status }) => {
  const isResolved = status === 'resolved';
  
  return (
    <div className={`border-t pt-6 ${
      isResolved 
        ? 'bg-green-50 border-green-200' 
        : 'bg-red-50 border-red-200'
    } rounded-lg p-4 text-center`}>
      <p className={`text-sm font-medium ${
        isResolved ? 'text-green-800' : 'text-red-800'
      }`}>
        {isResolved 
          ? '✅ Tiket ini telah diselesaikan. Komunikasi tidak lagi tersedia.'
          : '❌ Tiket ini telah ditolak. Komunikasi tidak lagi tersedia.'
        }
      </p>
    </div>
  );
};

export default ClosedTicketMessage;