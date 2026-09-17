import { useState } from "react";
import type { AdminView } from "../../types/app";
import { useDoctors } from "../../hooks/useDoctors";
import { useNotifications } from "../../hooks/useNotifications";
import { useDepartments } from "../../hooks/useDepartments"; // 1. استيراد هوك الأقسام
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import AdminDashboardView from "./components/AdminDashboardView";
import AdminSettingsView from "./components/AdminSettingsView";
import AdminTableView from "./components/AdminTableView";
import ContentManagementView from "./components/ContentManagementView";
import AdminDialogModal from "./components/AdminDialogModal";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
import DoctorsManagementView from "../../Components/admin/DoctorsManagementView";
import { AddDepartmentModal } from "./components/modals/AddDepartmentModal"; // 2. استيراد المودال المخصص

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
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // حالة فتح مودال إضافة الأقسام المخصص
  const [showAddDeptModal, setShowAddDeptModal] = useState(false);

  // Business logic delegated to custom hooks
  const {
    doctorsList,
    coursesList,
    handleAddDoctor,
    handleEditDoctor,
    handleDeleteDoctor,
    handleAssignCourse,
    handleUnassignCourse,
  } = useDoctors();

  const { notifList, unreadCount, markAllRead, markAsRead } =
    useNotifications();

  // دوال وإجراءات الأقسام
  const { addDepartment, isSubmitting } = useDepartments();

  const handleAddClick = () => {
    if (view === "departments") {
      setShowAddDeptModal(true);
    } else {
      setDialogType("add");
      setShowDialog(true);
    }
  };

  return (
    <div
      className="flex min-h-screen bg-[#242D42] text-[#F4F7F6] font-['Noto_Sans_Arabic',sans-serif]"
      dir="rtl"
      onClick={() => setShowNotifs(false)}
    >
      {/* Sidebar Navigation */}
      <AdminSidebar
        currentView={view}
        onSelectView={setView}
        onSwitchStudent={onSwitchStudent}
        onLogout={onLogout}
        doctorsCount={doctorsList.length}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content Area */}
      <main
        className={`flex-1 overflow-x-hidden min-h-screen bg-[#242D42] transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? "mr-20" : "mr-64"
        }`}
      >
        {/* Sticky Top Header */}
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

        {/* View Routing */}
        <div className="p-8">
          {view === "dashboard" && (
            <AdminDashboardView
              setView={setView}
              doctorsCount={doctorsList.length}
            />
          )}

          {view === "settings" && <AdminSettingsView />}

          {view === "doctors" && (
            <DoctorsManagementView
              doctors={doctorsList}
              courses={coursesList}
              onAddDoctor={handleAddDoctor}
              onEditDoctor={handleEditDoctor}
              onDeleteDoctor={handleDeleteDoctor}
              onAssignCourse={handleAssignCourse}
              onUnassignCourse={handleUnassignCourse}
            />
          )}

          {view === "content_management" && <ContentManagementView />}

          {view !== "dashboard" &&
            view !== "settings" &&
            view !== "doctors" &&
            view !== "content_management" && (
              <AdminTableView
                view={view}
                onAdd={handleAddClick}
                onEdit={() => {
                  setDialogType("edit");
                  setShowDialog(true);
                }}
                onDelete={(name) => setDeleteConfirm(name)}
              />
            )}
        </div>
      </main>

      {/* مودال إضافة قسم المرتبط بالـ API وقاعدة البيانات */}
      <AddDepartmentModal
        isOpen={showAddDeptModal}
        onClose={() => setShowAddDeptModal(false)}
        onAdd={addDepartment}
        isSubmitting={isSubmitting}
      />

      {/* Add / Edit Dialog Modal لبقية الجداول */}
      {showDialog && (
        <AdminDialogModal
          type={dialogType}
          view={view}
          onClose={() => setShowDialog(false)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <DeleteConfirmModal
          name={deleteConfirm}
          onClose={() => setDeleteConfirm(null)}
        />
      )}
    </div>
  );
}
