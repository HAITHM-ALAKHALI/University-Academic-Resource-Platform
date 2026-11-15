import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { courseService } from "../services/courseService";
import { queryKeys } from "../constants/queryKeys";
import type { CourseEntity, AddCourse } from "../types/api";

export interface UseCoursesOptions {
  enabled?: boolean;
}

export interface UseCoursesReturn {
  courses: CourseEntity[];
  loading: boolean;
  isSubmitting: boolean;
  error: string | null;
  addCourse: (payload: AddCourse) => Promise<boolean>;
  updateCourse: (id: number, payload: AddCourse) => Promise<boolean>;
  deleteCourse: (id: number) => Promise<boolean>;
  refetch: () => Promise<void>;
  fetchCourses: () => Promise<void>;
}

/**
 * Hook for managing Course entities.
 * Powered by TanStack Query v5 to provide shared caching, automatic deduplication,
 * and synchronized cache invalidation across all components.
 */
export function useCourses({
  enabled = true,
}: UseCoursesOptions = {}): UseCoursesReturn {
  const queryClient = useQueryClient();
  const [mutationError, setMutationError] = useState<string | null>(null);

  // 1. Shared Query for fetching courses list
  const {
    data: courses = [],
    isLoading,
    error: queryError,
    refetch,
  } = useQuery<CourseEntity[], Error>({
    queryKey: queryKeys.courses.list(),
    queryFn: async () => {
      const res = await courseService.fetchCourses();
      if (res.status && Array.isArray(res.data)) {
        return res.data;
      }
      const message =
        "message" in res && typeof (res as Record<string, unknown>).message === "string"
          ? String((res as Record<string, unknown>).message)
          : "تعذر تحميل قائمة المواد";
      throw new Error(message);
    },
    enabled,
  });

  // 2. Mutation: Add Course
  const addMutation = useMutation({
    mutationFn: async (payload: AddCourse) => {
      const res = await courseService.addCourse(payload);
      if (res.status && res.data) {
        return res.data;
      }
      throw new Error(res.message || res.massage || "فشلت إضافة المادة");
    },
    onSuccess: (newCourse) => {
      // If cache is populated, update with new course; if unpopulated, leave undefined
      // so TanStack Query does not fabricate a partial 1-item array for an uninitialized list.
      queryClient.setQueryData<CourseEntity[]>(
        queryKeys.courses.list(),
        (prev) =>
          prev
            ? [newCourse, ...prev.filter((c) => c.course_id !== newCourse.course_id)]
            : undefined,
      );
      // Invalidate to guarantee full server-side consistency across all subscribers
      queryClient.invalidateQueries({ queryKey: queryKeys.courses.all });
    },
  });

  // 3. Mutation: Update Course
  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: number;
      payload: AddCourse;
    }) => {
      const res = await courseService.updateCourse(id, payload);
      if (res.status && res.data) {
        return res.data;
      }
      throw new Error(res.message || res.massage || "فشل تحديث بيانات المادة");
    },
    onSuccess: (updatedCourse) => {
      queryClient.setQueryData<CourseEntity[]>(
        queryKeys.courses.list(),
        (prev) =>
          prev
            ? prev.map((cour) =>
                cour.course_id === updatedCourse.course_id ? updatedCourse : cour,
              )
            : undefined,
      );
      queryClient.invalidateQueries({ queryKey: queryKeys.courses.all });
    },
  });

  // 4. Mutation: Delete Course
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await courseService.deleteCourse(id);
      if (res.status) {
        return id;
      }
      throw new Error(res.message || "تعذر إتمام عملية الحذف");
    },
    onSuccess: (deletedId) => {
      queryClient.setQueryData<CourseEntity[]>(
        queryKeys.courses.list(),
        (prev) =>
          prev ? prev.filter((cour) => cour.course_id !== deletedId) : undefined,
      );
      queryClient.invalidateQueries({ queryKey: queryKeys.courses.all });
    },
  });

  // Action: Add Course with boolean return contract
  const addCourse = async (payload: AddCourse): Promise<boolean> => {
    setMutationError(null);
    try {
      await addMutation.mutateAsync(payload);
      return true;
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "تعذر إرسال بيانات المادة إلى الخادم";
      setMutationError(msg);
      return false;
    }
  };

  // Action: Update Course with boolean return contract
  const updateCourse = async (
    id: number,
    payload: AddCourse,
  ): Promise<boolean> => {
    setMutationError(null);
    try {
      await updateMutation.mutateAsync({ id, payload });
      return true;
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "حدث خطأ أثناء إرسال تعديل المادة";
      setMutationError(msg);
      return false;
    }
  };

  // Action: Delete Course with boolean return contract
  const deleteCourse = async (id: number): Promise<boolean> => {
    setMutationError(null);
    try {
      await deleteMutation.mutateAsync(id);
      return true;
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "حدث خطأ أثناء محاولة الحذف";
      setMutationError(msg);
      return false;
    }
  };

  // Imperative fetch/refetch callback
  const fetchCourses = useCallback(async () => {
    setMutationError(null);
    await refetch();
  }, [refetch]);

  // Combined submission status across all mutations
  const isSubmitting =
    addMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending;

  // Combined error state: mutation error takes precedence, falls back to query error
  const error = mutationError || (queryError ? queryError.message : null);

  return {
    courses,
    loading: isLoading,
    isSubmitting,
    error,
    addCourse,
    updateCourse,
    deleteCourse,
    refetch: fetchCourses,
    fetchCourses,
  };
}

export default useCourses;
