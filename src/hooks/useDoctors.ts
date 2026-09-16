import { useState, useCallback } from "react";
import { initialDoctors, initialCourses } from "../data/academicData";
import type { Doctor, AcademicCourse } from "../types/academic";

export function useDoctors(
  initialDocs: Doctor[] = initialDoctors,
  initialCrs: AcademicCourse[] = initialCourses
) {
  const [doctorsList, setDoctorsList] = useState<Doctor[]>(initialDocs);
  const [coursesList, setCoursesList] = useState<AcademicCourse[]>(initialCrs);

  const handleAddDoctor = useCallback((newDoc: Doctor) => {
    setDoctorsList((prev) => [newDoc, ...prev]);
  }, []);

  const handleEditDoctor = useCallback((updatedDoc: Doctor) => {
    setDoctorsList((prev) =>
      prev.map((d) => (d.id === updatedDoc.id ? updatedDoc : d))
    );
  }, []);

  const handleDeleteDoctor = useCallback((docId: string) => {
    setDoctorsList((prev) => prev.filter((d) => d.id !== docId));
    setCoursesList((prev) =>
      prev.map((c) => ({
        ...c,
        doctorIds: c.doctorIds?.filter((id) => id !== docId) || [],
      }))
    );
  }, []);

  const handleAssignCourse = useCallback((doctorId: string, courseId: number) => {
    setDoctorsList((prev) =>
      prev.map((d) => {
        if (d.id === doctorId) {
          const exists = d.assignedCourseIds?.includes(courseId);
          return {
            ...d,
            assignedCourseIds: exists
              ? d.assignedCourseIds
              : [...(d.assignedCourseIds || []), courseId],
          };
        }
        return d;
      })
    );
    setCoursesList((prev) =>
      prev.map((c) => {
        if (c.id === courseId) {
          const exists = c.doctorIds?.includes(doctorId);
          return {
            ...c,
            doctorIds: exists ? c.doctorIds : [...(c.doctorIds || []), doctorId],
          };
        }
        return c;
      })
    );
  }, []);

  const handleUnassignCourse = useCallback((doctorId: string, courseId: number) => {
    setDoctorsList((prev) =>
      prev.map((d) => {
        if (d.id === doctorId) {
          return {
            ...d,
            assignedCourseIds:
              d.assignedCourseIds?.filter((id) => id !== courseId) || [],
          };
        }
        return d;
      })
    );
    setCoursesList((prev) =>
      prev.map((c) => {
        if (c.id === courseId) {
          return {
            ...c,
            doctorIds: c.doctorIds?.filter((id) => id !== doctorId) || [],
          };
        }
        return c;
      })
    );
  }, []);

  return {
    doctorsList,
    setDoctorsList,
    coursesList,
    setCoursesList,
    handleAddDoctor,
    handleEditDoctor,
    handleDeleteDoctor,
    handleAssignCourse,
    handleUnassignCourse,
  };
}
