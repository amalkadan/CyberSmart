import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "/src/TeacherPanel/style/PhishingGame.css";
import heroMascot from "/src/TeacherPanel/img/hero-shield.jpg";
import gameBg from "/src/TeacherPanel/img/game-bg.jpg";

const mockQuestions = [
  {
    id: 1,
    title: 'مبروك! ربحت هاتفًا جديدًا',
    sender: 'من: فريق الجوائز المميزة',
    time: 'اليوم 10:24 ص',
    body: 'اضغط على الرابط الآن وأدخل كلمة المرور لاستلام جائزتك',
    link: 'https://prize-example.test/claim',
    isPhishing: true,
    hints: [
      { text: 'روابط مريبة', icon: '🔗' },
      { text: 'وعود غير واقعية', icon: '🎁' },
      { text: 'تطلب معلومات حساسة', icon: '🔒' }
    ],
    explanation: 'لا تضغط على الرابط، وأخبر شخصًا بالغًا أو معلّمًا!'
  },
  {
    id: 2,
    title: 'تأكيد الحجز المالي',
    sender: 'من: بنك فلسطين الإلكتروني',
    time: 'أمس 02:15 م',
    body: 'تم تحويل مبلغ 50 شيكل لحسابك. للاطلاع على تفاصيل المعاملة يرجى الدخول لموقع البنك الرسمي.',
    link: 'https://www.bankofpalestine.com',
    isPhishing: false,
    hints: [
      { text: 'رابط آمن وموثوق', icon: '✅' },
      { text: 'لا يطلب كلمة المرور', icon: '🛡️' }
    ],
    explanation: 'رسالة آمنة وتنويه من جهة موثوقة بدون طلب معلومات شخصية حساسة.'
  }
];

export default function PhishingGame({ returnPath = '/teacher/activities' }) {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [pointChange, setPointChange] = useState(0);

  const currentQ = mockQuestions[currentIndex];
  const totalQuestions = mockQuestions.length;

  const handleAnswer = (isPhishingChoice) => {
    if (selectedAnswer !== null) return;

    const isCorrect = isPhishingChoice === currentQ.isPhishing;
    if (isCorrect) {
      setSelectedAnswer('correct');
      setPointChange(+20);
      setScore(prev => prev + 20);
    } else {
      setSelectedAnswer('wrong');
      setPointChange(-10);
      setScore(prev => Math.max(0, prev - 10));
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert(`انتهت اللعبة! مجموع نقاطك النهائي: ${score} نقطة ⭐️`);
      navigate(returnPath);
    }
  };

  return (
    <div 
      className="phishing-game-container" 
      dir="rtl"
      style={{
        backgroundImage: `linear-gradient(rgba(4, 9, 20, 0.75), rgba(4, 9, 20, 0.85)), url(${gameBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* الهيدر العلوي */}
      <div className="game-top-header">
        <button className="game-back-btn" onClick={() => navigate(returnPath)}>
          ← العودة للأنشطة
        </button>

        <div className="header-center-title">
          <h1 className="game-main-title">
            <span>🔍</span> اكتشف التصيّد
          </h1>
          
          <div className="progress-bar-wrapper">
            <div className="progress-line"></div>
            {mockQuestions.map((_, idx) => (
              <div 
                key={idx} 
                className={`progress-step-dot ${idx === currentIndex ? 'active' : ''} ${idx < currentIndex ? 'completed' : ''}`}
              />
            ))}
          </div>
          <span className="step-counter-text">السؤال {currentIndex + 1} من {totalQuestions}</span>
        </div>

        <div className="score-badge-box">
          <span className="star-icon">⭐</span>
          <span className="score-label">النتيجة:</span>
          <span className="score-value">{score} نقطة</span>
        </div>
      </div>

      {/* شاشة السؤال (بدون تلميحات مسبقة) */}
      {!selectedAnswer ? (
        <div className="game-center-content">
          
          {/* الشخصية الكرتونية (اليمين) */}
          <div className="mascot-side">
            <div className="mascot-frame">
              <img src={heroMascot} alt="الحارس الذكي" className="mascot-img-glow" />
              <span className="question-mark-badge">؟</span>
            </div>
          </div>

          {/* الكرت الأبيض للرسالة المعروضة (الوسط) */}
          <div className="email-card-box">
            <div className="email-card-header">
              <div className="email-title-group">
                <h2 className="email-title">{currentQ.title}</h2>
                <span className="email-sender-info">{currentQ.sender}</span>
                <span className="email-timestamp">{currentQ.time}</span>
              </div>
              <div className="email-gift-badge">🎁</div>
            </div>

            <div className="email-card-body">
              <p className="email-text-message">{currentQ.body}</p>
              {currentQ.link && (
                <div className="email-link-pill">
                  <span>🔗</span>
                  <span className="link-url-text">{currentQ.link}</span>
                </div>
              )}
            </div>
          </div>

        </div>
      ) : (
        /* شاشة التغذية الراجعة (تظهر التلميحات والأسباب هنا بعد الإجابة فقط) */
        <div className={`result-overlay-screen ${selectedAnswer}`}>
          <div className="result-card-content">
            <div className="result-banner">
              <span className="result-status-icon">
                {selectedAnswer === 'correct' ? '🛡️' : '⚠️'}
              </span>
              <h2 className="result-title">
                {selectedAnswer === 'correct' ? 'إجابة صحيحة!' : 'إجابة خاطئة!'}
              </h2>
              <div className={`points-pill ${selectedAnswer}`}>
                {pointChange > 0 ? `+${pointChange} نقطة 🎉` : `${pointChange} نقاط ❌`}
              </div>
            </div>

            <p className="result-subtitle">
              {currentQ.isPhishing ? 'هذه محاولة تصيّد!' : 'هذه رسالة آمنة!'}
            </p>

            {/* عرض التلميحات الأسباب للطالب بعد إجابته */}
            <div className="result-reasons-grid">
              {currentQ.hints.map((hint, i) => (
                <div key={i} className="reason-card">
                  <span className="reason-icon">{hint.icon}</span>
                  <span className="reason-text">{hint.text}</span>
                </div>
              ))}
            </div>

            <div className="result-tip-box">
              <span>💡</span> {currentQ.explanation}
            </div>

            <button className="next-question-btn" onClick={handleNext}>
              السؤال التالي ❮
            </button>
          </div>
        </div>
      )}

      {/* أزرار الإجابة التفاعلية في الأسفل */}
      {!selectedAnswer && (
        <div className="game-footer-controls">
          <div className="action-buttons-group">
            <button 
              className="game-btn phishing-danger-btn"
              onClick={() => handleAnswer(true)}
            >
              <span>⚠️</span> محاولة تصيّد <span>❮</span>
            </button>

            <button 
              className="game-btn safe-success-btn"
              onClick={() => handleAnswer(false)}
            >
              <span>✓</span> رسالة آمنة <span>❯</span>
            </button>
          </div>

          <div className="think-bubble-pill">
            <span>💡</span> فكر قبل أن تنقر
          </div>
        </div>
      )}

    </div>
  );
}