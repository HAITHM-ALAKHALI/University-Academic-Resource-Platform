import { useState, useMemo } from "react";
import { ArrowRight, Download } from "lucide-react";
import type { NavState } from "../../../types/app";
import type { ResourceType } from "../../../types/academic";
import TopBar from "../../../Components/TopBar";
import {
  initialCourses,
  initialDoctors,
  initialCourseResources,
} from "../../../constants/academicData";
import DoctorSelector from "../components/DoctorSelector";
import ResourceTabNav, { tabDefs } from "../components/ResourceTabNav";
import ResourceItemList from "../components/ResourceItemList";

export interface CourseDetailScreenProps {
  nav: NavState;
  navigate: (s: NavState) => void;
}

export function CourseDetailScreen({ nav, navigate }: CourseDetailScreenProps) {
  const [activeTab, setActiveTab] = useState<ResourceType>("lectures");
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | undefined>(
    nav.doctorId
  );

  // Identify course
  const currentCourseId = nav.course?.id || 1;
  const currentCourse = useMemo(() => {
    return (
      initialCourses.find((c) => c.id === currentCourseId) || {
        id: currentCourseId,
        name: nav.course?.name || "برمجة 1",
        nameEn: nav.course?.nameEn || "Programming 1",
        color: nav.course?.color || "#6B8EC7",
        code: "CS 101",
        rating: 4.8,
        files: 32,
        doctorIds: ["doc-1", "doc-2"],
        department: "علوم حاسوب",
        level: "السنة الأولى",
        semester: "الترم الأول",
      }
    );
  }, [currentCourseId, nav.course]);

  // Find all doctors teaching this course
  const courseDoctors = useMemo(() => {
    return initialDoctors.filter(
      (doc) =>
        currentCourse.doctorIds?.includes(doc.id) ||
        doc.assignedCourseIds?.includes(currentCourse.id)
    );
  }, [currentCourse]);

  // Current active doctor (if any)
  const activeDoctor = useMemo(() => {
    if (!selectedDoctorId) return undefined;
    return initialDoctors.find((d) => d.id === selectedDoctorId);
  }, [selectedDoctorId]);

  // All resources for this course
  const courseAllResources = useMemo(() => {
    return initialCourseResources.filter(
      (r) => r.courseId === currentCourse.id
    );
  }, [currentCourse.id]);

  // Filtered resources based on selected doctor
  const displayedResources = useMemo(() => {
    if (!selectedDoctorId) {
      return courseAllResources;
    }
    return courseAllResources.filter((r) => r.doctorId === selectedDoctorId);
  }, [courseAllResources, selectedDoctorId]);

  // Resources for the current active tab
  const tabResources = useMemo(() => {
    return displayedResources.filter((r) => r.type === activeTab);
  }, [displayedResources, activeTab]);

  // Calculate dynamic tab counts
  const tabCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    tabDefs.forEach((t) => {
      counts[t.id] = displayedResources.filter((r) => r.type === t.id).length;
    });
    return counts;
  }, [displayedResources]);

  const breadcrumbsList = [
    { label: "الرئيسية", onClick: () => navigate({ screen: "home" }) },
    ...(nav.department?.name
      ? [
          {
            label: nav.department.name,
            onClick: () => navigate({ ...nav, screen: "levels" as const }),
          },
        ]
      : []),
    ...(nav.semester?.name
      ? [
          {
            label: nav.semester.name,
            onClick: () => navigate({ ...nav, screen: "courses" as const }),
          },
        ]
      : []),
    {
      label: nav.course?.name || currentCourse.name,
      onClick: () => setSelectedDoctorId(undefined),
    },
    ...(activeDoctor ? [{ label: activeDoctor.name }] : []),
  ];

  const subtitleText = [
    currentCourse.nameEn,
    currentCourse.code,
    currentCourse.department,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="w-full">
      <TopBar breadcrumbs={breadcrumbsList} />

      <div className="mx-auto max-w-7xl p-6 sm:p-8 space-y-6">
        {/* Navigation & Header Actions: Back to Courses Button */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate({ ...nav, screen: "courses" })}
            className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-[#323D59] px-4 py-2 text-xs sm:text-sm font-bold text-[#F8FAFC] shadow-sm transition-all hover:bg-[#3B4868] hover:border-white/20 active:scale-95 cursor-pointer"
          >
            <ArrowRight className="h-4 w-4 text-[#7DA49F]" />
            <span>العودة للمواد الدراسية</span>
          </button>
        </div>

        {/* Course Title Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-[#F8FAFC]">
              {nav.course?.name || currentCourse.name}
            </h1>
            {currentCourse.code && (
              <span className="font-['JetBrains_Mono'] rounded-lg bg-[#7DA49F]/15 px-2.5 py-0.5 text-xs font-bold text-[#7DA49F] border border-[#7DA49F]/25">
                {currentCourse.code}
              </span>
            )}
          </div>
          <p className="text-sm font-medium text-[#A5B4BF]">{subtitleText}</p>
        </div>

        {/* Doctor Selector Chips & Active Doctor Indicator */}
        <DoctorSelector
          courseDoctors={courseDoctors}
          selectedDoctorId={selectedDoctorId}
          activeDoctor={activeDoctor}
          onSelectDoctor={setSelectedDoctorId}
        />

        {/* Tabbed Navigation and File Lists */}
        <div className="flex flex-col md:flex-row gap-6">
          <ResourceTabNav
            activeTab={activeTab}
            onSelectTab={setActiveTab}
            tabCounts={tabCounts}
          />

          <main className="flex-1 min-w-0">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-[#F8FAFC]">
                  {tabDefs.find((t) => t.id === activeTab)?.label}
                </h2>
                <p className="text-xs font-semibold text-[#A5B4BF]">
                  {activeDoctor
                    ? `الملفات الخاصة بـ ${activeDoctor.name}`
                    : `جميع ملفات ${nav.course?.name || currentCourse.name}`}
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => alert("جاري تجهيز حزمة الملفات للتحميل...")}
                  className="flex items-center gap-1.5 rounded-xl border border-[#7DA49F]/30 bg-[#323D59] px-3.5 py-2 text-xs font-bold text-[#F8FAFC] transition-all hover:bg-[#3B4868] hover:border-[#7DA49F]/50 cursor-pointer shadow-sm active:scale-95"
                >
                  <Download className="h-3.5 w-3.5 text-[#7DA49F]" />
                  <span>تحميل كل ملفات هذا القسم</span>
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.07] bg-[#323D59] p-6 shadow-xl">
              <ResourceItemList
                activeTab={activeTab}
                resources={tabResources}
                activeDoctor={activeDoctor}
                onResetDoctorFilter={() => setSelectedDoctorId(undefined)}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default CourseDetailScreen;
