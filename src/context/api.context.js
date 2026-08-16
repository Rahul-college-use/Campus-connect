import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api/auth', 
  withCredentials: true, 
});


API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

const apiServices = {
  // Login API Call
  login: async (credentials) => {
    return await API.post('/login', credentials);
  },

  // Register API Call
  register: async (userData) => {
    return await API.post('/register', userData);
  },

  // Logout API Call
  logout: async () => {
    return await API.post('/logout');
  },

  // Check Current User Status (Page refresh पर काम आएगा)
  getProfile: async () => {
    return await API.get('/profile');
  },
};

export default apiServices;