import axios from 'axios';
import type { AxiosInstance } from 'axios'; // Explicitly mark this as a type-only import

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // Update this URL to match your backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
