// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import {
//   ShieldCheck,
//   Home,
//   BookOpen,
//   Gamepad2,
//   ClipboardList,
//   BarChart3,
//   Trophy,
//   Mail,
//   Settings,
//   LogOut,
//   Search,
//   Bell,
//   ChevronLeft,
//   CalendarDays,
//   Zap,
//   Star,
//   Lightbulb,
//   LockKeyhole,
//   CheckCircle2,
//   FileText,
// } from "lucide-react";

// import "./StudentDashboard.css";

// const menuItems = [
//   { id: "home", label: "الرئيسية", icon: Home },
//   { id: "learning", label: "مسار التعلم", icon: BookOpen },
//   { id: "activities", label: "الأنشطة", icon: Gamepad2 },
//   { id: "homework", label: "واجباتي", icon: ClipboardList },
//   { id: "results", label: "نتائجي", icon: BarChart3 },
//   { id: "achievements", label: "إنجازاتي", icon: Trophy },
//   { id: "safety", label: "دليل الأمان", icon: ShieldCheck },
//   { id: "messages", label: "الرسائل", icon: Mail },
//   { id: "settings", label: "الإعدادات", icon: Settings },
// ];
// const pageInformation = {
//   learning: {
//     title: "مسار التعلم",
//     description: "تابعي الدروس والأنشطة بالتسلسل.",
//     icon: BookOpen,
//   },

//   results: {
//     title: "نتائجي",
//     description: "شاهدي نتائج الاختبارات والأنشطة التي أكملتها.",
//     icon: BarChart3,
//   },

//   achievements: {
//     title: "إنجازاتي",
//     description: "شاهدي الشارات والجوائز التي حصلتِ عليها.",
//     icon: Trophy,
//   },

//   safety: {
//     title: "دليل الأمان",
//     description: "تعلمي أهم النصائح لحماية حساباتك وبياناتك.",
//     icon: ShieldCheck,
//   },

//   messages: {
//     title: "الرسائل",
//     description: "شاهدي رسائل المعلم والتنبيهات الجديدة.",
//     icon: Mail,
//   },

//   settings: {
//     title: "الإعدادات",
//     description: "عدّلي بيانات الحساب وإعدادات لوحة الطالب.",
//     icon: Settings,
//   },
// };

// function StudentSectionPage({ activePage, onBackHome }) {
//   /*
//     صفحة الأنشطة لها تصميم مختلف،
//     لذلك نعرضها بشكل منفصل.
//   */
//   if (activePage === "activities") {
//     return (
//       <section className="student-inner-page">
//         <header className="inner-page-header">
//           <div>
//             <span className="inner-page-label">الأنشطة التعليمية</span>
//             <h1>اختاري النشاط</h1>
//             <p>اختبري معرفتك في حماية الحسابات واتخاذ القرارات الآمنة.</p>
//           </div>

//           <Gamepad2 size={52} />
//         </header>

//         <div className="activities-grid">
//           <article className="activity-item password-activity">
//             <div className="activity-item-icon">
//               <LockKeyhole size={55} />
//             </div>

//             <h2>اختبر كلمة المرور</h2>

//             <p>اختاري كلمة المرور الأقوى وتعرفي على طرق حماية حسابك.</p>

//             <button type="button">
//               ابدئي الاختبار
//               <ChevronLeft size={20} />
//             </button>
//           </article>

//           <article className="activity-item decision-activity">
//             <div className="activity-item-icon">
//               <CheckCircle2 size={55} />
//             </div>

//             <h2>اختر القرار الآمن</h2>

//             <p>اختاري التصرف الصحيح في مجموعة من المواقف الرقمية.</p>

//             <button type="button">
//               ابدئي الاختبار
//               <ChevronLeft size={20} />
//             </button>
//           </article>

//           <article className="activity-item safety-activity">
//             <div className="activity-item-icon">
//               <Lightbulb size={55} />
//             </div>

//             <h2>نصائح الحماية</h2>

//             <p>اختبري معرفتك بحماية الأجهزة والخصوصية والبيانات.</p>

//             <button type="button">
//               ابدئي الاختبار
//               <ChevronLeft size={20} />
//             </button>
//           </article>
//         </div>

