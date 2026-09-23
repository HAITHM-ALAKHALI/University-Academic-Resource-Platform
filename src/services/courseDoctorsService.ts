import { apiClient } from "./api";
import type { CourseDoctorAssignment } from "../types/api";

export const courseDoctorsService = {
  getAssignments: async (): Promise<CourseDoctorAssignment[]> => {
    const res = await apiClient.get("/course-doctors");
    return res.data.data;
  },

  assignDoctor: async (payload: { offering_id: number; doctor_id: number }) => {
    const res = await apiClient.post("/course-doctors", payload);
    return res.data;
  },

  deleteAssignment: async (id: number) => {
    const res = await apiClient.delete(`/course-doctors/${id}`);
    return res.data;
  },

  updateAssignment: async (
    id: number,
    payload: { offering_id: number; doctor_id: number },
  ) => {
    const res = await apiClient.put(`/course-doctors/${id}`, payload);
    return res.data;
  },
};
