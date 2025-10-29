
import apiClient from './apiClient';

export const authService = {
  login: async (credentials: any) => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },
  signup: async (userData: any) => {
    const response = await apiClient.post('/auth/signup', userData);
    return response.data;
  },
  logout: async () => {
    // Depending on the backend, you might want to call a logout endpoint
    // For now, we just handle it on the client side in the authSlice
    return Promise.resolve();
  },
  getMe: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },
};
