import { useState } from "react";
import { ShieldCheck, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./LoginPanel.css";

function LoginPanel() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    if (accountType === "student") {
      navigate("/student");
    } else if (accountType === "teacher") {
      navigate("/teacher");
    }
  }

  return (
    <div className="login-panel" dir="rtl">
      {/* اسم التطبيق فوق الإطار */}
      <header className="login-brand">
        <div className="brand-icon">
          <ShieldCheck size={58} strokeWidth={2.2} />
          <GraduationCap className="brand-cap" size={24} />
        </div>

        <h1 className="brand-name" dir="ltr">
          <span className="brand-cyber">Cyber</span>
          <span className="brand-smart">Smart</span>
        </h1>
      </header>

      {/* إطار تسجيل الدخول */}
      <section className="login-card">
        <div className="login-heading">
          <h2>مرحبًا بعودتك!</h2>
          <p>سجل الدخول وابدأ التعلم</p>
        </div>

        <div className="account-type">
          <button
            className={`account-button ${
              accountType === "student" ? "active" : ""
            }`}
            type="button"
            onClick={() => setAccountType("student")}
          >
            🎓 أنا طالب
          </button>

          <button
            className={`account-button ${
              accountType === "teacher" ? "active" : ""
            }`}
            type="button"
            onClick={() => setAccountType("teacher")}
          >
            👤 أنا معلم
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="username">اسم المستخدم</label>

          <div className="login-input-container">
            <span className="input-icon">👤</span>

            <input
              id="username"
              type="text"
              placeholder="أدخل اسم المستخدم"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </div>

          <label htmlFor="password">كلمة المرور</label>

          <div className="login-input-container">
            <span className="input-icon">🔒</span>

            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="أدخل كلمة المرور"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            <button
              className="show-password-button"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "إخفاء" : "إظهار"}
            </button>
          </div>

          <div className="login-options">
            <label className="remember-option">
              <input type="checkbox" />
              <span>تذكرني</span>
            </label>

            <button className="forgot-password" type="button">
              نسيت كلمة المرور؟
            </button>
          </div>

          <button className="submit-login-button" type="submit">
            تسجيل الدخول
            <span>←</span>
          </button>
        </form>

        <div className="register-area">
          <p>ليس لديك حساب؟</p>

          <button className="register-button" type="button">
            <span>+</span>
            إنشاء حساب جديد
          </button>
        </div>
      </section>
    </div>
  );
}

export default LoginPanel;