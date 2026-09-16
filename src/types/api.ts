export interface UserPayload {
  full_name: string;
  email: string;
  password: string;
}

export interface CheckUserCredentials {
  email: string;
  password: string;
}

export interface AuthenticatedUser {
  id: number;
  full_name: string;
  email: string;
  role_id: number;
  status: string;
  token?: string;
}

export interface ApiResponse<T = unknown> {
  status: boolean;
  message?: string;
  massage?: string; // Matching legacy backend response variant
  data?: T;
  error?: string;
}

export interface ApiErrorResponse {
  message?: string;
  errors?: Record<string, string[]>;
  error?: string;
}

export interface ActionSuccessResponse {
  success: boolean;
  message?: string;
}
