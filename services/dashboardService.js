import apiClient from './api';

const dashboardService = {
  getDashboardSummary: async () => {
    const response = await apiClient.get('/dashboard/summary');
    return response.data;
  }
};

export default dashboardService;
