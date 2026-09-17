import { useState, useEffect, useCallback } from "react";
import { departmentService } from "../services/departmentService";
import type { DepartmentEntity, AddDepartment } from "../types/api";

export function useDepartments() {
  const [departments, setDepartments] = useState<DepartmentEntity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  return {
    departments,
    loading,
    isSubmitting,
    error,
    addDepartment,
    refetch: fetchDepartments,
  };
}
