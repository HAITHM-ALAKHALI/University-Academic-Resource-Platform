import { apiClient } from "./api";
import type {
  ContentEntity,
  ContentTypeEntity,
  ContentStatus,
} from "../types/content";

/**
 * Filter and query parameters supported by the backend ContentController::index
 */
export interface ContentQueryParams {
  doctor_id?: number | string;
  offering_id?: number | string;
  semester_id?: number | string;
  content_type_id?: number | string;
  course_doctor_id?: number | string;
  search?: string;
}

/**
 * Backward-compatible shape for legacy consumers of courseContentsService
 */
export interface ContentItem extends ContentEntity {
  content_type?: {
    content_type_id: number;
    name: string;
  };
  course_doctor?: {
    doctor?: { user?: { full_name: string } };
    offering?: {
      course?: { course_name_ar: string; course_code: string };
      semester?: { name: string };
    };
  };
}

/**
 * Canonical service for academic content resources.
 * Unifies all content operations and taxonomy retrieval against the backend API.
 */
export const courseContentsService = {
  /**
   * Fetch all academic content types / taxonomy categories
   * Backend endpoint: GET /api/content-types
   */
  getContentTypes: async (): Promise<ContentTypeEntity[]> => {
    const res = await apiClient.get("/content-types");
    return res.data?.data ?? res.data ?? [];
  },

  /**
   * Fetch contents list with optional filters (or by specific course_doctor_id)
   * Backend endpoint: GET /api/contents
   */
  getContents: async (
    paramsOrDoctorId?: number | "" | ContentQueryParams,
  ): Promise<ContentEntity[]> => {
    let params: Record<string, unknown> = {};

    if (
      typeof paramsOrDoctorId === "number" ||
      (typeof paramsOrDoctorId === "string" && paramsOrDoctorId !== "")
    ) {
      params = { course_doctor_id: paramsOrDoctorId };
    } else if (paramsOrDoctorId && typeof paramsOrDoctorId === "object") {
      params = { ...paramsOrDoctorId };
    }

    const res = await apiClient.get("/contents", { params });
    return res.data?.data ?? res.data ?? [];
  },

  /**
   * Upload new academic content file (multipart/form-data)
   * Backend endpoint: POST /api/contents
   */
  createContent: async (formData: FormData): Promise<ContentEntity> => {
    const res = await apiClient.post("/contents", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data?.data ?? res.data;
  },

  /**
   * Backward-compatible alias for createContent
   */
  uploadContent: async (formData: FormData): Promise<ContentEntity> => {
    return courseContentsService.createContent(formData);
  },

  /**
   * Update content metadata (title, description, content_type_id)
   * Backend endpoint: PUT /api/contents/{id}
   * NOTE: The backend currently lacks an update method and returns HTTP 500.
   * Method signature is preserved for architectural completeness.
   */
  updateContent: async (
    id: number,
    data: Partial<ContentEntity>,
  ): Promise<ContentEntity> => {
    const res = await apiClient.put(`/contents/${id}`, data);
    return res.data?.data ?? res.data;
  },

  /**
   * Update content approval status
   * Backend endpoint: PATCH /api/contents/{id}/status
   * NOTE: The backend route is currently not implemented and returns HTTP 404.
   * Method signature is preserved for architectural completeness.
   */
  updateStatus: async (id: number, status: ContentStatus): Promise<void> => {
    await apiClient.patch(`/contents/${id}/status`, { status });
  },

  /**
   * Delete content item and associated stored file
   * Backend endpoint: DELETE /api/contents/{id}
   */
  deleteContent: async (id: number): Promise<void> => {
    await apiClient.delete(`/contents/${id}`);
  },
};

export default courseContentsService;
