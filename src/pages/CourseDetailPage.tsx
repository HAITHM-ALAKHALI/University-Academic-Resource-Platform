import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { Page, Lang } from "../types/app";
import { courses } from "../data";
import Navbar from "../Components/Navbar";
import CourseDetailHeader from "../features/course-detail/components/CourseDetailHeader";
import CourseResourceTabs, {
  type TabKey,
} from "../features/course-detail/components/CourseResourceTabs";
import CourseResourceList from "../features/course-detail/components/CourseResourceList";
import CourseSidebar from "../features/course-detail/components/CourseSidebar";

export interface CourseDetailPageProps {
  dark: boolean;
  lang: Lang;
  setDark: Dispatch<SetStateAction<boolean>>;
  setLang: Dispatch<SetStateAction<Lang>>;
  setPage: Dispatch<SetStateAction<Page>>;
  course: (typeof courses)[0];
  openCourse: (id: string) => void;
  onLogout?: () => void;
}

export default function CourseDetailPage({
  dark,
  lang,
  setDark,
  setLang,
  setPage,
  course,
  openCourse,
  onLogout,
}: CourseDetailPageProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("lectures");

  const tabCounts: Record<TabKey, number> = {
    lectures: course.resources.lectures.length,
    books: course.resources.books.length,
    assignments: course.resources.assignments.length,
    exams: course.resources.exams.length,
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--background)" }}>
      <Navbar
        dark={dark}
        lang={lang}
        setDark={setDark}
        setLang={setLang}
        setPage={setPage}
        onLogout={onLogout}
        currentPage="course"
      />

      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "32px 24px",
          display: "grid",
          gridTemplateColumns: "1fr 280px",
          gap: 28,
          alignItems: "start",
        }}
      >
        <div>
          {/* Back Button & Header */}
          <CourseDetailHeader
            course={course}
            lang={lang}
            setPage={setPage}
          />

          {/* Resource Navigation Tabs */}
          <CourseResourceTabs
            activeTab={activeTab}
            onSelectTab={setActiveTab}
            lang={lang}
            tabCounts={tabCounts}
          />

          {/* Resource Items List */}
          <CourseResourceList
            activeTab={activeTab}
            course={course}
            lang={lang}
          />
        </div>

        {/* Sidebar - Other Courses */}
        <CourseSidebar
          currentCourseId={course.id}
          lang={lang}
          onOpenCourse={openCourse}
        />
      </div>
    </div>
  );
}
