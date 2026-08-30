import { useMemo } from "react";
import type { NavState } from "../StudentApp";
import TopBar from "../TopBar";
import { departments } from "./DepartmentScreen";

const popularCourses = [
  {
    id: 1,
    name: "هياكل البيانات",
    nameEn: "Data Structures",
    dept: "علوم حاسوب",
    uni: "جامعة القاهرة",
    files: 47,
    color: "#3B82F6",
    icon: "⚙",
  },
  {
    id: 2,
    name: "برمجة 1",
    nameEn: "Programming 1",
    dept: "علوم حاسوب",
    uni: "جامعة القاهرة",
    files: 32,
    color: "#8B5CF6",
    icon: "💻",
  },
  {
    id: 3,
    name: "رياضيات",
    nameEn: "Mathematics",
    dept: "هندسة",
    uni: "جامعة الإسكندرية",
    files: 28,
    color: "#06B6D4",
    icon: "∑",
  },
  {
    id: 4,
    name: "قواعد البيانات",
    nameEn: "Database Systems",
    dept: "تقنية معلومات",
    uni: "جامعة القاهرة",
    files: 39,
    color: "#10B981",
    icon: "🗄",
  },
  {
    id: 5,
    name: "الذكاء الاصطناعي",
    nameEn: "Artificial Intelligence",
    dept: "علوم حاسوب",
    uni: "جامعة الأزهر",
    files: 55,
    color: "#F59E0B",
    icon: "🤖",
  },
  {
    id: 6,
    name: "شبكات الحاسوب",
    nameEn: "Computer Networks",
    dept: "هندسة",
    uni: "جامعة القاهرة",
    files: 41,
    color: "#EC4899",
    icon: "🌐",
  },
];

interface Props {
  navigate: (s: NavState) => void;
}

export default function HomeScreen({ navigate }: Props) {
  const deptList = useMemo(() => departments, []);
  const courseList = useMemo(() => popularCourses, []);

  return (
    <div className="fade-in">
      <TopBar
        breadcrumbs={[{ label: "الرئيسية" }]}
        title="مرحباً بك في UniHub 👋"
        subtitle="جميع المواد والملفات الدراسية في مكان منظم وسهل الوصول"
      />
      <div style={{ padding: "32px 32px 48px" }}>
        <div>
          {/* Main Column (Departments + Popular Courses) */}
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {/* 1. Browse by Department */}
            <div className="slide-up">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 18,
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    fontSize: 18,
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    fontFamily: "Outfit, 'Noto Sans Arabic', sans-serif",
                  }}
                >
                  تصفح حسب القسم
                </h2>
              </div>
              <div
                className="stagger-children"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 14,
                }}
              >
                {deptList.map((dept) => (
                  <div
                    key={dept.id}
                    className="popular-card hover-glow-blue"
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: 18,
                      padding: "20px",
                      cursor: "pointer",
                      overflow: "hidden",
                      position: "relative",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                    onClick={() =>
                      navigate({
                        screen: "levels",
                        department: {
                          id: dept.id,
                          name: dept.name,
                          nameEn: dept.nameEn,
                          color: dept.color,
                          icon: dept.icon,
                        },
                      })
                    }
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: -20,
                        right: -20,
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        background: dept.color + "10",
                        transition: "transform 0.4s ease",
                      }}
                    />
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 14,
                        background: dept.color + "20",
                        color: dept.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 24,
                        marginBottom: 16,
                        position: "relative",
                        fontFamily: "monospace",
                        fontWeight: 700,
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      }}
                    >
                      {dept.icon}
                    </div>
                    <div
                      style={{
                        fontSize: 16,
                        fontWeight: 700,
                        color: "var(--text-primary)",
                        marginBottom: 6,
                      }}
                    >
                      {dept.name}
                    </div>
                    <div
                      style={{ display: "flex", gap: 6, alignItems: "center" }}
                    >
                      <span
                        style={{ fontSize: 12, color: "var(--text-secondary)" }}
                      >
                        {dept.nameEn}
                      </span>
                      <span
                        style={{
                          fontSize: 10,
                          color: dept.color,
                          background: dept.color + "15",
                          padding: "2px 8px",
                          borderRadius: 10,
                        }}
                      >
                        {dept.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Popular Courses */}
            <div className="content-auto">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 18,
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    fontSize: 18,
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    fontFamily: "Outfit, 'Noto Sans Arabic', sans-serif",
                  }}
                >
                  المواد الشائعة
                </h2>
                <button
                  onClick={() => navigate({ screen: "departments" })}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--accent-blue)",
                    fontSize: 13,
                    fontWeight: 500,
                    transition: "opacity 0.15s",
                  }}
                >
                  عرض الكل ←
                </button>
              </div>
              <div
                className="stagger-children"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3,1fr)",
                  gap: 14,
                }}
              >
                {courseList.map((course) => (
                  <div
                    key={course.id}
                    className="popular-card"
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: 18,
                      padding: "20px",
                      cursor: "pointer",
                      overflow: "hidden",
                      position: "relative",
                    }}
                    onClick={() => navigate({ screen: "departments" })}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 24px ${course.color}20, 0 16px 48px rgba(0,0,0,0.4)`;
                      e.currentTarget.style.borderColor = course.color + "30";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.borderColor = "var(--border-subtle)";
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: -20,
                        left: -20,
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        background: course.color + "15",
                      }}
                    />
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        background: course.color + "25",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 22,
                        marginBottom: 12,
                        position: "relative",
                      }}
                    >
                      {course.icon}
                    </div>
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: "var(--text-primary)",
                        marginBottom: 4,
                      }}
                    >
                      {course.name}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "var(--text-secondary)",
                        marginBottom: 8,
                      }}
                    >
                      {course.dept}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 11,
                          color: course.color,
                          fontWeight: 600,
                          background: course.color + "15",
                          padding: "3px 8px",
                          borderRadius: 6,
                        }}
                      >
                        {course.files} ملف
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
