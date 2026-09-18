import { useState, useEffect, useCallback } from "react";
import { courseService } from "../services/courseService";
import type { CourseEntity, AddCourse } from "../types/api";

export function useCourses() {
  const [courses, setCourses] = useState<CourseEntity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 1. جلب قائمة المواد
  const fetchCourses = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await courseService.fetchCourses();
      if (res.status) {
        setCourses(res.data);
      } else {
        setError("تعذر تحميل قائمة المواد");
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "حدث خطأ غير متوقع أثناء الجلب",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. إضافة مادة جديدة
  const addCourse = async (payload: AddCourse): Promise<boolean> => {
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await courseService.addCourse(payload);
      if (res.status && res.data) {
        const newCour = res.data;
        setCourses((prev) => [newCour, ...prev]);
        return true;
      }
      setError(res.message || "فشلت إضافة المادة");
      return false;
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "تعذر إرسال بيانات المادة إلى الخادم",
      );
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  // 3. تعديل مادة
  const updateCourse = async (
    id: number,
    payload: AddCourse,
  ): Promise<boolean> => {
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await courseService.updateCourse(id, payload);
      if (res.status && res.data) {
        const updatedCourse = res.data;
        setCourses((prev) =>
          prev.map((cour) => (cour.course_id === id ? updatedCourse : cour)),
        );
        return true;
      }

      setError(res.message || "فشل تحديث بيانات المادة");
      return false;
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "حدث خطأ أثناء إرسال تعديل المادة",
      );
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  // 4. حذف مادة
  const deleteCourse = async (id: number): Promise<boolean> => {
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await courseService.deleteCourse(id);
      if (res.status) {
        setCourses((prev) => prev.filter((cour) => cour.course_id !== id));
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
    fetchCourses();
  }, [fetchCourses]);

  return {
    courses,
    loading,
    isSubmitting,
    error,
    addCourse,
    updateCourse,
    deleteCourse,
    refetch: fetchCourses,
  };
}

export default useCourses;
