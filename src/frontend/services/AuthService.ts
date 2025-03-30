import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL 

export const registerUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/register`, { email, password });
  return response.data;
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data;
  } catch (error: any) {
    console.error('Login error:', error.response.data);
    throw error;
  }
};
