import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { departmentService } from "../services/departmentService";
import { queryKeys } from "../constants/queryKeys";
import type { DepartmentEntity, AddDepartment } from "../types/api";

export interface UseDepartmentsOptions {
  enabled?: boolean;
}

export interface UseDepartmentsReturn {
  departments: DepartmentEntity[];
  loading: boolean;
  isSubmitting: boolean;
  error: string | null;
  addDepartment: (payload: AddDepartment) => Promise<boolean>;
  updateDepartment: (id: number, payload: AddDepartment) => Promise<boolean>;
  deleteDepartment: (id: number) => Promise<boolean>;
  refetch: () => Promise<void>;
  fetchDepartments: () => Promise<void>;
}

/**
 * Hook for managing Department entities.
 * Powered by TanStack Query v5 to provide shared caching, automatic deduplication,
 * and synchronized cache invalidation across all components.
 */
export function useDepartments({
  enabled = true,
}: UseDepartmentsOptions = {}): UseDepartmentsReturn {
  const queryClient = useQueryClient();
  const [mutationError, setMutationError] = useState<string | null>(null);

  // 1. Shared Query for fetching departments list
  const {
    data: departments = [],
    isLoading,
    error: queryError,
    refetch,
  } = useQuery<DepartmentEntity[], Error>({
    queryKey: queryKeys.departments.list(),
    queryFn: async () => {
      const res = await departmentService.getDepartments();
      if (res.status && Array.isArray(res.data)) {
        return res.data;
      }
      const message =
        "message" in res && typeof res.message === "string"
          ? res.message
          : "تعذر تحميل قائمة الأقسام";
      throw new Error(message);
    },
    enabled,
  });

  // 2. Mutation: Add Department
  const addMutation = useMutation({
    mutationFn: async (payload: AddDepartment) => {
      const res = await departmentService.addDepartment(payload);
      if (res.status && res.data) {
        return res.data;
      }
      throw new Error(res.message || res.massage || "فشلت إضافة القسم");
    },
    onSuccess: (newDept) => {
      // If cache is populated, optimistically update it; if unpopulated, leave undefined
      // so TanStack Query does not construct a partial 1-item array for an uninitialized list.
      queryClient.setQueryData<DepartmentEntity[]>(
        queryKeys.departments.list(),
        (prev) =>
          prev
            ? [newDept, ...prev.filter((d) => d.department_id !== newDept.department_id)]
            : undefined,
      );
      // Invalidate to guarantee full server-side consistency across all subscribers
      queryClient.invalidateQueries({ queryKey: queryKeys.departments.all });
    },
  });

  // 3. Mutation: Update Department
  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: number;
      payload: AddDepartment;
    }) => {
      const res = await departmentService.updateDepartment(id, payload);
      if (res.status && res.data) {
        return res.data;
      }
      throw new Error(res.message || res.massage || "فشل تحديث بيانات القسم");
    },
    onSuccess: (updatedDept) => {
      queryClient.setQueryData<DepartmentEntity[]>(
        queryKeys.departments.list(),
        (prev) =>
          prev
            ? prev.map((dept) =>
                dept.department_id === updatedDept.department_id
                  ? updatedDept
                  : dept,
              )
            : undefined,
      );
      queryClient.invalidateQueries({ queryKey: queryKeys.departments.all });
    },
  });

  // 4. Mutation: Delete Department
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await departmentService.deleteDepartment(id);
      if (res.status) {
        return id;
      }
      throw new Error(res.message || "تعذر إتمام عملية الحذف");
    },
    onSuccess: (deletedId) => {
      queryClient.setQueryData<DepartmentEntity[]>(
        queryKeys.departments.list(),
        (prev) =>
          prev ? prev.filter((dept) => dept.department_id !== deletedId) : undefined,
      );
      queryClient.invalidateQueries({ queryKey: queryKeys.departments.all });
    },
  });

  // Action: Add Department with boolean return contract
  const addDepartment = async (payload: AddDepartment): Promise<boolean> => {
    setMutationError(null);
    try {
      await addMutation.mutateAsync(payload);
      return true;
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "تعذر إرسال بيانات القسم إلى الخادم";
      setMutationError(msg);
      return false;
    }
  };

  // Action: Update Department with boolean return contract
  const updateDepartment = async (
    id: number,
    payload: AddDepartment,
  ): Promise<boolean> => {
    setMutationError(null);
    try {
      await updateMutation.mutateAsync({ id, payload });
      return true;
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "حدث خطأ أثناء إرسال تعديل القسم";
      setMutationError(msg);
      return false;
    }
  };

  // Action: Delete Department with boolean return contract
  const deleteDepartment = async (id: number): Promise<boolean> => {
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
  const fetchDepartments = useCallback(async () => {
    setMutationError(null);
    await refetch();
  }, [refetch]);

  // Combined error and submission indicators
  const isSubmitting =
    addMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending;

  const error = mutationError || (queryError ? queryError.message : null);

  return {
    departments,
    loading: isLoading,
    isSubmitting,
    error,
    addDepartment,
    updateDepartment,
    deleteDepartment,
    refetch: fetchDepartments,
    fetchDepartments,
  };
}

export default useDepartments;
