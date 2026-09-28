export default function PlayersPanel({ game }) {
  return <section className="side-card"><h2 className="section-title">اللاعبون <small>{game.players.length ? `الدور ${Math.min(Math.floor(game.rolls / game.players.length) + 1, 12)} من 12` : '—'}</small></h2>
    <div className="players">{game.players.map((p,i) => <div className={`player-row ${i === game.turn ? 'active' : ''}`} key={p.id}>
      <div className="pavatar" style={{ borderColor:p.color, color:p.color }}>{p.icon}</div>
      <div><strong>{p.name}{p.bot && <small>منافس افتراضي</small>}</strong><small>الخانة {p.pos + 1} · {p.badges.length} شارات</small><div className="progress"><i style={{ width:`${Math.min(p.score,120)/120*100}%` }}/></div></div>
      <div className="score">{p.score}<small> نقطة</small></div>
    </div>)}</div>
  </section>;
}
