import { useState, useEffect, useCallback } from "react";
import { doctorService } from "../services/doctorService";
import type { DoctorEntity, AddDoctor } from "../types/api";

export function useDoctors() {
  const [doctorsList, setDoctorsList] = useState<DoctorEntity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 1. GET: جلب كافة الدكاترة
  const fetchDoctors = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await doctorService.fetchDoctors();
      if (res.status) {
        setDoctorsList(res.data);
      } else {
        setError("تعذر جلب قائمة الدكاترة");
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "حدث خطأ أثناء تحميل الدكاترة",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. POST: تسجيل دكتور جديد
  const handleAddDoctor = async (payload: AddDoctor): Promise<boolean> => {
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await doctorService.addDoctor(payload);
      if (res.status && res.data) {
        const newDoctor: DoctorEntity = res.data;
        setDoctorsList((prev) => [newDoctor, ...prev]);
        return true;
      }
      setError(res.message || "فشلت إضافة الدكتور");
      return false;
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "حدث خطأ أثناء حفظ بيانات الدكتور",
      );
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  // 3. PUT: تحديث بيانات دكتور
  const handleEditDoctor = async (
    id: number,
    payload: Partial<AddDoctor>,
  ): Promise<boolean> => {
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await doctorService.updateDoctor(id, payload);
      if (res.status && res.data) {
        const updatedDoctor: DoctorEntity = res.data;
        setDoctorsList((prev) =>
          prev.map((doc) => (doc.doctor_id === id ? updatedDoctor : doc)),
        );
        return true;
      }
      setError(res.message || "فشل تحديث بيانات الدكتور");
      return false;
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "حدث خطأ أثناء تعديل بيانات الدكتور",
      );
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  // 4. DELETE: حذف حساب الدكتور
  const handleDeleteDoctor = async (id: number): Promise<boolean> => {
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await doctorService.deleteDoctor(id);
      if (res.status) {
        setDoctorsList((prev) => prev.filter((doc) => doc.doctor_id !== id));
        return true;
      }
      setError(res.message || "تعذر حذف الدكتور لوجود ارتباطات بنظام المقررات");
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
    fetchDoctors();
  }, [fetchDoctors]);

  return {
    doctorsList,
    loading,
    isSubmitting,
    error,
    handleAddDoctor,
    handleEditDoctor,
    handleDeleteDoctor,
    refetchDoctors: fetchDoctors,
  };
}

export default useDoctors;
