import { useState, useMemo } from "react";
import {
  Search,
  Plus,
  Filter,
  Edit3,
  Trash2,
  Link,
  Mail,
  Phone,
  BookOpen,
  LayoutGrid,
  Table as TableIcon,
  Users,
  CheckCircle2,
  FolderTree,
} from "lucide-react";
import type { Doctor, AcademicCourse } from "../../types/academic";
import { academicDepartments } from "../../data/academicData";
import DoctorFormModal from "./DoctorFormModal";
import AssignCourseModal from "./AssignCourseModal";

interface Props {
  doctors: Doctor[];
  courses: AcademicCourse[];
  onAddDoctor: (doc: Doctor) => void;
  onEditDoctor: (doc: Doctor) => void;
  onDeleteDoctor: (id: string) => void;
  onAssignCourse: (doctorId: string, courseId: number) => void;
  onUnassignCourse: (doctorId: string, courseId: number) => void;
}

export default function DoctorsManagementView({
  doctors,
  courses,
  onAddDoctor,
  onEditDoctor,
  onDeleteDoctor,
  onAssignCourse,
  onUnassignCourse,
}: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [doctorToEdit, setDoctorToEdit] = useState<Doctor | null>(null);

  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [doctorToAssign, setDoctorToAssign] = useState<Doctor | null>(null);

  const [doctorToDelete, setDoctorToDelete] = useState<Doctor | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filter doctors
  const filteredDoctors = useMemo(() => {
    return doctors.filter((doc) => {
      const matchSearch =
        !searchQuery.trim() ||
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.academicTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.phone.includes(searchQuery);

      const matchDept =
        selectedDept === "all" || doc.department === selectedDept;

      return matchSearch && matchDept;
    });
  }, [doctors, searchQuery, selectedDept]);

  // Statistics
  const totalDoctors = doctors.length;
  const linkedCoursesCount = useMemo(() => {
    const courseIds = new Set<number>();
    doctors.forEach((d) => {
      d.assignedCourseIds?.forEach((id) => courseIds.add(id));
    });
    return courseIds.size;
  }, [doctors]);

  const representedDeptsCount = useMemo(() => {
    const depts = new Set(doctors.map((d) => d.department));
    return depts.size;
  }, [doctors]);

  // Helper to get assigned courses for a doctor
  const getDoctorCourses = (doc: Doctor) => {
    return courses.filter(
      (c) =>
        doc.assignedCourseIds?.includes(c.id) || c.doctorIds?.includes(doc.id)
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn" dir="rtl">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2.5 rounded-2xl border border-[#7DA49F]/40 bg-[#323D59]/95 px-5 py-3 text-xs font-bold text-[#F8FAFC] shadow-2xl backdrop-blur-xl animate-fadeIn">
          <CheckCircle2 className="h-4 w-4 text-[#7DA49F]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header & Stat Cards */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-['Outfit'] text-2xl font-black text-[#F4F7F6]">
            إدارة الدكاترة وأعضاء هيئة التدريس
          </h1>
          <p className="text-xs font-medium text-[#AABCAF] mt-1">
            إدارة بيانات الأساتذة وتعيينهم للمواد الدراسية ومتابعة الموارد التعليمية
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setDoctorToEdit(null);
            setIsFormModalOpen(true);
          }}
          className="inline-flex items-center gap-2 rounded-xl bg-[#7DA49F] px-4 py-2.5 text-xs font-black text-[#1E2638] shadow-md transition-all hover:bg-[#9DBFB8] hover:scale-[1.02] active:scale-95 cursor-pointer shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>إضافة دكتور جديد</span>
        </button>
      </div>

      {/* Quick Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-[#323D59] p-4 shadow-sm">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#7DA49F]/15 text-[#7DA49F] border border-[#7DA49F]/25">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-[#AABCAF]">
              إجمالي الدكاترة
            </div>
            <div className="font-['Outfit'] text-xl font-black text-[#F4F7F6]">
              {totalDoctors}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-[#323D59] p-4 shadow-sm">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#6B8EC7]/15 text-[#6B8EC7] border border-[#6B8EC7]/25">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-[#AABCAF]">
              المواد المرتبطة بدكاترة
            </div>
            <div className="font-['Outfit'] text-xl font-black text-[#F4F7F6]">
              {linkedCoursesCount}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-[#323D59] p-4 shadow-sm">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#C9A855]/15 text-[#C9A855] border border-[#C9A855]/25">
            <FolderTree className="h-6 w-6" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-[#AABCAF]">
              الأقسام الأكاديمية
            </div>
            <div className="font-['Outfit'] text-xl font-black text-[#F4F7F6]">
              {representedDeptsCount}
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar: Search & Filter & View Toggle */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-2xl border border-white/[0.07] bg-[#323D59] p-3 shadow-sm">
        <div className="flex flex-1 items-center gap-3 flex-wrap">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#AABCAF]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث بالاسم، البريد، أو اللقب الأكاديمي..."
              className="w-full rounded-xl border border-white/[0.08] bg-[#242D42] pr-9 pl-4 py-2 text-xs text-[#F4F7F6] outline-none focus:border-[#7DA49F] focus:ring-2 focus:ring-[#7DA49F]/20 transition-all placeholder:text-[#7A8A9B]"
            />
          </div>

          {/* Department Filter */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-[#AABCAF] shrink-0" />
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="rounded-xl border border-white/[0.08] bg-[#242D42] px-3 py-2 text-xs text-[#F4F7F6] outline-none focus:border-[#7DA49F] cursor-pointer"
            >
              <option value="all">جميع الأقسام</option>
              {academicDepartments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* View Mode Toggle: Table vs Grid */}
        <div className="flex items-center gap-1 rounded-xl border border-white/[0.08] bg-[#242D42] p-1 self-end sm:self-auto">
          <button
            type="button"
            title="عرض الجدول"
            onClick={() => setViewMode("table")}
            className={`flex h-7 w-7 items-center justify-center rounded-lg transition-colors cursor-pointer ${
              viewMode === "table"
                ? "bg-[#7DA49F] text-[#1E2638]"
                : "text-[#AABCAF] hover:text-[#F4F7F6]"
            }`}
          >
            <TableIcon className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            title="عرض البطاقات"
            onClick={() => setViewMode("grid")}
            className={`flex h-7 w-7 items-center justify-center rounded-lg transition-colors cursor-pointer ${
              viewMode === "grid"
                ? "bg-[#7DA49F] text-[#1E2638]"
                : "text-[#AABCAF] hover:text-[#F4F7F6]"
            }`}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Main Content: Table or Cards Grid */}
      {filteredDoctors.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.07] bg-[#323D59] p-12 text-center">
          <Users className="mx-auto h-12 w-12 text-[#AABCAF]/50 mb-3" />
          <h3 className="text-sm font-bold text-[#F4F7F6]">
            لم يتم العثور على أية نتائج
          </h3>
          <p className="mt-1 text-xs text-[#AABCAF]">
            جرب تعديل كلمات البحث أو تصفية الأقسام لعرض النتائج.
          </p>
        </div>
      ) : viewMode === "table" ? (
        /* DATA TABLE VIEW */
        <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#323D59] shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="border-b border-white/[0.07] bg-[#242D42]/60 text-[11px] font-bold text-[#AABCAF]">
                <tr>
                  <th className="px-6 py-4">عضو هيئة التدريس</th>
                  <th className="px-6 py-4">القسم</th>
                  <th className="px-6 py-4">معلومات الاتصال</th>
                  <th className="px-6 py-4">المواد المسندة</th>
                  <th className="px-6 py-4 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {filteredDoctors.map((doc) => {
                  const docCourses = getDoctorCourses(doc);
                  return (
                    <tr
                      key={doc.id}
                      className="transition-colors hover:bg-white/[0.02]"
                    >
                      {/* Doctor Avatar & Name */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3.5">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-[#7DA49F]/30 to-[#9DBFB8]/20 text-xs font-black text-[#7DA49F] border border-[#7DA49F]/30 shadow-inner">
                            {doc.name.replace("د. ", "").charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-[#F4F7F6]">
                              {doc.name}
                            </div>
                            <div className="text-[11px] font-medium text-[#7DA49F]">
                              {doc.academicTitle}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Department */}
                      <td className="px-6 py-4">
                        <span className="rounded-lg bg-[#242D42] px-2.5 py-1 text-[11px] font-bold text-[#AABCAF] border border-white/[0.06]">
                          {doc.department}
                        </span>
                      </td>

                      {/* Contact Info */}
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 font-['JetBrains_Mono'] text-[11px] text-[#AABCAF]">
                            <Mail className="h-3 w-3 text-[#7DA49F]" />
                            <a
                              href={`mailto:${doc.email}`}
                              className="hover:text-[#F4F7F6] transition-colors"
                            >
                              {doc.email}
                            </a>
                          </div>
                          <div
                            className="flex items-center gap-1.5 font-['JetBrains_Mono'] text-[11px] text-[#7A8A9B]"
                            dir="ltr"
                          >
                            <Phone className="h-3 w-3 text-[#7DA49F]" />
                            <span>{doc.phone}</span>
                          </div>
                        </div>
                      </td>

                      {/* Assigned Courses */}
                      <td className="px-6 py-4">
                        <div>
                          <span className="inline-flex items-center gap-1 rounded-md bg-[#7DA49F]/15 px-2 py-0.5 text-[10px] font-bold text-[#7DA49F] border border-[#7DA49F]/25 mb-1.5">
                            <BookOpen className="h-3 w-3" />
                            <span>{docCourses.length} مواد</span>
                          </span>

                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {docCourses.map((c) => (
                              <span
                                key={c.id}
                                className="rounded bg-[#242D42] px-1.5 py-0.5 text-[10px] text-[#AABCAF] border border-white/[0.06]"
                              >
                                {c.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      </td>

                      {/* Action Buttons */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-1.5">
                          {/* Assign to Course Button */}
                          <button
                            type="button"
                            title="ربط بمادة دراسية"
                            onClick={() => {
                              setDoctorToAssign(doc);
                              setIsAssignModalOpen(true);
                            }}
                            className="flex items-center gap-1 rounded-lg border border-[#7DA49F]/30 bg-[#7DA49F]/10 px-2.5 py-1.5 text-[11px] font-bold text-[#7DA49F] transition-all hover:bg-[#7DA49F]/25 hover:border-[#7DA49F]/50 active:scale-95 cursor-pointer"
                          >
                            <Link className="h-3 w-3" />
                            <span>ربط بمادة</span>
                          </button>

                          {/* Edit Button */}
                          <button
                            type="button"
                            title="تعديل"
                            onClick={() => {
                              setDoctorToEdit(doc);
                              setIsFormModalOpen(true);
                            }}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-[#242D42] text-[#AABCAF] transition-colors hover:bg-white/[0.08] hover:text-[#F4F7F6] cursor-pointer"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                          </button>

                          {/* Delete Button */}
                          <button
                            type="button"
                            title="حذف"
                            onClick={() => setDoctorToDelete(doc)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 transition-colors hover:bg-red-500/20 cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* CARDS GRID VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDoctors.map((doc) => {
            const docCourses = getDoctorCourses(doc);
            return (
              <div
                key={doc.id}
                className="group flex flex-col justify-between rounded-2xl border border-white/[0.07] bg-[#323D59] p-5 shadow-lg transition-all duration-300 hover:border-white/[0.15] hover:shadow-xl hover:bg-[#3B4868]"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#7DA49F]/30 to-[#9DBFB8]/20 text-sm font-black text-[#7DA49F] border border-[#7DA49F]/30 shadow-inner">
                        {doc.name.replace("د. ", "").charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-[#F4F7F6]">
                          {doc.name}
                        </h3>
                        <p className="text-xs font-semibold text-[#7DA49F]">
                          {doc.academicTitle}
                        </p>
                      </div>
                    </div>

                    <span className="rounded-md bg-[#242D42] px-2 py-0.5 text-[10px] font-bold text-[#AABCAF] border border-white/[0.06]">
                      {doc.department}
                    </span>
                  </div>

                  {/* Bio snippet */}
                  {doc.bio && (
                    <p className="mt-3 text-xs text-[#AABCAF] leading-relaxed line-clamp-2">
                      {doc.bio}
                    </p>
                  )}

                  {/* Contact Info */}
                  <div className="mt-4 space-y-1.5 border-t border-white/[0.06] pt-3 text-[11px] font-['JetBrains_Mono']">
                    <div className="flex items-center gap-2 text-[#AABCAF]">
                      <Mail className="h-3 w-3 text-[#7DA49F]" />
                      <span className="truncate">{doc.email}</span>
                    </div>
                    <div
                      className="flex items-center gap-2 text-[#7A8A9B]"
                      dir="ltr"
                    >
                      <Phone className="h-3 w-3 text-[#7DA49F]" />
                      <span>{doc.phone}</span>
                    </div>
                  </div>

                  {/* Assigned Courses */}
                  <div className="mt-4 border-t border-white/[0.06] pt-3">
                    <div className="flex items-center justify-between text-xs font-bold text-[#AABCAF] mb-2">
                      <span>المواد المسندة ({docCourses.length}):</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {docCourses.length > 0 ? (
                        docCourses.map((c) => (
                          <span
                            key={c.id}
                            className="rounded-lg bg-[#242D42] px-2 py-0.5 text-[10px] font-bold text-[#F4F7F6] border border-white/[0.06]"
                          >
                            {c.name}
                          </span>
                        ))
                      ) : (
                        <span className="text-[11px] text-[#7A8A9B]">
                          لا توجد مواد مسندة
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Actions Bar */}
                <div className="mt-5 flex items-center justify-between gap-2 border-t border-white/[0.06] pt-3.5">
                  <button
                    type="button"
                    onClick={() => {
                      setDoctorToAssign(doc);
                      setIsAssignModalOpen(true);
                    }}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-[#7DA49F]/30 bg-[#7DA49F]/10 py-1.5 text-xs font-bold text-[#7DA49F] hover:bg-[#7DA49F]/20 transition-colors cursor-pointer"
                  >
                    <Link className="h-3.5 w-3.5" />
                    <span>ربط بمادة</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setDoctorToEdit(doc);
                      setIsFormModalOpen(true);
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/[0.08] bg-[#242D42] text-[#AABCAF] hover:text-[#F4F7F6] transition-colors cursor-pointer"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setDoctorToDelete(doc)}
                    className="flex h-8 w-8 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Doctor Modal */}
      <DoctorFormModal
        isOpen={isFormModalOpen}
        doctorToEdit={doctorToEdit}
        onClose={() => {
          setIsFormModalOpen(false);
          setDoctorToEdit(null);
        }}
        onSave={(savedDoc) => {
          if (doctorToEdit) {
            onEditDoctor(savedDoc);
            showToast(`تم حفظ تعديلات بيانات ${savedDoc.name} بنجاح`);
          } else {
            onAddDoctor(savedDoc);
            showToast(`تمت إضافة ${savedDoc.name} بنجاح`);
          }
        }}
      />

      {/* Assign Doctor to Course Modal */}
      <AssignCourseModal
        isOpen={isAssignModalOpen}
        doctor={doctorToAssign}
        courses={courses}
        onClose={() => {
          setIsAssignModalOpen(false);
          setDoctorToAssign(null);
        }}
        onAssign={(docId, courseId) => {
          onAssignCourse(docId, courseId);
          const course = courses.find((c) => c.id === courseId);
          showToast(`تم ربط المادة (${course?.name}) بالدكتور بنجاح`);
        }}
        onUnassign={(docId, courseId) => {
          onUnassignCourse(docId, courseId);
          showToast("تم إلغاء ربط المادة بنجاح");
        }}
      />

      {/* Delete Confirmation Modal */}
      {doctorToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-fadeIn"
          onClick={(e) => e.target === e.currentTarget && setDoctorToDelete(null)}
          dir="rtl"
        >
          <div className="w-full max-w-sm rounded-2xl border border-red-500/30 bg-[#323D59] p-6 text-center shadow-2xl backdrop-blur-2xl">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/15 text-red-400 border border-red-500/25">
              <Trash2 className="h-7 w-7" />
            </div>
            <h2 className="font-['Outfit'] text-lg font-bold text-[#F4F7F6]">
              تأكيد حذف الدكتور
            </h2>
            <p className="mt-2 text-xs text-[#AABCAF] leading-relaxed">
              هل أنت متأكد من حذف عضو هيئة التدريس{" "}
              <strong className="text-[#F4F7F6] font-bold">
                "{doctorToDelete.name}"
              </strong>
              ؟ سيتم فك ارتباطه من جميع المقررات المرتبطة به.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setDoctorToDelete(null)}
                className="flex-1 rounded-xl border border-white/[0.08] bg-[#242D42] py-2.5 text-xs font-bold text-[#AABCAF] transition-colors hover:bg-white/[0.05] hover:text-[#F4F7F6] cursor-pointer"
              >
                إلغاء
              </button>
              <button
                type="button"
                onClick={() => {
                  onDeleteDoctor(doctorToDelete.id);
                  showToast(`تم حذف ${doctorToDelete.name}`);
                  setDoctorToDelete(null);
                }}
                className="flex-1 rounded-xl bg-red-500 py-2.5 text-xs font-black text-white shadow-md transition-all hover:bg-red-600 active:scale-95 cursor-pointer"
              >
                نعم، احذف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
