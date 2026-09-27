import { useState } from "react";
import { ShieldCheck, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./LoginPanel.css";

function LoginPanel() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email.trim(),
          password,
          accountType,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(response.status === 401 ? "البريد الإلكتروني أو كلمة المرور غير صحيحة" : "تعذر تسجيل الدخول، حاول مرة أخرى");
        return;
      }

      if (data.user.role === "TEACHER") {
        navigate("/teacher", { replace: true });
      } else if (data.user.role === "STUDENT") {
        navigate("/student", { replace: true });
      } else {
        setError("نوع الحساب غير صالح");
      }
    } catch (err) {
      setError("تعذر الاتصال بالخادم، حاول مرة أخرى", err.message);
    } finally {
      setIsLoading(false);
    }
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
            className={`account-button ${accountType === "student" ? "active" : ""}`}
            type="button"
            onClick={() => setAccountType("student")}>
            🎓 أنا طالب
          </button>

          <button
            className={`account-button ${accountType === "teacher" ? "active" : ""}`}
            type="button"
            onClick={() => setAccountType("teacher")}>
            👤 أنا معلم
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">البريد الإلكتروني</label>

          <div className="login-input-container">
            <span className="input-icon">✉️</span>

            <input
              id="email"
              type="email"
              placeholder="أدخل البريد الإلكتروني"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="username"
              dir="ltr"
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

            <button className="show-password-button" type="button" onClick={() => setShowPassword(!showPassword)}>
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
          {error && (
            <p role="alert" style={{ color: "#dc2626" }}>
              {error}
            </p>
          )}
          <button className="submit-login-button" type="submit" disabled={isLoading}>
            {isLoading ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول"}
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
