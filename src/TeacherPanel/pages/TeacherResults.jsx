import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import "../style/TeacherResults.css";
import LoadingSpinner from "../../components/LoadingSpinner.jsx";
// تسجيل المكونات المطلوبة لـ Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function TeacherResults() {
  const [selectedClass, setSelectedClass] = useState("all");
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
          throw new Error(data.message || "تعذر تحميل نتائج الطلاب");
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

  const grades = [
    { id: "7", name: "السابع" },
    { id: "8", name: "الثامن" },
    { id: "9", name: "التاسع" },
  ];

  const round = (value) => Math.round(value * 10) / 10;

  const studentResults = students.map((student) => {
    const categories = student.categoriesProgress ?? [];
    const openCategories = categories.filter((category) => category.isOpen === true);

    const score =
      openCategories.length === 0
        ? 0
        : openCategories.reduce((sum, category) => sum + (category.percentage ?? 0), 0) / openCategories.length;

    const gradeName = student.className?.trim().split(/\s+/)[0];
    const grade = grades.find((item) => item.name === gradeName);

    return {
      id: student._id,
      name: student.user?.name ?? "—",
      className: student.className,
      classId: grade?.id,
      score,
      openCount: openCategories.length,
      completedActivities: categories.filter((category) => category.finished === true).length,
      totalActivities: 5,
      status: openCategories.length === 0 ? "لم يبدأ" : score >= 80 ? "ممتاز" : score >= 70 ? "جيد" : "يحتاج إلى تحسين",
    };
  });

  const summarize = (rows) => {
    const totalFinished = rows.reduce((sum, student) => sum + student.completedActivities, 0);

    return {
      studentCount: rows.length,
      averageScore: rows.length === 0 ? 0 : round(rows.reduce((sum, student) => sum + student.score, 0) / rows.length),
      completion: rows.length === 0 ? 0 : round((totalFinished / (rows.length * 5)) * 100),
    };
  };

  const gradeResults = grades.map((grade) => ({
    ...grade,
    ...summarize(studentResults.filter((student) => student.classId === grade.id)),
  }));

  const visibleGrades = selectedClass === "all" ? gradeResults : gradeResults.filter((grade) => grade.id === selectedClass);

  const filteredStudents = studentResults.filter(
    (student) => student.classId && (selectedClass === "all" || student.classId === selectedClass),
  );

  const summary = summarize(filteredStudents);
  const unavailable = loading || Boolean(error);

  const chartData = {
    labels: visibleGrades.map((grade) => `الصف ${grade.name}`),
    datasets: [
      {
        label: "إكمال الأنشطة (%)",
        data: visibleGrades.map((grade) => grade.completion),
        backgroundColor: "#38bdf8",
        borderRadius: 8,
      },
      {
        label: "متوسط الدرجات (%)",
        data: visibleGrades.map((grade) => grade.averageScore),
        backgroundColor: "#22c55e",
        borderRadius: 8,
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#cbd5e1",
          font: { family: "system-ui", size: 13 },
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        rtl: true,
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          color: "#94a3b8",
          callback: (value) => `${value}%`,
        },
        grid: {
          color: "rgba(255, 255, 255, 0.05)",
        },
      },
      x: {
        ticks: {
          color: "#cbd5e1",
          font: { size: 14 },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="teacher-results-container" dir="rtl">
      {/* 1. الشريط العلوي */}
      <div className="results-header-banner">
        <h2>نتائج وتقارير الطلاب 📊</h2>
        <p>متابعة تحليلية لمستوى تقدم الطلاب والصفوف في الأنشطة والتقييمات الرقمية.</p>
      </div>

      {/* 2. كروت الإحصائيات السريعة */}
      <div className="results-stats-grid">
        <div className="results-stat-card">
          <span className="stat-icon">📈</span>
          <div>
            <h3>متوسط الدرجات العام</h3>
            <p className="stat-number">{unavailable ? "—" : `${summary.averageScore}%`}</p>{" "}
          </div>
        </div>
        <div className="results-stat-card">
          <span className="stat-icon">✅</span>
          <div>
            <h3>نسبة إكمال الأنشطة</h3>
            <p className="stat-number">{unavailable ? "—" : `${summary.completion}%`}</p>{" "}
          </div>
        </div>
        <div className="results-stat-card">
          <span className="stat-icon">🏆</span>
          <div>
            <h3>إجمالي الطلاب</h3>
            <p className="stat-number">{unavailable ? "—" : summary.studentCount}</p>
          </div>
        </div>
      </div>

      {/* 3. كرت الرسم البياني (تقدم الصف) */}
      <div className="chart-card">
        <div className="chart-card-header">
          <div className="chart-title">
            <span className="chart-icon">📊</span>
            <h3>تَقدّم الصف</h3>
          </div>
          <select className="class-select-dropdown" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
            <option value="all">جميع الصفوف</option>
            <option value="7">الصف السابع</option>
            <option value="8">الصف الثامن</option>
            <option value="9">الصف التاسع</option>
          </select>
        </div>
        <div className="chart-wrapper">
          {loading ? (
            <LoadingSpinner label="جارٍ تحميل النتائج" />
          ) : error ? (
            <p role="alert">{error}</p>
          ) : filteredStudents.length === 0 ? (
            <p>لا يوجد طلاب في الصفوف المحددة.</p>
          ) : (
            <Bar data={chartData} options={chartOptions} />
          )}
        </div>
      </div>

      {/* 4. جدول النتائج التفصيلية للطلاب */}
      <div className="results-table-card">
        <div className="table-header-title">
          <h3>سجل درجات الطلاب التفصيلي</h3>
        </div>
        <table className="results-table">
          <thead>
            <tr>
              <th>اسم الطالب</th>
              <th>الصف الدراسي</th>
              <th>الأنشطة المكتملة</th>
              <th>النسبة المئوية</th>
              <th>التقييم العام</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5}>
                  <LoadingSpinner label="جارٍ تحميل النتائج" />
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={5}>تعذر تحميل النتائج. أعد تحميل الصفحة للمحاولة مجددًا.</td>
              </tr>
            ) : filteredStudents.length === 0 ? (
              <tr>
                <td colSpan={5}>لا يوجد طلاب في الصفوف المحددة.</td>
              </tr>
            ) : (
              filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td className="student-name">{student.name}</td>

                  <td>
                    <span className="class-badge">{student.className}</span>
                  </td>

                  <td>
                    {student.completedActivities} / {student.totalActivities}
                  </td>

                  <td className="score-cell">{round(student.score)}%</td>

                  <td>
                    <span
                      className={`status-pill ${
                        student.openCount === 0 ? "" : student.score >= 80 ? "high" : student.score >= 70 ? "medium" : "low"
                      }`}>
                      {student.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
