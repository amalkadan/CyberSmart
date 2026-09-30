import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/TeacherSettings.css';

export default function TeacherSettings() {
  const navigate = useNavigate();

  // كل الإعدادات في state واحد
  const [settings, setSettings] = useState({
    fullName: 'أ. أحمد محمد',
    email: 'ahmed@cybersmart.com',
    subject: 'الأمن السيبراني',
    phone: '',
    language: 'ar',
    timezone: 'gmt3',
    emailNotif: true,
    homeworkNotif: true,
    promoNotif: false,
  });

  const [saved, setSaved] = useState(false);

  // دالة عامة لتحديث أي حقل
  const handleChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    // هنا بتربط بالـ API لاحقاً
    // await api.updateSettings(settings);
    console.log('Saving:', settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleCancel = () => {
    // إعادة تعيين للقيم الأصلية أو الرجوع
    navigate(-1);
  };

  return (
    <div className="settings-page">
      {/* الرأس */}
      <div className="settings-header">
        <div>
          <h1>إعدادات المعلم</h1>
          <p className="breadcrumb">الرئيسية / الإعدادات</p>
        </div>
      </div>

      {/* الشبكة */}
      <div className="settings-grid">

        {/* 1. الملف الشخصي */}
        <div className="card full-width">
          <div className="card-header">
            <div className="icon">👤</div>
            <div>
              <h3>الملف الشخصي</h3>
              <p>معلوماتك الأساسية الظاهرة للطلاب</p>
            </div>
          </div>

          <div className="profile-row">
            <div className="avatar">
              {settings.fullName.charAt(0) || '؟'}
            </div>
            <div className="profile-info">
              <h2>{settings.fullName}</h2>
              <p>{settings.email}</p>
            </div>
            <div className="profile-actions">
              <button className="btn btn-secondary">تغيير الصورة</button>
              <button className="btn btn-secondary">إزالة</button>
            </div>
          </div>
        </div>

        {/* 2. المعلومات الأكاديمية */}
        <div className="card">
          <div className="card-header">
            <div className="icon">🎓</div>
            <div>
              <h3>المعلومات الأكاديمية</h3>
              <p>بياناتك التعليمية</p>
            </div>
          </div>

          <div className="field">
            <label>الاسم الكامل</label>
            <input
              type="text"
              value={settings.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
            />
          </div>

          <div className="field">
            <label>البريد الإلكتروني</label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </div>

          <div className="field">
            <label>المادة</label>
            <select
              value={settings.subject}
              onChange={(e) => handleChange('subject', e.target.value)}
            >
              <option>الأمن السيبراني</option>
              <option>علوم الحاسب</option>
              <option>الرياضيات</option>
            </select>
          </div>

          <div className="field">
            <label>رقم الهاتف</label>
            <input
              type="tel"
              placeholder="+966 5X XXX XXXX"
              value={settings.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
          </div>
        </div>

        {/* 3. الإشعارات */}
        <div className="card">
          <div className="card-header">
            <div className="icon">🔔</div>
            <div>
              <h3>الإشعارات</h3>
              <p>تحكم بما يصلك</p>
            </div>
          </div>

          <div className="toggle-row">
            <div className="info">
              <strong>إشعارات البريد</strong>
              <span>تنبيهات على بريدك الإلكتروني</span>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={settings.emailNotif}
                onChange={(e) => handleChange('emailNotif', e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="toggle-row">
            <div className="info">
              <strong>إشعارات الواجبات</strong>
              <span>عند تسليم الطلاب للواجبات</span>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={settings.homeworkNotif}
                onChange={(e) => handleChange('homeworkNotif', e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="toggle-row">
            <div className="info">
              <strong>الرسائل الترويجية</strong>
              <span>عروض وأخبار المنصة</span>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={settings.promoNotif}
                onChange={(e) => handleChange('promoNotif', e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        {/* 4. المظهر واللغة */}
        <div className="card">
          <div className="card-header">
            <div className="icon">🎨</div>
            <div>
              <h3>المظهر واللغة</h3>
              <p>تفضيلات العرض</p>
            </div>
          </div>

          <div className="field">
            <label>اللغة</label>
            <select
              value={settings.language}
              onChange={(e) => handleChange('language', e.target.value)}
            >
              <option value="ar">العربية</option>
              <option value="en">English</option>
            </select>
          </div>

          <div className="field">
            <label>المنطقة الزمنية</label>
            <select
              value={settings.timezone}
              onChange={(e) => handleChange('timezone', e.target.value)}
            >
              <option value="gmt3">(GMT+3) الرياض</option>
              <option value="gmt2">(GMT+2) القاهرة</option>
              <option value="gmt0">(GMT+0) لندن</option>
            </select>
          </div>
        </div>

        {/* 5. منطقة الخطر */}
        <div className="card">
          <div className="card-header">
            <div className="icon" style={{ background: 'rgba(239,68,68,0.15)' }}>⚠️</div>
            <div>
              <h3>منطقة الخطر</h3>
              <p>إجراءات لا يمكن التراجع عنها</p>
            </div>
          </div>

          <p style={{ fontSize: 13, color: '#a8c5e0', marginBottom: 16, lineHeight: 1.6 }}>
            حذف الحساب سيؤدي إلى إزالة جميع بياناتك وبيانات طلابك نهائياً.
          </p>

          <button className="btn btn-danger btn-block">
            حذف الحساب نهائياً
          </button>
        </div>

      </div>

      {/* شريط الحفظ */}
      <div className="save-bar">
        <p>{saved ? '✅ تم الحفظ بنجاح' : '💾 لا تنسَ حفظ تغييراتك'}</p>
        <div className="actions">
          <button className="btn btn-secondary" onClick={handleCancel}>
            إلغاء
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            حفظ التغييرات
          </button>
        </div>
      </div>
    </div>
  );
}