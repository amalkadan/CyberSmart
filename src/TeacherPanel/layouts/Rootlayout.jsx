import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import '../style/Rootlayout.css';

import lock from '../img/lock.png';

import { 
  FaHome, 
  FaChartBar, 
  FaUsers, 
  FaUser, 
  FaClipboardList, 
  FaChartLine, 
  FaEnvelope, 
  FaCog,
  FaSignOutAlt // 👈 إضافة أيقونة تسجيل الخروج
} from 'react-icons/fa';

export default function RootLayout() {
  const navigate = useNavigate();

  // دالة تسجيل الخروج
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

  return (
    <div className="layout-container" dir="rtl">
      {/* القائمة الجانبية */}
      <aside className="sidebar">
        <div>
          {/* الشعار CyberSmart */}
          <div className="logo-section">
            <h2>
              Cyber<span className="logo-blue">Smart</span>
            </h2>
          </div>

          {/* قائمة الروابط مع الأيقونات */}
          <nav className="nav-menu">
            <NavLink className="nav-link" to="/teacher" end>
              <FaHome className="nav-icon" />
              <span>لوحة المعلّم</span>
            </NavLink>

            <NavLink className="nav-link" to="/teacher/overview">
              <FaChartBar className="nav-icon" />
              <span>نظرة عامة</span>
            </NavLink>

            <NavLink className="nav-link" to="/teacher/class">
              <FaUsers className="nav-icon" />
              <span>الصفوف</span>
            </NavLink>

            <NavLink className="nav-link" to="/teacher/student-status">
              <FaUser className="nav-icon" />
              <span>الطلاب</span>
            </NavLink>

            <NavLink className="nav-link" to="/teacher/activities">
              <FaClipboardList className="nav-icon" />
              <span>الأنشطة</span>
            </NavLink>

            <NavLink className="nav-link" to="/teacher/results">
              <FaChartLine className="nav-icon" />
              <span>النتائج</span>
            </NavLink>

            <NavLink className="nav-link" to="/teacher/messages">
              <FaEnvelope className="nav-icon" />
              <span>الرسائل</span>
            </NavLink>

            <NavLink className="nav-link" to="/teacher/settings">
              <FaCog className="nav-icon" />
              <span>الإعدادات</span>
            </NavLink>

            {/* 👈 زر تسجيل الخروج */}
            <button className="nav-link logout-btn" onClick={handleLogout}>
              <FaSignOutAlt className="nav-icon" />
              <span>تسجيل الخروج</span>
            </button>
          </nav>
        </div>

        {/* صورة الأمان والحماية في أسفل القائمة */}
        <div className="sidebar-banner">
          <img src={lock} alt="Cyber Security Lock" />
        </div>
      </aside>

      {/* منطقة المحتوى الرئيسي */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}