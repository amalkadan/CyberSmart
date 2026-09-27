import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/TeacherActivities.css';

// استيراد الصور (تأكد من وجود الصور بهذه الأسماء في مجلد img)
import heroImg from '../img/hero-shield.jpg';
import phishingImg from '../img/phishing-card.jpg';
import passwordImg from '../img/password-card.jpg';
import decisionImg from '../img/decision-card.png';

export default function TeacherActivities() {
  const navigate = useNavigate();

  const activities = [
    {
      id: 'phishing',
      title: 'اكتشف التصيّد',
      path: '/teacher/activities/phishing',
      imgSrc: phishingImg
    },
    {
      id: 'password',
      title: 'اختبر كلمة المرور',
      path: '/teacher/activities/password',
      imgSrc: passwordImg
    },
    {
      id: 'decision',
      title: 'اختر القرار الآمن',
      path: '/teacher/activities/decision',
      imgSrc: decisionImg
    }
  ];

  return (
    <div className="activities-container" dir="rtl">
      
      {/* البنر العلوي */}
      <div className="hero-banner">
        <div className="hero-content">
          <div className="hero-text">
            <h1>كن ذكيًا على الإنترنت</h1>
            <p>تعلم كيف تحمي نفسك والعالم الرقمي من حولك</p>
          </div>
          {/* <button className="hero-btn">ابدأ الآن ←</button> */}
        </div>
        <div className="hero-image-wrapper">
          <img src={heroImg} alt="شخصية حماية الإنترنت" className="hero-mascot-img" />
        </div>
      </div>

      {/* شبكة البطاقات المصورة مع عناوين الألعاب فوقها */}
      <div className="activities-cards-grid">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="image-card-btn"
            onClick={() => navigate(activity.path)}
          >
            <img src={activity.imgSrc} alt={activity.title} className="card-full-image" />
            
            {/* طبقة تراكب تظهر اسم اللعبة وزر التفاعل فوق الصورة */}
            <div className="card-overlay">
              <h3 className="card-title">{activity.title}</h3>
              <div className="card-action">
                <span>ابدأ اللعب</span>
                <span className="arrow-btn">←</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}