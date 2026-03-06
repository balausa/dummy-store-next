import axiosInstance from './axiosInstance';
import { AuthResponse } from '@/types/user';
import { LoginCredentials } from '@/types/auth';

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> =>
  (await axiosInstance.post<AuthResponse>('/auth/login', credentials)).data;