//         <button className="back-home-button" type="button" onClick={onBackHome}>
//           العودة إلى الرئيسية
//           <Home size={20} />
//         </button>
//       </section>
//     );
//   }

//   /*
//     صفحة الواجبات لها محتوى خاص بها.
//   */
//   if (activePage === "homework") {
//     return (
//       <section className="student-inner-page">
//         <header className="inner-page-header">
//           <div>
//             <span className="inner-page-label">المهام الدراسية</span>
//             <h1>واجباتي</h1>
//             <p>تابعي الواجبات المطلوبة ومواعيد تسليمها.</p>
//           </div>

//           <ClipboardList size={52} />
//         </header>

//         <div className="homework-page-list">
//           <article className="homework-page-item">
//             <div className="homework-page-icon">
//               <LockKeyhole size={35} />
//             </div>

//             <div>
//               <h2>كلمة المرور الآمنة</h2>

//               <p>
//                 <CalendarDays size={17} />
//                 موعد التسليم: الخميس
//               </p>
//             </div>

//             <span className="homework-status pending">قيد التنفيذ</span>

//             <button type="button">فتح الواجب</button>
//           </article>

//           <article className="homework-page-item">
//             <div className="homework-page-icon">
//               <ShieldCheck size={35} />
//             </div>

//             <div>
//               <h2>حماية المعلومات الشخصية</h2>

//               <p>
//                 <CalendarDays size={17} />
//                 موعد التسليم: الأحد
//               </p>
//             </div>

//             <span className="homework-status new">جديد</span>

//             <button type="button">فتح الواجب</button>
//           </article>
//         </div>

//         <button className="back-home-button" type="button" onClick={onBackHome}>
//           العودة إلى الرئيسية
//           <Home size={20} />
//         </button>
//       </section>
//     );
//   }

//   /*
//     بقية صفحات القائمة تستخدم التصميم العام نفسه.
//   */
//   const currentPage = pageInformation[activePage];

//   if (!currentPage) {
//     return null;
//   }

//   const PageIcon = currentPage.icon;

//   return (
//     <section className="student-inner-page">
//       <header className="inner-page-header">
//         <div>
//           <span className="inner-page-label">لوحة الطالب</span>

//           <h1>{currentPage.title}</h1>

//           <p>{currentPage.description}</p>
//         </div>

//         <PageIcon size={52} />
//       </header>

//       <div className="empty-page-content">
//         <PageIcon size={75} strokeWidth={1.4} />

//         <h2>{currentPage.title}</h2>

//         <p>سيتم وضع محتوى قسم {currentPage.title} هنا.</p>
//       </div>

//       <button className="back-home-button" type="button" onClick={onBackHome}>
//         العودة إلى الرئيسية
//         <Home size={20} />
//       </button>
//     </section>
//   );
// }

// function StudentDashboard() {
//   const navigate = useNavigate();

//   const [activePage, setActivePage] = useState("home");
//   const [searchText, setSearchText] = useState("");

//   async function handleLogout() {
//     try {
//       const response = await fetch("http://localhost:4000/auth/logout", {
//         method: "POST",
//         credentials: "include",
//       });

//       if (!response.ok) {
//         throw new Error("Logout failed");
//       }

//       navigate("/", { replace: true });
//     } catch {
//       alert("تعذر تسجيل الخروج، حاول مرة أخرى");
//     }
//   }

//   function startActivity() {
//     alert("سيبدأ نشاط اكتشاف رسالة التصيد");
//   }

//   return (
//     <div className="student-page" dir="rtl">
//       {/* الشريط الجانبي */}

//       <aside className="student-sidebar">
//         <div className="student-sidebar-logo">
//           <ShieldCheck size={40} />

//           <span dir="ltr">
//             Cyber<span>Smart</span>
//           </span>
//         </div>

//         <h2>لوحة الطالب</h2>

//         <nav className="student-navigation">
//           {menuItems.map((item) => {
//             const Icon = item.icon;

//             return (
//               <button
//                 key={item.id}
//                 type="button"
//                 className={`student-nav-button ${activePage === item.id ? "active" : ""}`}
//                 onClick={() => setActivePage(item.id)}>
//                 <span className="student-nav-icon">
//                   <Icon size={23} />

//                   {item.id === "messages" && <span className="student-message-dot" />}
//                 </span>

