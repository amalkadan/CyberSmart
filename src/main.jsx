import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

import App, { LoginPage } from './App.jsx'; 
import StudentDashboard from './StudentPanel/StudentDashboard.jsx';

import Rootlayout from "./TeacherPanel/layouts/Rootlayout.jsx";
import TeacherDashboard from "./TeacherPanel/pages/TeacherDashboard.jsx";

import TeacherClass from "./TeacherPanel/pages/TeacherClass.jsx";
import TeacherStudentStatus from "./TeacherPanel/pages/TeacherStudentStatus.jsx";
import TeacherActivities from "./TeacherPanel/pages/TeacherActivities.jsx";
import TeacherResults from "./TeacherPanel/pages/TeacherResults.jsx";
import TeacherMessages from "./TeacherPanel/pages/TeacherMessages.jsx";
import TeacherSettings from "./TeacherPanel/pages/TeacherSetting.jsx";

// 1. استيراد صفحات الألعاب (تأكد من إنشاء المجلد والملفات)
import PhishingGame from './TeacherPanel/pages/games/PhishingGame.jsx';
import PasswordGame from './TeacherPanel/pages/games/PasswordGame.jsx';
import DecisionGame from './TeacherPanel/pages/games/DecisionGame.jsx';
import CyberMonopolyGame from './TeacherPanel/pages/games/CyberMonopolyGame.jsx';
import UnoSyberGame from './TeacherPanel/pages/games/UnoSyberGame.jsx';

import './index.css';
import { requireRole } from "./auth/requireRole";

import "./index.css";

function handlePageRestore(event) {
  if (event.persisted) {
    window.location.reload();
  }
}

window.addEventListener("pageshow", handlePageRestore);

// Avoid duplicate listeners during Vite updates.
if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    window.removeEventListener("pageshow", handlePageRestore);
  });
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <LoginPage />, 
      },
      {
        path: "student",
        loader: requireRole("STUDENT"),
        shouldRevalidate: () => true,
        element: <Outlet />,
        errorElement: <p dir="rtl">تعذر الاتصال بالخادم. تأكد من تشغيله ثم أعد تحميل الصفحة.</p>,
        children: [
          { index: true, element: <StudentDashboard /> },
          { path: "games/phishing", element: <PhishingGame returnPath="/student?page=activities" /> },
          { path: "games/password", element: <PasswordGame returnPath="/student?page=activities" /> },
          { path: "games/decision", element: <DecisionGame returnPath="/student?page=activities" /> },
          { path: "games/monopoly", element: <CyberMonopolyGame returnPath="/student?page=activities" /> },
          { path: "games/uno", element: <UnoSyberGame returnPath="/student?page=activities" /> },
        ],
      },
      {
        path: "teacher",
        loader: requireRole("TEACHER"),
        shouldRevalidate: () => true,
        element: <Rootlayout />,
        errorElement: <p dir="rtl">تعذر الاتصال بالخادم. تأكد من تشغيله ثم أعد تحميل الصفحة.</p>,
        children: [
          { index: true, element: <TeacherDashboard /> },
          { path: "class", element: <TeacherClass /> },
          { path: "student-status", element: <TeacherStudentStatus /> },
          { path: "activities", element: <TeacherActivities /> },
          
          // 2. إضافة مسارات الألعاب هنا حتى تفتح بنفس الهيكل وبجانب القائمة الجانبية
          { path: "activities/phishing", element: <PhishingGame /> },
          { path: "activities/password", element: <PasswordGame /> },
          { path: "activities/decision", element: <DecisionGame /> },
          { path: "activities/monopoly", element: <CyberMonopolyGame /> },
          { path: "activities/uno", element: <UnoSyberGame /> },
          { path: "results", element: <TeacherResults /> },
          { path: "messages", element: <TeacherMessages /> },
          { path: "settings", element: <TeacherSettings /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
