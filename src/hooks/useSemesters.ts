import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { semesterService, type SemesterFilterParams } from "../services/semesterService";
import { queryKeys } from "../constants/queryKeys";
import type { SemesterEntity, AddSemester } from "../types/api";

export interface UseSemestersOptions extends SemesterFilterParams {
  enabled?: boolean;
}

export interface UseSemestersReturn {
  semesters: SemesterEntity[];
  loading: boolean;
  isSubmitting: boolean;
  error: string | null;
  addSemester: (payload: AddSemester) => Promise<boolean>;
  updateSemester: (id: number, payload: AddSemester) => Promise<boolean>;
  deleteSemester: (id: number) => Promise<boolean>;
  refetch: () => Promise<void>;
  fetchSemesters: () => Promise<void>;
}

/**
 * Extracts descriptive error messages including Laravel 422 validation errors.
 */
function extractErrorMessage(err: unknown, fallback: string): string {
  if (err && typeof err === "object") {
    const response = (err as Record<string, any>).response;
    const validationErrors = response?.data?.errors;
    if (validationErrors && typeof validationErrors === "object") {
      const firstKey = Object.keys(validationErrors)[0];
      if (
        firstKey &&
        Array.isArray(validationErrors[firstKey]) &&
        validationErrors[firstKey].length > 0
      ) {
        return validationErrors[firstKey][0];
      }
    }
    const backendMessage = response?.data?.message;
    if (typeof backendMessage === "string") return backendMessage;
    if ("message" in err && typeof (err as any).message === "string") {
      return (err as any).message;
    }
  }
  return fallback;
}

/**
 * Hook for managing Academic Semester entities.
 * Powered by TanStack Query v5 to provide shared caching, automatic deduplication,
 * filtered queries (by level and/or academic year), and synchronized cache invalidation.
 */
export function useSemesters({
  levelId,
  academicYear,
  enabled = true,
}: UseSemestersOptions = {}): UseSemestersReturn {
  const queryClient = useQueryClient();
  const [mutationError, setMutationError] = useState<string | null>(null);

  const filterParams = { levelId, academicYear };
  const listKey = queryKeys.semesters.list(filterParams);

  // 1. Shared Query for fetching semesters (optionally filtered by levelId and/or academicYear)
  const {
    data: semesters = [],
    isLoading,
    error: queryError,
    refetch,
  } = useQuery<SemesterEntity[], Error>({
    queryKey: listKey,
    queryFn: async () => {
      const res = await semesterService.fetchSemesters(filterParams);
      if (res.status && Array.isArray(res.data)) {
        return res.data;
      }
      const message =
        "message" in res && typeof (res as Record<string, unknown>).message === "string"
          ? String((res as Record<string, unknown>).message)
          : "تعذر تحميل قائمة الفصول الدراسية";
      throw new Error(message);
    },
    enabled,
  });

  // 2. Mutation: Add Semester
  const addMutation = useMutation({
    mutationFn: async (payload: AddSemester) => {
      const res = await semesterService.addSemester(payload);
      if (res.status && res.data) {
        return res.data;
      }
      throw new Error(res.message || res.massage || "فشلت إضافة الفصل الدراسي");
    },
    onSuccess: (newSemester) => {
      queryClient.setQueryData<SemesterEntity[]>(listKey, (prev) => {
        if (!prev) return undefined;
        // Verify filter compatibility if active filters are present
        if (levelId && newSemester.level_id !== levelId) {
          return prev;
        }
        if (academicYear && newSemester.academic_year !== academicYear) {
          return prev;
        }
        return [
          newSemester,
          ...prev.filter((s) => s.semester_id !== newSemester.semester_id),
        ];
      });
      // Invalidate all semester queries (both global and filtered) across subscribers
      queryClient.invalidateQueries({ queryKey: queryKeys.semesters.all });
    },
  });

  // 3. Mutation: Update Semester
  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: number;
      payload: AddSemester;
    }) => {
      const res = await semesterService.updateSemester(id, payload);
      if (res.status && res.data) {
        return res.data;
      }
      throw new Error(res.message || res.massage || "فشل تحديث الفصل الدراسي");
    },
    onSuccess: (updatedSemester) => {
      queryClient.setQueryData<SemesterEntity[]>(listKey, (prev) => {
        if (!prev) return undefined;
        if (levelId && updatedSemester.level_id !== levelId) {
          return prev.filter((s) => s.semester_id !== updatedSemester.semester_id);
        }
        if (academicYear && updatedSemester.academic_year !== academicYear) {
          return prev.filter((s) => s.semester_id !== updatedSemester.semester_id);
        }
        return prev.map((s) =>
          s.semester_id === updatedSemester.semester_id ? updatedSemester : s,
        );
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.semesters.all });
    },
  });

  // 4. Mutation: Delete Semester
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await semesterService.deleteSemester(id);
      if (res.status) {
        return id;
      }
      throw new Error(res.message || "تعذر حذف الفصل الدراسي");
    },
    onSuccess: (deletedId) => {
      queryClient.setQueryData<SemesterEntity[]>(listKey, (prev) =>
        prev ? prev.filter((s) => s.semester_id !== deletedId) : undefined,
      );
      queryClient.invalidateQueries({ queryKey: queryKeys.semesters.all });
    },
  });

  // Action: Add Semester with boolean return contract
  const addSemester = async (payload: AddSemester): Promise<boolean> => {
    setMutationError(null);
    try {
      await addMutation.mutateAsync(payload);
      return true;
    } catch (err: unknown) {
      const msg = extractErrorMessage(err, "حدث خطأ أثناء حفظ الفصل الدراسي");
      setMutationError(msg);
      return false;
    }
  };

  // Action: Update Semester with boolean return contract
  const updateSemester = async (
    id: number,
    payload: AddSemester,
  ): Promise<boolean> => {
    setMutationError(null);
    try {
      await updateMutation.mutateAsync({ id, payload });
      return true;
    } catch (err: unknown) {
      const msg = extractErrorMessage(err, "حدث خطأ أثناء تعديل الفصل الدراسي");
      setMutationError(msg);
      return false;
    }
  };

  // Action: Delete Semester with boolean return contract
  const deleteSemester = async (id: number): Promise<boolean> => {
    setMutationError(null);
    try {
      await deleteMutation.mutateAsync(id);
      return true;
    } catch (err: unknown) {
      const msg = extractErrorMessage(err, "حدث خطأ أثناء محاولة الحذف");
      setMutationError(msg);
      return false;
    }
  };

  // Imperative fetch/refetch callback
  const fetchSemesters = useCallback(async () => {
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
    semesters,
    loading: isLoading,
    isSubmitting,
    error,
    addSemester,
    updateSemester,
    deleteSemester,
    refetch: fetchSemesters,
    fetchSemesters,
  };
}

export default useSemesters;
