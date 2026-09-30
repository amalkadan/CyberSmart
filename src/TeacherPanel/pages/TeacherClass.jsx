import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import "../style/TeacherClasses.css";
import LoadingSpinner from "../../components/LoadingSpinner";

const classrooms = ["السابع ا", "السابع ب", "السابع ج", "الثامن ا", "الثامن ب", "الثامن ج", "التاسع ا", "التاسع ب", "التاسع ج"];

export default function TeacherClasses() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

        setStudents(data.students);
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err.message);
          toast.error(err.message);
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

  const populatedClasses = classrooms
    .map((className) => ({
      className,
      studentCount: students.filter((student) => student.className?.trim() === className).length,
    }))
    .filter((classroom) => classroom.studentCount > 0);

  return (
    <div className="teacher-classes-container" dir="rtl">
      <div className="classes-header">
        <div className="classes-header-text">
          <h1>صفوفنا وطلابنا 🏫</h1>
          <p>كل صف بداية جديدة — اختر صفًا لمتابعة طلابه وتقدّمهم.</p>
        </div>

        <Link className="add-class-btn" to="/teacher/student-status">
          عرض جميع الطلاب
          <span aria-hidden="true">←</span>
        </Link>
      </div>

      {error && <p role="alert">{error}</p>}

      <div className="classes-grid">
        {loading ? (
          <LoadingSpinner label="جارٍ تحميل الصفوف" />
        ) : error ? null : populatedClasses.length === 0 ? (
          <p>لا توجد صفوف تحتوي على طلاب حاليًا.</p>
        ) : (
          populatedClasses.map(({ className, studentCount }) => (
            <Link
              key={className}
              c
              className="class-card"
              to={`/teacher/student-status?className=${encodeURIComponent(className)}`}
              style={{ textDecoration: "none", color: "inherit" }}>
              <div className="class-card-header">
                <span className="class-tag">{className.split(" ")[0]}</span>
              </div>

              <h2 className="class-title">الصف {className}</h2>

              <div className="class-info">
                <span>👥 {studentCount} طالب</span>
              </div>

              <span className="view-students-btn">عرض الطلاب ←</span>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
