import PlayersPanel from './PlayersPanel.jsx';
export default function Sidebar({ game }) {
  return <aside className="side"><PlayersPanel game={game}/>
    <section className="side-card"><h2 className="section-title">شاراتك</h2><div className="badge-grid">{['🧠 محلل','🛡️ مدافع','🔎 محقق','🌐 خبير شبكات','🔐 حارس كلمات المرور'].map(label => <span className="badge" key={label}>{label}</span>)}</div></section>
    <section className="side-card"><h2 className="section-title">طريقة اللعب</h2><ol className="rules"><li>اختر من 1 إلى 4 لاعبين، أو العب ضد منافس افتراضي.</li><li>ارمِ النرد وتحرك على اللوحة.</li><li>أجب عن سؤال أو اختر الاستجابة الدفاعية الأفضل.</li><li>اجمع أكبر عدد من النقاط قبل نهاية اللعبة.</li></ol></section>
    <section className="side-card"><h2 className="section-title">هدف الجولة <small>12 دورًا لكل لاعب</small></h2><div style={{ color:'#bcd0e2', fontSize:12, lineHeight:1.8 }}>تعلّم مهارات الأمن السيبراني واجمع النقاط والشارات. اللعبة تعليمية ولا تتضمن مشتريات أو رهانات.</div></section>
  </aside>;
}
