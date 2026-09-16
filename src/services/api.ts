import axios from "axios";
import type { AuthenticatedUser } from "../types/api";

export const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // Laravel API local backend
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000,
});

// Request interceptor to attach authentication token if available
apiClient.interceptors.request.use(
  (config) => {
    try {
      const stored = localStorage.getItem("auth_user");
      if (stored) {
        const user = JSON.parse(stored) as AuthenticatedUser;
        if (user?.token) {
          config.headers.Authorization = `Bearer ${user.token}`;
        }
      }
    } catch {
      // Ignore parse errors
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for consistent error unwrapping
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Optionally log or format errors in production
    return Promise.reject(error);
  }
);

export default apiClient;