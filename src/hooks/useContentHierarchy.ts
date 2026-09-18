import { useState, useMemo, useCallback, useEffect } from "react";
import type {
  DepartmentEntity,
  LevelEntity,
  SemesterEntity,
  CourseOfferingEntity,
  CourseDoctorEntity,
  ContentTypeEntity,
  ContentEntity,
  ContentStatus,
} from "../types/content";

import { useDepartments } from "./useDepartments";
import { useLevels } from "./useLevels";
import { useSemesters } from "./useSemesters";
import { courseOfferingsService } from "../services/courseOfferingsService";
import { contentService } from "../services/contentService";

export interface UseContentHierarchyReturn {
  selectedDepartmentId: number | "";
  selectedLevelId: number | "";
  selectedSemesterId: number | "";
  selectedOfferingId: number | "";
  selectedCourseDoctorId: number | "";

  setDepartmentId: (id: number | "") => void;
  setLevelId: (id: number | "") => void;
  setSemesterId: (id: number | "") => void;
  setOfferingId: (id: number | "") => void;
  setCourseDoctorId: (id: number | "") => void;
  resetAll: () => void;

  departments: DepartmentEntity[];
  filteredLevels: LevelEntity[];
  filteredSemesters: SemesterEntity[];
  filteredOfferings: CourseOfferingEntity[];
  filteredCourseDoctors: CourseDoctorEntity[];
  contentTypes: ContentTypeEntity[];

  currentDepartment?: DepartmentEntity;
  currentLevel?: LevelEntity;
  currentSemester?: SemesterEntity;
  currentOffering?: CourseOfferingEntity;
  currentCourseDoctor?: CourseDoctorEntity;
  isChainComplete: boolean;

  displayedContents: ContentEntity[];
  loading: boolean;
  updateContentStatus: (
    contentId: number,
    status: ContentStatus,
  ) => Promise<void>;
  addContent: (formData: FormData) => Promise<boolean>;
  editContent: (
    contentId: number,
    updates: Partial<ContentEntity>,
  ) => Promise<boolean>;
  deleteContent: (contentId: number) => Promise<boolean>;
}

