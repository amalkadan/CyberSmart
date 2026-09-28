// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../style/TeacherActivities.css';

// // استيراد الصور (تأكد من وجود الصور بهذه الأسماء في مجلد img)
// import heroImg from '../img/hero-shield.jpg';
// import phishingImg from '../img/phishing-card.jpg';
// import passwordImg from '../img/password-card.jpg';
// import decisionImg from '../img/decision-card.png';
// import monopolyImg from '../img/monopoly-card.jpeg';

// export default function TeacherActivities() {
//   const navigate = useNavigate();

//   const activities = [
//     {
//       id: 'phishing',
//       title: 'اكتشف التصيّد',
//       path: '/teacher/activities/phishing',
//       imgSrc: phishingImg
//     },
//     {
//       id: 'password',
//       title: 'اختبر كلمة المرور',
//       path: '/teacher/activities/password',
//       imgSrc: passwordImg
//     },
//     {
//       id: 'decision',
//       title: 'اختر القرار الآمن',
//       path: '/teacher/activities/decision',
//       imgSrc: decisionImg
//     },
//     {
//       id: 'monopoly',
//       title: 'لعبة المونوبولي',
//       path: '/teacher/activities/monopoly',
//       imgSrc: monopolyImg
//     }
//   ];

//   return (
//     <div className="activities-container" dir="rtl">
      
//       {/* البنر العلوي */}
//       <div className="hero-banner">
//         <div className="hero-content">
//           <div className="hero-text">
//             <h1>كن ذكيًا على الإنترنت</h1>
//             <p>تعلم كيف تحمي نفسك والعالم الرقمي من حولك</p>
//           </div>
//           {/* <button className="hero-btn">ابدأ الآن ←</button> */}
//         </div>
//         <div className="hero-image-wrapper">
//           <img src={heroImg} alt="شخصية حماية الإنترنت" className="hero-mascot-img" />
//         </div>
//       </div>

//       {/* شبكة البطاقات المصورة مع عناوين الألعاب فوقها */}
//       <div className="activities-cards-grid">
//         {activities.map((activity) => (
//           <div
//             key={activity.id}
//             className="image-card-btn"
//             onClick={() => navigate(activity.path)}
//           >
//             <img src={activity.imgSrc} alt={activity.title} className="card-full-image" />
            
//             {/* طبقة تراكب تظهر اسم اللعبة وزر التفاعل فوق الصورة */}
//             <div className="card-overlay">
//               <h3 className="card-title">{activity.title}</h3>
//               <div className="card-action">
//                 <span>ابدأ اللعب</span>
//                 <span className="arrow-btn">←</span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//     </div>
//   );
// }


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../style/TeacherActivities.css';

// // استيراد الصور
// import heroImg from '../img/hero-shield.jpg';
// import phishingImg from '../img/phishing-card.jpg';
// import passwordImg from '../img/password-card.jpg';
// import decisionImg from '../img/decision-card.png';
// import monopolyImg from '../img/monopoly-card.jpeg';

// export default function TeacherActivities() {
//   const navigate = useNavigate();

//   // حالات نافذة التعيين (Modal)
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedActivity, setSelectedActivity] = useState('');
//   const [dueDate, setDueDate] = useState('');
//   const [selectedClass, setSelectedClass] = useState('');

//   const activities = [
//     { id: 'phishing', title: 'اكتشف التصيّد', path: '/teacher/activities/phishing', imgSrc: phishingImg },
//     { id: 'password', title: 'اختبر كلمة المرور', path: '/teacher/activities/password', imgSrc: passwordImg },
//     { id: 'decision', title: 'اختر القرار الآمن', path: '/teacher/activities/decision', imgSrc: decisionImg },
//     { id: 'monopoly', title: 'لعبة المونوبولي', path: '/teacher/activities/monopoly', imgSrc: monopolyImg }
//   ];

//   // فتح نافذة التعيين مباشرة عند النقر أو اختيار نشاط محدد
//   const handleOpenAssignModal = (activityId = '') => {
//     setSelectedActivity(activityId);
//     setIsModalOpen(true);
//   };

