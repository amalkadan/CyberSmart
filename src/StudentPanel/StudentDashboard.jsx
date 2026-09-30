import { useState } from "react";
import { useNavigate, useSearchParams, useRouteLoaderData } from "react-router-dom";

import {
  ShieldCheck,
  Home,
  BookOpen,
  Gamepad2,
  ClipboardList,
  BarChart3,
  Trophy,
  Mail,
  Settings,
  LogOut,
  Search,
  Bell,
  ChevronLeft,
  CalendarDays,
  Zap,
  Star,
  Lightbulb,
  LockKeyhole,
  Unlock,
  CheckCircle2,
  FileText,
} from "lucide-react";

import phishingImage from "../TeacherPanel/img/phishing-card.jpg";
import passwordImage from "../TeacherPanel/img/password-card.jpg";
import decisionImage from "../TeacherPanel/img/decision-card.png";
import monopolyImage from "../TeacherPanel/img/monopoly-card.jpeg";
import unoImage from "../TeacherPanel/img/Uno_Cyber.jpeg";
import "./StudentDashboard.css";

import lock from "../TeacherPanel/img/lock.png";

const menuItems = [
  { id: "home", label: "الرئيسية", icon: Home },
  { id: "learning", label: "مسار التعلم", icon: BookOpen },
  { id: "activities", label: "الأنشطة", icon: Gamepad2 },
  { id: "homework", label: "واجباتي", icon: ClipboardList },
  { id: "results", label: "نتائجي", icon: BarChart3 },
  { id: "achievements", label: "إنجازاتي", icon: Trophy },
  { id: "safety", label: "دليل الأمان", icon: ShieldCheck },
  { id: "messages", label: "الرسائل", icon: Mail },
  { id: "settings", label: "الإعدادات", icon: Settings },
];

const pageInformation = {
  learning: {
    title: "مسار التعلم",
    description: "تابعي الدروس والأنشطة بالتسلسل.",
    icon: BookOpen,
  },
  results: {
    title: "نتائجي",
    description: "شاهدي نتائج الاختبارات والأنشطة التي أكملتها.",
    icon: BarChart3,
  },
  achievements: {
    title: "إنجازاتي",
    description: "شاهدي الشارات والجوائز التي حصلتِ عليها.",
    icon: Trophy,
  },
  safety: {
    title: "دليل الأمان",
    description: "تعلمي أهم النصائح لحماية حساباتك وبياناتك.",
    icon: ShieldCheck,
  },
  messages: {
    title: "الرسائل",
    description: "شاهدي رسائل المعلم والتنبيهات الجديدة.",
    icon: Mail,
  },
  settings: {
    title: "الإعدادات",
    description: "عدّلي بيانات الحساب وإعدادات لوحة الطالب.",
    icon: Settings,
  },
};

// تعريف الأنشطة الأساسية ومساراتها
const activitiesList = [
  {
    id: "phishing",
    category: "رسائل التصيد",
    order: 1,
    title: "اكتشف التصيّد",
    desc: "اختبري معرفتك في اكتشاف الرسائل والمواقع الاحتيالية.",
    icon: Lightbulb,
    image: phishingImage,
    path: "/student/games/phishing",
  },
  {
    id: "password",
    category: "كلمات المرور",
    order: 2,
    title: "اختبر كلمة المرور",
    desc: "اختاري كلمة المرور الأقوى وتعرفي على طرق حماية حسابك.",
    icon: LockKeyhole,
    image: passwordImage,
    path: "/student/games/password",
  },
  {
    id: "decision",
    category: "الاختبار الامن",
    order: 3,
    title: "اختر القرار الآمن",
    desc: "اختاري التصرف الصحيح في مجموعة من المواقف الرقمية.",
    icon: CheckCircle2,
    image: decisionImage,
    path: "/student/games/decision",
  },
  {
    id: "uno",
    category: "اونو سايبر",
    order: 4,
    title: "UNO Cyber",
    desc: "لعبة تفاعلية لتعلم مفاهيم الأمان الرقمي.",
    icon: Gamepad2,
    image: unoImage,
    path: "/student/games/uno",
  },
  {
    id: "monopoly",
    category: "مونوبولي",
    order: 5,
    title: "لعبة المونوبولي",
    desc: "لعبة تفاعلية لتعلم مفاهيم الأمان الرقمي.",
    icon: Gamepad2,
    image: monopolyImage,
    path: "/student/games/monopoly",
  },
];

