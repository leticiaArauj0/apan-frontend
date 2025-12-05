import axios, { InternalAxiosRequestConfig } from 'axios';

export const api = axios.create({
  baseURL: 'https://apan-backend.onrender.com/api'
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
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

export default api;