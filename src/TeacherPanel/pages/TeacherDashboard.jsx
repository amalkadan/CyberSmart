import { useState, useEffect } from "react";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import Header from "../layouts/Header.jsx"; // استدعاء الهيدر
import "../style/TeacherDashboard.css"; // ملف التنسيق الخاص بالصفحة

import {
  FaUsers,
  FaCheckCircle,
  FaChartLine,
  FaExclamationTriangle,
  FaClock,
  FaBook,
  FaBolt,
  FaPlus,
  FaUserPlus,
  FaChevronLeft,
} from "react-icons/fa";

export default function TeacherDashboard() {
  const [selectedClassFilter, setSelectedClassFilter] = useState("all");
  const navigate = useNavigate(); // 2. تهيئة هوك التنقل
  const teacher = useRouteLoaderData("teacher");

  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [studentsError, setStudentsError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadStudents() {
      try {
        const response = await fetch("http://localhost:4000/students", {
          credentials: "include",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("تعذر تحميل بيانات الطلاب");
        }

        const data = await response.json();
        setStudents(data.students);
      } catch (error) {
        if (!controller.signal.aborted) {
          setStudentsError(error.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoadingStudents(false);
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

  const chartData = grades.map((grade) => {
    const gradeStudents = students.filter((student) => {
      const firstWord = student.className?.trim().split(/\s+/)[0];
      return firstWord === grade.name;
    });

    let totalPercentage = 0;
    let totalFinished = 0;

    gradeStudents.forEach((student) => {
      const categories = student.categoriesProgress ?? [];

      const openCategories = categories.filter((category) => category.isOpen === true);

      const studentAverage =
        openCategories.length === 0
          ? 0
          : openCategories.reduce((sum, category) => sum + (category.percentage ?? 0), 0) / openCategories.length;

      totalPercentage += studentAverage;

      categories.forEach((category) => {
        if (category.finished === true) {
          totalFinished += 1;
        }
      });
    });

    const studentCount = gradeStudents.length;
    const totalCategories = studentCount * 5;

    const needsHelpCount = gradeStudents.filter((student) => {
      const openUnfinishedCount = (student.categoriesProgress ?? []).filter(
        (category) => category.isOpen === true && category.finished === false,
      ).length;

      return openUnfinishedCount >= 2;
    }).length;

    // This return belongs to grades.map().
    return {
      ...grade,
      studentCount,
      totalPercentage,
      totalFinished,
      needsHelpCount,
      averageScore: studentCount === 0 ? 0 : Math.round((totalPercentage / studentCount) * 10) / 10,
      completion: totalCategories === 0 ? 0 : Math.round((totalFinished / totalCategories) * 1000) / 10,
    };
  });

  const visibleGrades = selectedClassFilter === "all" ? chartData : chartData.filter((grade) => grade.id === selectedClassFilter);

  const selectedTotals = visibleGrades.reduce(
    (totals, grade) => ({
      studentCount: totals.studentCount + grade.studentCount,
      totalPercentage: totals.totalPercentage + grade.totalPercentage,
      totalFinished: totals.totalFinished + grade.totalFinished,
      needsHelpCount: totals.needsHelpCount + grade.needsHelpCount,
    }),
    {
      studentCount: 0,
      totalPercentage: 0,
      totalFinished: 0,
      needsHelpCount: 0,
    },
  );

  const categoryCount = selectedTotals.studentCount * 5;

  const summaryAverageScore =
    selectedTotals.studentCount === 0 ? 0 : Math.round((selectedTotals.totalPercentage / selectedTotals.studentCount) * 10) / 10;
  const summaryCompletion = categoryCount === 0 ? 0 : Math.round((selectedTotals.totalFinished / categoryCount) * 1000) / 10;

  const summaryLabel = selectedClassFilter === "all" ? "في جميع الصفوف" : `في الصف ${visibleGrades[0]?.name ?? ""}`;

  const summaryUnavailable = loadingStudents || Boolean(studentsError);
  return (
    <div className="teacher-dashboard-container" dir="rtl">
      {/* 1. الشريط العلوي */}
      <Header teacher={teacher} />
      {/* 2. قسم بطاقات الإحصائيات (Stat Cards) */}
      <div className="td-stats-grid">
        {/* بطاقة 1: إجمالي الطلاب */}
        <div className="td-stat-card td-blue-card">
          <div className="td-card-header">
            <span className="td-card-title">إجمالي الطلاب</span>
            <div className="td-card-icon td-blue-icon">
              <FaUsers />
            </div>
          </div>
          <div className="td-card-value">{summaryUnavailable ? "—" : selectedTotals.studentCount}</div>
          <div className="td-card-subtitle">{summaryLabel}</div>
        </div>

        {/* بطاقة 2: الأنشطة المكتملة */}
        <div className="td-stat-card td-green-card">
          <div className="td-card-header">
            <span className="td-card-title">الأنشطة المكتملة</span>
            <div className="td-card-icon td-green-icon">
              <FaCheckCircle />
            </div>
          </div>
          <div className="td-card-value">{summaryUnavailable ? "—" : `${summaryCompletion}%`}</div>
          <div className="td-card-subtitle">من إجمالي الأنشطة — {summaryLabel}</div>
        </div>

        {/* بطاقة 3: متوسط الدرجات */}
        <div className="td-stat-card td-lightblue-card">
          <div className="td-card-header">
            <span className="td-card-title">متوسط الدرجات</span>
            <div className="td-card-icon td-lightblue-icon">
              <FaChartLine />
            </div>
          </div>
          <div className="td-card-value">{summaryUnavailable ? "—" : `${summaryAverageScore}%`}</div>
          <div className="td-card-subtitle">{summaryLabel}</div>
        </div>

        {/* بطاقة 4: طلاب يحتاجون متابعة */}
        <div className="td-stat-card td-orange-card">
          <div className="td-card-header">
            <span className="td-card-title">طلاب يحتاجون متابعة</span>
            <div className="td-card-icon td-orange-icon">
              <FaExclamationTriangle />
            </div>
          </div>
          <div className="td-card-value">{summaryUnavailable ? "—" : selectedTotals.needsHelpCount}</div>
          <div className="td-card-subtitle">يحتاجون إلى دعم إضافي — {summaryLabel}</div>
        </div>
      </div>

      {/* 3. القسم الأوسط: تقدم الصف + آخر الأنشطة */}
      <div className="td-main-grid">
        {/* كرت تقدم الصف (الرسم البياني) */}
        <div className="td-card td-chart-card">
          <div className="td-card-header-flex">
            <div className="td-card-title-group">
              <FaChartLine className="td-section-icon" />
              <h3>تقدّم الصف</h3>
            </div>
            <select className="td-dropdown" value={selectedClassFilter} onChange={(e) => setSelectedClassFilter(e.target.value)}>
              <option value="all">جميع الصفوف</option>
              <option value="7">الصف السابع</option>
              <option value="8">الصف الثامن</option>
              <option value="9">الصف التاسع</option>
            </select>
          </div>

          {/* محاكاة الرسم البياني (Bar Chart) */}
          <div className="td-chart-container">
            <div className="td-chart-y-axis">
              <span>100%</span>
              <span>75%</span>
              <span>50%</span>
              <span>25%</span>
              <span>0%</span>
            </div>
            <div className="td-chart-bars-area">
              {loadingStudents ? (
                <p role="status">جارٍ تحميل البيانات...</p>
              ) : studentsError ? (
                <p role="alert">{studentsError}</p>
              ) : (
                visibleGrades.map((grade) => (
                  <div className="td-bar-group" key={grade.id}>
                    <div className="td-bars-pair">
                      <div className="td-bar blue-bar" style={{ height: `${grade.completion}%` }}>
                        <span className="td-bar-tooltip">{grade.completion}%</span>
                      </div>

                      <div className="td-bar green-bar" style={{ height: `${grade.averageScore}%` }}>
                        <span className="td-bar-tooltip">{grade.averageScore}%</span>
                      </div>
                    </div>

                    <span className="td-bar-label">الصف {grade.name}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* دليل الألوان (Legend) */}
          <div className="td-chart-legend">
            <div className="legend-item">
              <span className="legend-dot green-dot"></span>
              <span>متوسط الدرجات</span>
            </div>

            <div className="legend-item">
              <span className="legend-dot blue-dot"></span>
              <span>الأنشطة المكتملة</span>
            </div>
          </div>
        </div>

        {/* كرت آخر الأنشطة */}
        <div className="td-card td-activities-card">
          <div className="td-card-header-flex">
            <div className="td-card-title-group">
              <FaClock className="td-section-icon" />
              <h3>آخر الأنشطة</h3>
            </div>
          </div>

          <div className="td-activities-list">
            <div className="td-activity-item">
              <div className="activity-badge green-badge">
                <FaCheckCircle />
              </div>
              <div className="activity-info">
                <div className="activity-top">
                  <span className="activity-class">الصف التاسع</span>
                  <span className="activity-time">منذ 2 ساعة</span>
                </div>
                <p className="activity-desc">أكمل الطلاب نشاط "التصرف الآمن على الإنترنت"</p>
              </div>
            </div>

            <div className="td-activity-item">
              <div className="activity-badge blue-badge">
                <FaBook />
              </div>
              <div className="activity-info">
                <div className="activity-top">
                  <span className="activity-class">الصف الثامن</span>
                  <span className="activity-time">منذ 5 ساعات</span>
                </div>
                <p className="activity-desc">تم نشر نشاط جديد: "حماية المعلومات الشخصية"</p>
              </div>
            </div>

            <div className="td-activity-item">
              <div className="activity-badge orange-badge">
                <FaUsers />
              </div>
              <div className="activity-info">
                <div className="activity-top">
                  <span className="activity-class">الصف السابع</span>
                  <span className="activity-time">منذ 1 يوم</span>
                </div>
                <p className="activity-desc">شارك 8 طلاب في النقاش الصفي</p>
              </div>
            </div>

            <div className="td-activity-item">
              <div className="activity-badge purple-badge">
                <FaChartLine />
              </div>
              <div className="activity-info">
                <div className="activity-top">
                  <span className="activity-class">الصف التاسع ج</span>
                  <span className="activity-time">منذ 1 يوم</span>
                </div>
                <p className="activity-desc">حقق الصف نسبة إكمال 80% في وحدة "الاحترام الرقمي"</p>
              </div>
            </div>

            <div className="td-activity-item">
              <div className="activity-badge green-badge">
                <FaCheckCircle />
              </div>
              <div className="activity-info">
                <div className="activity-top">
                  <span className="activity-class">الصف الثامن</span>
                  <span className="activity-time">منذ 2 يوم</span>
                </div>
                <p className="activity-desc">أكمل الطلاب التقييم القصير</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. القسم السفلي: مواضيع التعلم النشطة + إجراءات سريعة */}
      <div className="td-bottom-grid">
        {/* مواضيع التعلم النشطة */}
        <div className="td-card td-topics-card">
          <div className="td-card-header-flex">
            <div className="td-card-title-group">
              <FaBook className="td-section-icon" />
              <h3>مواضيع التعلم النشطة</h3>
            </div>
          </div>

          <div className="td-topics-grid">
            <div className="topic-box yellow-topic">
              <span className="topic-icon">💡</span>
              <h4>التفكير النقدي</h4>
              <p>6 أنشطة</p>
            </div>

            <div className="topic-box green-topic">
              <span className="topic-icon">🛡️</span>
              <h4>حماية البيانات</h4>
              <p>8 أنشطة</p>
            </div>

            <div className="topic-box blue-topic">
              <span className="topic-icon">👥</span>
              <h4>الاحترام الرقمي</h4>
              <p>9 أنشطة</p>
            </div>

            <div className="topic-box pink-topic">
              <span className="topic-icon">🌐</span>
              <h4>الأمان على الإنترنت</h4>
              <p>12 نشاطاً</p>
            </div>
          </div>
        </div>

        {/* إجراءات سريعة (تمت إضافة التفاعلية هنا) */}
        <div className="td-card td-actions-card">
          <div className="td-card-header-flex">
            <div className="td-card-title-group">
              <FaBolt className="td-section-icon" />
              <h3>إجراءات سريعة</h3>
            </div>
          </div>

          <div className="td-quick-actions">
            {/* زر إنشاء نشاط */}
            <button
              className="action-btn blue-action"
              onClick={() => navigate("/teacher/activities")} // التوجيه لصفحة الأنشطة
            >
              <div className="action-left">
                <div className="action-icon-wrapper">
                  <FaPlus />
                </div>
                <div className="action-text">
                  <strong>إنشاء نشاط</strong>
                  <span>أضف نشاطاً جديداً لصفوفك</span>
                </div>
              </div>
              <FaChevronLeft className="action-arrow" />
            </button>

            {/* زر إضافة صف */}
            <button
              className="action-btn green-action"
              onClick={() => navigate("/teacher/class")} // التوجيه لصفحة الصفوف
            >
              <div className="action-left">
                <div className="action-icon-wrapper">
                  <FaUserPlus />
                </div>
                <div className="action-text">
                  <strong>إضافة صف</strong>
                  <span>أنشئ صفاً جديداً</span>
                </div>
              </div>
              <FaChevronLeft className="action-arrow" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
