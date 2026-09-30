import React, { useState } from 'react';
import '../style/TeacherMessages.css';

export default function TeacherMessages() {
  const [targetType, setTargetType] = useState('class');
  const [selectedTarget, setSelectedTarget] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState({});

  const [messagesHistory, setMessagesHistory] = useState([
    { id: 1, title: 'تذكير بموعد الامتحان', target: 'الصف السابع (أ)', date: '2026-09-28', type: 'class' },
  ]);

  const validate = () => {
    const newErrors = {};
    if (!selectedTarget) newErrors.target = targetType === 'class' ? 'اختر الصف' : 'اختر الطالب';
    if (!title.trim()) newErrors.title = 'العنوان مطلوب';
    if (!content.trim()) newErrors.content = 'النص مطلوب';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newMessage = {
      id: Date.now(),
      title,
      target: selectedTarget,
      date: new Date().toLocaleDateString('ar-EG'),
      type: targetType,
    };

    setMessagesHistory([newMessage, ...messagesHistory]);
    setTitle('');
    setContent('');
    setSelectedTarget('');
    setErrors({});
  };

  return (
    <div className="teacher-messages-container" dir="rtl">
      {/* 1. البنر العلوي */}
      <div className="messages-header-banner">
        <h2>إرسال الرسائل والإشعارات 💬</h2>
        <p>تواصل مع طلابك وأرسل الإشعارات بسهولة عبر المنصة.</p>
      </div>

      {/* 2. الشبكة */}
      <div className="messages-grid">

        {/* النموذج — أول عنصر (يمين في RTL) */}
        <div className="card message-form-card">
          <div className="card-header-title">
            <span className="card-icon">✏️</span>
            <h3>إنشاء رسالة جديدة</h3>
          </div>

          <form onSubmit={handleSubmit}>
            {/* نوع المستلم */}
            <div className="form-group">
              <label className="form-label">إرسال إلى:</label>
              <div className="radio-group">
                <label className={`radio-option ${targetType === 'class' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="targetType"
                    value="class"
                    checked={targetType === 'class'}
                    onChange={() => { setTargetType('class'); setSelectedTarget(''); }}
                  />
                  <span>🏫 صف كامل</span>
                </label>
                <label className={`radio-option ${targetType === 'students' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="targetType"
                    value="students"
                    checked={targetType === 'students'}
                    onChange={() => { setTargetType('students'); setSelectedTarget(''); }}
                  />
                  <span>👤 طلاب محددين</span>
                </label>
              </div>
            </div>

            {/* القائمة المنسدلة */}
            <div className="form-group">
              <label className="form-label">
                {targetType === 'class' ? 'اختر الصف:' : 'اختر الطالب:'}
              </label>
              <select
                className={`form-control ${errors.target ? 'error' : ''}`}
                value={selectedTarget}
                onChange={(e) => { setSelectedTarget(e.target.value); setErrors({ ...errors, target: '' }); }}
              >
                <option value="">-- اختر من القائمة --</option>
                {targetType === 'class' ? (
                  <>
                    <option value="الصف السابع (أ)">الصف السابع (أ)</option>
                    <option value="الصف الثامن (ب)">الصف الثامن (ب)</option>
                  </>
                ) : (
                  <>
                    <option value="أحمد محمود">أحمد محمود</option>
                    <option value="سارة علي">سارة علي</option>
                  </>
                )}
              </select>
              {errors.target && <span className="field-error">{errors.target}</span>}
            </div>

            {/* العنوان */}
            <div className="form-group">
              <label className="form-label">عنوان الرسالة:</label>
              <input
                type="text"
                className={`form-control ${errors.title ? 'error' : ''}`}
                placeholder="مثال: واجب مشروع العلوم"
                value={title}
                onChange={(e) => { setTitle(e.target.value); setErrors({ ...errors, title: '' }); }}
              />
              {errors.title && <span className="field-error">{errors.title}</span>}
            </div>

            {/* النص */}
            <div className="form-group">
              <label className="form-label">نص الرسالة:</label>
              <textarea
                className={`form-control textarea-control ${errors.content ? 'error' : ''}`}
                rows="6"
                placeholder="اكتب تفاصيل الإشعار أو الرسالة هنا..."
                value={content}
                onChange={(e) => { setContent(e.target.value); setErrors({ ...errors, content: '' }); }}
              ></textarea>
              {errors.content && <span className="field-error">{errors.content}</span>}
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-send">
                <span>📤</span> إرسال الرسالة
              </button>
            </div>
          </form>
        </div>

        {/* السجل */}
        <div className="card history-card">
          <div className="card-header-title">
            <span className="card-icon">📨</span>
            <h3>الرسائل المرسلة مؤخراً</h3>
            <span className="history-count">{messagesHistory.length}</span>
          </div>

          <div className="history-list">
            {messagesHistory.length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon">📭</span>
                <p className="empty-msg">لا توجد رسائل مرسلة بعد.</p>
              </div>
            ) : (
              messagesHistory.map((item) => (
                <div key={item.id} className="history-item">
                  <div className="history-item-header">
                    <h4>{item.title}</h4>
                    <span className={`history-type-badge ${item.type}`}>
                      {item.type === 'class' ? '🏫' : '👤'}
                    </span>
                  </div>
                  <div className="history-meta">
                    <span className="target-tag">إلى: {item.target}</span>
                    <span className="date-tag">📅 {item.date}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}