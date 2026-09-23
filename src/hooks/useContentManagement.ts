import { useState, useEffect, useCallback } from "react";
import { courseContentsService, ContentItem } from "../services/courseContentsService";

export function useContentManagement() {
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [contentTypes, setContentTypes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // حالات الفلاتر الهرمية
  const [selectedDeptId, setSelectedDeptId] = useState<string>("");
  const [selectedLevelId, setSelectedLevelId] = useState<string>("");
  const [selectedSemesterId, setSelectedSemesterId] = useState<string>("");
  const [selectedOfferingId, setSelectedOfferingId] = useState<string>("");
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>("");
  const [selectedTypeId, setSelectedTypeId] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // جلب تصنيفات المحتوى
  const loadContentTypes = useCallback(async () => {
    try {
      const types = await courseContentsService.getContentTypes();
      setContentTypes(types);
    } catch (e) {
      console.error("فشل جلب أنواع المحتوى", e);
    }
  }, []);

  // جلب المحتويات مع الباراميترات
  const loadContents = useCallback(async () => {
    try {
      setLoading(true);
      const params: Record<string, any> = {};
      if (selectedDoctorId) params.doctor_id = selectedDoctorId;
      if (selectedOfferingId) params.offering_id = selectedOfferingId;
      if (selectedSemesterId) params.semester_id = selectedSemesterId;
      if (selectedTypeId) params.content_type_id = selectedTypeId;
      if (searchQuery.trim()) params.search = searchQuery.trim();

      const data = await courseContentsService.getContents(params);
      setContents(data);
    } catch (e) {
      console.error("فشل جلب المحتويات", e);
    } finally {
      setLoading(false);
    }
  }, [selectedDoctorId, selectedOfferingId, selectedSemesterId, selectedTypeId, searchQuery]);

  const handleUpload = async (formData: FormData) => {
    try {
      setIsSubmitting(true);
      await courseContentsService.uploadContent(formData);
      await loadContents();
      return true;
    } catch (err: any) {
      alert(err.response?.data?.message || "فشل رفع الملف الأكاديمي.");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteContent = async (id: number) => {
    try {
      setLoading(true);
      await courseContentsService.deleteContent(id);
      await loadContents();
      return true;
    } catch (err: any) {
      alert(err.response?.data?.message || "فشل حذف الملف.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContentTypes();
  }, [loadContentTypes]);

  useEffect(() => {
    loadContents();
  }, [loadContents]);

  return {
    contents,
    contentTypes,
    loading,
    isSubmitting,
    searchQuery,
    setSearchQuery,
    selectedDeptId,
    setSelectedDeptId,
    selectedLevelId,
    setSelectedLevelId,
    selectedSemesterId,
    setSelectedSemesterId,
    selectedOfferingId,
    setSelectedOfferingId,
    selectedDoctorId,
    setSelectedDoctorId,
    selectedTypeId,
    setSelectedTypeId,
    refreshContents: loadContents,
    handleUpload,
    handleDeleteContent,
  };
}