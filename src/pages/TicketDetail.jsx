import React from 'react';
import DetailTicket from '../components/Tickets/DetailTicket';

const TicketDetail = () => {
  return (
    <div className="min-h-screen py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <DetailTicket />
      </div>
    </div>
  );
};

export default TicketDetail;