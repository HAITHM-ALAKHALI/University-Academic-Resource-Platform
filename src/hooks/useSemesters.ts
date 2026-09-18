import { useState, useEffect, useCallback } from "react";
import { semesterService } from "../services/semesterService";
import type { SemesterEntity, AddSemester } from "../types/api";

export function useSemesters() {
  const [semesters, setSemesters] = useState<SemesterEntity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSemesters = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await semesterService.fetchSemesters();
      if (res.status) {
        setSemesters(res.data);
      } else {
        setError("تعذر تحميل قائمة الفصول الدراسية");
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "حدث خطأ أثناء جلب الفصول الدراسية",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const addSemester = async (payload: AddSemester): Promise<boolean> => {
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await semesterService.addSemester(payload);
      if (res.status && res.data) {
        const newSemester: SemesterEntity = res.data;
        setSemesters((prev) => [newSemester, ...prev]);
        return true;
      }
      setError(res.message || "فشلت إضافة الفصل الدراسي");
      return false;
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "حدث خطأ أثناء حفظ الفصل الدراسي",
      );
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateSemester = async (
    id: number,
    payload: AddSemester,
  ): Promise<boolean> => {
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await semesterService.updateSemester(id, payload);
      if (res.status && res.data) {
        const updatedSemester: SemesterEntity = res.data;
        setSemesters((prev) =>
          prev.map((item) =>
            item.semester_id === id ? updatedSemester : item,
          ),
        );
        return true;
      }
      setError(res.message || "فشل تحديث الفصل الدراسي");
      return false;
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "حدث خطأ أثناء تعديل الفصل الدراسي",
      );
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteSemester = async (id: number): Promise<boolean> => {
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await semesterService.deleteSemester(id);
      if (res.status) {
        setSemesters((prev) => prev.filter((item) => item.semester_id !== id));
        return true;
      }
      setError(res.message || "تعذر حذف الفصل الدراسي");
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
    fetchSemesters();
  }, [fetchSemesters]);

  return {
    semesters,
    loading,
    isSubmitting,
    error,
    addSemester,
    updateSemester,
    deleteSemester,
    refetch: fetchSemesters,
  };
}

export default useSemesters;
