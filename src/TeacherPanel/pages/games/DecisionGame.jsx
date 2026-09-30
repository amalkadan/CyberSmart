import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "/src/TeacherPanel/style/PhishingGame.css";
import heroMascot from "/src/TeacherPanel/img/hero-shield.jpg";
import gameBg from "/src/TeacherPanel/img/game-bg.jpg";

export default function DecisionGame({ returnPath = '/teacher/activities' }) {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [pointChange, setPointChange] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:4000/questions');

        const rawData = Array.isArray(response.data)
          ? response.data
          : (response.data.questions || []);

        // نأخذ فقط أسئلة لعبة "اختر القرار الآمن"
        const filtered = rawData.filter(
          q => q.category && q.category.includes("الاختبار الامن")
        );

        const formattedQuestions = filtered.map((item, index) => {
          const rawOptions =
            item.answers ||
            item.options ||
            item.choices ||
            [];

          const correctIdx = Number(item.correctAnswerIndex);

          return {
            id: item._id || index + 1,

            questionText:
              item.text ||
              item.questionText ||
              item.question ||
              '',

            options: rawOptions,

            correctAnswerIndex: correctIdx,

            hints: item.hints || [
              {
                text: 'فكر في سلامتك وخصوصيتك قبل اتخاذ القرار',
                icon: '🛡️'
              },
              {
                text: 'تأكد من أن التصرف لا يعرضك أو يعرض الآخرين للخطر',
                icon: '🔍'
              }
            ],

            explanation:
              item.explanation ||
              'اختر دائمًا التصرف الذي يحافظ على سلامتك وخصوصيتك.'
          };
        });

        setQuestions(formattedQuestions);

      } catch (error) {
        console.error("خطأ في جلب بيانات الأسئلة:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (loading) {
    return (
      <div className="game-status-message">
        جاري تحميل الأسئلة...
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="game-status-message">
        لا توجد أسئلة متاحة حالياً.
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const totalQuestions = questions.length;

  const handleAnswerSelect = (optionIndex) => {
    if (selectedAnswer !== null) return;

    const isCorrect =
      optionIndex === currentQ.correctAnswerIndex;

    if (isCorrect) {
      setSelectedAnswer('correct');
      setPointChange(20);
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
      alert(
        `انتهت اللعبة! مجموع نقاطك النهائي: ${score} نقطة ⭐️`
      );

      navigate(returnPath);
    }
  };

  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <div
      className="phishing-game-container"
      dir="rtl"
      style={{
        backgroundImage: `linear-gradient(rgba(47, 54, 70, 0.85), rgba(4, 9, 20, 0.92)), url(${gameBg})`
      }}
    >

      {/* الهيدر العلوي */}
      <header className="game-top-header">

        <button
          className="game-back-btn"
          onClick={() => navigate(returnPath)}
        >
          ← العودة للأنشطة
        </button>

        <div className="header-center-title">

          <h1 className="game-main-title">
            <span>🛡️</span> اختر القرار الآمن
          </h1>

          <div className="progress-bar-wrapper">

            <div className="progress-line"></div>

            {questions.map((_, idx) => (
              <div
                key={idx}
                className={`progress-step-dot ${
                  idx === currentIndex ? 'active' : ''
                } ${
                  idx < currentIndex ? 'completed' : ''
                }`}
              />
            ))}

          </div>

          <span className="step-counter-text">
            السؤال {currentIndex + 1} من {totalQuestions}
          </span>

        </div>
      </header>

      {/* شاشة السؤال والخيارات */}
      {!selectedAnswer ? (

        <main className="game-center-content">

          <div className="question-card-wrapper">

            <div className="mascot-side">

              <div className="mascot-frame">

                <img
                  src={heroMascot}
                  alt="الحارس الذكي"
                  className="mascot-img-glow"
                />

                <span className="question-mark-badge">
                  ؟
                </span>

              </div>

            </div>

            <div className="email-card-box">

              <p className="email-text-message">
                {currentQ.questionText}
              </p>

            </div>

          </div>

          <div className="options-list-container">

            {currentQ.options.map((optionText, idx) => (

              <button
                key={idx}
                className="option-button"
                onClick={() => handleAnswerSelect(idx)}
              >

                <span className="option-text">
                  {optionText}
                </span>

                <span className="option-badge">
                  {optionLabels[idx] || idx + 1}
                </span>

              </button>

            ))}

          </div>

        </main>

      ) : (

        /* شاشة التغذية الراجعة والنتيجة */

        <section
          className={`result-overlay-screen ${selectedAnswer}`}
        >

          <div className="result-card-content">

            <div className="result-banner">

              <div className="score-badge-box">

                <span className="star-icon">
                  ⭐
                </span>

                <span className="score-label">
                  النتيجة:
                </span>

                <span className="score-value">
                  {score} نقطة
                </span>

              </div>

              <span className="result-status-icon">
                {selectedAnswer === 'correct'
                  ? '🛡️'
                  : '⚠️'}
              </span>

              <h2 className="result-title">

                {selectedAnswer === 'correct'
                  ? 'إجابة صحيحة!'
                  : 'إجابة خاطئة!'}

              </h2>

              <div
                className={`points-pill ${selectedAnswer}`}
              >
                {pointChange > 0
                  ? `+${pointChange} نقطة 🎉`
                  : `${pointChange} نقاط ❌`}
              </div>

            </div>

            <p className="result-subtitle">

              الإجابة الصحيحة هي:

              <strong>
                "{currentQ.options[currentQ.correctAnswerIndex]}"
              </strong>

            </p>

            <div className="result-reasons-grid">

              {currentQ.hints.map((hint, i) => (

                <div
                  key={i}
                  className="reason-card"
                >

                  <span className="reason-icon">
                    {hint.icon}
                  </span>

                  <span className="reason-text">
                    {hint.text}
                  </span>

                </div>

              ))}

            </div>

            <div className="result-tip-box">

              <span>💡</span>

              {currentQ.explanation}

            </div>

            <button
              className="next-question-btn"
              onClick={handleNext}
            >
              السؤال التالي ❮
            </button>

          </div>

        </section>

      )}

      {/* الشريط السفلي */}
      {!selectedAnswer && (

        <footer className="game-footer-controls">

          <div className="think-bubble-pill">
            <span>💡</span>
            اختر القرار الآمن من الخيارات أعلاه
          </div>

        </footer>

      )}

    </div>
  );
}
