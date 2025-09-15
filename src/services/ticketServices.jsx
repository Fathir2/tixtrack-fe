import api from './api';

export const ticketService = {
  getTickets: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await api.get(`/tickets?${params}`);
    return response.data;
  },

  getTicket: async (code) => {
    const response = await api.get(`/tickets/${code}`);
    return response.data;
  },

  createTicket: async (ticketData) => {
    const formData = new FormData();
    Object.keys(ticketData).forEach(key => {
      if (ticketData[key] !== null && ticketData[key] !== undefined) {
        formData.append(key, ticketData[key]);
      }
    });
    
    const response = await api.post('/tickets', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deleteTicket: async (code) => {
    const response = await api.delete(`/tickets/${code}`);
    return response.data;
  },

  addReply: async (code, replyData) => {
    const response = await api.post(`/ticket-reply/${code}`, replyData);
    return response.data;
  },
};