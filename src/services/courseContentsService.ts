import { apiClient } from "./api";

export interface ContentItem {
  content_id: number;
  course_doctor_id: number;
  content_type_id: number;
  title: string;
  description: string | null;
  file_path: string;
  file_name: string;
  file_size: number;
  file_extension: string;
  download_count: number;
  status: string;
  created_at: string;
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

export const courseContentsService = {
  getContentTypes: async () => {
    const res = await apiClient.get("/content-types");
    return res.data.data;
  },

  getContents: async (params?: Record<string, any>): Promise<ContentItem[]> => {
    const res = await apiClient.get("/contents", { params });
    return res.data.data;
  },

  uploadContent: async (formData: FormData) => {
    const res = await apiClient.post("/contents", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  deleteContent: async (id: number) => {
    const res = await apiClient.delete(`/contents/${id}`);
    return res.data;
  },
};
