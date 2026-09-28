export default function CardModal({ game, onAnswer, onContinue }) {
  const { card, timeLeft, settings, phase, answerId } = game;
  if (!card) return null;
  const revealed = phase === 'answered';
  return <div className="modal open"><div className="dialog" role="dialog" aria-modal="true" aria-label="تحدي المعرفة">
    <div className="eyebrow">{card.tile.icon || '🛡️'} {card.tile.name} · {settings.difficulty === 'high' ? 'مستوى عالٍ' : 'مستوى متوسط'}</div><h2>تحدي المعرفة</h2>
    <div className="timer-wrap"><div className="timer-head"><span>الوقت المتبقي للإجابة</span><strong>{timeLeft === 0 ? 'انتهى الوقت' : timeLeft}</strong></div><div className="timer-track"><div className={`timer-fill ${timeLeft <= 5 ? 'urgent' : ''}`} style={{ width:`${Math.max(0,timeLeft/settings.seconds*100)}%` }}/></div></div>
    <p className="question">{card.question}</p><div className="answers">{card.answers.map(option => <button key={option.id} className={`answer ${revealed && option.isCorrect ? 'correct' : ''} ${revealed && answerId === option.id && !option.isCorrect ? 'wrong' : ''}`} disabled={revealed} onClick={() => onAnswer(option.id)}>{option.text}</button>)}</div>
    {revealed && <div className="explain" style={{ display:'block' }}>{card.explanation}</div>}<div className="dialog-actions">{revealed && <button className="btn primary" onClick={onContinue}>متابعة الدور</button>}</div>
  </div></div>;
}
