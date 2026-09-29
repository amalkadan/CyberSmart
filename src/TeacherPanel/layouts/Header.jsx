import { FaBell, FaUserCircle } from "react-icons/fa";

export default function Header({ teacher }) {
  return (
    <header className="header-container">
      {/* جهة اليمين: الترحيب بالمعلمة */}
      <div className="welcome-section">
        <h2>مرحباً، {teacher?.name ?? "بك"} 🌅</h2>

        {<p dir="rtl">{teacher.email}</p>}

        <p>معاً نبني جيلاً أكثر أماناً في العالم الرقمي</p>
      </div>

      {/* جهة اليسار: الأيقونات والملف الشخصي */}
      <div className="header-actions">
        <button className="icon-btn" title="التنبيهات">
          <FaBell />
          <span className="badge"></span>
        </button>
        <button className="icon-btn profile-btn" title="الملف الشخصي">
          <FaUserCircle />
        </button>
      </div>
    </header>
  );
}
