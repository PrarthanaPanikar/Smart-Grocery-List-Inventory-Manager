import apiClient from './api';

const itemService = {
  getAllItems: async (category = null, search = null) => {
    const params = {};
    if (category && category !== 'All') params.category = category;
    if (search) params.search = search;
    
    const response = await apiClient.get('/items', { params });
    return response.data;
  },

  getItem: async (id) => {
    const response = await apiClient.get(`/items/${id}`);
    return response.data;
  },

  createItem: async (itemData) => {
    const response = await apiClient.post('/items', itemData);
    return response.data;
  },

  updateItem: async (id, itemData) => {
    const response = await apiClient.put(`/items/${id}`, itemData);
    return response.data;
  },

  deleteItem: async (id) => {
    const response = await apiClient.delete(`/items/${id}`);
    return response.data;
  },

  updateQuantity: async (id, quantity, operation = 'set') => {
    const response = await apiClient.put(`/items/${id}/quantity`, {
      quantity,
      operation
    });
    return response.data;
  }
};

export default itemService;
