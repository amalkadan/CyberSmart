// تعديل 3
import { useEffect, useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import "../style/TeacherActivities.css";

import { toast } from "sonner";
// استيراد الصور
import heroImg from "../img/hero-shield.jpg";
import phishingImg from "../img/phishing-card.jpg";
import passwordImg from "../img/password-card.jpg";
import decisionImg from "../img/decision-card.png";
import monopolyImg from "../img/monopoly-card.jpeg";
import unoImg from "../img/Uno_Cyber.jpeg"; // صورة لعبة UNO السيبرانية

export default function TeacherActivities() {
  const navigate = useNavigate();

  // حالات نافذة التعيين (Modal)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [loading, setLoading] = useState(false);

  const classrooms = ["السابع ا", "السابع ب", "السابع ج", "الثامن ا", "الثامن ب", "الثامن ج", "التاسع ا", "التاسع ب", "التاسع ج"];

  const categoryOptions = [
    { label: "رسائل التصيد", value: "رسائل التصيد" },
    { label: "كلمات المرور", value: "كلمات المرور" },
    { label: "الاختبار الامن", value: "الاختبار الامن" },
    { label: "اونو سايبر", value: "اونو سايبر" },
    { label: "مونوبولي", value: "مونوبولي" },
  ];

  const staticActivities = [
    { id: "phishing", title: "اكتشف التصيّد", path: "/teacher/activities/phishing", imgSrc: phishingImg },
    { id: "password", title: "اختبر كلمة المرور", path: "/teacher/activities/password", imgSrc: passwordImg },
    { id: "decision", title: "اختر القرار الآمن", path: "/teacher/activities/decision", imgSrc: decisionImg },
    { id: "monopoly", title: "Monopoly", path: "/teacher/activities/monopoly", imgSrc: monopolyImg },
    { id: "uno", title: "UNO Cyber", path: "/teacher/activities/uno", imgSrc: unoImg },
  ];

  const [students, setStudents] = useState([]);
  const [loadingAssignments, setLoadingAssignments] = useState(true);
  const [assignmentsError, setAssignmentsError] = useState("");
  const [refreshAssignments, setRefreshAssignments] = useState(0);
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const controller = new AbortController();

    async function loadAssignments() {
      setLoadingAssignments(true);
      setAssignmentsError("");

      try {
        const response = await fetch("http://localhost:4000/students", {
          credentials: "include",
          signal: controller.signal,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "تعذر تحميل الأنشطة المفتوحة");
        }

        setStudents(data.students);
      } catch (error) {
        if (!controller.signal.aborted) {
          setAssignmentsError(error.message);
          toast.error(error.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoadingAssignments(false);
        }
      }
    }

    loadAssignments();

    return () => controller.abort();
  }, [refreshAssignments]);

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(timer);
  }, []);

  // فتح نافذة التعيين
  const handleOpenAssignModal = (activityId = "") => {
    setSelectedActivity(activityId);
    setIsModalOpen(true);
  };

  // دالة تعيين النشاط وفتحه للطلاب في الـ Backend
  const handleAssignSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!selectedClass || !selectedActivity || !dueDate) {
      toast.error("يرجى اختيار الصف والنشاط وتاريخ التسليم.");
      return;
    }

    // Deadline: end of the selected day in the teacher's browser timezone.
    const deadline = new Date(`${dueDate}T23:59:59.999`);

    if (Number.isNaN(deadline.getTime())) {
      toast.error("يرجى اختيار تاريخ صحيح.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:4000/teachers/classes/categories/open", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          className: selectedClass,
          category: selectedActivity,
          dueDate: deadline.toISOString(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "حدث خطأ أثناء تعيين النشاط.");
      }

      toast.success(`تم تعيين النشاط بنجاح لـ ${data.matchedCount} طالبًا.`);
      setRefreshAssignments((value) => value + 1);

      setIsModalOpen(false);
      setSelectedActivity("");
      setSelectedClass("");
      setDueDate("");
    } catch (error) {
      toast.error(error.message || "تعذر الاتصال بالخادم.");
    } finally {
      setLoading(false);
    }
  };

  const categoryByActivity = {
    phishing: "رسائل التصيد",
    password: "كلمات المرور",
    decision: "الاختبار الامن",
    uno: "اونو سايبر",
    monopoly: "مونوبولي",
  };

  const assignmentGroups = new Map();

  students.forEach((student) => {
    const className = student.className?.trim();
    if (!className) return;

    (student.categoriesProgress ?? []).forEach((category) => {
      if (category.isOpen !== true) return;

      if (!category.dueDate) return;

      const deadline = new Date(category.dueDate).getTime();
      if (!Number.isFinite(deadline)) return;

      const key = JSON.stringify([category.category, className, deadline]);

      if (!assignmentGroups.has(key)) {
        assignmentGroups.set(key, {
          key,
          category: category.category,
          className,
          deadline,
          studentIds: new Set(),
        });
      }

      assignmentGroups.get(key).studentIds.add(student._id);
    });
  });

  const assignments = [...assignmentGroups.values()].sort(
    (a, b) => a.className.localeCompare(b.className, "ar") || a.deadline - b.deadline,
  );

  const dateFormatter = new Intl.DateTimeFormat("ar", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="activities-container" dir="rtl">
      {/* البنر العلوي */}
      <div className="hero-banner">
        <div className="hero-content">
          <div className="hero-text">
            <h1>كن ذكيًا على الإنترنت</h1>
            <p>تعلم كيف تحمي نفسك والعالم الرقمي من حولك</p>
          </div>
          <button className="hero-btn" onClick={() => handleOpenAssignModal()}>
            + تعيين نشاط جديد
          </button>
        </div>
        <div className="hero-image-wrapper">
          <img src={heroImg} alt="شخصية حماية الإنترنت" className="hero-mascot-img" />
        </div>
      </div>

      {/* شبكة بطاقات الألعاب - بدون شارات القفل للمعلم */}
      <div className="activities-cards-grid">
        {staticActivities.map((activity) => {
          const rows = assignments.filter((assignment) => assignment.category === categoryByActivity[activity.id]);

          return (
            <section className="activity-assignment-card" key={activity.id}>
              <button
                type="button"
                className="image-card-btn activity-preview"
                onClick={() => navigate(activity.path)}
                aria-label={`معاينة ${activity.title}`}>
                <img src={activity.imgSrc} alt="" className="card-full-image" />

                <span className="card-overlay">
                  <span className="card-title">{activity.title}</span>
                  <span className="card-action">
                    <span>معاينة اللعبة</span>
                    <span aria-hidden="true">←</span>
                  </span>
                </span>
              </button>

              <div className="activity-assignments">
                <h3>الصفوف التي فُتح لها النشاط</h3>

                {loadingAssignments ? (
                  <LoadingSpinner />
                ) : assignmentsError ? (
                  <p role="alert">تعذر تحميل بيانات التعيين.</p>
                ) : rows.length === 0 ? (
                  <p className="assignment-empty">لم يُفتح هذا النشاط لأي طالب بعد.</p>
                ) : (
                  <ul className="assignment-list">
                    {rows.map((row) => {
                      const expired = row.deadline <= now;
                      const state = expired ? "past" : "upcoming";

                      const statusLabel = expired ? "مرّ الموعد — التسليم متاح" : "لم يحن موعد التسليم";

                      return (
                        <li className="assignment-row" key={row.key}>
                          <span className={`assignment-dot ${state}`} aria-hidden="true" />

                          <div className="assignment-details">
                            <strong>الصف {row.className}</strong>

                            <span>مفتوح لـ {row.studentIds.size} من الطلاب</span>

                              <time dateTime={new Date(row.deadline).toISOString()}>
                                موعد التسليم: {dateFormatter.format(row.deadline)}
                              </time>
                            

                            <span className="assignment-status">{statusLabel}</span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </section>
          );
        })}
      </div>

      {/* نافذة تعيين النشاط (Modal) */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="assign-modal-card">
            <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
              ✕
            </button>

            <div className="modal-header">
              <div className="modal-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="12" y1="18" x2="12" y2="12"></line>
                  <line x1="9" y1="15" x2="15" y2="15"></line>
                </svg>
              </div>
              <h2>تعيين نشاط</h2>
            </div>
            <p className="modal-subtitle">اختر نشاطاً من أنشطة السلامة الرقمية لتعيينه وفتحه للصف.</p>

            <form onSubmit={handleAssignSubmit} className="assign-form">
              {/* اختيار الصف */}
              <div className="form-group">
                <label>الصف المستهدف</label>
                <div className="input-wrapper">
                  <span className="input-icon">🏫</span>
                  <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} required>
                    <option value="" disabled>
                      اختر الصف
                    </option>

                    {classrooms.map((className) => (
                      <option key={className} value={className}>
                        {className}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* اختيار النشاط */}
              <div className="form-group">
                <label>اختيار النشاط</label>
                <div className="input-wrapper">
                  <span className="input-icon">📖</span>
                  <select value={selectedActivity} onChange={(e) => setSelectedActivity(e.target.value)} required>
                    <option value="" disabled>
                      اختر النشاط
                    </option>

                    {categoryOptions.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* تاريخ التسليم */}
              <div className="form-group">
                <label>تاريخ التسليم</label>
                <div className="input-wrapper">
                  <span className="input-icon">📅</span>
                  <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
                </div>
              </div>

              <button type="submit" className="submit-assign-btn" disabled={loading}>
                <span>{loading ? "جاري الإرسال..." : "إرسال للصف وفتح اللعبة"}</span>
                <span className="send-icon">➤</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
