import { apiClient } from '@/lib/api';

export interface User {
  id: string;
  fullName: string;
  username: string;
  email: string;
}

export interface RegisterData {
  fullName: string;
  username: string;
  email: string;
  password: string;
  dob?: string;
}

export interface LoginData {
  emailOrUsername: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}

class AuthService {
  async register(data: RegisterData): Promise<{ user?: User; error?: string }> {
    const response = await apiClient.post<User>('/auth/register', data);
    
    if (response.error) {
      return { error: response.error };
    }
    
    return { user: response.data };
  }

  async login(data: LoginData): Promise<{ user?: User; error?: string }> {
    const response = await apiClient.post<LoginResponse>('/auth/login', data);
    
    if (response.error) {
      return { error: response.error };
    }

    if (response.data) {
      // Store the access token
      apiClient.setAccessToken(response.data.accessToken);
      return { user: response.data.user };
    }

    return { error: 'Login failed' };
  }

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
    apiClient.setAccessToken(null);
  }

  async getCurrentUser(): Promise<{ user?: User; error?: string }> {
    const response = await apiClient.get<User>('/auth/me');
    
    if (response.error) {
      return { error: response.error };
    }
    
    return { user: response.data };
  }

  async refreshToken(): Promise<{ accessToken?: string; error?: string }> {
    const response = await apiClient.post<{ accessToken: string }>('/auth/refresh');
    
    if (response.error) {
      return { error: response.error };
    }

    if (response.data) {
      apiClient.setAccessToken(response.data.accessToken);
      return { accessToken: response.data.accessToken };
    }

    return { error: 'Token refresh failed' };
  }

  isAuthenticated(): boolean {
    return !!apiClient.getAccessToken();
  }
}

export const authService = new AuthService();
