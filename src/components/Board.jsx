import { BOARD, COORDS } from '../data/questions.js';

export default function Board({ game }) {
  const player = game.players[game.turn];
  const winner = game.phase === 'finished' ? [...game.players].sort((a,b) => b.score - a.score)[0] : null;
  const status = winner ? `الفائز: ${winner.name} · ${winner.score} نقطة` : player ? `اللاعب النشط: ${player.name} · النقاط: ${player.score}` : 'ابدئي لعبة جديدة';
  return <div className="board-wrap"><div className="board">
    {Array.from({ length: 49 }, (_, index) => {
      const row = Math.floor(index / 7), col = index % 7;
      if (row >= 1 && row <= 5 && col >= 1 && col <= 5) return row === 3 && col === 3 ?
        <div className="center" key={index}><div className="big-shield">🛡️</div><h2>CYBER QUEST</h2><p>حلّي التحديات وتعلّمي مهارات الدفاع لحماية العالم الرقمي.</p><span className="status">{status}</span></div> : null;
      const position = COORDS.findIndex(([x,y]) => x === col && y === row);
      const tile = BOARD[position];
      return <div key={index} className={`tile ${player?.pos === position ? 'current' : ''}`} style={{ '--tile': tile.color || '#35d9ff' }}>
        <div className="stripe"/><span className="num">{position + 1}</span><span className="ico">{tile.icon || '❓'}</span><strong>{tile.name}</strong><span className="kind">{tile.kind || 'تحدي'}</span>
        <div className="tokens">{game.players.filter(p => p.pos === position).map(p => <span className="token" key={p.id} title={p.name}>{p.icon}</span>)}</div>
      </div>;
    })}
  </div></div>;
}
