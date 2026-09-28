import { useNavigate } from 'react-router-dom';

export default function UnoSyberGame({ returnPath = '/teacher/activities' }) {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={() => navigate(returnPath)}>← العودة للأنشطة</button>
      <h2>ال_UNO السيبراني</h2>
    </div>
  );
}