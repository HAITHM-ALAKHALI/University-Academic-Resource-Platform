import React, { useState } from "react";
import axios from "axios";
import { userService } from "../services/userService";
import type { AuthenticatedUser, ApiErrorResponse } from "../types/api";

export interface AdminLoginProps {
  onLoginSuccess?: (user: AuthenticatedUser) => void;
  onBackToHome?: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({
  onLoginSuccess,
  onBackToHome,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await userService.checkUser({
        email: email.trim(),
        password,
      });

      if (res.status && res.data) {
        localStorage.setItem("auth_user", JSON.stringify(res.data));

        if (onLoginSuccess) {
          onLoginSuccess(res.data);
        } else {
          window.location.href = "/";
        }
      } else {
        setError(res.message || "فشل التحقق من بيانات الدخول");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError<ApiErrorResponse>(err) && err.response) {
        const errorData = err.response.data;
        if (errorData?.errors) {
          const firstKey = Object.keys(errorData.errors)[0];
          setError(errorData.errors[firstKey]?.[0] || "بيانات الاعتماد غير صحيحة");
        } else {
          setError(
            errorData?.message || "البريد الإلكتروني أو كلمة المرور غير صحيحة"
          );
        }
      } else {
        setError(
          "تعذر الاتصال بالخادم، تأكد من تشغيل السيرفر php artisan serve"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#1E293B] flex items-center justify-center p-4"
      dir="rtl"
    >
      <div className="w-full max-w-md bg-[#2B354F] p-8 rounded-2xl shadow-2xl border border-slate-700/50">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#7DA49F]">
            تسجيل دخول المشرف
          </h2>
          {onBackToHome && (
            <button
              type="button"
              onClick={onBackToHome}
              className="text-xs text-slate-400 hover:text-white transition cursor-pointer border-0 bg-transparent"
            >
              ← العودة للرئيسية
            </button>
          )}
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@example.com"
              className="w-full px-4 py-2.5 bg-[#1E293B] border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#7DA49F] transition"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">
              كلمة المرور
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-4 py-2.5 bg-[#1E293B] border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#7DA49F] transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 bg-[#7DA49F] hover:bg-[#688c87] text-[#1E293B] font-bold rounded-xl shadow-lg transition duration-200 disabled:opacity-50 cursor-pointer border-0"
          >
            {loading ? "جاري التحقق..." : "تسجيل الدخول"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
