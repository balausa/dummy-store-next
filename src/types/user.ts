import { UserRole } from '@/skills/authorization';

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
  roles?: UserRole[];
}

export type AuthResponse = User;
