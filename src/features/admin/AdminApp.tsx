import { useState } from "react";
import type { AdminView } from "../../types/app";
import { useDoctors } from "../../hooks/useDoctors";
import { useNotifications } from "../../hooks/useNotifications";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import AdminDashboardView from "./components/AdminDashboardView";
import AdminSettingsView from "./components/AdminSettingsView";
import AdminTableView from "./components/AdminTableView";
import AdminDialogModal from "./components/AdminDialogModal";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
import DoctorsManagementView from "../../Components/admin/DoctorsManagementView";

export interface AdminAppProps {
  onSwitchStudent?: () => void;
  onLogout?: () => void;
}

export default function AdminApp({ onSwitchStudent }: AdminAppProps) {
  const [view, setView] = useState<AdminView>("dashboard");
  const [showDialog, setShowDialog] = useState(false);
  const [dialogType, setDialogType] = useState<"add" | "edit">("add");
  const [showNotifs, setShowNotifs] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

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

  const {
    notifList,
    unreadCount,
    markAllRead,
    markAsRead,
  } = useNotifications();

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
        doctorsCount={doctorsList.length}
      />

      {/* Main Content Area */}
      <main className="mr-64 flex-1 overflow-x-hidden min-h-screen bg-[#242D42]">
        {/* Sticky Top Header */}
        <AdminHeader
          currentView={view}
          showNotifications={showNotifs}
          onToggleNotifications={() => setShowNotifs(!showNotifs)}
          notifications={notifList}
          unreadCount={unreadCount}
          onMarkAllRead={markAllRead}
          onSelectNotification={markAsRead}
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

          {view !== "dashboard" &&
            view !== "settings" &&
            view !== "doctors" && (
              <AdminTableView
                view={view}
                onAdd={() => {
                  setDialogType("add");
                  setShowDialog(true);
                }}
                onEdit={() => {
                  setDialogType("edit");
                  setShowDialog(true);
                }}
                onDelete={(name) => setDeleteConfirm(name)}
              />
            )}
        </div>
      </main>

      {/* Add / Edit Dialog Modal */}
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