//   const handleAssignSubmit = (e) => {
//     e.preventDefault();
//     // هنا يتم ربط API لإرسال النشاط للطلاب
//     alert(`تم تعيين النشاط بنجاح للصف: ${selectedClass}`);
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="activities-container" dir="rtl">
      
//       {/* البنر العلوي */}
//       <div className="hero-banner">
//         <div className="hero-content">
//           <div className="hero-text">
//             <h1>كن ذكيًا على الإنترنت</h1>
//             <p>تعلم كيف تحمي نفسك والعالم الرقمي من حولك</p>
//           </div>
//           <button className="hero-btn" onClick={() => handleOpenAssignModal()}>
//             + تعيين نشاط جديد
//           </button>
//         </div>
//         <div className="hero-image-wrapper">
//           <img src={heroImg} alt="شخصية حماية الإنترنت" className="hero-mascot-img" />
//         </div>
//       </div>

//       {/* شبكة بطاقات الألعاب
//       <div className="activities-cards-grid">
//         {activities.map((activity) => (
//           <div key={activity.id} className="image-card-btn">
//             <img src={activity.imgSrc} alt={activity.title} className="card-full-image" />
            
//             <div className="card-overlay">
//               <h3 className="card-title">{activity.title}</h3>
//               <div className="card-actions-wrapper">
//                 <button 
//                   className="card-preview-btn"
//                   onClick={() => navigate(activity.path)}
//                 >
//                   معاينة اللعبة
//                 </button>
//                 <button 
//                   className="card-assign-btn"
//                   onClick={() => handleOpenAssignModal(activity.id)}
//                 >
//                   تعيين للطلاب ←
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div> */}

//        <div className="activities-cards-grid">
//         {activities.map((activity) => (
//           <div
//             key={activity.id}
//             className="image-card-btn"
//             onClick={() => navigate(activity.path)}
//           >
//             <img src={activity.imgSrc} alt={activity.title} className="card-full-image" />
            
//             {/* طبقة تراكب تظهر اسم اللعبة وزر التفاعل فوق الصورة */}
//             <div className="card-overlay">
//               <h3 className="card-title">{activity.title}</h3>
//               <div className="card-action">
//                 <span>معاينة اللعبة</span>
//                 <span className="arrow-btn">←</span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>


//       {/* نافذة تعيين النشاط (Modal) المطابقة للديزاين المطلوب */}
//       {isModalOpen && (
//         <div className="modal-overlay">
//           <div className="assign-modal-card">
//             <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>✕</button>
            
//             <div className="modal-header">
//               <div className="modal-icon">
//                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
//                   <polyline points="14 2 14 8 20 8"></polyline>
//                   <line x1="12" y1="18" x2="12" y2="12"></line>
//                   <line x1="9" y1="15" x2="15" y2="15"></line>
//                 </svg>
//               </div>
//               <h2>تعيين نشاط</h2>
//             </div>
//             <p className="modal-subtitle">اختر نشاطاً من أنشطة السلامة الرقمية لتعيينه إلى الصف.</p>

//             <form onSubmit={handleAssignSubmit} className="assign-form">
//               {/* اختيار الصف */}
//               <div className="form-group">
//                 <label>الصف المستهدف</label>
//                 <div className="input-wrapper">
//                   <span className="input-icon">🏫</span>
//                   <select 
//                     value={selectedClass} 
//                     onChange={(e) => setSelectedClass(e.target.value)}
//                     required
//                   >
//                     <option value="" disabled>اختر الصف</option>
//                     <option value="class-1">الصف الخامس (أ)</option>
//                     <option value="class-2">الصف السادس (ب)</option>
//                   </select>
//                 </div>
//               </div>