export function useContentHierarchy(): UseContentHierarchyReturn {
  // 1. حالات التحديد المتتالية (Cascading IDs)
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<number | "">(
    "",
  );
  const [selectedLevelId, setSelectedLevelId] = useState<number | "">("");
  const [selectedSemesterId, setSelectedSemesterId] = useState<number | "">("");
  const [selectedOfferingId, setSelectedOfferingId] = useState<number | "">("");
  const [selectedCourseDoctorId, setSelectedCourseDoctorId] = useState<
    number | ""
  >("");

  // 2. حالات البيانات الأكاديمية
  const { departments } = useDepartments();
  const { levels } = useLevels();
  const { semesters } = useSemesters();

  const [filteredOfferings, setFilteredOfferings] = useState<
    CourseOfferingEntity[]
  >([]);
  const [filteredCourseDoctors, setFilteredCourseDoctors] = useState<
    CourseDoctorEntity[]
  >([]);
  const [contentTypes, setContentTypes] = useState<ContentTypeEntity[]>([]);
  const [displayedContents, setDisplayedContents] = useState<ContentEntity[]>(
    [],
  );
  const [loading, setLoading] = useState<boolean>(false);

  // جلب أنواع المحتوى الأكاديمي عند بدء التشغيل
  useEffect(() => {
    courseOfferingsService
      .getContentTypes?.()
      ?.then((types: any) => setContentTypes(types))
      ?.catch(() => {});
  }, []);

  // الفلترة الهرمية للمستويات والفصول محلياً من القوائم
  const filteredLevels = useMemo(() => {
    if (!selectedDepartmentId) return [];
    return levels.filter(
      (lvl: any) => lvl.department_id === selectedDepartmentId,
    );
  }, [levels, selectedDepartmentId]);

  const filteredSemesters = useMemo(() => {
    if (!selectedLevelId) return [];
    return semesters.filter((sem: any) => sem.level_id === selectedLevelId);
  }, [semesters, selectedLevelId]);

  // جلب المقررات المطروحة عند اختيار الفصل الدراسي
  useEffect(() => {
    if (!selectedSemesterId) {
      setFilteredOfferings([]);
      return;
    }
    courseOfferingsService
      .getOfferings(Number(selectedSemesterId))
      .then((data: any) => setFilteredOfferings(data))
      .catch(() => setFilteredOfferings([]));
  }, [selectedSemesterId]);

  // جلب الدكاترة المسندين عند اختيار المادة المطروحة
  useEffect(() => {
    if (!selectedOfferingId) {
      setFilteredCourseDoctors([]);
      return;
    }
    courseOfferingsService
      .getCourseDoctors(Number(selectedOfferingId))
      .then((data: any) => setFilteredCourseDoctors(data))
      .catch(() => setFilteredCourseDoctors([]));
  }, [selectedOfferingId]);

  // جلب المحتويات عبر طبقة الخدمات (كل المحتويات أو مصفاة حسب دكتور المادة)
  const loadContents = useCallback(async () => {
    try {
      setLoading(true);
      const data = await contentService.getContents(selectedCourseDoctorId);
      setDisplayedContents(data);
    } catch {
      setDisplayedContents([]);
    } finally {
      setLoading(false);
    }
  }, [selectedCourseDoctorId]);

  // استدعاء الجلب عند بدء التشغيل أو عند تغيير الدكتور
  useEffect(() => {
    loadContents();
  }, [loadContents]);

  // 3. دوال إعادة الضبط المتتالي (Cascading Resets)
  const setDepartmentId = useCallback((id: number | "") => {
    setSelectedDepartmentId(id);
    setSelectedLevelId("");
    setSelectedSemesterId("");
    setSelectedOfferingId("");
    setSelectedCourseDoctorId("");
  }, []);

  const setLevelId = useCallback((id: number | "") => {
    setSelectedLevelId(id);
    setSelectedSemesterId("");
    setSelectedOfferingId("");
    setSelectedCourseDoctorId("");
  }, []);

  const setSemesterId = useCallback((id: number | "") => {
    setSelectedSemesterId(id);
    setSelectedOfferingId("");
    setSelectedCourseDoctorId("");
  }, []);

  const setOfferingId = useCallback((id: number | "") => {
    setSelectedOfferingId(id);
    setSelectedCourseDoctorId("");
  }, []);

  const setCourseDoctorId = useCallback((id: number | "") => {
    setSelectedCourseDoctorId(id);
  }, []);

  const resetAll = useCallback(() => {
    setSelectedDepartmentId("");
    setSelectedLevelId("");
    setSelectedSemesterId("");
    setSelectedOfferingId("");
    setSelectedCourseDoctorId("");
  }, []);

  // 4. الكيانات الحالية المختارة
  const currentDepartment = useMemo(
    () =>
      departments.find((d: any) => d.department_id === selectedDepartmentId),
    [departments, selectedDepartmentId],
  );

  const currentLevel = useMemo(
    () => filteredLevels.find((l) => l.level_id === selectedLevelId),
    [filteredLevels, selectedLevelId],
  );

  const currentSemester = useMemo(
    () => filteredSemesters.find((s) => s.semester_id === selectedSemesterId),
    [filteredSemesters, selectedSemesterId],
  );

  const currentOffering = useMemo(
    () => filteredOfferings.find((o) => o.offering_id === selectedOfferingId),
    [filteredOfferings, selectedOfferingId],
  );

  const currentCourseDoctor = useMemo(
    () =>
      filteredCourseDoctors.find(
        (cd) => cd.course_doctor_id === selectedCourseDoctorId,
      ),
    [filteredCourseDoctors, selectedCourseDoctorId],
  );

  const isChainComplete = Boolean(
    selectedDepartmentId &&
    selectedLevelId &&
    selectedSemesterId &&
    selectedOfferingId &&
    selectedCourseDoctorId,
  );

  // 5. عمليات الـ CRUD المتصلة بالـ API
  const updateContentStatus = useCallback(
    async (contentId: number, status: ContentStatus) => {
      try {
        await contentService.updateStatus(contentId, status);
        setDisplayedContents((prev) =>
          prev.map((item) =>
            item.content_id === contentId ? { ...item, status } : item,
          ),
        );
      } catch (err: any) {
        alert(err.response?.data?.message || "فشل تحديث حالة المحتوى");
      }
    },
    [],
  );

  const addContent = useCallback(
    async (formData: FormData): Promise<boolean> => {
      try {
        await contentService.createContent(formData);
        await loadContents();
        return true;
      } catch (err: any) {
        alert(err.response?.data?.message || "فشل رفع المحتوى");
        return false;
      }
    },
    [loadContents],
  );

  const editContent = useCallback(
    async (
      contentId: number,
      updates: Partial<ContentEntity>,
    ): Promise<boolean> => {
      try {
        await contentService.updateContent(contentId, updates);
        await loadContents();
        return true;
      } catch (err: any) {
        alert(err.response?.data?.message || "فشل تعديل المحتوى");
        return false;
      }
    },
    [loadContents],
  );

  const deleteContent = useCallback(
    async (contentId: number): Promise<boolean> => {
      try {
        await contentService.deleteContent(contentId);
        setDisplayedContents((prev) =>
          prev.filter((item) => item.content_id !== contentId),
        );
        return true;
      } catch (err: any) {
        alert(err.response?.data?.message || "فشل حذف المحتوى");
        return false;
      }
    },
    [],
  );

  return {
    selectedDepartmentId,
    selectedLevelId,
    selectedSemesterId,
    selectedOfferingId,
    selectedCourseDoctorId,
    setDepartmentId,
    setLevelId,
    setSemesterId,
    setOfferingId,
    setCourseDoctorId,
    resetAll,
    departments,
    filteredLevels,
    filteredSemesters,
    filteredOfferings,
    filteredCourseDoctors,
    contentTypes,
    currentDepartment,
    currentLevel,
    currentSemester,
    currentOffering,
    currentCourseDoctor,
    isChainComplete,
    displayedContents,
    loading,
    updateContentStatus,
    addContent,
    editContent,
    deleteContent,
  };
}

export default useContentHierarchy;
