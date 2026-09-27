 import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App, { LoginPage } from './App.jsx'; 
import StudentDashboard from './StudentPanel/StudentDashboard.jsx';

import Rootlayout from './TeacherPanel/layouts/Rootlayout.jsx';
import TeacherDashboard from './TeacherPanel/pages/TeacherDashboard.jsx';
import TeacherOverview from './TeacherPanel/pages/TeacherOverview.jsx';
import TeacherClass from './TeacherPanel/pages/TeacherClass.jsx';
import TeacherStudentStatus from './TeacherPanel/pages/TeacherStudentStatus.jsx';
import TeacherActivities from './TeacherPanel/pages/TeacherActivities.jsx';
import TeacherResults from './TeacherPanel/pages/TeacherResults.jsx';
import TeacherMessages from './TeacherPanel/pages/TeacherMessages.jsx';
import TeacherSettings from './TeacherPanel/pages/TeacherSetting.jsx';

// 1. استيراد صفحات الألعاب (تأكد من إنشاء المجلد والملفات)
import PhishingGame from './TeacherPanel/pages/games/PhishingGame.jsx';
import PasswordGame from './TeacherPanel/pages/games/PasswordGame.jsx';
import DecisionGame from './TeacherPanel/pages/games/DecisionGame.jsx';

import './index.css';

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
        element: <StudentDashboard />,
      },
      {
        path: "teacher",
        element: <Rootlayout />,
        children: [
          { index: true, element: <TeacherDashboard /> },
          { path: "overview", element: <TeacherOverview /> },
          { path: "class", element: <TeacherClass /> },
          { path: "student-status", element: <TeacherStudentStatus /> },
          { path: "activities", element: <TeacherActivities /> },
          
          // 2. إضافة مسارات الألعاب هنا حتى تفتح بنفس الهيكل وبجانب القائمة الجانبية
          { path: "activities/phishing", element: <PhishingGame /> },
          { path: "activities/password", element: <PasswordGame /> },
          { path: "activities/decision", element: <DecisionGame /> },

          { path: "results", element: <TeacherResults /> },
          { path: "messages", element: <TeacherMessages /> },
          { path: "settings", element: <TeacherSettings /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);