import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App, { LoginPage } from "./App.jsx"; // 👈 استيراد LoginPage من App.jsx
import StudentDashboard from "./StudentPanel/StudentDashboard.jsx";

import Rootlayout from "./TeacherPanel/layouts/Rootlayout.jsx";
import TeacherDashboard from "./TeacherPanel/pages/TeacherDashboard.jsx";
import TeacherOverview from "./TeacherPanel/pages/TeacherOverview.jsx";
import TeacherClass from "./TeacherPanel/pages/TeacherClass.jsx";
import TeacherStudentStatus from "./TeacherPanel/pages/TeacherStudentStatus.jsx";
import TeacherActivities from "./TeacherPanel/pages/TeacherActivities.jsx";
import TeacherResults from "./TeacherPanel/pages/TeacherResults.jsx";
import TeacherMessages from "./TeacherPanel/pages/TeacherMessages.jsx";
import TeacherSettings from "./TeacherPanel/pages/TeacherSetting.jsx";

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
        element: <LoginPage />, // 👈 استخدام LoginPage بدلاً من LoginPanel
      },
      {
        path: "student",
        loader: requireRole("STUDENT"),
        shouldRevalidate: () => true,
        element: <StudentDashboard />,
        errorElement: <p dir="rtl">تعذر الاتصال بالخادم. تأكد من تشغيله ثم أعد تحميل الصفحة.</p>,
      },
      {
        id: "teacher",
        path: "teacher",
        loader: requireRole("TEACHER"),
        shouldRevalidate: () => true,
        element: <Rootlayout />,
        errorElement: <p dir="rtl">تعذر الاتصال بالخادم. تأكد من تشغيله ثم أعد تحميل الصفحة.</p>,
        children: [
          { index: true, element: <TeacherDashboard /> },
          { path: "overview", element: <TeacherOverview /> },
          { path: "class", element: <TeacherClass /> },
          { path: "student-status", element: <TeacherStudentStatus /> },
          { path: "activities", element: <TeacherActivities /> },
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
