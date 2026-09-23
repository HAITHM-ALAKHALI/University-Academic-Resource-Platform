import { useState, useEffect, useCallback } from "react";
import { courseOfferingsService } from "../services/courseOfferingsService";
import type {
  CourseOfferingEntity,
  CourseDoctorEntity,
  ContentTypeEntity,
  AddCourseOfferingPayload,
  AssignDoctorPayload,
} from "../types/api";

export function useCourseOfferings(selectedSemesterId?: number) {
  const [offerings, setOfferings] = useState<CourseOfferingEntity[]>([]);
  const [contentTypes, setContentTypes] = useState<ContentTypeEntity[]>([]);
  const [courseDoctors, setCourseDoctors] = useState<CourseDoctorEntity[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // جلب المواد المطروحة للترم المحدد
  const loadOfferings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data =
        await courseOfferingsService.getOfferings(selectedSemesterId);
      setOfferings(data);
    } catch (err: any) {
      setError(err.response?.data?.message || "تعذر جلب المقررات المطروحة");
    } finally {
      setLoading(false);
    }
  }, [selectedSemesterId]);

  // جلب أنواع المحتوى المتاحة
  const loadContentTypes = useCallback(async () => {
    try {
      const data = await courseOfferingsService.getContentTypes();
      setContentTypes(data);
    } catch {
      // التعامل الصامت مع جلب الأنواع أو تسجيل تنبيه
    }
  }, []);

  // جلب دكاترة مقرر معين عند تحديده
  const loadDoctorsForOffering = useCallback(async (offeringId: number) => {
    try {
      setLoading(true);
      const data = await courseOfferingsService.getCourseDoctors(offeringId);
      setCourseDoctors(data);
      return data;
    } catch (err: any) {
      setError(err.response?.data?.message || "تعذر جلب دكاترة المقرر");
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDeleteOffering = async (offeringId: number): Promise<boolean> => {
    try {
      setLoading(true);
      await courseOfferingsService.deleteOffering(offeringId);
      await loadOfferings();
      return true;
    } catch (err: any) {
      alert(err.response?.data?.message || "فشلت عملية حذف المقرر المطروح");
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOfferings();
    loadContentTypes();
  }, [loadOfferings, loadContentTypes]);

  // إضافة طرح جديد لمادة
  const handleAddOffering = async (
    payload: AddCourseOfferingPayload,
  ): Promise<number | null> => {
    try {
      setIsSubmitting(true);
      const res = await courseOfferingsService.createOffering(payload);
      await loadOfferings();

      const newOfferingId = res.data?.offering_id || res.offering_id;
      return newOfferingId ?? null;
    } catch (err: any) {
      alert(err.response?.data?.message || "فشلت عملية طرح المادة");
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

  // تعديل مقرر مطروح مسبقاً وتحديث الدكاترة
  const handleUpdateOffering = async (
    offeringId: number,
    payload: { course_id: number; semester_id: number; doctor_ids?: number[] },
  ): Promise<boolean> => {
    try {
      setIsSubmitting(true);
      // 1. إرسال طلب التعديل إلى الـ API
      await courseOfferingsService.updateOffering(offeringId, {
        course_id: payload.course_id,
        semester_id: payload.semester_id,
      });

      // 2. تحديث إسناد الدكاترة
      if (payload.doctor_ids && payload.doctor_ids.length > 0) {
        for (const docId of payload.doctor_ids) {
          await courseOfferingsService.assignDoctor({
            offering_id: offeringId,
            doctor_id: docId,
          });
        }
      }

      // 3. إعادة تحميل البيانات لتنعكس في الجدول فوراً
      await loadOfferings();
      return true;
    } catch (err: any) {
      alert(err.response?.data?.message || "فشلت عملية تحديث المقرر المطروح");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  // إسناد دكتور للمادة
  const handleAssignDoctor = async (
    payload: AssignDoctorPayload,
  ): Promise<boolean> => {
    try {
      setIsSubmitting(true);
      await courseOfferingsService.assignDoctor(payload);
      await loadOfferings();
      return true;
    } catch (err: any) {
      alert(err.response?.data?.message || "فشلت عملية إسناد الدكتور");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    offerings,
    contentTypes,
    courseDoctors,
    loading,
    isSubmitting,
    error,
    refreshOfferings: loadOfferings,
    loadDoctorsForOffering,
    handleAddOffering,
    handleUpdateOffering, // 👈 تم التصدير هنا
    handleDeleteOffering,
    handleAssignDoctor,
  };
}
