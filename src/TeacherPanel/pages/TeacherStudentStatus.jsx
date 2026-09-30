import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import "../style/TeacherStudentStatus.css"; // تأكدي من إنشاء أو ربط ملف CSS هذا
import LoadingSpinner from "../../components/LoadingSpinner.jsx";

export default function TeacherStudentStatus() {
  const classesList = ["السابع ا", "السابع ب", "السابع ج", "الثامن ا", "الثامن ب", "الثامن ج", "التاسع ا", "التاسع ب", "التاسع ج"].map(
    (name) => ({ id: name, name }),
  );

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const requestedClass = searchParams.get("className");

  const selectedClassFilter = classesList.some((cls) => cls.id === requestedClass) ? requestedClass : "all";

  const setSelectedClassFilter = (className) => {
    setSearchParams((current) => {
      const next = new URLSearchParams(current);

      if (className === "all") {
        next.delete("className");
      } else {
        next.set("className", className);
      }

      return next;
    });
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentEmail, setNewStudentEmail] = useState("");
  const [newStudentClassId, setNewStudentClassId] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadStudents() {
      try {
        const response = await fetch("http://localhost:4000/students", {
          credentials: "include",
          signal: controller.signal,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "تعذر تحميل الطلاب");
        }

        setStudents(
          data.students.map((student) => ({
            id: student._id,
            name: student.user?.name ?? "",
            email: student.user?.email ?? "",
            classId: student.className,
            className: student.className,
          })),
        );
      } catch (error) {
        if (!controller.signal.aborted) {
          setLoadError(error.message);
          toast.error(error.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadStudents();

    return () => controller.abort();
  }, []);

  const handleAddStudent = async (e) => {
    e.preventDefault();

    if (saving) return;

    if (!newStudentName.trim() || !newStudentEmail.trim() || !newStudentClassId) {
      toast.error("يرجى إدخال الاسم والصف والبريد الإلكتروني");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch("http://localhost:4000/teachers/students", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newStudentName.trim(),
          email: newStudentEmail.trim(),
          className: newStudentClassId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "تعذر إضافة الطالب");
      }

      const addedStudent = {
        id: data.student._id,
        name: data.user.name,
        email: data.user.email,
        classId: data.student.className,
        className: data.student.className,
      };

      setStudents((current) => [...current, addedStudent]);

      // Make the new student visible even if a filter was active.
      setSearchQuery("");
      setSelectedClassFilter("all");

      setNewStudentName("");
      setNewStudentEmail("");
      setNewStudentClassId("");
      setIsModalOpen(false);

      toast.success("تمت إضافة الطالب بنجاح");
    } catch (error) {
      toast.error(error.message || "تعذر الاتصال بالخادم");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteStudent = async (studentId) => {
    if (deletingId) return;

    setDeletingId(studentId);

    try {
      const response = await fetch(`http://localhost:4000/teachers/students/${studentId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "تعذر حذف الطالب");
      }

      setStudents((current) => current.filter((student) => student.id !== studentId));

      toast.success("تم حذف الطالب بنجاح");
    } catch (error) {
      toast.error(error.message || "تعذر الاتصال بالخادم");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredStudents = students.filter((student) => {
    const query = searchQuery.trim().toLowerCase();

    const matchesSearch = student.name.toLowerCase().includes(query) || student.email.toLowerCase().includes(query);

    const matchesClass = selectedClassFilter === "all" || student.classId === selectedClassFilter;

    return matchesSearch && matchesClass;
  });

  return (
    <div className="teacher-students-container" dir="rtl">
      {/* 1. الشريط العلوي (الهيدر) */}
      <div className="students-header-banner">
        <h2>إدارة الطلاب 👨‍🎓</h2>
        <p>يمكنك من هنا إضافة الطلاب، وتحديد صفوفهم، ومتابعة حركات انضمامهم للمنصة.</p>
        <button className="add-student-btn" onClick={() => setIsModalOpen(true)}>
          + إضافة طالب جديد
        </button>
      </div>

      {/* 3. أدوات البحث والفلترة */}
      <div className="controls-bar">
        <div className="search-box">
          <input type="text" placeholder="🔍 ابحث عن اسم الطالب..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>

        <div className="filter-box">
          <select value={selectedClassFilter} onChange={(e) => setSelectedClassFilter(e.target.value)}>
            <option value="all">جميع الصفوف</option>

            {classesList.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 4. جدول عرض الطلاب */}
      <div className="students-table-card">
        <table className="students-table">
          <thead>
            <tr>
              <th>اسم الطالب</th>
              <th>الصف الدراسي</th>
              <th>البريد الإلكتروني / الرمز</th>
              <th>الحالة</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <td colSpan={4}>
                <LoadingSpinner label="جارٍ تحميل الطلاب" />
              </td>
            ) : loadError ? (
              <tr>
                <td colSpan={4} role="alert">
                  {loadError} — أعد تحميل الصفحة للمحاولة مجددًا.
                </td>
              </tr>
            ) : filteredStudents.length === 0 ? (
              <tr>
                <td colSpan={4} className="no-data">
                  لا يوجد طلاب يطابقون خيارات البحث.
                </td>
              </tr>
            ) : (
              filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td className="student-name-td">{student.name}</td>
                  <td>
                    <span className="class-badge">{student.className}</span>
                  </td>
                  <td>{student.email}</td>
                  <td>
                    <button
                      type="button"
                      className="delete-btn"
                      disabled={deletingId !== null}
                      onClick={() => handleDeleteStudent(student.id)}>
                      {deletingId === student.id ? "جارٍ الحذف..." : "حذف"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 5. نافذة إضافة طالب جديد (Modal) */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="student-modal-card">
            <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
              ✕
            </button>

            <div className="modal-header">
              <div className="modal-icon">👤</div>
              <h2>إضافة طالب جديد</h2>
            </div>
            <p className="modal-subtitle">أدخل معلومات الطالب لتخصيصه لصف دراسي محدد.</p>

            <form onSubmit={handleAddStudent} className="student-form">
              <div className="form-group">
                <label>اسم الطالب الرباعي</label>
                <input
                  type="text"
                  placeholder="مثال: أحمد محمود علي"
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>الصف الدراسي</label>
                <select value={newStudentClassId} onChange={(e) => setNewStudentClassId(e.target.value)} required>
                  <option value="" disabled>
                    اختر الصف الذي ينتمي إليه الطالب
                  </option>
                  {classesList.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>البريد الإلكتروني</label>
                <input
                  type="email"
                  placeholder="student@example.com"
                  value={newStudentEmail}
                  onChange={(e) => setNewStudentEmail(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="submit-student-btn" disabled={saving}>
                {saving ? "جارٍ الحفظ..." : "حفظ وإضافة الطالب"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
