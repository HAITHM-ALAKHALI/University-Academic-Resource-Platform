import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { doctorService } from "../services/doctorService";
import { queryKeys } from "../constants/queryKeys";
import type { DoctorEntity, AddDoctor } from "../types/api";

export interface UseDoctorsOptions {
  enabled?: boolean;
}

export interface UseDoctorsReturn {
  doctorsList: DoctorEntity[];
  doctors: DoctorEntity[]; // Convenient alias for doctorsList
  loading: boolean;
  isSubmitting: boolean;
  error: string | null;
  handleAddDoctor: (payload: AddDoctor) => Promise<boolean>;
  handleEditDoctor: (id: number, payload: Partial<AddDoctor>) => Promise<boolean>;
  handleDeleteDoctor: (id: number) => Promise<boolean>;
  addDoctor: (payload: AddDoctor) => Promise<boolean>; // Alias
  updateDoctor: (id: number, payload: Partial<AddDoctor>) => Promise<boolean>; // Alias
  deleteDoctor: (id: number) => Promise<boolean>; // Alias
  refetchDoctors: () => Promise<void>;
  refetch: () => Promise<void>; // Alias
  fetchDoctors: () => Promise<void>; // Alias
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
 * Hook for managing Doctor entities.
 * Powered by TanStack Query v5 to provide shared caching, automatic deduplication,
 * and synchronized cache invalidation across all components.
 */
export function useDoctors({
  enabled = true,
}: UseDoctorsOptions = {}): UseDoctorsReturn {
  const queryClient = useQueryClient();
  const [mutationError, setMutationError] = useState<string | null>(null);

  // 1. Shared Query for fetching all doctors
  const {
    data: doctorsList = [],
    isLoading,
    error: queryError,
    refetch,
  } = useQuery<DoctorEntity[], Error>({
    queryKey: queryKeys.doctors.list(),
    queryFn: async () => {
      const res = await doctorService.fetchDoctors();
      if (res.status && Array.isArray(res.data)) {
        return res.data;
      }
      const message =
        "message" in res && typeof (res as Record<string, unknown>).message === "string"
          ? String((res as Record<string, unknown>).message)
          : "تعذر جلب قائمة الدكاترة";
      throw new Error(message);
    },
    enabled,
  });

  // 2. Mutation: Add Doctor
  const addMutation = useMutation({
    mutationFn: async (payload: AddDoctor) => {
      const res = await doctorService.addDoctor(payload);
      if (res.status && res.data) {
        return res.data;
      }
      throw new Error(res.message || res.massage || "فشلت إضافة الدكتور");
    },
    onSuccess: (newDoctor) => {
      queryClient.setQueryData<DoctorEntity[]>(
        queryKeys.doctors.list(),
        (prev) =>
          prev
            ? [newDoctor, ...prev.filter((d) => d.doctor_id !== newDoctor.doctor_id)]
            : undefined,
      );
      // Invalidate all doctor queries across subscribers
      queryClient.invalidateQueries({ queryKey: queryKeys.doctors.all });
    },
  });

  // 3. Mutation: Edit Doctor
  const editMutation = useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: number;
      payload: Partial<AddDoctor>;
    }) => {
      const res = await doctorService.updateDoctor(id, payload);
      if (res.status && res.data) {
        return res.data;
      }
      throw new Error(res.message || res.massage || "فشل تحديث بيانات الدكتور");
    },
    onSuccess: (updatedDoctor) => {
      queryClient.setQueryData<DoctorEntity[]>(
        queryKeys.doctors.list(),
        (prev) =>
          prev
            ? prev.map((doc) =>
                doc.doctor_id === updatedDoctor.doctor_id ? updatedDoctor : doc,
              )
            : undefined,
      );
      queryClient.invalidateQueries({ queryKey: queryKeys.doctors.all });
    },
  });

  // 4. Mutation: Delete Doctor
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await doctorService.deleteDoctor(id);
      if (res.status) {
        return id;
      }
      throw new Error(
        res.message || "تعذر حذف الدكتور لوجود ارتباطات بنظام المقررات",
      );
    },
    onSuccess: (deletedId) => {
      queryClient.setQueryData<DoctorEntity[]>(
        queryKeys.doctors.list(),
        (prev) =>
          prev ? prev.filter((doc) => doc.doctor_id !== deletedId) : undefined,
      );
      queryClient.invalidateQueries({ queryKey: queryKeys.doctors.all });
    },
  });

  // Action: Add Doctor with boolean return contract
  const handleAddDoctor = async (payload: AddDoctor): Promise<boolean> => {
    setMutationError(null);
    try {
      await addMutation.mutateAsync(payload);
      return true;
    } catch (err: unknown) {
      const msg = extractErrorMessage(err, "حدث خطأ أثناء حفظ بيانات الدكتور");
      setMutationError(msg);
      return false;
    }
  };

  // Action: Edit Doctor with boolean return contract
  const handleEditDoctor = async (
    id: number,
    payload: Partial<AddDoctor>,
  ): Promise<boolean> => {
    setMutationError(null);
    try {
      await editMutation.mutateAsync({ id, payload });
      return true;
    } catch (err: unknown) {
      const msg = extractErrorMessage(err, "حدث خطأ أثناء تعديل بيانات الدكتور");
      setMutationError(msg);
      return false;
    }
  };

  // Action: Delete Doctor with boolean return contract
  const handleDeleteDoctor = async (id: number): Promise<boolean> => {
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
  const fetchDoctors = useCallback(async () => {
    setMutationError(null);
    await refetch();
  }, [refetch]);

  // Combined submission status across all mutations
  const isSubmitting =
    addMutation.isPending ||
    editMutation.isPending ||
    deleteMutation.isPending;

  // Combined error state: mutation error takes precedence, falls back to query error
  const error = mutationError || (queryError ? queryError.message : null);

  return {
    doctorsList,
    doctors: doctorsList,
    loading: isLoading,
    isSubmitting,
    error,
    handleAddDoctor,
    handleEditDoctor,
    handleDeleteDoctor,
    addDoctor: handleAddDoctor,
    updateDoctor: handleEditDoctor,
    deleteDoctor: handleDeleteDoctor,
    refetchDoctors: fetchDoctors,
    refetch: fetchDoctors,
    fetchDoctors,
  };
}

export default useDoctors;
