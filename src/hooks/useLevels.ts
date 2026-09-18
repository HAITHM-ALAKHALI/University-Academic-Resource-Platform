import { useState, useEffect, useCallback } from "react";
import { levelService } from "../services/levelService";
import type { LevelEntity, AddLevel } from "../types/api";

export function useLevels() {
  const [levels, setLevels] = useState<LevelEntity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLevels = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await levelService.fetchLevels();
      if (res.status) {
        setLevels(res.data);
      } else {
        setError("تعذر تحميل قائمة المستويات الدراسية");
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "حدث خطأ أثناء جلب المستويات",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const addLevel = async (payload: AddLevel): Promise<boolean> => {
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await levelService.addLevel(payload);
      if (res.status && Array.isArray(res.data)) {
        const createdList: LevelEntity[] = res.data;
        // دمج جميع المستويات المنشأة في مقدمة القائمة
        setLevels((prev) => [...createdList, ...prev]);
        return true;
      }
      setError(res.message || "فشلت إضافة المستوى");
      return false;
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "حدث خطأ أثناء إرسال بيانات المستوى",
      );
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateLevel = async (
    id: number,
    payload: AddLevel,
  ): Promise<boolean> => {
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await levelService.updateLevel(id, payload);
      if (res.status && res.data) {
        const updatedLevel: LevelEntity = res.data; // تأكيد صريح لنوع البيانات
        setLevels((prev) =>
          prev.map((item) => (item.level_id === id ? updatedLevel : item)),
        );
        return true;
      }
      setError(res.message || "فشل تحديث المستوى");
      return false;
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "حدث خطأ أثناء تعديل المستوى",
      );
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteLevel = async (id: number): Promise<boolean> => {
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await levelService.deleteLevel(id);
      if (res.status) {
        setLevels((prev) => prev.filter((item) => item.level_id !== id));
        return true;
      }
      setError(res.message || "تعذر حذف المستوى");
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
    fetchLevels();
  }, [fetchLevels]);

  return {
    levels,
    loading,
    isSubmitting,
    error,
    addLevel,
    updateLevel,
    deleteLevel,
    refetch: fetchLevels,
  };
}

export default useLevels;
