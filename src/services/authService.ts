import { apiClient } from './api';

export interface User {
  user_id: number;
  full_name: string;
  email: string;
  role_id: number;
  status?: string;
}

export interface LoginResponse {
  status: boolean;
  message: string;
  access_token: string;
  token_type: string;
  expires_in: number;
  user: User;
}

export const authService = {
  // إرسال طلب تسجيل الدخول وتخزين التوكن
  login: async (credentials: { email: string; password: string }): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/login', credentials);
    if (response.data.status && response.data.access_token) {
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // تسجيل الخروج ومسح الذاكرة
  logout: async (): Promise<void> => {
    try {
      await apiClient.post('/logout');
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
  },

  // جلب بيانات المستخدم المسجل المخزنة محلياً
  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // فحص هل المستخدم مسجل دخول حالياً
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('access_token');
  },
};