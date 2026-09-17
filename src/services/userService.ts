// src/services/userService.ts
import { apiClient } from "./api";
import type {
  UserPayload,
  CheckUserCredentials,
  AuthenticatedUser,
  ApiResponse,
} from "../types/api";

// Re-export contracts for backwards-compatibility
export type {
  UserPayload,
  CheckUserCredentials,
  AuthenticatedUser,
  ApiResponse,
};

export interface AdminCreationResult {
  id?: number;
  full_name?: string;
  email?: string;
}

export const userService = {
  /**
   * Check supervisor/admin credentials for login
   * Endpoint: POST /api/check-user
   */
  checkUser: async (
    credentials: CheckUserCredentials,
  ): Promise<ApiResponse<AuthenticatedUser>> => {
    const response = await apiClient.post<ApiResponse<AuthenticatedUser>>(
      "/check-user",
      credentials,
    );
    return response.data;
  },

  /**
   * Add new administrator (Admin - Role 1)
   * Endpoint: POST /api/add-admin
   */
  addAdmin: async (
    payload: UserPayload,
  ): Promise<ApiResponse<AdminCreationResult>> => {
    const response = await apiClient.post<ApiResponse<AdminCreationResult>>(
      "/add-admin",
      payload,
    );
    return response.data;
  },

  /**
   * Add new content manager (Content Manager - Role 2)
   * Endpoint: POST /api/add-contextMangment
   */
  addContextManagement: async (
    payload: UserPayload,
  ): Promise<ApiResponse<AdminCreationResult>> => {
    const response = await apiClient.post<ApiResponse<AdminCreationResult>>(
      "/add-contextMangment",
      payload,
    );
    return response.data;
  },
};

export default userService;
