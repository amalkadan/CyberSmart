import { useEffect, useRef, useState } from "react";
import { games, SOURCES } from "./data.js";
import "./UnoCyber.css";

const artwork = import.meta.glob("./assets/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
});
const PROGRESS_KEY = "cyber-guardians-progress-v1";
const shuffle = (items) => {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};
function Picture({ item, className = "art" }) {
  const src = artwork[`./assets/art-${item.art}.webp`];
  return src ? (
    <img
      src={src}
      className={className}
      alt=""
      width="320"
      height="320"
      draggable="false"
    />
  ) : (
    <span className="emoji-art" aria-hidden="true">
      {item.icon || "🃏"}
    </span>
  );
}
function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY) || "{}") || {};
  } catch {
    return {};
  }
}
function useSound() {
  const [enabled, setEnabled] = useState(false);
  const audio = useRef(null);
  const play = (kind = "good", force = false) => {
    if (!enabled && !force) return;
    try {
      const ctx = (audio.current ||= new (
        window.AudioContext || window.webkitAudioContext
      )());
      if (ctx.state === "suspended") ctx.resume();
      const notes =
        kind === "win"
          ? [523, 659, 784, 1047]
          : kind === "wrong"
            ? [220, 196]
            : [659, 784, 988];
      notes.forEach((hz, i) => {
        const osc = ctx.createOscillator(),
          gain = ctx.createGain(),
          t = ctx.currentTime + i * 0.105;
        osc.type = kind === "wrong" ? "triangle" : "sine";
        osc.frequency.value = hz;
        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.exponentialRampToValueAtTime(
          kind === "wrong" ? 0.075 : 0.09,
          t + 0.018,
        );
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.19);
      });
    } catch {
      /* Audio is optional. */
    }
  };
  useEffect(() => {
    if (!enabled) return;
    let step = 0;
    const melody = [
      659, 784, 988, 784, 740, 880, 988, 880, 659, 784, 1047, 988, 880, 784,
      740, 659,
    ];
    const bass = [
      165, 0, 165, 0, 147, 0, 147, 0, 131, 0, 131, 0, 147, 0, 165, 0,
    ];
    const id = setInterval(() => {
      const ctx = audio.current;
      if (!ctx) return;
      const note = (hz, duration, volume, type) => {
        const osc = ctx.createOscillator(),
          gain = ctx.createGain(),
          t = ctx.currentTime;
        osc.type = type;
        osc.frequency.value = hz;
        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.exponentialRampToValueAtTime(volume, t + 0.025);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + duration + 0.02);
      };
      note(melody[step % 16], 0.17, 0.016, "triangle");
      if (bass[step % 16]) note(bass[step % 16], 0.29, 0.022, "sine");
      if (step % 4 === 0) note(523, 0.1, 0.008, "sine");
      step++;
    }, 250);
    return () => clearInterval(id);
  }, [enabled]);
  useEffect(
    () => () => {
      audio.current?.close();
    },
    [],
  );
  return {
    enabled,
    toggle: () => {
      if (!enabled) play("good", true);
      setEnabled((v) => !v);
    },
    play,
  };
}
function Setup({
  topic,
  chooseTopic,
  count,
  setCount,
  names,
  setNames,
  duration,
  setDuration,
  progress,
  error,
  start,
}) {
  const earned = Object.keys(games).filter((id) => progress[id]?.badge).length;
  return (
    <section id="setup" aria-labelledby="setupTitle">
      <div className="intro">
        <div>
          <p className="eyebrow">Ready, Guardian?</p>
          <h1 id="setupTitle">Pick your mission.</h1>
          <p className="muted">
            Read the challenge. Play the right card. Earn your badge.
          </p>
          <div className="buddy-line">
            <span className="buddy-avatar" aria-hidden="true">
              🦉
            </span>
            <span>
              <strong>
                {topic
                  ? "Ollie picked a mission with you!"
                  : "Ollie the Owl is ready!"}
              </strong>
              <small>
                {topic
                  ? `${games[topic].name}: ready to earn your ${games[topic].badge.toLowerCase()} badge?`
                  : "Choose a mission and let’s protect the internet!"}
              </small>
            </span>
          </div>
        </div>
        <div className="game-facts" aria-label="Game at a glance">
          <span>
            <b>7</b> rounds
          </span>
          <span>
            <b>4</b> cards
          </span>
          <span>
            <b>1</b> best match
          </span>
        </div>
      </div>
      <div className="collection-panel" aria-label="Your badge collection">
        <div>
          <span className="collection-icon" aria-hidden="true">
            🏆
          </span>
          <span>
            <strong>Guardian badge collection</strong>
            <small>
              {earned === 4
                ? "All four badges collected! Can you beat your best score?"
                : earned
                  ? `${earned} of 4 badges collected — ${4 - earned} more adventures to go!`
                  : "Your adventure starts here — earn your first badge!"}
            </small>
          </span>
        </div>
        <div className="collection-badges" aria-live="polite">
          {Object.entries(games).map(([id, g]) => (
            <span
              key={id}
              className={`collection-badge${progress[id]?.badge ? " earned" : ""}`}
              title={`${g.name} badge ${progress[id]?.badge ? "earned" : "locked"}`}
              aria-label={`${g.name} badge ${progress[id]?.badge ? "earned" : "locked"}`}
            >
              {progress[id]?.badge ? "🏅" : "🔒"}
            </span>
          ))}
        </div>
      </div>
      <div className="topics" aria-label="Choose a game topic">
        {Object.entries(games).map(([id, g], i) => (
          <button
            type="button"
            key={id}
            className={`topic-choice ${g.color}`}
            aria-pressed={topic === id}
            onClick={() => chooseTopic(id)}
          >
            <span className="topic-topline">
              <span>MISSION 0{i + 1}</span>
              <span className="topic-check" aria-hidden="true" />
            </span>
            <Picture item={g} className="topic-art" />
            <span className="topic-name">{g.name}</span>
            <span className="topic-description">{g.description}</span>
            <span className="topic-select">4 cards · 28 surprises</span>
          </button>
        ))}
      </div>
      <div className="setup-bottom">
        <section className="panel how-panel">
          <p className="eyebrow">How to play</p>
          <h2>Become a Cyber Guardian!</h2>
          <ol className="steps">
            <li>
              Pick a topic. The referee deals four answer cards for each
              question.
            </li>
            <li>
              Read the challenge and play its best match. Only one card is
              correct.
            </li>
            <li>Complete seven timed challenges to earn your topic badge.</li>
          </ol>
          <div className="rule-points">
            <span>
              <b>+15</b> Correct answer
            </span>
            <span className="penalty">
              <b>−1</b> Wrong answer
            </span>
            <span className="penalty">
              <b>−15</b> Time runs out
            </span>
          </div>
          <p className="small">
            Wrong answers cost 1 point; a timeout costs 15 points and moves to
            the next question automatically.
          </p>
          <p className="small" style={{ marginTop: 12 }}>
            28 questions per topic, with new scenarios on replay. In group play,
            everyone gets seven turns; the highest score wins.
          </p>
        </section>
        <section className="panel player-setup">
          <p className="eyebrow">Your squad</p>
          <h2>
            {topic ? `${games[topic].name} selected` : "Select a topic above"}
          </h2>
          <p className="small">Play solo or take turns on one device.</p>
          <div className="timer-options" aria-label="Time for each question">
            <strong>⏱️ Time per question</strong>
            <div>
              {[10, 15, 30].map((n) => (
                <button
                  key={n}
                  type="button"
                  className="timer-choice"
                  aria-pressed={duration === n}
                  onClick={() => setDuration(n)}
                >
                  {n} sec
                </button>
              ))}
            </div>
          </div>
          <div className="count" aria-label="Number of players">
            {[1, 2, 3, 4].map((n) => (
              <button
                key={n}
                type="button"
                aria-pressed={count === n}
                onClick={() => setCount(n)}
              >
                {n === 1 ? "Solo" : `${n} players`}
              </button>
            ))}
          </div>
          <div className="fields">
            {Array.from({ length: count }, (_, i) => (
              <div className="field" key={i}>
                <label htmlFor={`name${i}`}>
                  {count === 1 ? "Your name (optional)" : `Player ${i + 1}`}
                </label>
                <input
                  id={`name${i}`}
                  maxLength="24"
                  autoComplete="off"
                  placeholder={count === 1 ? "Student" : `Player ${i + 1}`}
                  value={names[i] || ""}
                  onChange={(e) =>
                    setNames((old) => {
                      const next = [...old];
                      next[i] = e.target.value;
                      return next;
                    })
                  }
                />
              </div>
            ))}
          </div>
          <button
            type="button"
            className="btn btn-main deal-btn"
            disabled={!topic}
            onClick={start}
          >
            {topic ? "Deal 4 cards & play" : "Choose a mission to start"}
          </button>
          <p className="setup-error" role="alert">
            {error}
          </p>
        </section>
      </div>
    </section>
  );
}
function GameBoard({
  state,
  duration,
  remaining,
  feedback,
  chooseAnswer,
  reveal,
  changeGame,
}) {
  const { players, current, topic, phase, attempts, wrongCards, outcome } =
    state;
  const game = games[topic],
    player = players[current],
    challenge = game.challenges.find(
      (c) => c.id === player.queue[player.round],
    );
  const complete = Math.min(7, player.round + (phase === "answered" ? 1 : 0));
  return (
    <section id="game" className={game.color} aria-labelledby="gameTitle">
      <div className="row game-header">
        <div>
          <p className="eyebrow">{game.description}</p>
          <h1 id="gameTitle">{game.name}</h1>
        </div>
        <button className="btn btn-soft" onClick={changeGame}>
          Choose another game
        </button>
      </div>
      <div className="mission-board">
        <div className="scoreboard" aria-label="Player scores">
          {players.map((p, i) => (
            <div
              key={i}
              className={`person${i === current ? " current" : ""}`}
              data-initial={Array.from(p.name)[0]?.toUpperCase()}
            >
              <strong>{p.name}</strong>
              <small>
                {p.score} points ·{" "}
                {Math.min(
                  7,
                  p.round + (i === current && phase === "answered" ? 1 : 0),
                )}
                /7 complete
              </small>
            </div>
          ))}
        </div>
        <div className="progress-zone">
          <div className="progress-row">
            <strong>
              {phase === "handoff"
                ? `Next player: ${player.name}`
                : `${player.name} · Challenge ${player.round + 1} of 7`}
            </strong>
            <span>
              {phase === "handoff"
                ? ""
                : `${player.score} points · Maximum 105`}
            </span>
          </div>
          <div className="mission-steps" aria-hidden="true">
            {Array.from({ length: 7 }, (_, i) => {
              const timedOut = i < complete && player.timeoutRounds.includes(i);
              return (
                <span
                  key={i}
                  className={`mission-step${timedOut ? " timed-out" : i < complete ? " complete" : i === complete ? " active" : ""}`}
                >
                  {timedOut ? "×" : i < complete ? "✓" : i + 1}
                </span>
              );
            })}
          </div>
          <div
            className="progress-track"
            role="progressbar"
            aria-label="Challenges completed"
            aria-valuemin="0"
            aria-valuemax="7"
            aria-valuenow={complete}
          >
            <div
              className="progress-bar"
              style={{ width: `${(complete / 7) * 100}%` }}
            />
          </div>
        </div>
      </div>
      {phase !== "handoff" && (
        <>
          <div
            className={`quest-cheer${player.streak >= 2 ? " streak-hot" : ""}`}
            role="status"
            aria-live="polite"
          >
            <span className="cheer-mascot" aria-hidden="true">
              🦉
            </span>
            <span>
              {outcome === "timeout"
                ? "Moving to the next challenge…"
                : outcome === "correct"
                  ? player.streak >= 3
                    ? "Amazing streak! You are a Cyber Guardian superstar!"
                    : attempts === 1
                      ? "Brilliant! First-try match!"
                      : "You solved it — keep going!"
                  : wrongCards.length
                    ? "Not quite — read the clue and try another card."
                    : player.round === 0
                      ? "Ollie says: take your time and trust your cyber brain!"
                      : "New challenge, new chance to shine!"}
            </span>
            <span className="streak-chip">
              {player.streak >= 2
                ? `🔥 ${player.streak} in a row!`
                : player.streak === 1
                  ? "✨ Great start!"
                  : "✨ Ready to shine"}
            </span>
            <div
              className={`timer-display${remaining <= 5000 ? " urgent" : ""}`}
            >
              <span className="timer-emoji" aria-hidden="true">
                ⏳
              </span>
              <strong>{Math.ceil(remaining / 1000)}s</strong>
              <div
                className="timer-track"
                role="progressbar"
                aria-label="Time remaining"
                aria-valuemin="0"
                aria-valuemax={duration}
                aria-valuenow={Math.ceil(remaining / 1000)}
              >
                <div
                  style={{ width: `${(remaining / (duration * 1000)) * 100}%` }}
                />
              </div>
            </div>
          </div>
          <div className="arena">
            <div className="table-card">
              <span className="table-label">MISSION</span>
              <div aria-hidden="true">
                <span className="question-mark">?</span>
              </div>
            </div>
            <div>
              <p className="eyebrow">{game.name} challenge</p>
              <h2 className="challenge-title" tabIndex="-1">
                {challenge.title}
              </h2>
              <p className="challenge-prompt">{challenge.prompt}</p>
              <p className="instruction">
                Choose the best match from the four cards below.
              </p>
            </div>
          </div>
          <div
            className={`feedback${feedback.type ? ` ${feedback.type}` : ""}`}
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="feedback-title">{feedback.title}</span>
            <p>{feedback.text}</p>
            {feedback.source && SOURCES[feedback.source] && (
              <a
                href={SOURCES[feedback.source].url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {SOURCES[feedback.source].name} ↗
              </a>
            )}
          </div>
          <div className="row hand-head">
            <h2>{player.name}’s four cards</h2>
            <span className="small">Four choices. One correct match.</span>
          </div>
          <div className="hand" aria-label="Four answer cards">
            {player.hand.map((id, i) => {
              const card = game.cards.find((c) => c.id === id),
                isCorrect = id === challenge.answer && phase === "answered";
              return (
                <button
                  key={id}
                  type="button"
                  className={`answer-card ${game.color}${isCorrect ? " correct" : wrongCards.includes(id) && phase === "playing" ? " wrong" : ""}`}
                  disabled={phase !== "playing" || wrongCards.includes(id)}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${card.name}`}
                  style={{ "--deal-delay": `${i * 55}ms` }}
                  onClick={() => chooseAnswer(id)}
                >
                  <span className="card-top">
                    <span>{game.short}</span>
                    <span>{String.fromCharCode(65 + i)}</span>
                  </span>
                  <span className="card-visual">
                    <Picture item={card} />
                  </span>
                  <span className="card-name">{card.name}</span>
                  <span className="card-state">
                    {isCorrect
                      ? "✓ Correct match"
                      : wrongCards.includes(id)
                        ? "−1 · Try another card"
                        : phase === "answered"
                          ? ""
                          : "Play this card"}
                  </span>
                </button>
              );
            })}
          </div>
        </>
      )}
      {phase === "handoff" && (
        <div
          className="veil"
          role="dialog"
          aria-modal="true"
          aria-labelledby="veilTitle"
        >
          <div className="panel">
            <div className="symbol" aria-hidden="true">
              🃏
            </div>
            <h2 id="veilTitle">
              {player.round === 0 ? "Your cards are ready!" : "Pass the device"}
            </h2>
            <p>
              {player.name}, take the device. You have four {game.name} cards
              for this question. Everyone else: let this player choose their
              answer.
            </p>
            <button className="btn btn-main" onClick={reveal}>
              I’m ready — show my cards
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
function Results({ state, bestBefore, playAgain, pickTopic }) {
  const game = games[state.topic],
    best = Math.max(...state.players.map((p) => p.score));
  return (
    <section
      className={`panel results ${game.color} celebrate`}
      aria-labelledby="resultsTitle"
    >
      <div className="result-badge" aria-hidden="true">
        🏅
      </div>
      <p className="eyebrow">{game.badge} badge earned</p>
      <h1 id="resultsTitle" tabIndex="-1">
        Mission complete!
      </h1>
      <p className="muted">
        {state.players.length === 1
          ? `${best > bestBefore ? "New personal best! " : ""}You completed all seven challenges! Your badge is saved. Play again to discover new scenarios and beat your score.`
          : "Everyone completed seven challenges. Highest score wins; equal scores share the win."}
      </p>
      <div className="result-list">
        {state.players.map((p, i) => {
          const stars = Math.max(1, Math.min(3, Math.ceil(p.firstTry / 3)));
          return (
            <div className="result-player" key={i}>
              <div className="row">
                <h2>{p.name}</h2>
                <span className="result-score">{p.score} points</span>
              </div>
              <div className="result-stars">
                {"★".repeat(stars)}
                {"☆".repeat(3 - stars)}
              </div>
              <p>
                {game.badge} · {p.firstTry}/7 first-try matches
                {state.players.length > 1 && p.score === best
                  ? " · Winner 🏆"
                  : ""}{" "}
                · Best streak: {p.bestStreak}
              </p>
              <p>
                {7 - p.timeoutRounds.length} correct · {p.timeoutRounds.length}{" "}
                timed out (−{p.timeoutRounds.length * 15}) · {p.wrong} wrong
                attempts (−{p.wrong})
              </p>
            </div>
          );
        })}
      </div>
      <div className="result-actions">
        <button className="btn btn-main" onClick={playAgain}>
          Play this topic again
        </button>
        <button className="btn btn-soft" onClick={pickTopic}>
          Choose another game
        </button>
      </div>
    </section>
  );
}
function FeedbackModal({ popup, close }) {
  if (!popup) return null;
  return (
    <div
      className={`feedback-veil ${popup.type}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="popupTitle"
      aria-describedby="popupMessage"
    >
      <section className="feedback-popup" dir="ltr">
        <span className="popup-icon" aria-hidden="true">
          {popup.type === "success"
            ? "🎉"
            : popup.type === "timeout"
              ? "⏰"
              : "❌"}
        </span>
        <h2 id="popupTitle">{popup.title}</h2>
        <p id="popupMessage">{popup.message}</p>
        <button
          className="btn btn-main"
          type="button"
          onClick={close}
          autoFocus
        >
          {popup.action === "retry"
            ? "Try again"
            : popup.type === "timeout"
              ? "Continue now"
              : "Next question"}
        </button>
      </section>
    </div>
  );
}
export default function UnoCyberApp({ onExit }) {
  const [topic, setTopic] = useState(null),
    [count, setCount] = useState(1),
    [names, setNames] = useState([]);
  const [duration, setDuration] = useState(10),
    [progress, setProgress] = useState(loadProgress),
    [error, setError] = useState("");
  const [state, setState] = useState(null),
    [remaining, setRemaining] = useState(10000),
    [popup, setPopup] = useState(null);
  const [feedback, setFeedback] = useState({ title: "", text: "", type: "" }),
    [bestBefore, setBestBefore] = useState(-Infinity);
  const rotation = useRef({}),
    deadline = useRef(0),
    timeoutGuard = useRef(false);
  const sound = useSound();
  function makeQueue(id, reserved) {
    const game = games[id],
      bags = (rotation.current[id] ||= {});
    return shuffle(
      game.cards.map((card) => {
        const bag = (bags[card.id] ||= { remaining: [], last: null });
        if (!bag.remaining.length) {
          bag.remaining = shuffle(
            game.challenges
              .filter((q) => q.answer === card.id)
              .map((q) => q.id),
          );
          if (bag.remaining.length > 1 && bag.remaining.at(-1) === bag.last)
            [bag.remaining[0], bag.remaining[bag.remaining.length - 1]] = [
              bag.remaining.at(-1),
              bag.remaining[0],
            ];
        }
        let index = bag.remaining.length - 1;
        while (index >= 0 && reserved.has(bag.remaining[index])) index--;
        if (index < 0)
          throw new Error(
            "The question bank needs more distinct scenarios for this group.",
          );
        const [questionId] = bag.remaining.splice(index, 1);
        bag.last = questionId;
        reserved.add(questionId);
        return questionId;
      }),
    );
  }
  function prepareHand(player, id) {
    const game = games[id],
      questionId = player.queue[player.round];
    const answer = game.challenges.find((q) => q.id === questionId).answer;
    return {
      ...player,
      hand: shuffle([
        answer,
        ...shuffle(game.cards.filter((c) => c.id !== answer))
          .slice(0, 3)
          .map((c) => c.id),
      ]),
    };
  }
  function begin(id, rawNames) {
    const clean = rawNames.map(
      (name, i) =>
        name.trim() || (rawNames.length === 1 ? "Student" : `Player ${i + 1}`),
    );
    if (new Set(clean.map((n) => n.toLowerCase())).size !== clean.length) {
      setError("Use a different name for each player.");
      return;
    }
    const reserved = new Set();
    const players = clean.map((name) =>
      prepareHand(
        {
          name,
          queue: makeQueue(id, reserved),
          round: 0,
          score: 0,
          firstTry: 0,
          wrong: 0,
          streak: 0,
          bestStreak: 0,
          timeoutRounds: [],
          history: [],
        },
        id,
      ),
    );
    timeoutGuard.current = false;
    setRemaining(duration * 1000);
    setPopup(null);
    setFeedback({
      title: "Four cards dealt. Ready?",
      text: "Choose the best match: +15 for a correct answer, −1 for a wrong attempt.",
      type: "",
    });
    setState({
      topic: id,
      players,
      current: 0,
      phase: players.length > 1 ? "handoff" : "playing",
      attempts: 0,
      wrongCards: [],
      outcome: null,
    });
    setError("");
  }
  const start = () => {
    if (topic)
      begin(
        topic,
        Array.from({ length: count }, (_, i) => names[i] || ""),
      );
  };
  const reveal = () => setState((s) => ({ ...s, phase: "playing" }));
  function timeOut() {
    if (timeoutGuard.current) return;
    timeoutGuard.current = true;
    setRemaining(0);
    setState((s) => {
      if (!s || s.phase !== "playing") return s;
      const players = [...s.players],
        p = { ...players[s.current] };
      p.timeoutRounds = [...p.timeoutRounds, p.round];
      p.score -= 15;
      p.streak = 0;
      players[s.current] = p;
      return { ...s, players, phase: "answered", outcome: "timeout" };
    });
    sound.play("wrong");
    setFeedback({
      title: "Time is up! ⏳",
      text: "The best match is highlighted. Learn it before your next question.",
      type: "error",
    });
    setPopup({
      type: "timeout",
      title: "Time's up! ⏰",
      message:
        "15 points were deducted. The correct answer is highlighted. Moving to the next question…",
      action: "advance",
    });
  }
  useEffect(() => {
    if (!state || state.phase !== "playing" || popup) return;
    deadline.current = Date.now() + remaining;
    const tick = () => {
      const left = Math.max(0, deadline.current - Date.now());
      setRemaining(left);
      if (left <= 0) timeOut();
    };
    const id = setInterval(tick, 150);
    return () => clearInterval(id);
    // Restart only when a player is revealed, when a question advances, or after closing a retry popup.
  }, [
    state?.phase,
    state?.current,
    state?.players[state?.current]?.round,
    popup,
  ]);
  function chooseAnswer(answerId) {
    if (
      !state ||
      state.phase !== "playing" ||
      popup ||
      state.wrongCards.includes(answerId)
    )
      return;
    if (Date.now() >= deadline.current) {
      timeOut();
      return;
    }
    const challenge = games[state.topic].challenges.find(
      (c) =>
        c.id ===
        state.players[state.current].queue[state.players[state.current].round],
    );
    const card = games[state.topic].cards.find((c) => c.id === answerId);
    if (!state.players[state.current].hand.includes(answerId)) return;
    const attempts = state.attempts + 1,
      players = [...state.players],
      p = { ...players[state.current] };
    if (answerId !== challenge.answer) {
      setRemaining(Math.max(0, deadline.current - Date.now()));
      p.score--;
      p.wrong++;
      p.streak = 0;
      players[state.current] = p;
      setState({
        ...state,
        players,
        attempts,
        wrongCards: [...state.wrongCards, answerId],
      });
      sound.play("wrong");
      setFeedback({
        title: "Try again, Guardian! −1 point.",
        text: `“${card.name}” describes ${card.meaning}. Read “${challenge.title}” again and choose its best match.`,
        type: "error",
      });
      setPopup({
        type: "error",
        title: "Incorrect answer ❌",
        message:
          "That answer is incorrect. One point was deducted. Read the clue and try again.",
        action: "retry",
      });
      return;
    }
    p.score += 15;
    if (attempts === 1) {
      p.firstTry++;
      p.streak++;
      p.bestStreak = Math.max(p.bestStreak, p.streak);
    } else p.streak = 0;
    p.history = [
      ...p.history,
      {
        challengeId: challenge.id,
        answerId,
        attempts,
        points: 15 - (attempts - 1),
      },
    ];
    players[state.current] = p;
    setState({
      ...state,
      players,
      attempts,
      phase: "answered",
      outcome: "correct",
    });
    sound.play(p.streak >= 3 ? "win" : "good");
    setFeedback({
      title:
        attempts === 1
          ? "Brilliant match! +15 points ⭐"
          : "You got it! +15 points ⭐",
      text: challenge.lesson,
      type: "good",
      source: challenge.source,
    });
    setPopup({
      type: "success",
      title: "Well done! Correct answer 🎉",
      message: "Great job! You earned 15 points.",
      action: "advance",
    });
  }
  function finish(s) {
    const top = Math.max(...s.players.map((p) => p.score));
    setBestBefore(progress[s.topic]?.best ?? -Infinity);
    const next = {
      ...progress,
      [s.topic]: {
        badge: true,
        best: Math.max(progress[s.topic]?.best ?? -Infinity, top),
        plays: (progress[s.topic]?.plays || 0) + 1,
      },
    };
    setProgress(next);
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
    } catch {
      /* Private browsing. */
    }
    sound.play("win");
    setState({ ...s, phase: "finished" });
  }
  function advance() {
    if (!state || state.phase !== "answered") return;
    const players = state.players.map((p, i) =>
      i === state.current ? { ...p, round: p.round + 1 } : p,
    );
    if (players.every((p) => p.round === 7)) {
      finish({ ...state, players });
      return;
    }
    let current = state.current;
    do {
      current = (current + 1) % players.length;
    } while (players[current].round >= 7);
    players[current] = prepareHand(players[current], state.topic);
    timeoutGuard.current = false;
    setRemaining(duration * 1000);
    setFeedback({
      title: "Your next challenge.",
      text: "Choose the best match: +15 for a correct answer, −1 for a wrong attempt.",
      type: "",
    });
    setState({
      ...state,
      players,
      current,
      phase: players.length > 1 ? "handoff" : "playing",
      attempts: 0,
      wrongCards: [],
      outcome: null,
    });
  }
  function closePopup() {
    const action = popup?.action;
    setPopup(null);
    if (action === "advance") advance();
  }
  useEffect(() => {
    if (popup?.type !== "timeout") return;
    const id = setTimeout(closePopup, 2200);
    return () => clearTimeout(id);
  }, [popup]);
  function reset(keepTopic = false) {
    setPopup(null);
    setState(null);
    setRemaining(duration * 1000);
    setError("");
    if (!keepTopic) setTopic(null);
  }
  const playAgain = () => {
    const id = state.topic,
      sameNames = state.players.map((p) => p.name);
    reset(true);
    begin(id, sameNames);
  };
  return (
    <div className="uno-cyber">
      <main className="shell">
        <header className="top">
          <div className="logo">
            <span className="brand-mark" aria-hidden="true">
              🛡️
            </span>
            <div>
              <b>Cyber</b> Guardians
              <span className="edition">English Edition · React</span>
            </div>
          </div>
          <div className="header-actions">
            <span className="tag">
              {state?.phase === "finished"
                ? "Mission complete"
                : topic
                  ? games[topic].name
                  : "Choose your game"}
            </span>
            <button
              className="btn btn-soft sound-toggle"
              type="button"
              aria-pressed={sound.enabled}
              aria-label={`Turn music and sound ${sound.enabled ? "off" : "on"}`}
              onClick={sound.toggle}
            >
              🎵 Music {sound.enabled ? "on" : "off"}
            </button>
            <button className="btn btn-soft" type="button" onClick={onExit}>
              Back to activities
            </button>
          </div>
        </header>
        {!state ? (
          <Setup
            {...{
              topic,
              chooseTopic: (id) => {
                setTopic(id);
                setError("");
              },
              count,
              setCount,
              names,
              setNames,
              duration,
              setDuration,
              progress,
              error,
              start,
            }}
          />
        ) : state.phase === "finished" ? (
          <Results
            state={state}
            bestBefore={bestBefore}
            playAgain={playAgain}
            pickTopic={() => reset()}
          />
        ) : (
          <GameBoard
            state={state}
            duration={duration}
            remaining={remaining}
            feedback={feedback}
            chooseAnswer={chooseAnswer}
            reveal={reveal}
            changeGame={() => reset()}
          />
        )}
        <details className="source-notes">
          <summary>Teacher notes &amp; learning sources</summary>
          <p>
            These are classroom matching games with 112 questions: 28 per topic.
            Red Team cards explain threats; Blue Team cards explain protection.
            Each challenge has one best match.
          </p>
          <p>
            Each player gets seven timed questions. A correct answer earns 15
            points; a wrong attempt deducts one; a timeout deducts 15 and moves
            to the next question. Earned badges and best scores are saved on
            this device.
          </p>
          <div className="source-links">
            {Object.values(SOURCES).map((source) => (
              <a
                key={source.url}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {source.name} ↗
              </a>
            ))}
          </div>
        </details>
      </main>
      <FeedbackModal popup={popup} close={closePopup} />
    </div>
  );
}
