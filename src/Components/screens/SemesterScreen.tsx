import type { NavState } from "../StudentApp";
import TopBar from "../TopBar";

const semesters = [
  { id: 1, name: "الترم الأول", courses: 6, files: 124, color: "#3B82F6" },
  { id: 2, name: "الترم الثاني", courses: 6, files: 118, color: "#8B5CF6" },
];

interface Props {
  nav: NavState;
  navigate: (s: NavState) => void;
}

export default function SemesterScreen({ nav, navigate }: Props) {
  return (
    <div className="fade-in">
      <TopBar
        breadcrumbs={[
          { label: "الرئيسية", onClick: () => navigate({ screen: "home" }) },
          {
            label: "التخصصات",
            onClick: () => navigate({ screen: "departments" }),
          },
          {
            label: nav.department?.name ?? "",
            onClick: () => navigate({ ...nav, screen: "levels" }),
          },
          { label: nav.level?.name ?? "" },
        ]}
        title={`${nav.department?.name} — ${nav.level?.name}`}
        subtitle="اختر الترم الدراسي"
      />
      <div style={{ padding: "32px 32px 48px" }}>
        <div
          className="stagger-children"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
            maxWidth: 700,
          }}
        >
          {semesters.map((sem) => (
            <div
              key={sem.id}
              onClick={() =>
                navigate({
                  ...nav,
                  screen: "courses",
                  semester: { id: sem.id, name: sem.name },
                })
              }
              className="dept-card"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-subtle)",
                borderRadius: 20,
                padding: "32px 28px",
                cursor: "pointer",
                textAlign: "center",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = sem.color + "40";
                e.currentTarget.style.boxShadow = `0 0 32px ${sem.color}12, 0 16px 48px rgba(0,0,0,0.3)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-subtle)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 18,
                  background: sem.color + "20",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 28,
                  margin: "0 auto 16px",
                  color: sem.color,
                  transition: "transform 0.3s ease",
                  boxShadow: `0 4px 16px ${sem.color}15`,
                }}
              >
                📅
              </div>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: "var(--text-primary)",
                  marginBottom: 8,
                  fontFamily: "Outfit, 'Noto Sans Arabic', sans-serif",
                }}
              >
                {sem.name}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 16,
                  marginTop: 12,
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <div
                    className="count-up"
                    style={{ fontSize: 22, fontWeight: 800, color: sem.color }}
                  >
                    {sem.courses}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                    مادة
                  </div>
                </div>
                <div style={{ width: 1, background: "var(--border-subtle)" }} />
                <div style={{ textAlign: "center" }}>
                  <div
                    className="count-up"
                    style={{ fontSize: 22, fontWeight: 800, color: sem.color }}
                  >
                    {sem.files}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                    ملف
                  </div>
                </div>
              </div>
              <button
                style={{
                  marginTop: 18,
                  background:
                    "linear-gradient(135deg, " +
                    sem.color +
                    ", " +
                    sem.color +
                    "99)",
                  border: "none",
                  borderRadius: 10,
                  padding: "10px 24px",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: "pointer",
                  width: "100%",
                  transition: "opacity 0.2s, box-shadow 0.2s",
                  boxShadow: `0 4px 16px ${sem.color}30`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.9";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                }}
              >
                عرض المواد ←
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
