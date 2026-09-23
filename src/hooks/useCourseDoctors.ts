import { useState, useEffect, useCallback } from "react";
import { courseDoctorsService } from "../services/courseDoctorsService";
import type { CourseDoctorAssignment } from "../types/api";

export function useCourseDoctors() {
  const [assignments, setAssignments] = useState<CourseDoctorAssignment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadAssignments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await courseDoctorsService.getAssignments();
      setAssignments(data);
    } catch (err: any) {
      setError(err.response?.data?.message || "تعذر جلب إسنادات الدكاترة");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAssignDoctor = async (payload: {
    offering_id: number;
    doctor_id: number;
  }) => {
    try {
      setIsSubmitting(true);
      await courseDoctorsService.assignDoctor(payload);
      await loadAssignments();
      return true;
    } catch (err: any) {
      alert(err.response?.data?.message || "فشلت عملية إسناد المادة");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAssignment = async (id: number) => {
    try {
      setLoading(true);
      await courseDoctorsService.deleteAssignment(id);
      await loadAssignments();
      return true;
    } catch (err: any) {
      alert(err.response?.data?.message || "فشل إلغاء إسناد المادة");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateAssignment = async (
    id: number,
    payload: { offering_id: number; doctor_id: number },
  ) => {
    try {
      setIsSubmitting(true);
      await courseDoctorsService.updateAssignment(id, payload);
      await loadAssignments();
      return true;
    } catch (err: any) {
      alert(err.response?.data?.message || "فشلت عملية تعديل الإسناد");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    loadAssignments();
  }, [loadAssignments]);

  return {
    assignments,
    loading,
    isSubmitting,
    error,
    refreshAssignments: loadAssignments,
    handleAssignDoctor,
    handleUpdateAssignment,
    handleDeleteAssignment,
  };
}
