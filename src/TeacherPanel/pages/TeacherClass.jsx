import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/TeacherClasses.css';

export default function TeacherClasses() {
  const navigate = useNavigate();

  // قائمة الصفوف (يمكن ربطها مع الباك إند بسهولة)
  const [classes, setClasses] = useState([
    { id: 1, name: 'الصف الثامن أ', grade: 'الثامن', studentCount: 24,  },
    { id: 2, name: 'الصف الثامن ب', grade: 'الثامن', studentCount: 18, },
    { id: 3, name: 'الصف السابع ج', grade: 'السابع', studentCount: 30,  }
  ]);

  // حالات Modal إنشاء صف جديد
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [className, setClassName] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');

  // إضافة صف جديد
  const handleAddClass = (e) => {
    e.preventDefault();
    if (!className || !gradeLevel) return;

    const newClass = {
      id: Date.now(),
      name: className,
      grade: gradeLevel,
      studentCount: 0,
      code: `CS-${Math.floor(100 + Math.random() * 900)}`
    };

    setClasses([...classes, newClass]);
    setClassName('');
    setGradeLevel('');
    setIsModalOpen(false);
  };

  return (
    <div className="teacher-classes-container" dir="rtl">
      
      {/* البنر العلوي */}
      <div className="classes-header">
        <div>
          <h1>إدارة الصفوف الدراسية 🏫</h1>
          <p>يمكنك إنشاء الصفوف الجديدة ومتابعة عدد الطلاب ورموز الانضمام الخاصة بك.</p>
          <button className="add-class-btn" onClick={() => setIsModalOpen(true)}>
          + إضافة صف جديد
        </button>
        </div>

      </div>

     

      {/* شبكة بطاقات الصفوف */}
      <div className="classes-grid">
        {classes.map((cls) => (
          <div key={cls.id} className="class-card">
            <div className="class-card-header">
              <span className="class-tag">{cls.grade}</span>
            </div>
            
            <h2 className="class-title">{cls.name}</h2>
            
            <div className="class-info">
              <span>👥 {cls.studentCount} طالب</span>
            </div>

            {/* <div className="class-card-actions">
              <button 
                className="view-students-btn"
                onClick={() => navigate(`/teacher/students?classId=${cls.id}`)}
              >
                عرض الطلاب 👥
              </button>
            </div> */}
          </div>
        ))}
      </div>

      {/* نافذة إضافة صف جديد (Modal) */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="class-modal-card">
            <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>✕</button>

            <div className="modal-header">
              <div className="modal-icon">🏫</div>
              <h2>إضافة صف جديد</h2>
            </div>
            <p className="modal-subtitle">أدخل تفاصيل الصف لإنشائه وتوليد رمز انضمام خاص به.</p>

            <form onSubmit={handleAddClass} className="class-form">
              <div className="form-group">
                <label>اسم الصف</label>
                <input 
                  type="text" 
                  placeholder="مثال: الصف الثامن أ"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  required 
                />
              </div>

              <div className="form-group">
                <label>المرحلة / المستوى</label>
                <select 
                  value={gradeLevel}
                  onChange={(e) => setGradeLevel(e.target.value)}
                  required
                >
                  <option value="" disabled>اختر المستوى الدراسي</option>
                  <option value="السابع">السابع</option>
                  <option value="الثامن">الثامن</option>
                  <option value="التاسع">التاسع</option>
                </select>
              </div>

              <button type="submit" className="submit-class-btn">
                إنشاء الصف الآن
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}