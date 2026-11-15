import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { courseOfferingsService } from "../services/courseOfferingsService";
import { queryKeys } from "../constants/queryKeys";
import type {
  CourseOfferingEntity,
  CourseDoctorEntity,
  ContentTypeEntity,
  AddCourseOfferingPayload,
  AssignDoctorPayload,
} from "../types/api";

export interface UseCourseOfferingsOptions {
  semesterId?: number;
  enabled?: boolean;
}

export interface UseCourseOfferingsReturn {
  offerings: CourseOfferingEntity[];
  contentTypes: ContentTypeEntity[];
  courseDoctors: CourseDoctorEntity[];
  loading: boolean;
  isSubmitting: boolean;
  error: string | null;
  refreshOfferings: () => Promise<void>;
  refetch: () => Promise<void>;
  fetchOfferings: () => Promise<void>;
  loadDoctorsForOffering: (offeringId: number) => Promise<CourseDoctorEntity[]>;
  handleAddOffering: (
    payload: AddCourseOfferingPayload,
  ) => Promise<number | null>;
  handleUpdateOffering: (
    offeringId: number,
    payload: { course_id: number; semester_id: number; doctor_ids?: number[] },
  ) => Promise<boolean>;
  handleDeleteOffering: (offeringId: number) => Promise<boolean>;
  handleAssignDoctor: (payload: AssignDoctorPayload) => Promise<boolean>;
}

/**
 * Hook for managing Course Offering entities.
 * Powered by TanStack Query v5 to provide shared caching, automatic deduplication,
 * semester-filtered queries, optimistic delete with rollback, and synchronized cache invalidation.
 */
