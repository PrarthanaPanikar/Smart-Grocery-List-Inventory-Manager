import apiClient from './api';

const alertService = {
  getLowStockAlerts: async () => {
    const response = await apiClient.get('/alerts/low-stock');
    return response.data;
  },

  getExpiryAlerts: async () => {
    const response = await apiClient.get('/alerts/expiry');
    return response.data;
  },

  getAllAlerts: async () => {
    const response = await apiClient.get('/alerts');
    return response.data;
  }
};

export default alertService;
