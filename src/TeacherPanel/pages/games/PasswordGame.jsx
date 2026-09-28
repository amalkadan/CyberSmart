import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaLightbulb, FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import '/src/TeacherPanel/style/PasswordGame.css';

export default function PasswordGame() {
  const navigate = useNavigate();

  // نموذج للأسئلة (يمكنك تعديلها وإضافة المزيد لاحقاً)
  const questions = [
    {
      id: 1,
      question: "ما فائدة مولّد كلمات المرور؟",
      options: [
        { key: 'A', text: "إلغاء قفل الشاشة" },
        { key: 'B', text: "إنشاء كلمات عشوائية قوية" },
        { key: 'C', text: "مشاركة الحساب مع الآخرين" },
        { key: 'D', text: "استخدام اسمك تلقائياً" }
      ],
      correctAnswer: 'B'
    },
    {
      id: 2,
      question: "أي من كلمات المرور التالية تعتبر الأقوى والأكثر أماناً؟",
      options: [
        { key: 'A', text: "12345678" },
        { key: 'B', text: "password2024" },
        { key: 'C', text: "P@ss$3c3u!20" },
        { key: 'D', text: "ahmed123" }
      ],
      correctAnswer: 'C'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const currentQuestion = questions[currentIndex];

  const handleSelectOption = (optionKey) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentIndex]: optionKey
    });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="pw-game-container" dir="rtl">
      {/* 1. الهيدر وزر العودة */}
      <div className="pw-game-header">
        <button className="pw-back-btn" onClick={() => navigate('/teacher/activities')}>
          <FaArrowRight /> العودة للأنشطة
        </button>
      </div>

      {/* 2. عنوان اللعبة الرئيسي */}
      <div className="pw-game-title-section">
        <h2>{currentIndex + 1}. اختبر كلمة المرور</h2>
      </div>

      {/* 3. كرت السؤال الرئيسي الداكن */}
      <div className="pw-quiz-card">
        {/* أزرار التلميح والتنقل العلوية */}
        <div className="pw-card-top-bar">
          <button className="pw-hint-btn" title="تلميح">
            <FaLightbulb />
          </button>
          
          <div className="pw-nav-arrows">
            <button 
              className="pw-arrow-btn" 
              onClick={handleNext} 
              disabled={currentIndex === questions.length - 1}
            >
              <FaChevronRight />
            </button>
            <button 
              className="pw-arrow-btn" 
              onClick={handlePrev} 
              disabled={currentIndex === 0}
            >
              <FaChevronLeft />
            </button>
          </div>
        </div>

        {/* نص السؤال */}
        <div className="pw-question-text">
          <h3>{currentQuestion.question}</h3>
        </div>

        {/* قائمة الخيارات الأربعة */}
        <div className="pw-options-list">
          {currentQuestion.options.map((opt) => {
            const isSelected = selectedAnswers[currentIndex] === opt.key;
            return (
              <div 
                key={opt.key}
                className={`pw-option-item ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSelectOption(opt.key)}
              >
                <span className="pw-option-text">{opt.text}</span>
                <div className="pw-option-badge">{opt.key}</div>
              </div>
            );
          })}
        </div>

        {/* زر التالي السفلي */}
        <div className="pw-card-footer">
          <button 
            className="pw-next-btn" 
            onClick={handleNext}
            disabled={currentIndex === questions.length - 1}
          >
            التالي
          </button>
        </div>
      </div>
    </div>
  );
}