export function useCourseOfferings(
  semesterIdOrOptions?: number | UseCourseOfferingsOptions,
): UseCourseOfferingsReturn {
  const queryClient = useQueryClient();
  const [mutationError, setMutationError] = useState<string | null>(null);
  const [courseDoctors, setCourseDoctors] = useState<CourseDoctorEntity[]>([]);

  // Normalize parameter to support both legacy number argument and options object
  const options: UseCourseOfferingsOptions =
    typeof semesterIdOrOptions === "number"
      ? { semesterId: semesterIdOrOptions, enabled: true }
      : semesterIdOrOptions ?? { enabled: true };

  const semesterId = options.semesterId;
  const enabled = options.enabled ?? true;
  const listKey = queryKeys.courseOfferings.list(semesterId);

  // 1. Shared Query for fetching course offerings (optionally filtered by semesterId)
  const {
    data: offerings = [],
    isLoading: isOfferingsLoading,
    error: queryError,
    refetch,
  } = useQuery<CourseOfferingEntity[], Error>({
    queryKey: listKey,
    queryFn: async () => {
      const data = await courseOfferingsService.getOfferings(semesterId);
      if (Array.isArray(data)) {
        return data;
      }
      throw new Error("تعذر جلب المقررات المطروحة");
    },
    enabled,
  });

  // 2. Shared Query for content types (cached globally with 5-minute freshness)
  const { data: contentTypes = [] } = useQuery<ContentTypeEntity[]>({
    queryKey: queryKeys.contentTypes.all,
    queryFn: async () => {
      const data = await courseOfferingsService.getContentTypes();
      return Array.isArray(data) ? data : [];
    },
    staleTime: 5 * 60 * 1000,
  });

  // 3. Mutation: Add Course Offering
  const addOfferingMutation = useMutation({
    mutationFn: async (payload: AddCourseOfferingPayload) => {
      const res = await courseOfferingsService.createOffering(payload);
      return res;
    },
    onSuccess: () => {
      // Invalidate course offerings query cache so the full flattened entity is loaded from server
      queryClient.invalidateQueries({
        queryKey: queryKeys.courseOfferings.all,
      });
    },
  });

  // 4. Mutation: Update Course Offering with sequential doctor assignment and partial-success handling
  const updateOfferingMutation = useMutation({
    mutationFn: async ({
      offeringId,
      payload,
    }: {
      offeringId: number;
      payload: { course_id: number; semester_id: number; doctor_ids?: number[] };
    }) => {
      let offeringUpdated = false;
      try {
        // Step 1: Send update request for course offering
        await courseOfferingsService.updateOffering(offeringId, {
          course_id: payload.course_id,
          semester_id: payload.semester_id,
        });
        offeringUpdated = true;

        // Step 2: Assign doctors sequentially if provided
        if (payload.doctor_ids && payload.doctor_ids.length > 0) {
          for (const docId of payload.doctor_ids) {
            await courseOfferingsService.assignDoctor({
              offering_id: offeringId,
              doctor_id: docId,
            });
          }
        }
        return offeringId;
      } catch (err: any) {
        // If step 1 succeeded but doctor assignment failed, invalidate queries so cache matches DB
        if (offeringUpdated) {
          queryClient.invalidateQueries({
            queryKey: queryKeys.courseOfferings.all,
          });
          queryClient.invalidateQueries({
            queryKey: queryKeys.courseDoctors.all,
          });
          err.partialSuccess = true;
        }
        throw err;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.courseOfferings.all,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.courseDoctors.all,
      });
    },
  });

  // 5. Mutation: Optimistic Delete with Snapshot Rollback
  const deleteOfferingMutation = useMutation({
    mutationFn: async (offeringId: number) => {
      await courseOfferingsService.deleteOffering(offeringId);
      return offeringId;
    },
    onMutate: async (deletedId) => {
      // Cancel outgoing queries to prevent overwriting optimistic update
      await queryClient.cancelQueries({ queryKey: listKey });

      // Snapshot previous offerings list for rollback
      const previousOfferings =
        queryClient.getQueryData<CourseOfferingEntity[]>(listKey);

      // Optimistically remove offering from current list
      if (previousOfferings) {
        queryClient.setQueryData<CourseOfferingEntity[]>(
          listKey,
          previousOfferings.filter((o) => o.offering_id !== deletedId),
        );
      }

      return { previousOfferings };
    },
    onError: (_err, _deletedId, context) => {
      // Roll back to pre-mutation snapshot on failure
      if (context?.previousOfferings) {
        queryClient.setQueryData<CourseOfferingEntity[]>(
          listKey,
          context.previousOfferings,
        );
      }
    },
    onSettled: () => {
      // Always invalidate to ensure authoritative consistency with server
      queryClient.invalidateQueries({
        queryKey: queryKeys.courseOfferings.all,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.courseDoctors.all,
      });
    },
  });

  // 6. Mutation: Assign Doctor to Course Offering
  const assignDoctorMutation = useMutation({
    mutationFn: async (payload: AssignDoctorPayload) => {
      const res = await courseOfferingsService.assignDoctor(payload);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.courseOfferings.all,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.courseDoctors.all,
      });
    },
  });

  // Action: Add Offering (returns offeringId or null, maintaining legacy contract)
  const handleAddOffering = async (
    payload: AddCourseOfferingPayload,
  ): Promise<number | null> => {
    setMutationError(null);
    try {
      const res = await addOfferingMutation.mutateAsync(payload);
      const newOfferingId = res?.data?.offering_id || res?.offering_id;
      return newOfferingId ?? null;
    } catch (err: any) {
      const message =
        err?.response?.data?.message || "فشلت عملية طرح المادة";
      alert(message);
      setMutationError(message);
      return null;
    }
  };

  // Action: Update Offering (returns Promise<boolean>)
  const handleUpdateOffering = async (
    offeringId: number,
    payload: { course_id: number; semester_id: number; doctor_ids?: number[] },
  ): Promise<boolean> => {
    setMutationError(null);
    try {
      await updateOfferingMutation.mutateAsync({ offeringId, payload });
      return true;
    } catch (err: any) {
      const message = err.partialSuccess
        ? "تم تحديث بيانات المقرر المطروح، ولكن تعذر إسناد بعض المحاضرين"
        : err?.response?.data?.message || "فشلت عملية تحديث المقرر المطروح";
      alert(message);
      setMutationError(message);
      return false;
    }
  };

  // Action: Delete Offering (returns Promise<boolean>)
  const handleDeleteOffering = async (
    offeringId: number,
  ): Promise<boolean> => {
    setMutationError(null);
    try {
      await deleteOfferingMutation.mutateAsync(offeringId);
      return true;
    } catch (err: any) {
      const message =
        err?.response?.data?.message || "فشلت عملية حذف المقرر المطروح";
      alert(message);
      setMutationError(message);
      return false;
    }
  };

  // Action: Assign Doctor (returns Promise<boolean>)
  const handleAssignDoctor = async (
    payload: AssignDoctorPayload,
  ): Promise<boolean> => {
    setMutationError(null);
    try {
      await assignDoctorMutation.mutateAsync(payload);
      return true;
    } catch (err: any) {
      const message =
        err?.response?.data?.message || "فشلت عملية إسناد الدكتور";
      alert(message);
      setMutationError(message);
      return false;
    }
  };

  // Imperative callback: Load doctors for a specific offering
  const loadDoctorsForOffering = useCallback(
    async (offeringId: number): Promise<CourseDoctorEntity[]> => {
      try {
        const data = await queryClient.fetchQuery({
          queryKey: queryKeys.courseDoctors.list(offeringId),
          queryFn: () => courseOfferingsService.getCourseDoctors(offeringId),
        });
        setCourseDoctors(data);
        return data;
      } catch (err: any) {
        const message =
          err?.response?.data?.message || "تعذر جلب دكاترة المقرر";
        setMutationError(message);
        return [];
      }
    },
    [queryClient],
  );

  // Imperative fetch/refetch callback
  const fetchOfferings = useCallback(async () => {
    setMutationError(null);
    await refetch();
  }, [refetch]);

  // Combined submission status across all mutations
  const isSubmitting =
    addOfferingMutation.isPending ||
    updateOfferingMutation.isPending ||
    assignDoctorMutation.isPending ||
    deleteOfferingMutation.isPending;

  // Combined error state: mutation error takes precedence, falls back to query error
  const error =
    mutationError ||
    (queryError
      ? (queryError as any).response?.data?.message || queryError.message
      : null);

  return {
    offerings,
    contentTypes,
    courseDoctors,
    loading: isOfferingsLoading,
    isSubmitting,
    error,
    refreshOfferings: fetchOfferings,
    refetch: fetchOfferings,
    fetchOfferings,
    loadDoctorsForOffering,
    handleAddOffering,
    handleUpdateOffering,
    handleDeleteOffering,
    handleAssignDoctor,
  };
}

export default useCourseOfferings;
