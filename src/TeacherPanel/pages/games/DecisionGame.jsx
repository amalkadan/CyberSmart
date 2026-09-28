import { useNavigate } from 'react-router-dom';

export default function DecisionGame({ returnPath = '/teacher/activities' }) {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={() => navigate(returnPath)}>← العودة للأنشطة</button>
      <h2>لعبة: اختر القرار الآمن</h2>
    </div>
  );
}