//               {/* اختيار النشاط */}
//               <div className="form-group">
//                 <label>اختيار النشاط</label>
//                 <div className="input-wrapper">
//                   <span className="input-icon">📖</span>
//                   <select 
//                     value={selectedActivity} 
//                     onChange={(e) => setSelectedActivity(e.target.value)}
//                     required
//                   >
//                     <option value="" disabled>اختر النشاط</option>
//                     {activities.map((act) => (
//                       <option key={act.id} value={act.id}>{act.title}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               {/* تاريخ التسليم */}
//               <div className="form-group">
//                 <label>تاريخ التسليم</label>
//                 <div className="input-wrapper">
//                   <span className="input-icon">📅</span>
//                   <input 
//                     type="date" 
//                     value={dueDate} 
//                     onChange={(e) => setDueDate(e.target.value)}
//                     required 
//                   />
//                 </div>
//               </div>

//               <button type="submit" className="submit-assign-btn">
//                 <span>إرسال للصف</span>
//                 <span className="send-icon">➤</span>
//               </button>
//             </form>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }

// تعديل 2 

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../style/TeacherActivities.css';

// // استيراد الصور
// import heroImg from '../img/hero-shield.jpg';
// import phishingImg from '../img/phishing-card.jpg';
// import passwordImg from '../img/password-card.jpg';
// import decisionImg from '../img/decision-card.png';
// import monopolyImg from '../img/monopoly-card.jpeg';

// export default function TeacherActivities() {
//   const navigate = useNavigate();

//   // حالات نافذة التعيين (Modal)
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedActivity, setSelectedActivity] = useState('');
//   const [dueDate, setDueDate] = useState('');
//   const [selectedClass, setSelectedClass] = useState('');
//   const [loading, setLoading] = useState(false);

//   const activities = [
//     { id: 'phishing', title: 'اكتشف التصيّد', path: '/teacher/activities/phishing', imgSrc: phishingImg },
//     { id: 'password', title: 'اختبر كلمة المرور', path: '/teacher/activities/password', imgSrc: passwordImg },
//     { id: 'decision', title: 'اختر القرار الآمن', path: '/teacher/activities/decision', imgSrc: decisionImg },
//     { id: 'monopoly', title: 'لعبة المونوبولي', path: '/teacher/activities/monopoly', imgSrc: monopolyImg }
//   ];

//   // فتح نافذة التعيين مباشرة عند النقر أو اختيار نشاط محدد
//   const handleOpenAssignModal = (activityId = '') => {
//     setSelectedActivity(activityId);
//     setIsModalOpen(true);
//   };

//   // دالة تعيين النشاط وإرسال الطلب إلى الـ Backend
//   const handleAssignSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // إرسال طلب فتح/تعيين النشاط للـ Backend
//       const response = await fetch(`http://localhost:4000/teacher/activities/${selectedActivity}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//         body: JSON.stringify({
//           isOpen: true,
//           classId: selectedClass,
//           dueDate: dueDate,
//         }),
//       });

//       if (response.ok) {
//         alert('تم فتح وتعيين النشاط بنجاح للطلاب!');
//         setIsModalOpen(false);
//         // إعادة إرساء القيم الإفتراضية
//         setSelectedActivity('');
//         setDueDate('');
//         setSelectedClass('');
//       } else {
//         const errorData = await response.json();
//         alert(errorData.message || 'حدث خطأ أثناء تعيين النشاط.');
//       }
//     } catch (error) {
//       console.error('خطأ في تعيين النشاط:', error);
//       alert('تعذر الاتصال بالسيرفر، يُرجى المحاولة لاحقاً.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="activities-container" dir="rtl">
//       {/* البنر العلوي */}
//       <div className="hero-banner">
//         <div className="hero-content">
//           <div className="hero-text">
//             <h1>كن ذكيًا على الإنترنت</h1>
//             <p>تعلم كيف تحمي نفسك والعالم الرقمي من حولك</p>
//           </div>
//           <button className="hero-btn" onClick={() => handleOpenAssignModal()}>
//             + تعيين نشاط جديد
//           </button>
//         </div>
//         <div className="hero-image-wrapper">
//           <img src={heroImg} alt="شخصية حماية الإنترنت" className="hero-mascot-img" />
//         </div>
//       </div>

//       {/* شبكة بطاقات الألعاب */}
//       <div className="activities-cards-grid">
//         {activities.map((activity) => (
//           <div
//             key={activity.id}
//             className="image-card-btn"
//             onClick={() => navigate(activity.path)}
//           >
//             <img src={activity.imgSrc} alt={activity.title} className="card-full-image" />

