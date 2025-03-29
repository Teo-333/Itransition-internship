import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const registerUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/register`, { email, password });
  return response.data;
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error: any) {
    console.error('Login error:', error.response.data);
    throw error;
  }
};
