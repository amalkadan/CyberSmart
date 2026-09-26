import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  CheckCircle2,
  FileText,
} from "lucide-react";

import "./StudentDashboard.css";

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

function StudentDashboard() {
  const navigate = useNavigate();

  const [activePage, setActivePage] = useState("home");
  const [searchText, setSearchText] = useState("");

  function handleLogout() {
    navigate("/");
  }

  function startActivity() {
    alert("سيبدأ نشاط اكتشاف رسالة التصيد");
  }

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
                className={`student-nav-button ${
                  activePage === item.id ? "active" : ""
                }`}
                onClick={() => setActivePage(item.id)}
              >
                <span className="student-nav-icon">
                  <Icon size={23} />

                  {item.id === "messages" && (
                    <span className="student-message-dot" />
                  )}
                </span>

                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="student-sidebar-line" />

        <button
          className="student-logout-button"
          type="button"
          onClick={handleLogout}
        >
          <LogOut size={23} />
          تسجيل الخروج
        </button>
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

          <button
            className="student-notification"
            type="button"
            aria-label="الإشعارات"
          >
            <Bell size={25} />
            <span />
          </button>

          <button
            className="student-profile"
            type="button"
            aria-label="الملف الشخصي"
          >
            👩🏻‍🎓
          </button>
        </header>

        {/* بطاقة الترحيب */}

        <section className="student-welcome-card">
          <div className="welcome-shield-picture">
            <ShieldCheck size={140} strokeWidth={1.5} />
          </div>

          <div className="student-welcome-text">
            <h1>مرحبًا، سارة!</h1>

            <p>
              أكملتِ <strong>٦</strong> من <strong>١٠</strong> أنشطة
            </p>

            <span className="student-progress-message">
              تابعي التقدم الرائع
              <Star size={20} fill="currentColor" />
            </span>

            <div className="student-progress-area">
              <div className="student-progress-track">
                <span />
              </div>

              <strong>٦ / ١٠</strong>
            </div>
          </div>

          <div className="welcome-student-picture">👩🏻‍💻</div>
        </section>

        {/* النشاط التالي والواجب */}

        <section className="student-main-cards">
          <article className="student-card next-activity">
            <header className="student-card-title">
              <h2>النشاط التالي</h2>
              <Zap size={28} fill="currentColor" />
            </header>

            <div className="next-activity-content">
              <div className="phishing-picture">🎣✉️</div>

              <div>
                <h3>اكتشفي رسالة التصيد</h3>

                <button
                  className="start-activity"
                  type="button"
                  onClick={startActivity}
                >
                  ابدئي النشاط
                  <ChevronLeft size={21} />
                </button>
              </div>
            </div>
          </article>

          <article className="student-card student-homework">
            <header className="student-card-title">
              <h2>واجباتي</h2>
              <FileText size={28} />
            </header>

            <button className="homework-details" type="button">
              <div className="homework-lock">
                <LockKeyhole size={50} />
              </div>

              <div className="homework-text">
                <h3>كلمة المرور الآمنة</h3>

                <p>
                  <CalendarDays size={18} />
                  موعد التسليم: الخميس
                </p>
              </div>

              <ChevronLeft size={28} />
            </button>
          </article>
        </section>

        {/* النقاط والشارات والنصيحة */}

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

              <strong>٨٥٠ نقطة</strong>
            </div>
          </article>

          <article className="student-card student-badges-card">
            <header className="student-card-title">
              <h2>شاراتي</h2>
              <Trophy size={28} fill="currentColor" />
            </header>

            <div className="student-badges">
              <div className="student-badge-item">
                <div className="student-badge purple">
                  <Mail size={40} />
                  <CheckCircle2 size={24} />
                </div>

                <p>محققة التصيد</p>
              </div>

              <div className="student-badge-item">
                <div className="student-badge blue">
                  <ShieldCheck size={43} />
                  <CheckCircle2 size={24} />
                </div>

                <p>حامية الخصوصية</p>
              </div>
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

        <button
          className="continue-learning"
          type="button"
          onClick={() => setActivePage("learning")}
        >
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
      </main>
    </div>
  );
}

export default StudentDashboard;
