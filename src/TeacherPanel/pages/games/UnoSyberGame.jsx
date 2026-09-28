import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function UnoSyberGame() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={() => navigate('/teacher/activities')}>← العودة للأنشطة</button>
      <h2>ال_UNO السيبراني</h2>
    </div>
  );
}