import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPanel.css";
import background from "../TeacherPanel/img/CyberSmartImgbackground.jpeg";
import logoImg from "../TeacherPanel/img/logoCyberSmart.jpeg"


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
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: email.trim(),
          password,
          accountType,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(
          response.status === 401
            ? "البريد الإلكتروني أو كلمة المرور غير صحيحة"
            : "تعذر تسجيل الدخول، حاول مرة أخرى"
        );
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
      setError("تعذر الاتصال بالخادم، حاول مرة أخرى");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className="login-page-wrapper"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* تم إزالة الشعار والنصوص العلوية لأنها موجودة في الصورة */}

    {/* <div className="top-left-brand">
        <div className="brand-icon">
          <svg width="230" height="250" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"/>
          </svg>
          
        </div>
        <h1 className="brand-name">
          <span className="brand-cyber">Cyber </span>
          <span className="brand-smart">Smart</span>
        </h1>
      </div> */}

      <div className="top-left-brand">
        <img src={logoImg} alt="CyberSmart Logo" className="brand-logo-img" />
        <h1 className="brand-name">
          <span className="brand-cyber">Cyber</span>
          <span className="brand-smart">Smart</span>
        </h1>
      </div>

      
      <div className="login-panel" dir="rtl">
        <section className="login-card">
          {/* تم إزالة العنوان "مرحباً بك" لأنه موجود في الصورة */}

        <div className="login-heading">
          <h2>مرحبًا بعودتك!</h2>
          <p>سجل الدخول وابدأ التعلم</p>
        </div>



          <div className="account-type">
            <button
              className={`account-button ${accountType === "student" ? "active" : ""}`}
              type="button"
              onClick={() => setAccountType("student")}
            >
          🎓 أنا طالب
            </button>
            <button
              className={`account-button ${accountType === "teacher" ? "active" : ""}`}
              type="button"
              onClick={() => setAccountType("teacher")}
            >
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

            {error && (
              <p role="alert" style={{ color: "#ef4444", fontSize: "14px", margin: "0 0 12px", textAlign: "center" }}>
                {error}
              </p>
            )}

            <button className="submit-login-button" type="submit" disabled={isLoading}>
              {isLoading ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول"}
              <span>←</span>
            </button>
          </form>

          <div className="register-area">
            <button className="register-button" type="button">
              إنشاء حساب جديد
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default LoginPanel;