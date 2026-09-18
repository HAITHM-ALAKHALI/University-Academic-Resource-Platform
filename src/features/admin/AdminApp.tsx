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
import { AddCourseOfferingsModal } from "./components/modals/AddCourseOfferingsModal";
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

  const [showAddSemesterModal, setShowAddSemesterModal] = useState(false);
  const [showEditSemesterModal, setShowEditSemesterModal] = useState(false);
  const [selectedSemester, setSelectedSemester] =
    useState<SemesterEntity | null>(null);

  const [showAddDoctorModal, setShowAddDoctorModal] = useState(false);
  const [showEditDoctorModal, setShowEditDoctorModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorEntity | null>(
    null,
  );

  const [showAddOfferingModal, setShowAddOfferingModal] = useState(false);
  const [selectedOffering, setSelectedOffering] = useState<any | null>(null);
  const [showEditOfferingModal, setShowEditOfferingModal] = useState(false);

  // حالة تأكيد الحذف الديناميكية
  const [itemToDelete, setItemToDelete] = useState<{
    id: number;
    name: string;
    type: "department" | "course" | "level" | "semester" | "doctor";
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
    handleDeleteOffering,
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
    } else if (view === "course_offerings") setShowAddOfferingModal(true);
    else {
      setDialogType("add");
      setShowDialog(true);
    }
  };

  // فتح نافذة التعديل واستخراج البيانات من صف الجدول
  const handleEditClick = (row: string[]) => {
    if (view === "departments") {
      const [id, name, code] = row;
      setSelectedDept({
        department_id: Number(id),
        name,
        code,
      });
      setShowEditDeptModal(true);
    } else if (view === "courses") {
      const [id, course_code, course_name_ar, course_name_en, credit_hours] =
        row;
      setSelectedCourse({
        course_id: Number(id),
        course_code,
        course_name_ar,
        course_name_en,
        credit_hours: Number(credit_hours),
      });
      setShowEditCourseModal(true);
    } else if (view === "levels") {
      const [id, name, levelNumberStr, deptName] = row;
      // مطابقة اسم القسم للحصول على department_id التابع له
      const matchedDept = departments.find((d) => d.name === deptName);
      setSelectedLevel({
        level_id: Number(id),
        name,
        level_number: Number(levelNumberStr),
        department_id: matchedDept ? matchedDept.department_id : 0,
      });
      setShowEditLevelModal(true);
    } else if (view === "semesters") {
      const [id, name, semesterNumStr, academicYear, levelName] = row;
      const matchedLevel = levels.find((l) => l.name === levelName);
      setSelectedSemester({
        semester_id: Number(id),
        name,
        semester_number: Number(semesterNumStr),
        academic_year: academicYear,
        level_id: matchedLevel ? matchedLevel.level_id : 0,
      });
      setShowEditSemesterModal(true);
    } else if (view === "doctors") {
      // بناءً على ترتيب صفوف الدكاترة في الجدول: [id, user_id, name, email]
      const [id, userId, fullName] = row;
      const matchedDoctor = doctorsList.find(
        (doc) => doc.doctor_id === Number(id),
      );

      setSelectedDoctor({
        doctor_id: Number(id),
        user_id: Number(userId),
        user: matchedDoctor?.user || {
          user_id: Number(userId),
          full_name: fullName,
          name_ar: fullName,
          name_en: "",
          email: "",
        },
      });
      setShowEditDoctorModal(true);
    } else if (view === "course_offerings") {
      const [id, , courseName, semesterName] = row;
      const matchedOffering = offerings?.find(
        (off) => off.offering_id === Number(id),
      );
      const matchedCourse = courses?.find(
        (c) => c.course_name_ar === courseName,
      );
      const matchedSemester = semesters?.find((s) => s.name === semesterName);

      setSelectedOffering({
        offering_id: Number(id),
        course_id: matchedCourse ? matchedCourse.course_id : 0,
        semester_id: matchedSemester ? matchedSemester.semester_id : 0,
        course_name: courseName,
        semester_name: semesterName,
        offeringData: matchedOffering, // 👈 تم استخدامه هنا
      });
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
      success = await handleDeleteOffering(itemToDelete.id); // 👈 إضافة شرط حذف الطرح
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

      <AddDoctorModal
        isOpen={showAddDoctorModal || showEditDoctorModal}
        onClose={() => {
          setShowAddDoctorModal(false);
          setShowEditDoctorModal(false);
          setSelectedDoctor(null);
        }}
        onSubmit={handleAddDoctor}
        initialData={selectedDoctor}
        isSubmitting={isDoctorSubmitting} // تأكد من جلبها من الهوك
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

      <AddCourseOfferingsModal
        isOpen={showAddOfferingModal || showEditOfferingModal}
        onClose={() => {
          setShowAddOfferingModal(false);
          setShowEditOfferingModal(false);
          setSelectedOffering(null);
        }}
        onSubmit={handleAddOffering}
        courses={courses || []}
        semesters={semesters || []}
        isSubmitting={isOfferingSubmitting}
      />

      {/* النافذة الافتراضية لبقية الجداول */}
      {showDialog && (
        <AdminDialogModal
          type={dialogType}
          view={view}
          onClose={() => setShowDialog(false)}
        />
      )}

      {/* نافذة تأكيد حذف العناصر المتصلة بالـ API */}
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