//                 <span>{item.label}</span>
//               </button>
//             );
//           })}
//         </nav>

//         <div className="student-sidebar-line" />

//         <button className="student-logout-button" type="button" onClick={handleLogout}>
//           <LogOut size={23} />
//           تسجيل الخروج
//         </button>
//       </aside>

//       {/* محتوى لوحة الطالب */}

//       <main className="student-content">
//         {/* الشريط العلوي */}

//         <header className="student-topbar">
//           <div className="student-search">
//             <Search size={20} />

//             <input
//               type="search"
//               placeholder="ابحثي في الأنشطة..."
//               value={searchText}
//               onChange={(event) => setSearchText(event.target.value)}
//             />
//           </div>

//           <button className="student-notification" type="button" aria-label="الإشعارات">
//             <Bell size={25} />
//             <span />
//           </button>

//           <button className="student-profile" type="button" aria-label="الملف الشخصي">
//             👩🏻‍🎓
//           </button>
//         </header>
//         {activePage === "home" ? (
//           <>
//             {/* بطاقة الترحيب */}

//             <section className="student-welcome-card">
//               <div className="welcome-shield-picture">
//                 <ShieldCheck size={140} strokeWidth={1.5} />
//               </div>

//               <div className="student-welcome-text">
//                 <h1>مرحبًا، سارة!</h1>

//                 <p>
//                   أكملتِ <strong>٦</strong> من <strong>١٠</strong> أنشطة
//                 </p>

//                 <span className="student-progress-message">
//                   تابعي التقدم الرائع
//                   <Star size={20} fill="currentColor" />
//                 </span>

//                 <div className="student-progress-area">
//                   <div className="student-progress-track">
//                     <span />
//                   </div>

//                   <strong>٦ / ١٠</strong>
//                 </div>
//               </div>

//               <div className="welcome-student-picture">👩🏻‍💻</div>
//             </section>

//             {/* النشاط التالي والواجب */}

//             <section className="student-main-cards">
//               <article className="student-card next-activity">
//                 <header className="student-card-title">
//                   <h2>النشاط التالي</h2>
//                   <Zap size={28} fill="currentColor" />
//                 </header>

//                 <div className="next-activity-content">
//                   <div className="phishing-picture">🎣✉️</div>

//                   <div>
//                     <h3>اكتشفي رسالة التصيد</h3>

//                     <button className="start-activity" type="button" onClick={startActivity}>
//                       ابدئي النشاط
//                       <ChevronLeft size={21} />
//                     </button>
//                   </div>
//                 </div>
//               </article>

//               <article className="student-card student-homework">
//                 <header className="student-card-title">
//                   <h2>واجباتي</h2>
//                   <FileText size={28} />
//                 </header>

//                 <button className="homework-details" type="button">
//                   <div className="homework-lock">
//                     <LockKeyhole size={50} />
//                   </div>

//                   <div className="homework-text">
//                     <h3>كلمة المرور الآمنة</h3>

//                     <p>
//                       <CalendarDays size={18} />
//                       موعد التسليم: الخميس
//                     </p>
//                   </div>

//                   <ChevronLeft size={28} />
//                 </button>
//               </article>
//             </section>

//             {/* النقاط والشارات والنصيحة */}

//             <section className="student-secondary-cards">
//               <article className="student-card student-points-card">
//                 <header className="student-card-title">
//                   <h2>نقاطي</h2>
//                   <Star size={28} fill="currentColor" />
//                 </header>

//                 <div className="student-points-content">
//                   <div className="student-medal">
//                     <Star size={53} fill="currentColor" />
//                   </div>

//                   <strong>٨٥٠ نقطة</strong>
//                 </div>
//               </article>

//               <article className="student-card student-badges-card">
//                 <header className="student-card-title">
//                   <h2>شاراتي</h2>
//                   <Trophy size={28} fill="currentColor" />
//                 </header>

//                 <div className="student-badges">
//                   <div className="student-badge-item">
//                     <div className="student-badge purple">
//                       <Mail size={40} />
//                       <CheckCircle2 size={24} />
//                     </div>

//                     <p>محققة التصيد</p>
//                   </div>

//                   <div className="student-badge-item">
//                     <div className="student-badge blue">
//                       <ShieldCheck size={43} />
//                       <CheckCircle2 size={24} />
//                     </div>

