import { useState, useMemo, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
import { courseContentsService } from "../services/courseContentsService";
import { queryKeys } from "../constants/queryKeys";

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

/**
 * Hook for managing academic content hierarchy and resource operations.
 * Powered by TanStack Query v5 to provide shared caching, automatic deduplication,
 * synchronized mutations, and cascading query invalidation.
 */
export function useContentHierarchy(): UseContentHierarchyReturn {
  const queryClient = useQueryClient();

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

  // 2. حالات البيانات الأكاديمية المشتركة (Academic Hierarchy Queries)
  const { departments } = useDepartments();
  const { levels } = useLevels();
  const { semesters } = useSemesters();

  // 3. استعلام تصنيفات المحتوى الأكاديمي (Content Types Query - Cached globally)
  const { data: contentTypes = [] } = useQuery<ContentTypeEntity[]>({
    queryKey: queryKeys.contentTypes.all,
    queryFn: () => courseContentsService.getContentTypes(),
    staleTime: 5 * 60 * 1000,
  });

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

  // 4. استعلام المقررات المطروحة (Course Offerings Query - Dependent on selectedSemesterId)
  const { data: rawOfferings = [] } = useQuery<CourseOfferingEntity[]>({
    queryKey: queryKeys.courseOfferings.list(
      selectedSemesterId ? Number(selectedSemesterId) : undefined,
    ),
    queryFn: async () => {
      const data = await courseOfferingsService.getOfferings(
        Number(selectedSemesterId),
      );
      return Array.isArray(data)
        ? (data as unknown as CourseOfferingEntity[])
        : [];
    },
    enabled: Boolean(selectedSemesterId),
  });

  const filteredOfferings = useMemo(() => {
    if (!selectedSemesterId) return [];
    return rawOfferings;
  }, [selectedSemesterId, rawOfferings]);

  // 5. استعلام الدكاترة المسندين (Course Doctors Query - Dependent on selectedOfferingId)
  const { data: rawCourseDoctors = [] } = useQuery<CourseDoctorEntity[]>({
    queryKey: queryKeys.courseDoctors.list(
      selectedOfferingId ? Number(selectedOfferingId) : undefined,
    ),
    queryFn: async () => {
      const data = await courseOfferingsService.getCourseDoctors(
        Number(selectedOfferingId),
      );
      return Array.isArray(data)
        ? (data as unknown as CourseDoctorEntity[])
        : [];
    },
    enabled: Boolean(selectedOfferingId),
  });

  const filteredCourseDoctors = useMemo(() => {
    if (!selectedOfferingId) return [];
    return rawCourseDoctors;
  }, [selectedOfferingId, rawCourseDoctors]);

  // 6. استعلام المحتويات الأكاديمية (Contents Query - Filtered by doctor or all contents)
  const contentFilter = useMemo(() => {
    return selectedCourseDoctorId !== ""
      ? { course_doctor_id: selectedCourseDoctorId }
      : undefined;
  }, [selectedCourseDoctorId]);

  const {
    data: displayedContents = [],
    isLoading: isContentsLoading,
  } = useQuery<ContentEntity[]>({
    queryKey: queryKeys.contents.list(contentFilter),
    queryFn: async () => {
      const data = await courseContentsService.getContents(
        selectedCourseDoctorId !== "" ? selectedCourseDoctorId : undefined,
      );
      return Array.isArray(data) ? data : [];
    },
  });

  // 7. دوال إعادة الضبط المتتالي (Cascading Resets)
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

  // 8. الكيانات الحالية المختارة (Current Resolvers)
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

  // 9. طفرات تعديل البيانات (Mutations with Cache Synchronization)

  // طفرة رفع محتوى جديد (Create Content Mutation)
  const addMutation = useMutation({
    mutationFn: (formData: FormData) =>
      courseContentsService.createContent(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.contents.all });
    },
  });

  // طفرة حذف محتوى (Delete Content Mutation)
  const deleteMutation = useMutation({
    mutationFn: (contentId: number) =>
      courseContentsService.deleteContent(contentId),
    onSuccess: (_, deletedId) => {
      queryClient.setQueriesData<ContentEntity[]>(
        { queryKey: queryKeys.contents.all },
        (old) =>
          old ? old.filter((item) => item.content_id !== deletedId) : old,
      );
      queryClient.invalidateQueries({ queryKey: queryKeys.contents.all });
    },
  });

  // طفرة تعديل محتوى (Edit Content Mutation - unsupported on backend)
  const editMutation = useMutation({
    mutationFn: ({
      contentId,
      updates,
    }: {
      contentId: number;
      updates: Partial<ContentEntity>;
    }) => courseContentsService.updateContent(contentId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.contents.all });
    },
  });

  // طفرة تحديث الحالة (Status Mutation - unsupported on backend)
  const statusMutation = useMutation({
    mutationFn: ({
      contentId,
      status,
    }: {
      contentId: number;
      status: ContentStatus;
    }) => courseContentsService.updateStatus(contentId, status),
    onSuccess: (_, { contentId, status }) => {
      queryClient.setQueriesData<ContentEntity[]>(
        { queryKey: queryKeys.contents.all },
        (old) =>
          old
            ? old.map((item) =>
                item.content_id === contentId ? { ...item, status } : item,
              )
            : old,
      );
      queryClient.invalidateQueries({ queryKey: queryKeys.contents.all });
    },
  });

  // دوال الإجراءات مع الحفاظ الكامل على عقود الواجهة البرمجية ومعالجة الأخطاء
  const addContent = useCallback(
    async (formData: FormData): Promise<boolean> => {
      try {
        await addMutation.mutateAsync(formData);
        return true;
      } catch (err: any) {
        alert(err.response?.data?.message || "فشل رفع المحتوى");
        return false;
      }
    },
    [addMutation],
  );

  const editContent = useCallback(
    async (
      contentId: number,
      updates: Partial<ContentEntity>,
    ): Promise<boolean> => {
      try {
        await editMutation.mutateAsync({ contentId, updates });
        return true;
      } catch (err: any) {
        alert(err.response?.data?.message || "فشل تعديل المحتوى");
        return false;
      }
    },
    [editMutation],
  );

  const deleteContent = useCallback(
    async (contentId: number): Promise<boolean> => {
      try {
        await deleteMutation.mutateAsync(contentId);
        return true;
      } catch (err: any) {
        alert(err.response?.data?.message || "فشل حذف المحتوى");
        return false;
      }
    },
    [deleteMutation],
  );

  const updateContentStatus = useCallback(
    async (contentId: number, status: ContentStatus): Promise<void> => {
      try {
        await statusMutation.mutateAsync({ contentId, status });
      } catch (err: any) {
        alert(err.response?.data?.message || "فشل تحديث حالة المحتوى");
      }
    },
    [statusMutation],
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
    loading: isContentsLoading,
    updateContentStatus,
    addContent,
    editContent,
    deleteContent,
  };
}

export default useContentHierarchy;
