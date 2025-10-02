import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const TicketHeader = ({ onBack }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="p-2 rounded-md hover:bg-gray-100 transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5 text-gray-500" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Detail Tiket</h1>
          <p className="text-gray-600">Lihat detail dan komunikasi tiket</p>
        </div>
      </div>
    </div>
  );
};

export default TicketHeader;