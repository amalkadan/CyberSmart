import { FaBell, FaUser } from "react-icons/fa";
import "../style/Header.css"; // أو حسب مسار ملف التنسيق لديك

export default function Header({ teacher }) {
  return (
    <header className="header-container">
      {/* جهة اليمين: الترحيب بالأستاذة أمل */}
      <div className="welcome-section">
        <h2>مرحباً، {teacher.name} 🌅</h2>
        <p>{teacher.email}</p>
        <p>معاً نبني جيلاً أكثر أماناً في العالم الرقمي</p>
      </div>

      {/* جهة اليسار: أزرار الإشعارات والحساب */}
      <div className="header-actions">
        <button className="icon-btn" aria-label="Notifications">
          <FaBell />
          <span className="badge"></span>
        </button>
        <button className="icon-btn" aria-label="User Profile">
          <FaUser />
        </button>
      </div>
    </header>
  );
}
