import { useState, useCallback } from "react";
import type { AuthenticatedUser } from "../types/api";
import type { AppMode } from "../types/app";

const AUTH_STORAGE_KEY = "auth_user";
const TOKEN_STORAGE_KEY = "access_token";

export function useAuth() {
  const [currentUser, setCurrentUser] = useState<AuthenticatedUser | null>(
    () => {
      try {
        const token = localStorage.getItem(TOKEN_STORAGE_KEY);
        const saved = localStorage.getItem(AUTH_STORAGE_KEY);
        // لا نعتبر المستخدم مسجلاً إلا إذا وُجد التوكن وبيانات الحساب معاً
        return token && saved ? (JSON.parse(saved) as AuthenticatedUser) : null;
      } catch {
        return null;
      }
    },
  );

  const [mode, setMode] = useState<AppMode>(() => {
    try {
      const token = localStorage.getItem(TOKEN_STORAGE_KEY);
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      return token && saved ? "admin" : "student";
    } catch {
      return "student";
    }
  });

  const handleLoginSuccess = useCallback((user: AuthenticatedUser) => {
    // التوكن تم تخزينه مسبقاً في AdminLogin.tsx، هنا نحدّث بيانات المستخدم والواجهة
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    setCurrentUser(user);
    setMode("admin");
  }, []);

  const handleLogout = useCallback(() => {
    // مسح التوكن وبيانات المستخدم بالكامل لمنع أي طلبات غير مصرحة
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem("token");
    setCurrentUser(null);
    setMode("student");
  }, []);

  return {
    currentUser,
    mode,
    setMode,
    handleLoginSuccess,
    handleLogout,
    isAuthenticated: !!currentUser && !!localStorage.getItem(TOKEN_STORAGE_KEY),
  };
}
