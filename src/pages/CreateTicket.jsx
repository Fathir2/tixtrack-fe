import React from 'react';
import TicketForm from '../components/Tickets/TicketForm';

const CreateTicket = () => {
  return (
    <div className="min-h-screen py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <TicketForm />
      </div>
    </div>
  );
};

export default CreateTicket;