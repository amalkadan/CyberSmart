import React, { useState } from 'react';
import '../style/TeacherMessages.css';

export default function TeacherMessages() {
  // نوع المستلم: 'class' (صف كامل) أو 'students' (طلاب محددين)
  const [targetType, setTargetType] = useState('class');
  const [selectedTarget, setSelectedTarget] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // قائمة وهمية للأرشيف كبداية
  const [messagesHistory, setMessagesHistory] = useState([
    { id: 1, title: 'تذكير بموعد الامتحان', target: 'الصف السابع (أ)', date: '2026-09-28' },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert('يرجى كتابة عنوان ورسالة قبل الإرسال');
      return;
    }

    const newMessage = {
      id: Date.now(),
      title: title,
      target: selectedTarget || (targetType === 'class' ? 'جميع الصفوف' : 'طالب محدد'),
      date: new Date().toLocaleDateString('ar-EG'),
    };

    // إضافة الرسالة للأرشيف وتنظيف الحقول
    setMessagesHistory([newMessage, ...messagesHistory]);
    setTitle('');
    setContent('');
    setSelectedTarget('');
    alert('تم إرسال الرسالة بنجاح!');
  };

  return (
    <div className="teacher-messages-container">
      <h2 className="page-title">إرسال الرسائل والإشعارات</h2>

      <div className="messages-grid">
        {/* قسم إنشاء وتعبئة الرسالة */}
        <div className="card message-form-card">
          <h3>إنشاء رسالة جديدة</h3>
          <form onSubmit={handleSubmit}>
            {/* اختيار طريقة الإرسال */}
            <div className="form-group">
              <label className="form-label">إرسال إلى:</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="targetType"
                    value="class"
                    checked={targetType === 'class'}
                    onChange={() => setTargetType('class')}
                  />
                  صف كامل
                </label>
                <label>
                  <input
                    type="radio"
                    name="targetType"
                    value="students"
                    checked={targetType === 'students'}
                    onChange={() => setTargetType('students')}
                  />
                  طلاب محددين
                </label>
              </div>
            </div>

            {/* القائمة المنسدلة لاختيار الصف أو الطالب */}
            <div className="form-group">
              <label className="form-label">
                {targetType === 'class' ? 'اختر الصف:' : 'اختر الطالب:'}
              </label>
              <select
                className="form-control"
                value={selectedTarget}
                onChange={(e) => setSelectedTarget(e.target.value)}
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
            </div>

            {/* عنوان الرسالة */}
            <div className="form-group">
              <label className="form-label">عنوان الرسالة:</label>
              <input
                type="text"
                className="form-control"
                placeholder="مثال: واجب مشروع العلوم"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* نص الرسالة */}
            <div className="form-group">
              <label className="form-label">نص الرسالة:</label>
              <textarea
                className="form-control textarea-control"
                rows="5"
                placeholder="اكتب تفاصيل الإشعار أو الرسالة هنا..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>

            <button type="submit" className="btn-send">
              إرسال الرسالة
            </button>
          </form>
        </div>

        {/* قسم سجل الرسائل المرسلة */}
        <div className="card history-card">
          <h3>الرسائل المرسلة مؤخراً</h3>
          <div className="history-list">
            {messagesHistory.length === 0 ? (
              <p className="empty-msg">لا توجد رسائل مرسلة بعد.</p>
            ) : (
              messagesHistory.map((item) => (
                <div key={item.id} className="history-item">
                  <h4>{item.title}</h4>
                  <div className="history-meta">
                    <span className="target-tag">إلى: {item.target}</span>
                    <span className="date-tag">{item.date}</span>
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