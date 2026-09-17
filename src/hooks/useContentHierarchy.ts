import { useState, useMemo, useCallback } from "react";
import type {
  DepartmentEntity,
  LevelEntity,
  SemesterEntity,
  CourseOfferingEntity,
  CourseDoctorEntity,
  ContentTypeEntity,
  ContentEntity,
  ContentStatus,
  CreateContentPayload,
} from "../types/content";
import {
  initialDepartments,
  initialLevels,
  initialSemesters,
  initialCourseOfferings,
  initialCourseDoctors,
  initialContentTypes,
  initialContents,
} from "../constants/contentManagementData";

export interface UseContentHierarchyReturn {
  // Cascading Selection State
  selectedDepartmentId: number | "";
  selectedLevelId: number | "";
  selectedSemesterId: number | "";
  selectedOfferingId: number | "";
  selectedCourseDoctorId: number | "";

  // Selection Setters with Cascading Reset
  setDepartmentId: (id: number | "") => void;
  setLevelId: (id: number | "") => void;
  setSemesterId: (id: number | "") => void;
  setOfferingId: (id: number | "") => void;
  setCourseDoctorId: (id: number | "") => void;
  resetAll: () => void;

  // Filtered Options for Each Cascading Tier
  departments: DepartmentEntity[];
  filteredLevels: LevelEntity[];
  filteredSemesters: SemesterEntity[];
  filteredOfferings: CourseOfferingEntity[];
  filteredCourseDoctors: CourseDoctorEntity[];
  contentTypes: ContentTypeEntity[];

  // Resolved Current Selected Entities
  currentDepartment?: DepartmentEntity;
  currentLevel?: LevelEntity;
  currentSemester?: SemesterEntity;
  currentOffering?: CourseOfferingEntity;
  currentCourseDoctor?: CourseDoctorEntity;
  isChainComplete: boolean;

  // Content Records & CRUD Operations
  displayedContents: ContentEntity[];
  updateContentStatus: (contentId: number, status: ContentStatus) => void;
  addContent: (payload: CreateContentPayload) => void;
  editContent: (contentId: number, updates: Partial<ContentEntity>) => void;
  deleteContent: (contentId: number) => void;
}

export function useContentHierarchy(): UseContentHierarchyReturn {
  // 1. Cascading Selected IDs
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<number | "">(1);
  const [selectedLevelId, setSelectedLevelId] = useState<number | "">(1);
  const [selectedSemesterId, setSelectedSemesterId] = useState<number | "">(1);
  const [selectedOfferingId, setSelectedOfferingId] = useState<number | "">(1);
  const [selectedCourseDoctorId, setSelectedCourseDoctorId] = useState<number | "">(1);

  // 2. Master & Dynamic Contents State
  const [contents, setContents] = useState<ContentEntity[]>(initialContents);

  // 3. Filtered Lists per Hierarchy Tier
  const departments = initialDepartments;

  const filteredLevels = useMemo(() => {
    if (!selectedDepartmentId) return [];
    return initialLevels.filter((lvl) => lvl.department_id === selectedDepartmentId);
  }, [selectedDepartmentId]);

  const filteredSemesters = useMemo(() => {
    if (!selectedLevelId) return [];
    return initialSemesters.filter((sem) => sem.level_id === selectedLevelId);
  }, [selectedLevelId]);

  const filteredOfferings = useMemo(() => {
    if (!selectedSemesterId) return [];
    return initialCourseOfferings.filter((off) => off.semester_id === selectedSemesterId);
  }, [selectedSemesterId]);

  const filteredCourseDoctors = useMemo(() => {
    if (!selectedOfferingId) return [];
    return initialCourseDoctors.filter((cd) => cd.offering_id === selectedOfferingId);
  }, [selectedOfferingId]);

  // 4. Cascading Reset Handlers
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

  // 5. Resolved Entities
  const currentDepartment = useMemo(
    () => departments.find((d) => d.department_id === selectedDepartmentId),
    [departments, selectedDepartmentId]
  );

  const currentLevel = useMemo(
    () => filteredLevels.find((l) => l.level_id === selectedLevelId),
    [filteredLevels, selectedLevelId]
  );

  const currentSemester = useMemo(
    () => filteredSemesters.find((s) => s.semester_id === selectedSemesterId),
    [filteredSemesters, selectedSemesterId]
  );

  const currentOffering = useMemo(
    () => filteredOfferings.find((o) => o.offering_id === selectedOfferingId),
    [filteredOfferings, selectedOfferingId]
  );

  const currentCourseDoctor = useMemo(
    () => filteredCourseDoctors.find((cd) => cd.course_doctor_id === selectedCourseDoctorId),
    [filteredCourseDoctors, selectedCourseDoctorId]
  );

  const isChainComplete = Boolean(
    selectedDepartmentId &&
      selectedLevelId &&
      selectedSemesterId &&
      selectedOfferingId &&
      selectedCourseDoctorId
  );

  // 6. Contents Filtered by Selected Course Doctor ID
  const displayedContents = useMemo(() => {
    if (!selectedCourseDoctorId) return [];
    return contents.filter((c) => c.course_doctor_id === selectedCourseDoctorId);
  }, [contents, selectedCourseDoctorId]);

  // 7. Operations
  const updateContentStatus = useCallback(
    (contentId: number, status: ContentStatus) => {
      setContents((prev) =>
        prev.map((item) =>
          item.content_id === contentId
            ? { ...item, status, updated_at: new Date().toISOString() }
            : item
        )
      );
    },
    []
  );

  const addContent = useCallback(
    (payload: CreateContentPayload) => {
      if (!selectedCourseDoctorId) return;

      const newId = Date.now();
      const formattedSize = payload.file_size
        ? `${(payload.file_size / (1024 * 1024)).toFixed(1)} MB`
        : undefined;

      const newContent: ContentEntity = {
        content_id: newId,
        course_doctor_id: Number(selectedCourseDoctorId),
        content_type_id: payload.content_type_id,
        uploaded_by: 1, // Current active admin user
        uploaded_by_name: "مدير النظام (أنت)",
        title: payload.title,
        description: payload.description,
        source_type: payload.source_type,
        file_name: payload.file_name,
        file_size: payload.file_size,
        file_size_formatted: formattedSize,
        file_extension: payload.file_extension,
        video_url: payload.video_url,
        download_count: 0,
        status: "approved",
        created_at: new Date().toISOString().replace("T", " ").substring(0, 16),
      };

      setContents((prev) => [newContent, ...prev]);
    },
    [selectedCourseDoctorId]
  );

  const editContent = useCallback(
    (contentId: number, updates: Partial<ContentEntity>) => {
      setContents((prev) =>
        prev.map((item) =>
          item.content_id === contentId
            ? { ...item, ...updates, updated_at: new Date().toISOString() }
            : item
        )
      );
    },
    []
  );

  const deleteContent = useCallback((contentId: number) => {
    setContents((prev) => prev.filter((item) => item.content_id !== contentId));
  }, []);

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
    contentTypes: initialContentTypes,
    currentDepartment,
    currentLevel,
    currentSemester,
    currentOffering,
    currentCourseDoctor,
    isChainComplete,
    displayedContents,
    updateContentStatus,
    addContent,
    editContent,
    deleteContent,
  };
}
export default useContentHierarchy;