function StudentSectionPage({ activePage, onBackHome, categoriesProgress = [], navigate }) {
  function hasCompletedPrerequisites(activityId) {
    const activity = activitiesList.find((item) => item.id === activityId);

    if (!activity) return false;

    const categoryIndex = categoriesProgress.findIndex((item) => item.category === activity.category);

    if (categoryIndex === -1) return false;

    const isFinalGame = activityId === "uno" || activityId === "monopoly";

    // UNO and Monopoly require the first three categories.
    // Other games require the categories before them.
    const requiredCategories = categoriesProgress.slice(0, isFinalGame ? 3 : categoryIndex);

    if (isFinalGame && requiredCategories.length !== 3) {
      return false;
    }

    return requiredCategories.every((item) => item.percentage === 100 && item.finished === true);
  }

  const prerequisiteMessage = "يجب إكمال الأنشطة السابقة المطلوبة بنسبة 100% أولاً";

  if (activePage === "learning") {
    const learningSteps = [
      {
        title: "رسائل التصيد",
        description: "ليس كل رابط هدية! تعلّم كيف تكتشف الرسائل المشبوهة وتفحص الروابط قبل الضغط عليها.",
        icon: Mail,
      },
      {
        title: "كلمات المرور",
        description: "حسابك يحتاج إلى حارس قوي! اكتشف كيف تختار كلمة مرور يصعب تخمينها وتحافظ على سريتها.",
        icon: LockKeyhole,
      },
      {
        title: "الاختبار الآمن",
        description: "ماذا ستفعل في موقف رقمي محيّر؟ فكّر في الخيارات واختر القرار الذي يحميك ويحمي معلوماتك.",
        icon: ShieldCheck,
      },
      {
        title: "أونو سايبر",
        description: "حان وقت اللعب والتفكير! اتبع تعليمات اللعبة واستخدم ما تعلّمته عن الأمان الرقمي خلال التحدي.",
        icon: Gamepad2,
      },
      {
        title: "مونوبولي",
        description: "واصل المغامرة! اقرأ المواقف داخل اللعبة بعناية وجرّب مهاراتك في اتخاذ قرارات رقمية آمنة.",
        icon: Trophy,
      },
    ];

    return (
      <section className="student-inner-page learning-guide">
        <header className="learning-guide-hero">
          <div>
            <span className="learning-guide-eyebrow">خمس محطات نحو عالم رقمي أكثر أمانًا</span>

            <h1>رحلتك لتصبح بطل الأمان الرقمي!</h1>

            <p>كل تحدٍّ يعلّمك مهارة جديدة. اقرأ، جرّب، وتعلّم من أخطائك… ثم اجمع شارات إنجازك محطة بعد محطة!</p>
          </div>

          <ShieldCheck className="learning-guide-hero-icon" aria-hidden="true" />
        </header>

        <section className="learning-guide-instructions" aria-labelledby="learning-start-title">
          <h2 id="learning-start-title">كيف تبدأ المغامرة؟</h2>

          <ol>
            <li>
              <strong>ابدأ من «واجباتي».</strong> ستجد أول نشاط فتحه المعلم ولم تكمله بعد.
            </li>
            <li>
              <strong>اقرأ التعليمات وخذ وقتك.</strong> الهدف أن تفهم وتتعلم، وليس أن تنتهي بسرعة.
            </li>
            <li>
              <strong>تابع نسبة إنجازك.</strong> تظهر في بطاقة «واجباتي» لتعرف مدى تقدمك في النشاط.
            </li>
            <li>
              <strong>أكمل النشاط لتحصل على شارته.</strong> ستظهر الشارة في «شاراتي» بعد تسجيل اكتمال الفئة.
            </li>
            <li>
              <strong>استعد للمحطة التالية.</strong> انتقل إلى واجبك التالي عندما تنتهي ويكون المعلم قد فتحه.
            </li>
          </ol>
        </section>

        <h2 className="learning-guide-stations-title">اكتشف محطات رحلتك</h2>

        <ol className="learning-guide-stations">
          {learningSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <li className="learning-guide-station" key={step.title}>
                <div className="learning-guide-station-icon">
                  <Icon size={28} aria-hidden="true" />
                </div>

                <div>
                  <span className="learning-guide-step">المحطة {index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <aside className="learning-guide-note">
          <Lightbulb size={28} aria-hidden="true" />
          <p>
            <strong>لا يوجد واجب ظاهر الآن؟</strong> قد تكون أكملت الأنشطة المفتوحة، أو أن المعلم لم يفتح نشاطًا جديدًا بعد. يمكنك العودة
            إلى دليل الأمان ومراجعة ما تعلّمته!
          </p>
        </aside>

        <button className="back-home-button" type="button" onClick={onBackHome}>
          العودة إلى الرئيسية
          <Home size={20} />
        </button>
      </section>
    );
  }
  if (activePage === "activities") {
    return (
      <section className="student-inner-page">
        <header className="inner-page-header">
          <div>
            <span className="inner-page-label">الأنشطة التعليمية</span>
            <h1>اختاري النشاط</h1>
            <p>اختبري معرفتك في حماية الحسابات واتخاذ القرارات الآمنة. يفتح المعلم الأنشطة المتاحة لك.</p>
          </div>

          <Gamepad2 size={52} />
        </header>

        <div className="activities-grid">
          {activitiesList.map((act) => {
            const Icon = act.icon;

            const studentCategory = categoriesProgress.find((item) => item.category === act.category);

            const isOpen = studentCategory?.isOpen === true;

            const prerequisitesMet = hasCompletedPrerequisites(act.id);
            const canPlay = isOpen && prerequisitesMet;
            return (
              <article
                key={act.id}
                className={`activity-item ${isOpen ? "unlocked-activity" : "locked-activity"}`}
                style={{
                  opacity: isOpen ? 1 : 0.7,
                  filter: isOpen ? "none" : "grayscale(20%)",
                  position: "relative",
                }}>
                <img className="activity-cover" src={act.image} alt="" aria-hidden="true" />

                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    left: "12px",
                    background: isOpen ? "#10B981" : "#EF4444",
                    color: "#fff",
                    padding: "4px 8px",
                    borderRadius: "12px",
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}>
                  {isOpen ? <Unlock size={14} /> : <LockKeyhole size={14} />}
                  <span>{isOpen ? "مفتوح" : "مغلق"}</span>{" "}
                </div>

                <div className="activity-item-icon">
                  <Icon size={55} />
                </div>

                <h2>{act.title}</h2>
                <p>{act.desc}</p>

                {isOpen ? (
                  <>
                    <button
                      type="button"
                      disabled={!canPlay}
                      onClick={() => {
                        if (canPlay) navigate("/student?page=homework");
                      }}>
                      ابدئي الاختبار
                      <ChevronLeft size={20} />
                    </button>
                    {!canPlay && <p className="student-prerequisite-message">{prerequisiteMessage}</p>}{" "}
                  </>
                ) : (
                  <p className="student-prerequisite-message">لم يقم المعلم بفتح هذا النشاط بعد 🔒</p>
                )}
              </article>
            );
          })}
        </div>

        <button className="back-home-button" type="button" onClick={onBackHome}>
          العودة إلى الرئيسية
          <Home size={20} />
        </button>
      </section>
    );
  }

  if (activePage === "homework") {
    const homeworkItems = categoriesProgress
      .filter((category) => category.isOpen === true)
      .map((category) => {
        const activity = activitiesList.find((item) => item.category === category.category);

        return activity ? { ...category, activity } : null;
      })
      .filter(Boolean);

    function formatDueDate(value) {
      if (!value) return "لم يحدد المعلم موعدًا";

      const date = new Date(value);

      if (Number.isNaN(date.getTime())) {
        return "لم يحدد المعلم موعدًا";
      }

      return new Intl.DateTimeFormat("ar-u-nu-latn", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date);
    }

    return (
      <section className="student-inner-page">
        <header className="inner-page-header">
          <div>
            <span className="inner-page-label">المهام الدراسية</span>
            <h1>واجباتي</h1>
            <p>تابعي الواجبات المطلوبة ومواعيد تسليمها.</p>
          </div>

          <ClipboardList size={52} />
        </header>

        <div className="homework-page-list">
          {homeworkItems.map((homework) => {
            const Icon = homework.activity.icon;
            const percentage = homework.percentage ?? 0;
            const hasStarted = percentage > 0;
            const canPlay = homework.isOpen === true && hasCompletedPrerequisites(homework.activity.id);
            return (
              <article className="homework-page-item" key={homework.category}>
                <div className="homework-page-icon">
                  <Icon size={35} />
                </div>

                <div>
                  <h2>{homework.category}</h2>

                  <p>
                    <CalendarDays size={17} />
                    موعد التسليم: {formatDueDate(homework.dueDate)}
                  </p>

                  <p>
                    نسبة الإنجاز: <span dir="ltr">{percentage}%</span>
                  </p>
                </div>

                <span className={`homework-status ${homework.finished ? "completed" : hasStarted ? "pending" : "new"}`}>
                  {homework.finished ? "مكتمل" : hasStarted ? "قيد التنفيذ" : "جديد"}
                </span>
                <button
                  type="button"
                  disabled={!canPlay}
                  onClick={() => {
                    if (canPlay) navigate(homework.activity.path);
                  }}>
                  {homework.finished ? "فتح النشاط" : hasStarted ? "متابعة الواجب" : "فتح الواجب"}
                </button>
              </article>
            );
          })}
        </div>

        <button className="back-home-button" type="button" onClick={onBackHome}>
          العودة إلى الرئيسية
          <Home size={20} />
        </button>
      </section>
    );
  }

  /*
    بقية صفحات القائمة
  */

  if (activePage === "achievements") {
    const earnedBadges = categoryBadges.filter((badge) =>
      categoriesProgress.some((progress) => progress.category === badge.category && progress.finished === true),
    );

    return (
      <section className="student-inner-page">
        <header className="inner-page-header">
          <div>
            <span className="inner-page-label">شارات الإنجاز</span>
            <h1>إنجازاتي</h1>
            <p>كل نشاط تكمله يضيف شارة جديدة إلى رحلتك!</p>
          </div>

          <Trophy size={52} />
        </header>

        {earnedBadges.length > 0 ? (
          <div className="student-achievements-grid">
            {earnedBadges.map((badge) => {
              const Icon = badge.icon;

              return (
                <article className="student-card student-achievement-card" key={badge.category}>
                  <div className={`student-badge ${badge.color}`}>
                    <Icon className="student-badge-symbol" aria-hidden="true" />
                    <CheckCircle2 className="student-badge-check" aria-hidden="true" />
                  </div>

                  <h2>{badge.label}</h2>
                  <p>{badge.category}</p>
                  <span className="homework-status completed">مكتمل</span>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="empty-page-content">
            <Trophy size={75} strokeWidth={1.4} />
            <h2>رحلة الإنجاز تبدأ بخطوة!</h2>
            <p>أكمل أول نشاط لتحصل على شارتك الأولى.</p>
          </div>
        )}

        <button className="back-home-button" type="button" onClick={onBackHome}>
          العودة إلى الرئيسية
          <Home size={20} />
        </button>
      </section>
    );
  }

  const currentPage = pageInformation[activePage];

  if (!currentPage) {
    return null;
  }

  const PageIcon = currentPage.icon;

  return (
    <section className="student-inner-page">
      <header className="inner-page-header">
        <div>
          <span className="inner-page-label">لوحة الطالب</span>
          <h1>{currentPage.title}</h1>
          <p>{currentPage.description}</p>
        </div>

        <PageIcon size={52} />
      </header>

      <div className="empty-page-content">
        <PageIcon size={75} strokeWidth={1.4} />
        <h2>{currentPage.title}</h2>
        <p>سيتم وضع محتوى قسم {currentPage.title} هنا.</p>
      </div>

      <button className="back-home-button" type="button" onClick={onBackHome}>
        العودة إلى الرئيسية
        <Home size={20} />
      </button>
    </section>
  );
}

const categoryBadges = [
  {
    category: "رسائل التصيد",
    label: "خبير/ة التصيد",
    icon: Mail,
    color: "purple",
  },
  {
    category: "كلمات المرور",
    label: "حارس كلمات المرور",
    icon: LockKeyhole,
    color: "blue",
  },
  {
    category: "الاختبار الامن",
    label: "خبير/ة القرار الآمن",
    icon: ShieldCheck,
    color: "green",
  },
  {
    category: "اونو سايبر",
    label: "بطل أونو",
    icon: Gamepad2,
    color: "orange",
  },
  {
    category: "مونوبولي",
    label: "بطل مونوبولي",
    icon: Trophy,
    color: "pink",
  },
];

function StudentDashboard() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const activePage = searchParams.get("page") || "home";

  function setActivePage(page) {
    setSearchParams((previousParams) => {
      const params = new URLSearchParams(previousParams);

      if (page === "home") {
        params.delete("page");
      } else {
        params.set("page", page);
      }

      return params;
    });
  }
  const [searchText, setSearchText] = useState("");

  async function handleLogout() {
    try {
      const response = await fetch("http://localhost:4000/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      navigate("/", { replace: true });
    } catch {
      alert("تعذر تسجيل الخروج، حاول مرة أخرى");
    }
  }

  const user = useRouteLoaderData("student");

  const { points, completedCategories, totalCategories } = user.student;

  const progressPercentage = (completedCategories / totalCategories) * 100;

  const categoriesProgress = user.student.categoriesProgress ?? [];

  const earnedBadges = categoryBadges.filter((badge) =>
    categoriesProgress.some((progress) => progress.category === badge.category && progress.finished === true),
  );

  const homeworkIndex = categoriesProgress.findIndex((category) => category.isOpen === true && category.finished === false);

  const currentHomework = homeworkIndex !== -1 ? categoriesProgress[homeworkIndex] : null;

  const nextCategory = homeworkIndex !== -1 ? (categoriesProgress[homeworkIndex + 1] ?? null) : null;

  return (
    <div className="student-page" dir="rtl">
      {/* الشريط الجانبي */}
      <aside className="student-sidebar">
        <div className="student-sidebar-logo">
          <ShieldCheck size={40} />
          <span dir="ltr">
            Cyber<span>Smart</span>
          </span>
        </div>

        <h2>لوحة الطالب</h2>

        <nav className="student-navigation">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                type="button"
                className={`student-nav-button ${activePage === item.id ? "active" : ""}`}
                onClick={() => setActivePage(item.id)}>
                <span className="student-nav-icon">
                  <Icon size={23} />
                  {item.id === "messages" && <span className="student-message-dot" />}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="student-sidebar-line" />

        <button className="student-logout-button" type="button" onClick={handleLogout}>
          <LogOut size={23} />
          تسجيل الخروج
        </button>

        <div className="sidebar-banner">
          <img src={lock} alt="Cyber Security Lock" />
        </div>
      </aside>

      {/* محتوى لوحة الطالب */}
      <main className="student-content">
        {/* الشريط العلوي */}
        <header className="student-topbar">
          <div className="student-search">
            <Search size={20} />
            <input
              type="search"
              placeholder="ابحثي في الأنشطة..."
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
          </div>

          <button className="student-notification" type="button" aria-label="الإشعارات">
            <Bell size={25} />
            <span />
          </button>

          <button className="student-profile" type="button" aria-label="الملف الشخصي">
            👩🏻‍🎓
          </button>
        </header>

        {activePage === "home" ? (
          <>
            {/* بطاقة الترحيب */}
            <section className="student-welcome-card">
              <div className="welcome-shield-picture">
                <ShieldCheck size={140} strokeWidth={1.5} />
              </div>

              <div className="student-welcome-text">
                <h1>مرحبًا، {user.name}!</h1>
                <div className="student-progress-area">
                  <div
                    className="student-progress-track"
                    role="progressbar"
                    aria-label="الأنشطة المكتملة"
                    aria-valuemin={0}
                    aria-valuemax={totalCategories}
                    aria-valuenow={completedCategories}>
                    <span style={{ width: `${progressPercentage}%` }} />
                  </div>

                  <strong>
                    المكتمل:{" "}
                    <span dir="ltr">
                      {completedCategories} / {totalCategories}
                    </span>
                  </strong>
                </div>
              </div>

              <div className="welcome-student-picture">👩🏻‍💻</div>
            </section>
            {/* النشاط التالي والواجب */}(
            <section className="student-main-cards">
              <article className="student-card next-activity">
                <header className="student-card-title">
                  <h2>النشاط التالي</h2>
                  <Zap size={28} fill="currentColor" />
                </header>

                {nextCategory && (
                  <div className="next-activity-content">
                    <div className="phishing-picture">
                      <Gamepad2 size={50} />
                    </div>

                    <div>
                      <h3>{nextCategory.category}</h3>

                      <p>
                        {nextCategory.finished
                          ? "مكتمل"
                          : nextCategory.isOpen
                            ? "مفتوح — بانتظار إكمال الواجب الحالي"
                            : "لم يفتح المعلم هذا النشاط بعد"}
                      </p>
                    </div>
                  </div>
                )}
              </article>

              <article
                className="student-card student-homework"
                role="button"
                tabIndex={0}
                style={{ cursor: "pointer" }}
                onClick={() => setActivePage("homework")}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setActivePage("homework");
                  }
                }}>
                <header className="student-card-title">
                  <h2>واجباتي</h2>
                  <FileText size={28} />
                </header>

                {currentHomework && (
                  <div className="homework-details">
                    <div className="homework-lock">
                      <BookOpen size={50} />
                    </div>

                    <div className="homework-text">
                      <h3>{currentHomework.category}</h3>

                      <p>
                        نسبة الإنجاز: <span dir="ltr">{currentHomework.percentage ?? 0}%</span>
                      </p>

                      <div className="student-progress-area">
                        <div
                          className="student-progress-track"
                          role="progressbar"
                          aria-label="نسبة إنجاز الواجب"
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-valuenow={currentHomework.percentage ?? 0}>
                          <span
                            style={{
                              width: `${currentHomework.percentage ?? 0}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </article>
            </section>
            ){/* النقاط والشارات والنصيحة */}
            <section className="student-secondary-cards">
              <article className="student-card student-points-card">
                <header className="student-card-title">
                  <h2>نقاطي</h2>
                  <Star size={28} fill="currentColor" />
                </header>

                <div className="student-points-content">
                  <div className="student-medal">
                    <Star size={53} fill="currentColor" />
                  </div>
                  <strong>{points} نقطة</strong>{" "}
                </div>
              </article>

              <article className="student-card student-badges-card">
                <header className="student-card-title">
                  <h2>شاراتي</h2>
                  <Trophy size={28} fill="currentColor" />
                </header>

                <div className="student-badges" style={{ "--badge-count": Math.max(earnedBadges.length, 1) }}>
                  {earnedBadges.map((badge) => {
                    const Icon = badge.icon;

                    return (
                      <div className="student-badge-item" key={badge.category} title={badge.category}>
                        <div className={`student-badge ${badge.color}`}>
                          <Icon className="student-badge-symbol" aria-hidden="true" />
                          <CheckCircle2 className="student-badge-check" aria-hidden="true" />
                        </div>

                        <p>{badge.label}</p>
                      </div>
                    );
                  })}
                </div>
              </article>

              <article className="student-card student-tip-card">
                <header className="student-card-title">
                  <h2>نصيحة اليوم</h2>
                  <Lightbulb size={29} fill="currentColor" />
                </header>

                <div className="student-tip-content">
                  <p>
                    لا تشاركي كلمة المرور
                    <br />
                    مع أي شخص
                  </p>
                  <Lightbulb size={63} fill="currentColor" />
                </div>
              </article>
            </section>
            {/* متابعة التعلم */}
            <button className="continue-learning" type="button" onClick={() => setActivePage("learning")}>
              <div className="learning-books">📚 💻</div>
              <span className="learning-arrow">
                <ChevronLeft size={25} />
              </span>
              <div>
                <h2>تابعي التعلم</h2>
                <p>هناك المزيد من الأنشطة الشيقة في مسار التعلم</p>
              </div>
              <span className="more-books">📚</span>
            </button>
          </>
        ) : (
          <StudentSectionPage
            activePage={activePage}
            onBackHome={() => setActivePage("home")}
            categoriesProgress={categoriesProgress}
            navigate={navigate}
          />
        )}
      </main>
    </div>
  );
}

export default StudentDashboard;
