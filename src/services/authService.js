import axios from 'axios';

const API_URL = 'http://siiga_backend.test/api/v1';

const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      if (response.status === 200) {
        const userData = response.data;
        return userData;
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      throw new Error('Login failed');
    }
  },

  register: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      if (response.status === 201) {
        return { success: true, message: 'Registration successful' };
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      throw new Error('Registration failed');
    }
  },

  logout: () => {
    localStorage.removeItem('token'); 
  }
};

export default authService;
