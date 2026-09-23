import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // التحقق من وجود التوكن في التخزين المحلي
  const token = localStorage.getItem('access_token') || localStorage.getItem('token');

  if (!token) {
    // إذا لم يجد التوكن، يعيده إلى شاشة الدخول فوراً
    return <Navigate to="/login" replace />;
  }

  // إذا كان التوكن موجوداً، يعرض الصفحة المطلوبة بشكل طبيعي
  return children;
};