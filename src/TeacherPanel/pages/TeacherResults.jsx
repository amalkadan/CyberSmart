import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import '../style/TeacherResults.css';

// تسجيل المكونات المطلوبة لـ Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function TeacherResults() {
  const navigate = useNavigate();

  // فلتر الصفوف للرسم البياني والجدول
  const [selectedClass, setSelectedClass] = useState('all');

  // بيانات نتائج الطلاب
  const [studentResults] = useState([
    { id: 2, name: 'سارة خالد', className: 'الصف السابع', classId: '7', score: 92, completedActivities: 10, totalActivities: 10, status: 'ممتاز' },
    { id: 3, name: 'محمد علي', className: 'الصف الثامن', classId: '8', score: 65, completedActivities: 6, totalActivities: 10, status: 'متوسط' },
    { id: 4, name: 'مريم يوسف', className:'الصف التاسع', classId: '9', score: 78, completedActivities: 7, totalActivities: 10, status: 'جيد جشداً' },
  ]);

  // إعدادات وبيانات الرسم البياني (Bar Chart)
  const chartData = {
    labels: ['الصف السابع', 'الصف الثامن', 'الصف التاسع'],
    datasets: [
      {
        label: 'إكمال الأنشطة (%)',
        data: [68, 72, 60],
        backgroundColor: '#38bdf8', // اللون الأزرق السماوي
        borderRadius: 8,
      },
      {
        label: 'متوسط الدرجات (%)',
        data: [76, 85, 71],
        backgroundColor: '#22c55e', // اللون الأخضر
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#cbd5e1',
          font: { family: 'system-ui', size: 13 },
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        rtl: true,
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          color: '#94a3b8',
          callback: (value) => `${value}%`,
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
      },
      x: {
        ticks: {
          color: '#cbd5e1',
          font: { size: 14 },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  // فلترة الطلاب بناءً على الاختيار
  const filteredStudents = selectedClass === 'all' 
    ? studentResults 
    : studentResults.filter(s => s.classId === selectedClass);

  return (
    <div className="teacher-results-container" dir="rtl">
      
      {/* 1. الشريط العلوي */}
      <div className="results-header-banner">
        <h2>نتائج وتقارير الطلاب 📊</h2>
        <p>متابعة تحليلية لمستوى تقدم الطلاب والصفوف في الأنشطة والتقييمات الرقمية.</p>
      </div>

      {/* 2. كروت الإحصائيات السريعة */}
      <div className="results-stats-grid">
        <div className="results-stat-card">
          <span className="stat-icon">📈</span>
          <div>
            <h3>متوسط الدرجات العام</h3>
            <p className="stat-number">77%</p>
          </div>
        </div>
        <div className="results-stat-card">
          <span className="stat-icon">✅</span>
          <div>
            <h3>نسبة إكمال الأنشطة</h3>
            <p className="stat-number">67%</p>
          </div>
        </div>
        <div className="results-stat-card">
          <span className="stat-icon">🏆</span>
          <div>
            <h3>الصف الأنتج</h3>
            <p className="stat-number">الصف السابع</p>
          </div>
        </div>
      </div>

      {/* 3. كرت الرسم البياني (تقدم الصف) */}
      <div className="chart-card">
        <div className="chart-card-header">
          <div className="chart-title">
            <span className="chart-icon">📊</span>
            <h3>تَقدّم الصف</h3>
          </div>
          <select 
            className="class-select-dropdown"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="all">جميع الصفوف</option>
            <option value="7">الصف السابع</option>
            <option value="8">الصف الثامن</option>
            <option value="9">الصف التاسع</option>
          </select>
        </div>

        <div className="chart-wrapper">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* 4. جدول النتائج التفصيلية للطلاب */}
      <div className="results-table-card">
        <div className="table-header-title">
          <h3>سجل درجات الطلاب التفصيلي</h3>
        </div>
        <table className="results-table">
          <thead>
            <tr>
              <th>اسم الطالب</th>
              <th>الصف الدراسي</th>
              <th>الأنشطة المكتملة</th>
              <th>النسبة المئوية</th>
              <th>التقييم العام</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td className="student-name">{student.name}</td>
                <td><span className="class-badge">{student.className}</span></td>
                <td>{student.completedActivities} / {student.totalActivities}</td>
                <td className="score-cell">{student.score}%</td>
                <td>
                  <span className={`status-pill ${student.score >= 80 ? 'high' : student.score >= 70 ? 'medium' : 'low'}`}>
                    {student.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}