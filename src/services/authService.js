import api from './api';

const authService = {
  logout: async () => {
    const response = await api.post('/auth/logout', {}, {
      withCredentials: true
    });
    return response.data;
  }
};

export default authService;
