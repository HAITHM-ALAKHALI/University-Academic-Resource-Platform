import { apiClient } from "./api";
import { courseDoctorsService } from "./courseDoctorsService";
import type {
  CourseOfferingEntity,
  CourseDoctorEntity,
  ContentTypeEntity,
  AddCourseOfferingPayload,
  AssignDoctorPayload,
} from "../types/api";

export const courseOfferingsService = {
  // جلب المواد المطروحة مع إمكانية الفلترة بحسب الترم
  getOfferings: async (
    semesterId?: number,
  ): Promise<CourseOfferingEntity[]> => {
    const url = semesterId
      ? `/course-offerings?semester_id=${semesterId}`
      : "/course-offerings";
    const res = await apiClient.get(url);
    return res.data.data;
  },

  // طرح مادة جديدة في فصل دراسي
  createOffering: async (payload: AddCourseOfferingPayload) => {
    const res = await apiClient.post("/course-offerings", payload);
    return res.data;
  },

  // دالة تعديل طرح المادة
  updateOffering: async (
    offeringId: number,
    payload: { course_id: number; semester_id: number },
  ) => {
    const res = await apiClient.put(`/course-offerings/${offeringId}`, payload);
    return res.data;
  },

  // جلب الدكاترة المسندين لمادة مطروحة محددة
  getCourseDoctors: async (
    offeringId?: number,
  ): Promise<CourseDoctorEntity[]> => {
    const url = offeringId
      ? `/course-doctors?offering_id=${offeringId}`
      : "/course-doctors";
    const res = await apiClient.get(url);
    return res.data.data;
  },

  // إسناد دكتور إلى مادة مطروحة (مفوض إلى الخدمة الموحدة courseDoctorsService)
  assignDoctor: (payload: AssignDoctorPayload) =>
    courseDoctorsService.assignDoctor(payload),

  // جلب أنواع المحتوى الأكاديمي
  getContentTypes: async (): Promise<ContentTypeEntity[]> => {
    const res = await apiClient.get("/content-types");
    return res.data.data;
  },

  deleteOffering: async (offeringId: number) => {
    const res = await apiClient.delete(`/course-offerings/${offeringId}`);
    return res.data;
  },
};

export default courseOfferingsService;
