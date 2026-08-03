import api from './api';
import { ApiResponse, User } from '../types';

export const authService = {
  login: async (email: string, password: string) => {
    const { data } = await api.post<ApiResponse<{ user: User; accessToken: string }>>('/auth/login', {
      email,
      password,
    });
    return data;
  },

  register: async (email: string) => {
    const { data } = await api.post<ApiResponse>('/auth/register', { email });
    return data;
  },

  verifyOtp: async (email: string, otp: string) => {
    const { data } = await api.post<ApiResponse>('/auth/verify-otp', { email, otp });
    return data;
  },

  forgotPassword: async (email: string) => {
    const { data } = await api.post<ApiResponse<{ email: string; devOtp?: string }>>('/auth/forgot-password', { email });
    return data;
  },

  verifyResetOtp: async (email: string, otp: string) => {
    const { data } = await api.post<ApiResponse<{ resetToken: string }>>('/auth/verify-reset-otp', { email, otp });
    return data;
  },

  resetPassword: async (token: string, password: string) => {
    const { data } = await api.post<ApiResponse>('/auth/reset-password', { token, password });
    return data;
  },

  changePassword: async (currentPassword: string, newPassword: string) => {
    const { data } = await api.post<ApiResponse>('/auth/change-password', { currentPassword, newPassword });
    return data;
  },

  setPassword: async (password: string, token: string) => {
    const { data } = await api.post<ApiResponse>('/auth/set-password', { password }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return data;
  },

  me: async () => {
    const { data } = await api.get<ApiResponse<{ user: User }>>('/auth/me');
    return data;
  },
};