//                     <p>حامية الخصوصية</p>
//                   </div>
//                 </div>
//               </article>

//               <article className="student-card student-tip-card">
//                 <header className="student-card-title">
//                   <h2>نصيحة اليوم</h2>
//                   <Lightbulb size={29} fill="currentColor" />
//                 </header>

//                 <div className="student-tip-content">
//                   <p>
//                     لا تشاركي كلمة المرور
//                     <br />
//                     مع أي شخص
//                   </p>

//                   <Lightbulb size={63} fill="currentColor" />
//                 </div>
//               </article>
//             </section>

//             {/* متابعة التعلم */}

//             <button className="continue-learning" type="button" onClick={() => setActivePage("learning")}>
//               <div className="learning-books">📚 💻</div>

//               <span className="learning-arrow">
//                 <ChevronLeft size={25} />
//               </span>

//               <div>
//                 <h2>تابعي التعلم</h2>
//                 <p>هناك المزيد من الأنشطة الشيقة في مسار التعلم</p>
//               </div>

//               <span className="more-books">📚</span>
//             </button>
//           </>
//         ) : (
//           <StudentSectionPage activePage={activePage} onBackHome={() => setActivePage("home")} />
//         )}
//       </main>
//     </div>
//   );
// }

// export default StudentDashboard;

//تعديل 2

import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

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
    order: 1,
    title: "اكتشف التصيّد",
    desc: "اختبري معرفتك في اكتشاف الرسائل والمواقع الاحتيالية.",
    icon: Lightbulb,
    image: phishingImage,
    path: "/student/games/phishing",
  },
  {
    id: "password",
    order: 2,
    title: "اختبر كلمة المرور",
    desc: "اختاري كلمة المرور الأقوى وتعرفي على طرق حماية حسابك.",
    icon: LockKeyhole,
    image: passwordImage,
    path: "/student/games/password",
  },
  {
    id: "decision",
    order: 3,
    title: "اختر القرار الآمن",
    desc: "اختاري التصرف الصحيح في مجموعة من المواقف الرقمية.",
    icon: CheckCircle2,
    image: decisionImage,
    path: "/student/games/decision",
  },
  {
    id: "monopoly",
    order: 4,
    title: "لعبة المونوبولي",
    desc: "لعبة تفاعلية لتعلم مفاهيم الأمان الرقمي.",
    icon: Gamepad2,
    image: monopolyImage,
    path: "/student/games/monopoly",
  },
  {
    id: "uno",
    order: 5,
    title: "UNO Cyber",
    desc: "لعبة تفاعلية لتعلم مفاهيم الأمان الرقمي.",
    icon: Gamepad2,
    image: unoImage,
    path: "/student/games/uno",
  },
];

