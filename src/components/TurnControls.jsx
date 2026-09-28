import { DICE } from '../data/game.js';
export default function TurnControls({ game, onRoll }) {
  const player = game.players[game.turn];
  const winner = game.phase === 'finished' ? [...game.players].sort((a,b) => b.score - a.score)[0] : null;
  return <div className="turnline"><div className="turn-left"><div className="player-dot">{player?.icon || '🧑‍💻'}</div><div className="turn-meta"><strong>{winner ? `انتهت اللعبة — الفائز: ${winner.name}` : player ? `دور ${player.name}` : 'ابدأ لعبة جديدة'}</strong><small>{winner ? `النتيجة ${winner.score} نقطة` : player?.bot ? 'المنافس الافتراضي يفكر...' : player ? 'ارمِ النرد لتحريك قطعتك' : 'اختر عدد اللاعبين للبدء'}</small></div></div>
    <div className="dicebox"><div className="dice">{DICE[game.die-1]}</div><button className="btn primary" onClick={onRoll} disabled={game.phase !== 'ready' || player?.bot}>ارمِ النرد</button></div>
  </div>;
}
