import { useState } from "react";
import type { AdminView } from "../../types/app";
import type {
  DepartmentEntity,
  CourseEntity,
  LevelEntity,
  SemesterEntity,
  DoctorEntity,
} from "../../types/api";
import { useDoctors } from "../../hooks/useDoctors";
import { useNotifications } from "../../hooks/useNotifications";
import { useDepartments } from "../../hooks/useDepartments";
import { useCourses } from "../../hooks/useCourses";
import { useLevels } from "../../hooks/useLevels";
import { useSemesters } from "../../hooks/useSemesters";
import { useCourseOfferings } from "../../hooks/useCourseOfferings";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import AdminDashboardView from "./components/AdminDashboardView";
import AdminSettingsView from "./components/AdminSettingsView";
import AdminTableView from "./components/AdminTableView";
import ContentManagementView from "./components/ContentManagementView";
import AdminDialogModal from "./components/AdminDialogModal";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
import { AddDepartmentModal } from "./components/modals/AddDepartmentModal";
import { AddCourseModal } from "./components/modals/AddCourseModal";
import { AddLevelModal } from "./components/modals/AddLevelModal";
import { AddSemesterModal } from "./components/modals/AddSemesterModal";
import { AddDoctorModal } from "./components/modals/AddDoctorModal";
import { AddCourseOfferingModal } from "./components/modals/AddCourseOfferingModal";
import { useCourseDoctors } from "../../hooks/useCourseDoctors";
import { AssignDoctorCourseModal } from "./components/modals/AssignDoctorCourseModal";

export interface AdminAppProps {
  onSwitchStudent?: () => void;
  onLogout?: () => void;
}