//             {/* طبقة تراكب تظهر اسم اللعبة وزر التفاعل فوق الصورة */}
//             <div className="card-overlay">
//               <h3 className="card-title">{activity.title}</h3>
//               <div className="card-action">
//                 <span>معاينة اللعبة</span>
//                 <span className="arrow-btn">←</span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* نافذة تعيين النشاط (Modal) */}
//       {isModalOpen && (
//         <div className="modal-overlay">
//           <div className="assign-modal-card">
//             <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
//               ✕
//             </button>

//             <div className="modal-header">
//               <div className="modal-icon">
//                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
//                   <polyline points="14 2 14 8 20 8"></polyline>
//                   <line x1="12" y1="18" x2="12" y2="12"></line>
//                   <line x1="9" y1="15" x2="15" y2="15"></line>
//                 </svg>
//               </div>
//               <h2>تعيين نشاط</h2>
//             </div>
//             <p className="modal-subtitle">اختر نشاطاً من أنشطة السلامة الرقمية لتعيينه إلى الصف.</p>

//             <form onSubmit={handleAssignSubmit} className="assign-form">
//               {/* اختيار الصف */}
//               <div className="form-group">
//                 <label>الصف المستهدف</label>
//                 <div className="input-wrapper">
//                   <span className="input-icon">🏫</span>
//                   <select 
//                     value={selectedClass} 
//                     onChange={(e) => setSelectedClass(e.target.value)}
//                     required
//                   >
//                     <option value="" disabled>اختر الصف</option>
//                     <option value="class-1">الصف الخامس (أ)</option>
//                     <option value="class-2">الصف السادس (ب)</option>
//                   </select>
//                 </div>
//               </div>

//               {/* اختيار النشاط */}
//               <div className="form-group">
//                 <label>اختيار النشاط</label>
//                 <div className="input-wrapper">
//                   <span className="input-icon">📖</span>
//                   <select 
//                     value={selectedActivity} 
//                     onChange={(e) => setSelectedActivity(e.target.value)}
//                     required
//                   >
//                     <option value="" disabled>اختر النشاط</option>
//                     {activities.map((act) => (
//                       <option key={act.id} value={act.id}>{act.title}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               {/* تاريخ التسليم */}
//               <div className="form-group">
//                 <label>تاريخ التسليم</label>
//                 <div className="input-wrapper">
//                   <span className="input-icon">📅</span>
//                   <input 
//                     type="date" 
//                     value={dueDate} 
//                     onChange={(e) => setDueDate(e.target.value)}
//                     required 
//                   />
//                 </div>
//               </div>

//               <button type="submit" className="submit-assign-btn" disabled={loading}>
//                 <span>{loading ? 'جاري الإرسال...' : 'إرسال للصف'}</span>
//                 <span className="send-icon">➤</span>
//               </button>
//             </form>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }



// تعديل 3 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/TeacherActivities.css';

// استيراد الصور
import heroImg from '../img/hero-shield.jpg';
import phishingImg from '../img/phishing-card.jpg';
import passwordImg from '../img/password-card.jpg';
import decisionImg from '../img/decision-card.png';
import monopolyImg from '../img/monopoly-card.jpeg';
import unoImg from '../img/Uno_Cyber.jpeg'; // صورة لعبة UNO السيبرانية

