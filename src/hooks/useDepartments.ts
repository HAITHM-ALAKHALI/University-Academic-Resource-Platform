import { useState, useEffect, useCallback } from "react";
import { departmentService } from "../services/departmentService";
import type { DepartmentEntity, AddDepartment } from "../types/api";

export function useDepartments() {
  const [departments, setDepartments] = useState<DepartmentEntity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 1. جلب الأقسام
  const fetchDepartments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await departmentService.getDepartments();
      if (res.status) {
        setDepartments(res.data);
      } else {
        setError("تعذر تحميل قائمة الأقسام");
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "حدث خطأ غير متوقع أثناء الجلب",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const addDepartment = async (payload: AddDepartment): Promise<boolean> => {
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await departmentService.addDepartment(payload);

      if (res.status && res.data) {
        const newDept = res.data;
        setDepartments((prev) => [newDept, ...prev]);
        return true;
      }

      setError(res.message || res.massage || "فشلت إضافة القسم");
      return false;
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "تعذر إرسال بيانات القسم إلى الخادم",
      );
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateDepartment = async (
    id: number,
    payload: AddDepartment,
  ): Promise<boolean> => {
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await departmentService.updateDepartment(id, payload);

      if (res.status && res.data) {
        const updatedDept = res.data;
        // تحديث العنصر المعدل داخل الـ state مباشرة
        setDepartments((prev) =>
          prev.map((dept) => (dept.department_id === id ? updatedDept : dept)),
        );
        return true;
      }

      setError(res.message || res.massage || "فشل تحديث بيانات القسم");
      return false;
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "حدث خطأ أثناء إرسال تعديل القسم",
      );
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteDepartment = async (id: number): Promise<boolean> => {
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await departmentService.deleteDepartment(id);
      if (res.status) {
        setDepartments((prev) =>
          prev.filter((dept) => dept.department_id !== id),
        );
        return true;
      }
      setError(res.message || "تعذر إتمام عملية الحذف");
      return false;
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "حدث خطأ أثناء محاولة الحذف",
      );
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  return {
    departments,
    loading,
    isSubmitting,
    error,
    addDepartment,
    updateDepartment,
    deleteDepartment,
    refetch: fetchDepartments,
  };
}
