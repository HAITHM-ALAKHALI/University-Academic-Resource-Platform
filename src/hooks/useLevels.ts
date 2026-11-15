import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { levelService } from "../services/levelService";
import { queryKeys } from "../constants/queryKeys";
import type { LevelEntity, AddLevel } from "../types/api";

export interface UseLevelsOptions {
  departmentId?: number;
  enabled?: boolean;
}

export interface UseLevelsReturn {
  levels: LevelEntity[];
  loading: boolean;
  isSubmitting: boolean;
  error: string | null;
  addLevel: (payload: AddLevel) => Promise<boolean>;
  updateLevel: (id: number, payload: AddLevel) => Promise<boolean>;
  deleteLevel: (id: number) => Promise<boolean>;
  refetch: () => Promise<void>;
  fetchLevels: () => Promise<void>;
}

/**
 * Hook for managing Academic Level entities.
 * Powered by TanStack Query v5 to provide shared caching, automatic deduplication,
 * department-filtered caching, and synchronized cache invalidation across all components.
 */
export function useLevels({
  departmentId,
  enabled = true,
}: UseLevelsOptions = {}): UseLevelsReturn {
  const queryClient = useQueryClient();
  const [mutationError, setMutationError] = useState<string | null>(null);

  // 1. Shared Query for fetching academic levels (optionally filtered by department)
  const {
    data: levels = [],
    isLoading,
    error: queryError,
    refetch,
  } = useQuery<LevelEntity[], Error>({
    queryKey: queryKeys.levels.list(departmentId),
    queryFn: async () => {
      const res = await levelService.fetchLevels(departmentId);
      if (res.status && Array.isArray(res.data)) {
        return res.data;
      }
      const message =
        "message" in res && typeof (res as Record<string, unknown>).message === "string"
          ? String((res as Record<string, unknown>).message)
          : "تعذر تحميل قائمة المستويات الدراسية";
      throw new Error(message);
    },
    enabled,
  });

  // 2. Mutation: Add Level (supports multi-department batch creation returned by backend)
  const addMutation = useMutation({
    mutationFn: async (payload: AddLevel) => {
      const res = await levelService.addLevel(payload);
      if (res.status && res.data) {
        return Array.isArray(res.data) ? res.data : [res.data];
      }
      throw new Error(res.message || res.massage || "فشلت إضافة المستوى");
    },
    onSuccess: (newLevels) => {
      // Synchronize active list cache if populated
      queryClient.setQueryData<LevelEntity[]>(
        queryKeys.levels.list(departmentId),
        (prev) => {
          if (!prev) return undefined;
          const relevantNew = departmentId
            ? newLevels.filter((lvl) => lvl.department_id === departmentId)
            : newLevels;
          const newIds = new Set(relevantNew.map((lvl) => lvl.level_id));
          return [...relevantNew, ...prev.filter((lvl) => !newIds.has(lvl.level_id))];
        },
      );
      // Invalidate all level queries (global and filtered) across subscribers
      queryClient.invalidateQueries({ queryKey: queryKeys.levels.all });
    },
  });

  // 3. Mutation: Update Level
  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: number;
      payload: AddLevel;
    }) => {
      const res = await levelService.updateLevel(id, payload);
      if (res.status && res.data) {
        return res.data;
      }
      throw new Error(res.message || res.massage || "فشل تحديث المستوى");
    },
    onSuccess: (updatedLevel) => {
      queryClient.setQueryData<LevelEntity[]>(
        queryKeys.levels.list(departmentId),
        (prev) => {
          if (!prev) return undefined;
          if (departmentId && updatedLevel.department_id !== departmentId) {
            return prev.filter((lvl) => lvl.level_id !== updatedLevel.level_id);
          }
          return prev.map((lvl) =>
            lvl.level_id === updatedLevel.level_id ? updatedLevel : lvl,
          );
        },
      );
      queryClient.invalidateQueries({ queryKey: queryKeys.levels.all });
    },
  });

  // 4. Mutation: Delete Level
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await levelService.deleteLevel(id);
      if (res.status) {
        return id;
      }
      throw new Error(res.message || "تعذر حذف المستوى");
    },
    onSuccess: (deletedId) => {
      queryClient.setQueryData<LevelEntity[]>(
        queryKeys.levels.list(departmentId),
        (prev) =>
          prev ? prev.filter((lvl) => lvl.level_id !== deletedId) : undefined,
      );
      queryClient.invalidateQueries({ queryKey: queryKeys.levels.all });
    },
  });

  // Action: Add Level with boolean return contract
  const addLevel = async (payload: AddLevel): Promise<boolean> => {
    setMutationError(null);
    try {
      await addMutation.mutateAsync(payload);
      return true;
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "حدث خطأ أثناء إرسال بيانات المستوى";
      setMutationError(msg);
      return false;
    }
  };

  // Action: Update Level with boolean return contract
  const updateLevel = async (
    id: number,
    payload: AddLevel,
  ): Promise<boolean> => {
    setMutationError(null);
    try {
      await updateMutation.mutateAsync({ id, payload });
      return true;
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "حدث خطأ أثناء تعديل المستوى";
      setMutationError(msg);
      return false;
    }
  };

  // Action: Delete Level with boolean return contract
  const deleteLevel = async (id: number): Promise<boolean> => {
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
  const fetchLevels = useCallback(async () => {
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
    levels,
    loading: isLoading,
    isSubmitting,
    error,
    addLevel,
    updateLevel,
    deleteLevel,
    refetch: fetchLevels,
    fetchLevels,
  };
}

export default useLevels;
