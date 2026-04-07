import axios from 'axios';

// Create a base Axios instance
const api = axios.create({
  // Use VITE_API_URL from .env file, fallback if not found
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8077', 
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add tokens or modify requests before they are sent
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle global responses and errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.warn('Unauthorized resource - consider clearing tokens');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
