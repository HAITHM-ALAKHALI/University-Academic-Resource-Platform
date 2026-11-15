import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { courseDoctorsService } from "../services/courseDoctorsService";
import { queryKeys } from "../constants/queryKeys";
import type { CourseDoctorAssignment } from "../types/api";

export interface UseCourseDoctorsOptions {
  offeringId?: number;
  enabled?: boolean;
}

export interface UseCourseDoctorsReturn {
  assignments: CourseDoctorAssignment[];
  loading: boolean;
  isSubmitting: boolean;
  error: string | null;
  refreshAssignments: () => Promise<void>;
  refetch: () => Promise<void>;
  loadAssignments: () => Promise<void>;
  handleAssignDoctor: (payload: {
    offering_id: number;
    doctor_id: number;
  }) => Promise<boolean>;
  handleUpdateAssignment: (
    id: number,
    payload: { offering_id: number; doctor_id: number },
  ) => Promise<boolean>;
  handleDeleteAssignment: (id: number) => Promise<boolean>;
  assignDoctor: (payload: {
    offering_id: number;
    doctor_id: number;
  }) => Promise<boolean>;
  updateAssignment: (
    id: number,
    payload: { offering_id: number; doctor_id: number },
  ) => Promise<boolean>;
  deleteAssignment: (id: number) => Promise<boolean>;
}

/**
 * Hook for managing Course-Doctor Assignments.
 * Powered by TanStack Query v5 to provide shared caching, automatic deduplication,
 * offering-filtered caching, optimistic delete with rollback, and synchronized cache invalidation.
 */
export function useCourseDoctors(
  offeringIdOrOptions?: number | UseCourseDoctorsOptions,
): UseCourseDoctorsReturn {
  const queryClient = useQueryClient();
  const [mutationError, setMutationError] = useState<string | null>(null);

  // Normalize parameters to support both legacy zero-argument and options object
  const options: UseCourseDoctorsOptions =
    typeof offeringIdOrOptions === "number"
      ? { offeringId: offeringIdOrOptions, enabled: true }
      : offeringIdOrOptions ?? { enabled: true };

  const offeringId = options.offeringId;
  const enabled = options.enabled ?? true;
  const listKey = queryKeys.courseDoctors.list(offeringId);

  // 1. Shared Query for fetching doctor assignments (optionally filtered by offeringId)
  const {
    data: assignments = [],
    isLoading,
    error: queryError,
    refetch,
  } = useQuery<CourseDoctorAssignment[], Error>({
    queryKey: listKey,
    queryFn: async () => {
      const data = await courseDoctorsService.getAssignments(offeringId);
      if (Array.isArray(data)) {
        return data;
      }
      throw new Error("تعذر جلب إسنادات الدكاترة");
    },
    enabled,
  });

  // 2. Mutation: Assign Doctor to Course Offering
  const assignDoctorMutation = useMutation({
    mutationFn: async (payload: { offering_id: number; doctor_id: number }) => {
      const res = await courseDoctorsService.assignDoctor(payload);
      return res;
    },
    onSuccess: () => {
      // Synchronize both course doctors and course offerings
      queryClient.invalidateQueries({
        queryKey: queryKeys.courseDoctors.all,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.courseOfferings.all,
      });
    },
  });

  // 3. Mutation: Update Assignment
  const updateAssignmentMutation = useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: number;
      payload: { offering_id: number; doctor_id: number };
    }) => {
      const res = await courseDoctorsService.updateAssignment(id, payload);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.courseDoctors.all,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.courseOfferings.all,
      });
    },
  });

  // 4. Mutation: Delete Assignment with Optimistic Rollback
  const deleteAssignmentMutation = useMutation({
    mutationFn: async (id: number) => {
      await courseDoctorsService.deleteAssignment(id);
      return id;
    },
    onMutate: async (deletedId) => {
      await queryClient.cancelQueries({ queryKey: listKey });
      const previousAssignments =
        queryClient.getQueryData<CourseDoctorAssignment[]>(listKey);

      if (previousAssignments) {
        queryClient.setQueryData<CourseDoctorAssignment[]>(
          listKey,
          previousAssignments.filter(
            (item) => item.course_doctor_id !== deletedId,
          ),
        );
      }

      return { previousAssignments };
    },
    onError: (_err, _deletedId, context) => {
      if (context?.previousAssignments) {
        queryClient.setQueryData<CourseDoctorAssignment[]>(
          listKey,
          context.previousAssignments,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.courseDoctors.all,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.courseOfferings.all,
      });
    },
  });

  // Action: Assign Doctor
  const handleAssignDoctor = async (payload: {
    offering_id: number;
    doctor_id: number;
  }): Promise<boolean> => {
    setMutationError(null);
    try {
      await assignDoctorMutation.mutateAsync(payload);
      return true;
    } catch (err: any) {
      const message =
        err?.response?.data?.message || "فشلت عملية إسناد المادة";
      alert(message);
      setMutationError(message);
      return false;
    }
  };

  // Action: Update Assignment
  const handleUpdateAssignment = async (
    id: number,
    payload: { offering_id: number; doctor_id: number },
  ): Promise<boolean> => {
    setMutationError(null);
    try {
      await updateAssignmentMutation.mutateAsync({ id, payload });
      return true;
    } catch (err: any) {
      const message =
        err?.response?.data?.message || "فشلت عملية تعديل الإسناد";
      alert(message);
      setMutationError(message);
      return false;
    }
  };

  // Action: Delete Assignment
  const handleDeleteAssignment = async (id: number): Promise<boolean> => {
    setMutationError(null);
    try {
      await deleteAssignmentMutation.mutateAsync(id);
      return true;
    } catch (err: any) {
      const message =
        err?.response?.data?.message || "فشل إلغاء إسناد المادة";
      alert(message);
      setMutationError(message);
      return false;
    }
  };

  // Imperative fetch/refetch callback
  const fetchAssignments = useCallback(async () => {
    setMutationError(null);
    await refetch();
  }, [refetch]);

  // Combined submission status across all mutations
  const isSubmitting =
    assignDoctorMutation.isPending ||
    updateAssignmentMutation.isPending ||
    deleteAssignmentMutation.isPending;

  // Combined error state
  const error =
    mutationError ||
    (queryError
      ? (queryError as any).response?.data?.message || queryError.message
      : null);

  return {
    assignments,
    loading: isLoading,
    isSubmitting,
    error,
    refreshAssignments: fetchAssignments,
    refetch: fetchAssignments,
    loadAssignments: fetchAssignments,
    handleAssignDoctor,
    handleUpdateAssignment,
    handleDeleteAssignment,
    assignDoctor: handleAssignDoctor,
    updateAssignment: handleUpdateAssignment,
    deleteAssignment: handleDeleteAssignment,
  };
}

export default useCourseDoctors;
