import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function DecisionGame() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={() => navigate('/teacher/activities')}>← العودة للأنشطة</button>
      <h2>لعبة: اختر القرار الآمن</h2>
    </div>
  );
}