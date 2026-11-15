/**
 * Centralized TanStack Query Key Factory
 * Organizes query keys hierarchically to enable granular and targeted cache invalidation.
 */
export const queryKeys = {
  departments: {
    all: ["departments"] as const,
    list: () => [...queryKeys.departments.all, "list"] as const,
    detail: (id: number) => [...queryKeys.departments.all, "detail", id] as const,
  },
  courses: {
    all: ["courses"] as const,
    list: () => [...queryKeys.courses.all, "list"] as const,
    detail: (id: number) => [...queryKeys.courses.all, "detail", id] as const,
  },
  levels: {
    all: ["levels"] as const,
    list: (departmentId?: number) =>
      [...queryKeys.levels.all, "list", { departmentId }] as const,
    detail: (id: number) => [...queryKeys.levels.all, "detail", id] as const,
  },
  semesters: {
    all: ["semesters"] as const,
    list: (filters?: { levelId?: number; academicYear?: string } | number) => {
      const normalized =
        typeof filters === "number"
          ? { levelId: filters }
          : { levelId: filters?.levelId, academicYear: filters?.academicYear };
      return [...queryKeys.semesters.all, "list", normalized] as const;
    },
    detail: (id: number) => [...queryKeys.semesters.all, "detail", id] as const,
  },
  doctors: {
    all: ["doctors"] as const,
    list: () => [...queryKeys.doctors.all, "list"] as const,
    detail: (id: number) => [...queryKeys.doctors.all, "detail", id] as const,
  },
  courseOfferings: {
    all: ["course-offerings"] as const,
    list: (semesterId?: number) =>
      [...queryKeys.courseOfferings.all, "list", { semesterId }] as const,
    detail: (id: number) =>
      [...queryKeys.courseOfferings.all, "detail", id] as const,
  },
  courseDoctors: {
    all: ["course-doctors"] as const,
    list: (offeringId?: number) =>
      [...queryKeys.courseDoctors.all, "list", { offeringId }] as const,
  },
  contents: {
    all: ["contents"] as const,
    list: (filters?: Record<string, unknown>) =>
      [...queryKeys.contents.all, "list", filters] as const,
    detail: (id: number) => [...queryKeys.contents.all, "detail", id] as const,
  },
  contentTypes: {
    all: ["content-types"] as const,
  },
} as const;