function StudentSectionPage({
  activePage,
  onBackHome,
  activitiesStatus,
  navigate,
}) {
  /*
    صفحة الأنشطة المعدلة للربط مع تحكم المعلم وتسلسل الطالب
  */
  if (activePage === "activities") {
    return (
      <section className="student-inner-page">
        <header className="inner-page-header">
          <div>
            <span className="inner-page-label">الأنشطة التعليمية</span>
            <h1>اختاري النشاط</h1>
            <p>
              اختبري معرفتك في حماية الحسابات واتخاذ القرارات الآمنة بالتسلسل.
            </p>
          </div>

          <Gamepad2 size={52} />
        </header>

        <div className="activities-grid">
          {activitiesList.map((act) => {
            const Icon = act.icon;
            // جلب حالة النشاط المرجعة من السيرفر
            const serverInfo = activitiesStatus.find(
              (item) => item.activityId === act.id,
            );

            // افتراضياً مغلق إلا لو أكد السيرفر أنه مفتوح
            const isAccessible = serverInfo ? serverInfo.isAccessible : false;
            const lockReason = serverInfo
              ? serverInfo.lockReason
              : "teacher_locked";

            let lockMessage = "";
            if (!isAccessible) {
              if (lockReason === "teacher_locked") {
                lockMessage = "لم يقم المعلم بفتح هذا النشاط بعد 🔒";
              } else if (lockReason === "previous_not_completed") {
                lockMessage = "عليك إكمال النشاط السابق أولاً 🔒";
              }
            }

            return (
              <article
                key={act.id}
                className={`activity-item ${!isAccessible ? "locked-activity" : "unlocked-activity"}`}
                style={{
                  opacity: isAccessible ? 1 : 0.7,
                  filter: isAccessible ? "none" : "grayscale(20%)",
                  position: "relative",
                }}
              >
                <img
                  className="activity-cover"
                  src={act.image}
                  alt=""
                  aria-hidden="true"
                />

                {/* شارة حالة القفل فوق الكارت */}
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    left: "12px",
                    background: isAccessible ? "#10B981" : "#EF4444",
                    color: "#fff",
                    padding: "4px 8px",
                    borderRadius: "12px",
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  {isAccessible ? (
                    <Unlock size={14} />
                  ) : (
                    <LockKeyhole size={14} />
                  )}
                  <span>{isAccessible ? "متاح" : "مغلق"}</span>
                </div>

                <div className="activity-item-icon">
                  <Icon size={55} />
                </div>

                <h2>{act.title}</h2>
                <p>{act.desc}</p>

                {isAccessible ? (
                  <button type="button" onClick={() => navigate(act.path)}>
                    ابدئي الاختبار
                    <ChevronLeft size={20} />
                  </button>
                ) : (
                  <div
                    style={{
                      color: "#EF4444",
                      fontWeight: "bold",
                      fontSize: "14px",
                      marginTop: "10px",
                    }}
                  >
                    {lockMessage}
                  </div>
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

  /*
    صفحة الواجبات
  */
  if (activePage === "homework") {
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
          <article className="homework-page-item">
            <div className="homework-page-icon">
              <LockKeyhole size={35} />
            </div>

            <div>
              <h2>كلمة المرور الآمنة</h2>
              <p>
                <CalendarDays size={17} />
                موعد التسليم: الخميس
              </p>
            </div>

            <span className="homework-status pending">قيد التنفيذ</span>
            <button
              type="button"
              onClick={() => navigate("/student/games/password")}
            >
              فتح الواجب
            </button>
          </article>

          <article className="homework-page-item">
            <div className="homework-page-icon">
              <ShieldCheck size={35} />
            </div>

            <div>
              <h2>حماية المعلومات الشخصية</h2>
              <p>
                <CalendarDays size={17} />
                موعد التسليم: الأحد
              </p>
            </div>

            <span className="homework-status new">جديد</span>
            <button
              type="button"
              onClick={() => navigate("/student/games/phishing")}
            >
              فتح الواجب
            </button>
          </article>
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

function StudentDashboard() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [activePage, setActivePage] = useState(searchParams.get("page") || "home");
  const [searchText, setSearchText] = useState("");
  const [activitiesStatus, setActivitiesStatus] = useState([]);

  // جلب حالة الأنشطة فور فتح اللوحة
  useEffect(() => {
    async function fetchActivitiesStatus() {
      try {
        const response = await fetch(
          "http://localhost:4000/students/my-activities",
          {
            credentials: "include",
          },
        );
        if (response.ok) {
          const data = await response.json();
          setActivitiesStatus(data);
        }
      } catch (error) {
        console.error("فشل جلب حالة الأنشطة:", error);
      }
    }

    fetchActivitiesStatus();
  }, []);

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

  function startActivity() {
    // توجيه الطالب لأول نشاط متاح له
    const firstAvailable = activitiesList.find((act) => {
      const status = activitiesStatus.find((s) => s.activityId === act.id);
      return status ? status.isAccessible : false;
    });

    if (firstAvailable) {
      navigate(firstAvailable.path);
    } else {
      setActivePage("activities");
    }
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
                className={`student-nav-button ${activePage === item.id ? "active" : ""}`}
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

        {activePage === "home" ? (
          <>
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
                    <span style={{ width: "60%" }} />
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

                <button
                  className="homework-details"
                  type="button"
                  onClick={() => setActivePage("homework")}
                >
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
          </>
        ) : (
          <StudentSectionPage
            activePage={activePage}
            onBackHome={() => setActivePage("home")}
            activitiesStatus={activitiesStatus}
            navigate={navigate}
          />
        )}
      </main>
    </div>
  );
}

export default StudentDashboard;
