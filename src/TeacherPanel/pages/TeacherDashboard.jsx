
import React from 'react';
import Header from '../layouts/Header.jsx'; // استدعاء الهيدر
import '../style/TeacherDashboard.css'; // ملف التنسيق الخاص بالصفحة

import { FaUsers, FaCheckCircle, FaChartLine, FaExclamationTriangle } from 'react-icons/fa';

export default function TeacherDashboard() {


  return (
    <div className="dashboard-page">
      {/* 1. الشريط العلوي */}
      <Header />

      {/* 2. قسم بطاقات الإحصائيات (Stat Cards) */}
      <div className="stats-grid">
        {/* بطاقة 1 */}
        <div className="stat-card blue-card">
          <div className="card-header">
            <span className="card-title">إجمالي الطلاب</span>
            <div className="card-icon blue-icon"><FaUsers /></div>
          </div>
          <div className="card-value">32</div>
          <div className="card-subtitle">في 3 صفوف &gt;</div>
        </div>

        {/* بطاقة 2 */}
        <div className="stat-card green-card">
          <div className="card-header">
            <span className="card-title">الأنشطة المكتملة</span>
            <div className="card-icon green-icon"><FaCheckCircle /></div>
          </div>
          <div className="card-value">76%</div>
          <div className="card-subtitle">من إجمالي الأنشطة</div>
        </div>

        {/* بطاقة 3 */}
        <div className="stat-card lightblue-card">
          <div className="card-header">
            <span className="card-title">متوسط الدرجات</span>
            <div className="card-icon lightblue-icon"><FaChartLine /></div>
          </div>
          <div className="card-value">84%</div>
          <div className="card-subtitle">في جميع الصفوف</div>
        </div>

        {/* بطاقة 4 */}
        <div className="stat-card orange-card">
          <div className="card-header">
            <span className="card-title">طلاب يحتاجون متابعة</span>
            <div className="card-icon orange-icon"><FaExclamationTriangle /></div>
          </div>
          <div className="card-value orange-text">4</div>
          <div className="card-subtitle orange-text">يحتاجون إلى دعم إضافي &gt;</div>
        </div>
      </div>
    </div>
  );
}