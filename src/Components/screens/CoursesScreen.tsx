import type { NavState } from "../StudentApp";
import TopBar from "../TopBar";

const coursesData = [
  {
    id: 1,
    name: "برمجة 1",
    nameEn: "Programming 1",
    files: 32,
    color: "#3B82F6",
    icon: "💻",
    rating: 4.8,
  },
  {
    id: 2,
    name: "رياضيات",
    nameEn: "Mathematics",
    files: 28,
    color: "#8B5CF6",
    icon: "∑",
    rating: 4.5,
  },
  {
    id: 3,
    name: "إنجليزي",
    nameEn: "English",
    files: 18,
    color: "#06B6D4",
    icon: "En",
    rating: 4.2,
  },
  {
    id: 4,
    name: "مهارات الحاسوب",
    nameEn: "Computer Skills",
    files: 22,
    color: "#F59E0B",
    icon: "🖥",
    rating: 4.6,
  },
  {
    id: 5,
    name: "المنطق الرقمي",
    nameEn: "Digital Logic",
    files: 25,
    color: "#EC4899",
    icon: "⊕",
    rating: 4.3,
  },
  {
    id: 6,
    name: "فيزياء",
    nameEn: "Physics",
    files: 20,
    color: "#10B981",
    icon: "⚛",
    rating: 4.4,
  },
];

interface Props {
  nav: NavState;
  navigate: (s: NavState) => void;
}

export default function CoursesScreen({ nav, navigate }: Props) {
  return (
    <div className="fade-in">
      <TopBar
        breadcrumbs={[
          { label: "الرئيسية", onClick: () => navigate({ screen: "home" }) },
          {
            label: "التخصصات",
            onClick: () => navigate({ screen: "departments" }),
          },

          // { label: nav.university?.name ?? '', onClick: () => navigate({ ...nav, screen: 'colleges' }) },
          {
            label: nav.department?.name ?? "",
            onClick: () => navigate({ ...nav, screen: "levels" }),
          },
          {
            label: nav.level?.name ?? "",
            onClick: () => navigate({ ...nav, screen: "semesters" }),
          },
          { label: nav.semester?.name ?? "" },
        ]}
        title={`${nav.level?.name} — ${nav.semester?.name}`}
        subtitle={`${nav.department?.name} · ${coursesData.length} مواد دراسية`}
      />
      <div style={{ padding: "32px 32px 48px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 14,
          }}
        >
          {coursesData.map((course) => (
            <div
              key={course.id}
              onClick={() =>
                navigate({
                  ...nav,
                  screen: "course-detail",
                  course: {
                    id: course.id,
                    name: course.name,
                    nameEn: course.nameEn,
                    color: course.color,
                  },
                })
              }
              className="dept-card"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-subtle)",
                borderRadius: 18,
                padding: "22px 20px",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -30,
                  left: -30,
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  background: course.color + "10",
                }}
              />
              <div
                style={{ display: "flex", alignItems: "flex-start", gap: 14 }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 13,
                    background: course.color + "22",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    fontWeight: 700,
                    color: course.color,
                    fontFamily: "monospace",
                    flexShrink: 0,
                  }}
                >
                  {course.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      marginBottom: 3,
                    }}
                  >
                    {course.name}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                    {course.nameEn}
                  </div>
                </div>
              </div>
              <div
                style={{
                  marginTop: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    color: course.color,
                    fontWeight: 600,
                    background: course.color + "15",
                    padding: "3px 8px",
                    borderRadius: 6,
                  }}
                >
                  {course.files} ملف
                </span>
                <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
                  ⭐ {course.rating}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
