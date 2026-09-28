import { useState } from 'react';
export default function SetupModal({ open, canCancel, onCancel, onStart }) {
  const [count, setCount] = useState(1);
  const [difficulty, setDifficulty] = useState('medium');
  const [seconds, setSeconds] = useState(30);
  if (!open) return null;
  return <div className="modal open" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget && canCancel) onCancel(); }}><div className="dialog" role="dialog" aria-modal="true" aria-label="تهيئة الجلسة">
    <div className="eyebrow">تهيئة الجلسة</div><h2>ابدأ رحلتك السيبرانية</h2><p style={{ color:'#adc4d8', lineHeight:1.7, fontSize:13 }}>اختاري عدد اللاعبين ومستوى الأسئلة والوقت المتاح للإجابة.</p>
    <div className="setup"><label>عدد اللاعبين<select value={count} onChange={e => setCount(Number(e.target.value))}><option value="1">لاعب واحد + منافس افتراضي</option><option value="2">لاعبان</option><option value="3">3 لاعبين</option><option value="4">4 لاعبين</option></select></label>
    <label>مستوى الأسئلة<select value={difficulty} onChange={e => setDifficulty(e.target.value)}><option value="medium">متوسط · 10 نقاط للإجابة الصحيحة</option><option value="high">عالٍ · 20 نقطة للإجابة الصحيحة</option></select></label>
    <label>وقت الإجابة<select value={seconds} onChange={e => setSeconds(Number(e.target.value))}><option value="20">20 ثانية</option><option value="30">30 ثانية</option><option value="45">45 ثانية</option></select></label></div>
    <div className="dialog-actions">{canCancel && <button className="btn ghost" onClick={onCancel}>إلغاء</button>}<button className="btn primary" onClick={() => onStart({ count, difficulty, seconds })}>ابدأ اللعب</button></div>
  </div></div>;
}
