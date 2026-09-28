import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../../../hooks/useGame.js";
import Board from "../../../components/Board.jsx";
import Sidebar from "../../../components/Sidebar.jsx";
import TurnControls from "../../../components/TurnControls.jsx";
import SetupModal from "../../../components/SetupModal.jsx";
import CardModal from "../../../components/CardModal.jsx";
import RulesModal from "../../../components/RulesModal.jsx";
import "./CyberMonopolyGame.css";

export default function CyberMonopolyGame({ returnPath = "/teacher/activities" }) {
  const navigate = useNavigate();
  const { game, sound, setSound, message, start, roll, answer, continueTurn } =
    useGame();
  const [setupOpen, setSetupOpen] = useState(true);
  const [rulesOpen, setRulesOpen] = useState(false);

  return (
    <div className="cyber-quest" dir="rtl">
      <header className="cq-top">
        <div className="cq-brand">
          <div className="cq-logo" aria-hidden="true">
            🛡️
          </div>
          <div>
            <h1>Cyber Quest</h1>
            <p>رحلة تفاعلية لتعلّم الأمن السيبراني</p>
          </div>
        </div>
        <div className="cq-actions">
          <button
            className="cq-button cq-ghost"
            aria-pressed={sound}
            onClick={() => setSound(!sound)}
          >
            {sound ? "🔊 الصوت: يعمل" : "🔇 الصوت: متوقف"}
          </button>
          <button
            className="cq-button cq-ghost"
            onClick={() => setRulesOpen(true)}
          >
            📘 طريقة اللعب
          </button>
          <button
            className="cq-button cq-primary"
            onClick={() => setSetupOpen(true)}
          >
            ＋ لعبة جديدة
          </button>
          <button
            className="cq-button cq-back"
            onClick={() => navigate(returnPath)}
          >
            العودة للأنشطة
          </button>
        </div>
      </header>

      <div className="cq-layout">
        <main className="cq-main">
          <h2 className="cq-section-title">
            لوحة التحديات <small>تحرّك، فكّر، واجمع شارات المعرفة</small>
          </h2>
          <Board game={game} />
          <TurnControls game={game} onRoll={roll} />
        </main>
        <Sidebar game={game} />
      </div>
      <div className="cq-footer">
        Cyber Quest · لعبة تعليمية محلية تعمل في متصفحك
      </div>

      <SetupModal
        open={setupOpen}
        canCancel={game.phase !== "setup"}
        onCancel={() => setSetupOpen(false)}
        onStart={(settings) => {
          start(settings);
          setSetupOpen(false);
        }}
      />
      {game.card && (
        <CardModal game={game} onAnswer={answer} onContinue={continueTurn} />
      )}
      {rulesOpen && <RulesModal onClose={() => setRulesOpen(false)} />}
      <div
        className={`cq-toast ${message ? "show" : ""}`}
        role="status"
        aria-live="polite"
      >
        {message}
      </div>
    </div>
  );
}
