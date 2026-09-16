import { useState, useCallback } from "react";
import type { AuthenticatedUser } from "../types/api";
import type { AppMode } from "../types/app";

const AUTH_STORAGE_KEY = "auth_user";

export function useAuth() {
  const [currentUser, setCurrentUser] = useState<AuthenticatedUser | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as AuthenticatedUser) : null;
    } catch {
      return null;
    }
  });

  const [mode, setMode] = useState<AppMode>(() => {
    try {
      return localStorage.getItem(AUTH_STORAGE_KEY) ? "admin" : "student";
    } catch {
      return "student";
    }
  });

  const handleLoginSuccess = useCallback((user: AuthenticatedUser) => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    setCurrentUser(user);
    setMode("admin");
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setCurrentUser(null);
    setMode("student");
  }, []);

  return {
    currentUser,
    mode,
    setMode,
    handleLoginSuccess,
    handleLogout,
    isAuthenticated: !!currentUser,
  };
}