export default function AdminApp({ onSwitchStudent, onLogout }: AdminAppProps) {
  const [view, setView] = useState<AdminView>("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogType, setDialogType] = useState<"add" | "edit">("add");
  const [showNotifs, setShowNotifs] = useState(false);

  // حالات إدارة الأقسام
  const [showAddDeptModal, setShowAddDeptModal] = useState(false);
  const [showEditDeptModal, setShowEditDeptModal] = useState(false);
  const [selectedDept, setSelectedDept] = useState<DepartmentEntity | null>(
    null,
  );

  // حالات إدارة المواد الدراسية
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [showEditCourseModal, setShowEditCourseModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseEntity | null>(
    null,
  );

  // حالات إدارة المستويات الدراسية
  const [showAddLevelModal, setShowAddLevelModal] = useState(false);
  const [showEditLevelModal, setShowEditLevelModal] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<LevelEntity | null>(null);

  // حالات إدارة الترمات
  const [showAddSemesterModal, setShowAddSemesterModal] = useState(false);
  const [showEditSemesterModal, setShowEditSemesterModal] = useState(false);
  const [selectedSemester, setSelectedSemester] =
    useState<SemesterEntity | null>(null);

  // حالات إدارة الدكاترة
  const [showAddDoctorModal, setShowAddDoctorModal] = useState(false);
  const [showEditDoctorModal, setShowEditDoctorModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorEntity | null>(
    null,
  );

  // حالات طرح المقررات
  const [showAddOfferingModal, setShowAddOfferingModal] = useState(false);
  const [selectedOffering, setSelectedOffering] = useState<any | null>(null);

  const [showAssignDoctorModal, setShowAssignDoctorModal] = useState(false);
  const [showEditOfferingModal, setShowEditOfferingModal] = useState(false);

  const [selectedAssignment, setSelectedAssignment] = useState<any | null>(
    null,
  );
  const [showEditAssignmentModal, setShowEditAssignmentModal] = useState(false);

  const {
    handleAssignDoctor: assignDoctorToCourse,
    handleUpdateAssignment,
    handleDeleteAssignment,
    isSubmitting: isAssignSubmitting,
  } = useCourseDoctors();

  // حالة تأكيد الحذف الديناميكية
  const [itemToDelete, setItemToDelete] = useState<{
    id: number;
    name: string;
    type:
      | "department"
      | "course"
      | "level"
      | "semester"
      | "doctor"
      | "course_offering";
  } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const { notifList, unreadCount, markAllRead, markAsRead } =
    useNotifications();

  const {
    departments,
    addDepartment,
    updateDepartment,
    deleteDepartment,
    isSubmitting: isDeptSubmitting,
  } = useDepartments();

  const {
    courses,
    addCourse,
    updateCourse,
    deleteCourse,
    isSubmitting: isCourseSubmitting,
  } = useCourses();

  const {
    levels,
    addLevel,
    updateLevel,
    deleteLevel,
    isSubmitting: isLevelSubmitting,
  } = useLevels();

  const {
    semesters,
    addSemester,
    updateSemester,
    deleteSemester,
    isSubmitting: isSemesterSubmitting,
  } = useSemesters();

  const {
    doctorsList,
    handleAddDoctor,
    handleEditDoctor,
    handleDeleteDoctor,
    isSubmitting: isDoctorSubmitting,
  } = useDoctors();

  const {
    offerings,
    isSubmitting: isOfferingSubmitting,
    handleAddOffering,
    handleUpdateOffering, // 👈 استخرج دالة التعديل هنا
    handleDeleteOffering,
    handleAssignDoctor,
  } = useCourseOfferings();

  // فتح نافذة الإضافة المخصصة لكل شاشة
  const handleAddClick = () => {
    if (view === "departments") {
      setShowAddDeptModal(true);
    } else if (view === "courses") {
      setShowAddCourseModal(true);
    } else if (view === "semesters") {
      setShowAddSemesterModal(true);
    } else if (view === "levels") {
      setShowAddLevelModal(true);
    } else if (view === "doctors") {
      setShowAddDoctorModal(true);
    } else if (view === "course_offerings") {
      setShowAddOfferingModal(true); // 👈 تم التصحيح لفتح نافذة طرح المقررات
    } else if (view === "course_doctors") {
      setShowAssignDoctorModal(true);
    } else {
      setDialogType("add");
      setShowDialog(true);
    }
  };

  // فتح نافذة التعديل واستخراج البيانات من صف الجدول
  const handleEditClick = (row: string[]) => {
    const id = Number(row[0]);

    if (view === "departments") {
      const originalDept = departments.find((d) => d.department_id === id);
      setSelectedDept({
        department_id: id,
        name: originalDept?.name || row[1] || "",
        code: originalDept?.code || row[2] || "",
      });
      setShowEditDeptModal(true);
    } else if (view === "courses") {
      const originalCourse = courses.find((c) => c.course_id === id);
      if (originalCourse) {
        setSelectedCourse(originalCourse);
      } else {
        setSelectedCourse({
          course_id: id,
          course_code: row[1] || "",
          course_name_ar: row[2] || "",
          course_name_en: row[3] || "",
          credit_hours: Number(row[4]) || 3,
        });
      }
      setShowEditCourseModal(true);
    } else if (view === "levels") {
      const originalLevel = levels.find((l) => l.level_id === id);
      if (originalLevel) {
        setSelectedLevel({
          level_id: originalLevel.level_id,
          name: originalLevel.name || "",
          level_number: originalLevel.level_number || 1,
          department_id: originalLevel.department_id,
        });
      } else {
        const [, name, levelNumberStr, deptName] = row;
        const matchedDept = departments.find((d) => d.name === deptName);
        setSelectedLevel({
          level_id: id,
          name,
          level_number: Number(levelNumberStr) || 1,
          department_id: matchedDept ? matchedDept.department_id : 0,
        });
      }
      setShowEditLevelModal(true);
    } else if (view === "semesters") {
      const originalSemester = semesters.find((s) => s.semester_id === id);
      if (originalSemester) {
        setSelectedSemester({
          semester_id: originalSemester.semester_id,
          name: originalSemester.name || originalSemester.semester_name || "",
          semester_number: originalSemester.semester_number,
          academic_year: originalSemester.academic_year,
          level_id: originalSemester.level_id,
        });
      }
      setShowEditSemesterModal(true);
    } else if (view === "course_doctors") {
      setSelectedAssignment({
        course_doctor_id: id,
        doctor_name: row[1],
        course_name: row[2],
      });
      setShowEditAssignmentModal(true);
    } else if (view === "doctors") {
      const matchedDoctor = doctorsList.find((doc) => doc.doctor_id === id);
      const userId = Number(row[1]);
      const fullName = row[2] || "";

      setSelectedDoctor({
        doctor_id: id,
        user_id: matchedDoctor?.user_id || userId,
        user: matchedDoctor?.user || {
          user_id: userId,
          full_name: fullName,
          name_ar: fullName,
          name_en: "",
          email: row[3] || "",
        },
      });
      setShowEditDoctorModal(true);
    } else if (view === "course_offerings") {
      const originalOffering = offerings.find(
        (off: any) => (off.offering_id || off.id) === id,
      ) as any;

      if (originalOffering) {
        // البحث عن المادة بالـ ID أو بالاسم
        const targetCourse = courses.find(
          (c) =>
            c.course_id === originalOffering.course_id ||
            c.course_name_ar ===
              (originalOffering.course?.course_name_ar ||
                originalOffering.course_name),
        );

        // البحث عن الترم بالـ ID أو بالاسم
        const targetSemester = semesters.find(
          (s) =>
            s.semester_id === originalOffering.semester_id ||
            s.name ===
              (originalOffering.semester?.name ||
                originalOffering.semester_name) ||
            s.semester_name ===
              (originalOffering.semester?.name ||
                originalOffering.semester_name),
        );

        setSelectedOffering({
          offering_id: id,
          course_id: targetCourse
            ? targetCourse.course_id
            : (originalOffering.course_id ?? 0),
          semester_id: targetSemester
            ? targetSemester.semester_id
            : (originalOffering.semester_id ?? 0),
          course_name:
            targetCourse?.course_name_ar || originalOffering.course_name || "",
          semester_name:
            targetSemester?.name || originalOffering.semester_name || "",
          offeringData: originalOffering,
        });
      }
      setShowEditOfferingModal(true);
    } else {
      setDialogType("edit");
      setShowDialog(true);
    }
  };

  // معالجة الضغط على أيقونة الحذف
  const handleDeleteClick = (idOrName: string, name?: string) => {
    if (view === "departments") {
      setItemToDelete({
        id: Number(idOrName),
        name: name || `قسم رقم #${idOrName}`,
        type: "department",
      });
    } else if (view === "courses") {
      setItemToDelete({
        id: Number(idOrName),
        name: name || `مادة رقم #${idOrName}`,
        type: "course",
      });
    } else if (view === "levels") {
      setItemToDelete({
        id: Number(idOrName),
        name: name || `مستوى رقم #${idOrName}`,
        type: "level",
      });
    } else if (view === "semesters") {
      setItemToDelete({
        id: Number(idOrName),
        name: name || `ترم رقم #${idOrName}`,
        type: "semester",
      });
    } else if (view === "doctors") {
      setItemToDelete({
        id: Number(idOrName),
        name: name || `دكتور رقم #${idOrName}`,
        type: "doctor",
      });
    } else if (view === "course_offerings") {
      // 👈 تم ضبط معالجة حذف طرح المقرر
      setItemToDelete({
        id: Number(idOrName),
        name: name || `المقرر المطروح #${idOrName}`,
        type: "course_offering",
      });
    } else if (view === "course_doctors") {
      setItemToDelete({
        id: Number(idOrName),
        name: name ? `إسناد: ${name}` : `إسناد رقم #${idOrName}`,
        type: "course_doctor" as any,
      });
    } else {
      setDeleteConfirm(idOrName);
    }
  };

  // تأكيد وتنفيذ الحذف
  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    let success = false;

    if (itemToDelete.type === "department") {
      success = await deleteDepartment(itemToDelete.id);
    } else if (itemToDelete.type === "course") {
      success = await deleteCourse(itemToDelete.id);
    } else if (itemToDelete.type === "level") {
      success = await deleteLevel(itemToDelete.id);
    } else if (itemToDelete.type === "semester") {
      success = await deleteSemester(itemToDelete.id);
    } else if (itemToDelete.type === "doctor") {
      success = await handleDeleteDoctor(itemToDelete.id);
    } else if (itemToDelete.type === "course_offering") {
      success = await handleDeleteOffering(itemToDelete.id);
    } else if ((itemToDelete.type as string) === "course_doctor") {
      success = await handleDeleteAssignment(itemToDelete.id);
    }

    if (success) {
      setItemToDelete(null);
    }
  };

  return (
    <div
      className="flex min-h-screen bg-[#242D42] text-[#F4F7F6] font-['Noto_Sans_Arabic',sans-serif]"
      dir="rtl"
      onClick={() => setShowNotifs(false)}
    >
      {/* القائمة الجانبية */}
      <AdminSidebar
        currentView={view}
        onSelectView={setView}
        onSwitchStudent={onSwitchStudent}
        onLogout={onLogout}
        doctorsCount={doctorsList.length}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* منطقة المحتوى */}
      <main
        className={`flex-1 overflow-x-hidden min-h-screen bg-[#242D42] transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? "mr-20" : "mr-64"
        }`}
      >
        {/* شريط الرأس العلوي */}
        <AdminHeader
          currentView={view}
          showNotifications={showNotifs}
          onToggleNotifications={() => setShowNotifs(!showNotifs)}
          notifications={notifList}
          unreadCount={unreadCount}
          onMarkAllRead={markAllRead}
          onSelectNotification={markAsRead}
          onLogout={onLogout}
        />

        {/* عرض الشاشات */}
        <div className="p-8">
          {view === "dashboard" && (
            <AdminDashboardView
              setView={setView}
              doctorsCount={doctorsList.length}
            />
          )}

          {view === "settings" && <AdminSettingsView />}

          {view === "content_management" && <ContentManagementView />}

          {view !== "dashboard" &&
            view !== "settings" &&
            view !== "content_management" && (
              <AdminTableView
                view={view}
                onAdd={handleAddClick}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
              />
            )}
        </div>
      </main>

      {/* --- نوافذ الأقسام --- */}
      <AddDepartmentModal
        isOpen={showAddDeptModal}
        onClose={() => setShowAddDeptModal(false)}
        onAdd={addDepartment}
        isSubmitting={isDeptSubmitting}
      />

      {selectedDept && (
        <AddDepartmentModal
          isOpen={showEditDeptModal}
          onClose={() => {
            setShowEditDeptModal(false);
            setSelectedDept(null);
          }}
          onAdd={async (payload) => {
            const success = await updateDepartment(
              selectedDept.department_id,
              payload,
            );
            if (success) {
              setShowEditDeptModal(false);
              setSelectedDept(null);
            }
            return success;
          }}
          isSubmitting={isDeptSubmitting}
          initialData={selectedDept}
        />
      )}

      {/* --- نوافذ المواد الدراسية --- */}
      <AddCourseModal
        isOpen={showAddCourseModal}
        onClose={() => setShowAddCourseModal(false)}
        onSubmit={addCourse}
        isSubmitting={isCourseSubmitting}
      />

      {selectedCourse && (
        <AddCourseModal
          isOpen={showEditCourseModal}
          onClose={() => {
            setShowEditCourseModal(false);
            setSelectedCourse(null);
          }}
          onSubmit={async (payload) => {
            const success = await updateCourse(
              selectedCourse.course_id,
              payload,
            );
            if (success) {
              setShowEditCourseModal(false);
              setSelectedCourse(null);
            }
            return success;
          }}
          isSubmitting={isCourseSubmitting}
          initialData={selectedCourse}
        />
      )}

      {/* --- نوافذ المستويات الأكاديمية --- */}
      <AddLevelModal
        isOpen={showAddLevelModal}
        onClose={() => setShowAddLevelModal(false)}
        onSubmit={addLevel}
        departments={departments}
        isSubmitting={isLevelSubmitting}
      />

      {selectedLevel && (
        <AddLevelModal
          isOpen={showEditLevelModal}
          onClose={() => {
            setShowEditLevelModal(false);
            setSelectedLevel(null);
          }}
          onSubmit={async (payload) => {
            const success = await updateLevel(selectedLevel.level_id, payload);
            if (success) {
              setShowEditLevelModal(false);
              setSelectedLevel(null);
            }
            return success;
          }}
          departments={departments}
          isSubmitting={isLevelSubmitting}
          initialData={selectedLevel}
        />
      )}

      {/* --- نوافذ الترمات --- */}
      <AddSemesterModal
        isOpen={showAddSemesterModal}
        onClose={() => setShowAddSemesterModal(false)}
        onSubmit={addSemester}
        levels={levels}
        isSubmitting={isSemesterSubmitting}
      />

      {selectedSemester && (
        <AddSemesterModal
          isOpen={showEditSemesterModal}
          onClose={() => {
            setShowEditSemesterModal(false);
            setSelectedSemester(null);
          }}
          onSubmit={async (payload) => {
            const success = await updateSemester(
              selectedSemester.semester_id,
              payload,
            );
            if (success) {
              setShowEditSemesterModal(false);
              setSelectedSemester(null);
            }
            return success;
          }}
          levels={levels}
          isSubmitting={isSemesterSubmitting}
          initialData={selectedSemester}
        />
      )}

      {/* --- نوافذ الدكاترة --- */}
      <AddDoctorModal
        isOpen={showAddDoctorModal}
        onClose={() => setShowAddDoctorModal(false)}
        onSubmit={handleAddDoctor}
        isSubmitting={isDoctorSubmitting}
      />

      {selectedDoctor && (
        <AddDoctorModal
          isOpen={showEditDoctorModal}
          onClose={() => {
            setShowEditDoctorModal(false);
            setSelectedDoctor(null);
          }}
          onSubmit={async (payload) => {
            const success = await handleEditDoctor(
              selectedDoctor.doctor_id,
              payload,
            );
            if (success) {
              setShowEditDoctorModal(false);
              setSelectedDoctor(null);
            }
            return success;
          }}
          initialData={selectedDoctor}
          isSubmitting={isDoctorSubmitting}
        />
      )}

      {/* نافذة الإضافة */}
      <AddCourseOfferingModal
        isOpen={showAddOfferingModal}
        onClose={() => setShowAddOfferingModal(false)}
        courses={courses}
        semesters={semesters}
        doctors={doctorsList}
        isSubmitting={isOfferingSubmitting}
        onSubmit={async (payload) => {
          const newOfferingId = await handleAddOffering({
            course_id: payload.course_id,
            semester_id: payload.semester_id,
          });

          if (newOfferingId && payload.doctor_ids.length > 0) {
            for (const doctorId of payload.doctor_ids) {
              await handleAssignDoctor({
                offering_id: newOfferingId,
                doctor_id: doctorId,
              });
            }
          }
          return Boolean(newOfferingId);
        }}
      />

      {/* نافذة تعديل طرح المقرر */}
      {selectedOffering && (
        <AddCourseOfferingModal
          isOpen={showEditOfferingModal}
          onClose={() => {
            setShowEditOfferingModal(false);
            setSelectedOffering(null);
          }}
          initialData={selectedOffering}
          courses={courses}
          semesters={semesters}
          doctors={doctorsList}
          isSubmitting={isOfferingSubmitting}
          onSubmit={async (payload) => {
            const success = await handleUpdateOffering(
              selectedOffering.offering_id,
              {
                course_id: payload.course_id,
                semester_id: payload.semester_id,
                doctor_ids: payload.doctor_ids,
              },
            );

            if (success) {
              setShowEditOfferingModal(false);
              setSelectedOffering(null);
            }
            return success;
          }}
        />
      )}

      <AssignDoctorCourseModal
        isOpen={showAssignDoctorModal}
        onClose={() => setShowAssignDoctorModal(false)}
        offerings={offerings}
        doctors={doctorsList}
        isSubmitting={isAssignSubmitting}
        onSubmit={assignDoctorToCourse}
      />

      {selectedAssignment && (
        <AssignDoctorCourseModal
          isOpen={showEditAssignmentModal}
          onClose={() => {
            setShowEditAssignmentModal(false);
            setSelectedAssignment(null);
          }}
          initialData={selectedAssignment}
          offerings={offerings}
          doctors={doctorsList}
          isSubmitting={isAssignSubmitting}
          onSubmit={async (payload) => {
            const success = await handleUpdateAssignment(
              selectedAssignment.course_doctor_id,
              payload,
            );
            if (success) {
              setShowEditAssignmentModal(false);
              setSelectedAssignment(null);
            }
            return success;
          }}
        />
      )}

      {/* النافذة الافتراضية لبقية الجداول */}
      {showDialog && (
        <AdminDialogModal
          type={dialogType}
          view={view}
          onClose={() => setShowDialog(false)}
        />
      )}

      {/* نافذة تأكيد حذف العناصر */}
      {itemToDelete && (
        <DeleteConfirmModal
          name={itemToDelete.name}
          onClose={() => setItemToDelete(null)}
          onConfirm={handleConfirmDelete}
        />
      )}

      {/* نافذة تأكيد الحذف المؤقتة لباقي العناصر الثابتة */}
      {deleteConfirm && (
        <DeleteConfirmModal
          name={deleteConfirm}
          onClose={() => setDeleteConfirm(null)}
        />
      )}
    </div>
  );
}