export default function TeacherActivities() {
  const navigate = useNavigate();

  // حالات نافذة التعيين (Modal)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [loading, setLoading] = useState(false);

  const staticActivities = [
    { id: 'phishing', title: 'اكتشف التصيّد', path: '/teacher/activities/phishing', imgSrc: phishingImg },
    { id: 'password', title: 'اختبر كلمة المرور', path: '/teacher/activities/password', imgSrc: passwordImg },
    { id: 'decision', title: 'اختر القرار الآمن', path: '/teacher/activities/decision', imgSrc: decisionImg },
    { id: 'monopoly', title: 'Monopoly', path: '/teacher/activities/monopoly', imgSrc: monopolyImg },
    { id: 'uno', title: 'UNO Cyber', path: '/teacher/activities/uno', imgSrc: unoImg }

  ];

  // فتح نافذة التعيين
  const handleOpenAssignModal = (activityId = '') => {
    setSelectedActivity(activityId);
    setIsModalOpen(true);
  };

  // دالة تعيين النشاط وفتحه للطلاب في الـ Backend
  const handleAssignSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:4000/teacher/activities/${selectedActivity}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          isOpen: true,
          classId: selectedClass,
          dueDate: dueDate,
        }),
      });

      if (response.ok) {
        alert('تم فتح وتعيين النشاط بنجاح للطلاب!');
        setIsModalOpen(false);
        setSelectedActivity('');
        setDueDate('');
        setSelectedClass('');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'حدث خطأ أثناء تعيين النشاط.');
      }
    } catch (error) {
      console.error('خطأ في تعيين النشاط:', error);
      alert('تعذر الاتصال بالسيرفر، يُرجى المحاولة لاحقاً.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="activities-container" dir="rtl">
      {/* البنر العلوي */}
      <div className="hero-banner">
        <div className="hero-content">
          <div className="hero-text">
            <h1>كن ذكيًا على الإنترنت</h1>
            <p>تعلم كيف تحمي نفسك والعالم الرقمي من حولك</p>
          </div>
          <button className="hero-btn" onClick={() => handleOpenAssignModal()}>
            + تعيين نشاط جديد
          </button>
        </div>
        <div className="hero-image-wrapper">
          <img src={heroImg} alt="شخصية حماية الإنترنت" className="hero-mascot-img" />
        </div>
      </div>

      {/* شبكة بطاقات الألعاب - بدون شارات القفل للمعلم */}
      <div className="activities-cards-grid">
        {staticActivities.map((activity) => (
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
                <span>معاينة اللعبة</span>
                <span className="arrow-btn">←</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* نافذة تعيين النشاط (Modal) */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="assign-modal-card">
            <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
              ✕
            </button>

            <div className="modal-header">
              <div className="modal-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="12" y1="18" x2="12" y2="12"></line>
                  <line x1="9" y1="15" x2="15" y2="15"></line>
                </svg>
              </div>
              <h2>تعيين نشاط</h2>
            </div>
            <p className="modal-subtitle">اختر نشاطاً من أنشطة السلامة الرقمية لتعيينه وفتحه للصف.</p>

            <form onSubmit={handleAssignSubmit} className="assign-form">
              {/* اختيار الصف */}
              <div className="form-group">
                <label>الصف المستهدف</label>
                <div className="input-wrapper">
                  <span className="input-icon">🏫</span>
                  <select 
                    value={selectedClass} 
                    onChange={(e) => setSelectedClass(e.target.value)}
                    required
                  >
                    <option value="" disabled>اختر الصف</option>
                    <option value="class-1">الصف السابع</option>
                    <option value="class-2">الصف الثامن</option>
                    <option value="class-3">الصف التاسع</option>

                  </select>
                </div>
              </div>

              {/* اختيار النشاط */}
              <div className="form-group">
                <label>اختيار النشاط</label>
                <div className="input-wrapper">
                  <span className="input-icon">📖</span>
                  <select 
                    value={selectedActivity} 
                    onChange={(e) => setSelectedActivity(e.target.value)}
                    required
                  >
                    <option value="" disabled>اختر النشاط</option>
                    {staticActivities.map((act) => (
                      <option key={act.id} value={act.id}>{act.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* تاريخ التسليم */}
              <div className="form-group">
                <label>تاريخ التسليم</label>
                <div className="input-wrapper">
                  <span className="input-icon">📅</span>
                  <input 
                    type="date" 
                    value={dueDate} 
                    onChange={(e) => setDueDate(e.target.value)}
                    required 
                  />
                </div>
              </div>

              <button type="submit" className="submit-assign-btn" disabled={loading}>
                <span>{loading ? 'جاري الإرسال...' : 'إرسال للصف وفتح اللعبة'}</span>
                <span className="send-icon">➤</span>
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}