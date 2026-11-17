import { useState } from "react";
import { useMutation, useQueryClient, type UseMutationResult } from "@tanstack/react-query";
import { courseDoctorsService } from "../../services/courseDoctorsService";
import { queryKeys } from "../../constants/queryKeys";
import type { AssignDoctorPayload } from "../../types/api";

export interface UseAssignDoctorOptions {
  defaultErrorMessage?: string;
  onSuccess?: (data: any, variables: AssignDoctorPayload) => void;
  onError?: (error: any, variables: AssignDoctorPayload) => void;
}

export interface UseAssignDoctorReturn {
  mutation: UseMutationResult<any, Error, AssignDoctorPayload, unknown>;
  assignDoctorMutation: UseMutationResult<any, Error, AssignDoctorPayload, unknown>;
  handleAssignDoctor: (payload: AssignDoctorPayload) => Promise<boolean>;
  assignDoctorAsync: (payload: AssignDoctorPayload) => Promise<any>;
  isPending: boolean;
  isSubmitting: boolean;
  error: string | null;
  mutationError: string | null;
  resetError: () => void;
}

/**
 * Canonical shared mutation hook for assigning a Doctor to a Course Offering.
 *
 * Centralizes:
 * 1. HTTP operation: POST /course-doctors via courseDoctorsService.assignDoctor
 * 2. Cache synchronization: invalidates queryKeys.courseDoctors.all and queryKeys.courseOfferings.all
 * 3. Unified error handling, alerts, and Promise<boolean> contract
 *
 * Consumed by:
 * - useCourseDoctors
 * - useCourseOfferings
 */
export function useAssignDoctor(
  options?: UseAssignDoctorOptions,
): UseAssignDoctorReturn {
  const queryClient = useQueryClient();
  const [mutationError, setMutationError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async (payload: AssignDoctorPayload) => {
      const res = await courseDoctorsService.assignDoctor(payload);
      return res;
    },
    onSuccess: (data, variables) => {
      // Synchronize both course doctors and course offerings caches
      queryClient.invalidateQueries({
        queryKey: queryKeys.courseDoctors.all,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.courseOfferings.all,
      });
      options?.onSuccess?.(data, variables);
    },
    onError: (err, variables) => {
      options?.onError?.(err, variables);
    },
  });

  const handleAssignDoctor = async (
    payload: AssignDoctorPayload,
  ): Promise<boolean> => {
    setMutationError(null);
    try {
      await mutation.mutateAsync(payload);
      return true;
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        options?.defaultErrorMessage ||
        "فشلت عملية إسناد الدكتور للمادة";
      alert(message);
      setMutationError(message);
      return false;
    }
  };

  return {
    mutation,
    assignDoctorMutation: mutation,
    handleAssignDoctor,
    assignDoctorAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isSubmitting: mutation.isPending,
    error: mutationError,
    mutationError,
    resetError: () => setMutationError(null),
  };
}

export default useAssignDoctor;
