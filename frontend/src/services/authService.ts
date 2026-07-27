import apiClient from '@/api/axiosClient';
import type {
  AuthResponse,
  LoginCredentials,
  ApiResponse,
  AuthUser,
} from '@/types';


export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>('/auth/login', credentials);
    return data;
  },

  register: async (
    payload: LoginCredentials & { name: string },
  ): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>('/auth/register', payload);
    return data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
  },

  getProfile: async (): Promise<ApiResponse<AuthUser>> => {
    const { data } = await apiClient.get<ApiResponse<AuthUser>>('/auth/me');
    return data;
  },
};
