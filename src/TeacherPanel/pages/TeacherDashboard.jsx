import { useEffect, useState } from "react";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import {
  FaUsers,
  FaCheckCircle,
  FaChartLine,
  FaExclamationTriangle,
} from "react-icons/fa";

import Header from "../layouts/Header.jsx";
import "../style/TeacherDashboard.css";

export default function TeacherDashboard() {
  const teacher = useRouteLoaderData("teacher");
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchStudents() {
      try {
        const port = import.meta.env.VITE_PORT;

        const response = await fetch(
          `http://localhost:${port}/students`,
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
            signal: controller.signal,
          },
        );

        if (response.status === 401) {
          navigate("/", { replace: true });
          return;
        }

        if (response.status === 403) {
          throw new Error("ليس لديك صلاحية لعرض الطلاب");
        }

        if (!response.ok) {
          throw new Error("تعذر تحميل بيانات الطلاب");
        }

        const data = await response.json();

        if (!Array.isArray(data.students)) {
          throw new Error("بيانات الطلاب غير صالحة");
        }

        if (!controller.signal.aborted) {
          setStudents(data.students);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err.message || "تعذر الاتصال بالخادم");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchStudents();

    return () => controller.abort();
  }, [navigate]);

  const classCount = new Set(
    students.map((student) => student.className).filter(Boolean),
  ).size;

  const categoryEntries = students.flatMap(
    (student) => student.categoriesProgress ?? [],
  );

  const completedCategories = categoryEntries.filter(
    (category) => category.finished,
  ).length;

  const completionPercentage = categoryEntries.length
    ? Math.round(
        (completedCategories / categoryEntries.length) * 100,
      )
    : null;

  const averagePoints = students.length
    ? Math.round(
        students.reduce(
          (total, student) => total + (student.points ?? 0),
          0,
        ) / students.length,
      )
    : null;

  return (
    <div className="dashboard-page" dir="rtl">
      <Header teacher={teacher} />

      {loading ? (
        <p role="status">جارٍ تحميل بيانات الطلاب...</p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : (
        <>
          {students.length === 0 && (
            <p>لا يوجد طلاب مسجلون حتى الآن.</p>
          )}

          <div className="stats-grid">
            <div className="stat-card blue-card">
              <div className="card-header">
                <span className="card-title">إجمالي الطلاب</span>
                <div className="card-icon blue-icon">
                  <FaUsers />
                </div>
              </div>

              <div className="card-value">{students.length}</div>
              <div className="card-subtitle">
                عدد الصفوف: {classCount}
              </div>
            </div>

            <div className="stat-card green-card">
              <div className="card-header">
                <span className="card-title">الفئات المكتملة</span>
                <div className="card-icon green-icon">
                  <FaCheckCircle />
                </div>
              </div>

              <div className="card-value">
                {completionPercentage === null
                  ? "—"
                  : `${completionPercentage}%`}
              </div>

              <div className="card-subtitle">
                {completedCategories} من {categoryEntries.length}
                {" "}سجل فئة لدى الطلاب
              </div>
            </div>

            <div className="stat-card lightblue-card">
              <div className="card-header">
                <span className="card-title">متوسط النقاط</span>
                <div className="card-icon lightblue-icon">
                  <FaChartLine />
                </div>
              </div>

              <div className="card-value">
                {averagePoints ?? "-"}
              </div>

              <div className="card-subtitle">
                متوسط النقاط لجميع الطلاب
              </div>
            </div>

            <div className="stat-card orange-card">
              <div className="card-header">
                <span className="card-title">
                  طلاب يحتاجون متابعة
                </span>
                <div className="card-icon orange-icon">
                  <FaExclamationTriangle />
                </div>
              </div>

              <div className="card-value orange-text">—</div>
              <div className="card-subtitle">
                لم يتم تحديد معيار المتابعة بعد
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}