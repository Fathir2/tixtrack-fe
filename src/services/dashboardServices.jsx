import api from './api';

export const dashboardService = {
  getStatistics: async () => {
    const response = await api.get('/dashboard/statistics');
    return response.data;
  },
};