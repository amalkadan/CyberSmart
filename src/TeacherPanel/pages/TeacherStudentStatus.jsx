import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/TeacherStudentStatus.css'; // تأكدي من إنشاء أو ربط ملف CSS هذا

export default function TeacherStudentStatus() {
  const navigate = useNavigate();

  // قائمة الصفوف المتاحة لاستخدامها في القوائم المنسدلة
  const [classesList] = useState([
    { id: '7c', name: 'الصف السابع' },
    { id: '8a', name: 'الصف الثامن' },
    { id: '9b', name: 'الصف التاسع' }
  ]);

  // قائمة الطلاب الافتراضية
  const [students, setStudents] = useState([
    { id: 1, name: 'أحمد محمود', classId: '7c', className: 'الصف السابع', email: 'ahmed@student.com', status: 'نشط' },
    { id: 2, name: 'سارة خالد', classId: '8a', className: 'الصف الثامن', email: 'sara@student.com', status: 'نشط' },
    { id: 3, name: 'محمد علي', classId: '9b', className: 'الصف التاسع', email: 'mohammed@student.com', status: 'غير نشط' }
  ]);

  // حالات البحث والفلترة
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClassFilter, setSelectedClassFilter] = useState('all');

  // حالات نافذة (Modal) إضافة طالب جديد
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentEmail, setNewStudentEmail] = useState('');
  const [newStudentClassId, setNewStudentClassId] = useState('');

  // دالة إضافة طالب جديد
  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!newStudentName || !newStudentClassId) return;

    const selectedClassObj = classesList.find(c => c.id === newStudentClassId);

    const newStudent = {
      id: Date.now(),
      name: newStudentName,
      email: newStudentEmail || 'لا يوجد بريد',
      classId: newStudentClassId,
      className: selectedClassObj ? selectedClassObj.name : '',
      status: 'نشط'
    };

    setStudents([...students, newStudent]);
    
    // إعادة تعيين الحقول وإغلاق النافذة
    setNewStudentName('');
    setNewStudentEmail('');
    setNewStudentClassId('');
    setIsModalOpen(false);
  };

  // فلترة الطلاب بناءً على البحث والصف المختار
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = selectedClassFilter === 'all' || student.classId === selectedClassFilter;
    return matchesSearch && matchesClass;
  });

  return (
    <div className="teacher-students-container" dir="rtl">
      
      {/* 1. الشريط العلوي (الهيدر) */}
      <div className="students-header-banner">
        <h2>إدارة الطلاب 👨‍🎓</h2>
        <p>يمكنك من هنا إضافة الطلاب، وتحديد صفوفهم، ومتابعة حركات انضمامهم للمنصة.</p>
        <button className="add-student-btn" onClick={() => setIsModalOpen(true)}>
          + إضافة طالب جديد
        </button>
      </div>


      {/* 3. أدوات البحث والفلترة */}
      <div className="controls-bar">
        <div className="search-box">
          <input 
            type="text" 
            placeholder="🔍 ابحث عن اسم الطالب..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-box">
          <select 
            value={selectedClassFilter} 
            onChange={(e) => setSelectedClassFilter(e.target.value)}
          >
            <option value="all">جميع الصفوف</option>
            {classesList.map(cls => (
              <option key={cls.id} value={cls.id}>{cls.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 4. جدول عرض الطلاب */}
      <div className="students-table-card">
        <table className="students-table">
          <thead>
            <tr>
              <th>اسم الطالب</th>
              <th>الصف الدراسي</th>
              <th>البريد الإلكتروني / الرمز</th>
              <th>الحالة</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td className="student-name-td">{student.name}</td>
                  <td><span className="class-badge">{student.className}</span></td>
                  <td>{student.email}</td>

                  <td>
                    <button 
                      className="delete-btn" 
                      onClick={() => setStudents(students.filter(s => s.id !== student.id))}
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data">لا يوجد طلاب يطابقون خيارات البحث.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 5. نافذة إضافة طالب جديد (Modal) */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="student-modal-card">
            <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>✕</button>

            <div className="modal-header">
              <div className="modal-icon">👤</div>
              <h2>إضافة طالب جديد</h2>
            </div>
            <p className="modal-subtitle">أدخل معلومات الطالب لتخصيصه لصف دراسي محدد.</p>

            <form onSubmit={handleAddStudent} className="student-form">
              <div className="form-group">
                <label>اسم الطالب الرباعي</label>
                <input 
                  type="text" 
                  placeholder="مثال: أحمد محمود علي" 
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  required 
                />
              </div>

              <div className="form-group">
                <label>الصف الدراسي</label>
                <select 
                  value={newStudentClassId} 
                  onChange={(e) => setNewStudentClassId(e.target.value)}
                  required
                >
                  <option value="" disabled>اختر الصف الذي ينتمي إليه الطالب</option>
                  {classesList.map((cls) => (
                    <option key={cls.id} value={cls.id}>{cls.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>البريد الإلكتروني (اختياري)</label>
                <input 
                  type="email" 
                  placeholder="student@example.com" 
                  value={newStudentEmail}
                  onChange={(e) => setNewStudentEmail(e.target.value)}
                />
              </div>

              <button type="submit" className="submit-student-btn">
                حفظ وإضافة الطالب
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}