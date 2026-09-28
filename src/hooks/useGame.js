import { useCallback, useEffect, useRef, useState } from 'react';
import { BOARD } from '../data/questions.js';
import { DICE, drawQuestion, makePlayers, movePlayer } from '../data/game.js';

const initial = { players: [], turn: 0, rolls: 0, phase: 'setup', die: 5, card: null, answerId: null, timeLeft: 30, settings: { difficulty: 'medium', seconds: 30 } };

export function useGame() {
  const [game, setGame] = useState(initial);
  const [sound, setSound] = useState(true);
  const [message, setMessage] = useState('');
  const audio = useRef(null);
  const toastId = useRef(null);

  const toast = useCallback(text => {
    setMessage(text);
    clearTimeout(toastId.current);
    toastId.current = setTimeout(() => setMessage(''), 2400);
  }, []);

  const playSound = useCallback(kind => {
    if (!sound) return;
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      audio.current ||= new Ctx();
      if (audio.current.state === 'suspended') audio.current.resume();
      const notes = { roll: [330,440], correct: [523,659,784], wrong: [260,190], timeout: [210,150], win: [523,659,784,988] };
      (notes[kind] || [440]).forEach((hz, i) => {
        const oscillator = audio.current.createOscillator();
        const gain = audio.current.createGain();
        const start = audio.current.currentTime + i * .11;
        oscillator.frequency.value = hz;
        gain.gain.setValueAtTime(.0001, start);
        gain.gain.exponentialRampToValueAtTime(.12, start + .02);
        gain.gain.exponentialRampToValueAtTime(.0001, start + .17);
        oscillator.connect(gain).connect(audio.current.destination);
        oscillator.start(start);
        oscillator.stop(start + .18);
      });
    } catch (error) { console.warn('تعذر تشغيل الصوت', error); }
  }, [sound]);

  function start({ count, difficulty, seconds }) {
    setGame({ ...initial, players: makePlayers(count), phase: 'ready', settings: { difficulty, seconds }, timeLeft: seconds });
    toast('بدأت الجولة! دورك أولًا.');
  }
  function roll() {
    if (game.phase !== 'ready' || game.players[game.turn]?.bot) return;
    const die = 1 + Math.floor(Math.random() * 6);
    setGame(g => ({ ...g, players: movePlayer(g.players, g.turn, die), rolls: g.rolls + 1, die, phase: 'moving' }));
    playSound('roll');
  }
  function answer(id) {
    if (game.phase !== 'question' || game.answerId !== null) return;
    const correct = game.card.answers.find(option => option.id === id)?.isCorrect;
    setGame(g => {
      if (g.phase !== 'question' || g.answerId !== null) return g;
      const players = correct ? g.players.map((player, i) => i !== g.turn ? player : {
        ...player, score: player.score + (g.settings.difficulty === 'high' ? 20 : 10),
        badges: player.badges.includes(g.card.tile.name) ? player.badges : [...player.badges, g.card.tile.name]
      }) : g.players;
      return { ...g, players, answerId: id, phase: 'answered' };
    });
    toast(correct ? `إجابة صحيحة! +${game.settings.difficulty === 'high' ? 20 : 10} نقطة` : 'راجعي التفسير وتابعي التحدي');
    playSound(correct ? 'correct' : 'wrong');
  }
  function continueTurn() {
    if (game.phase !== 'answered') return;
    const ended = game.rolls >= 12 * game.players.length;
    setGame(g => ({ ...g, phase: ended ? 'finished' : (g.players[(g.turn + 1) % g.players.length].bot ? 'bot' : 'ready'), turn: ended ? g.turn : (g.turn + 1) % g.players.length, card: null, answerId: null }));
    if (ended) { playSound('win'); toast('انتهت اللعبة!'); }
  }

  // Effects own their timers; changing phase or starting a new game cancels stale work.
  useEffect(() => {
    if (game.phase !== 'moving') return;
    const id = setTimeout(() => setGame(g => {
      if (g.phase !== 'moving') return g;
      const tile = BOARD[g.players[g.turn].pos];
      return { ...g, card: drawQuestion(tile, g.settings.difficulty), timeLeft: g.settings.seconds, answerId: null, phase: 'question' };
    }), 450);
    return () => clearTimeout(id);
  }, [game.phase, game.rolls]);

  useEffect(() => {
    if (game.phase !== 'question') return;
    const id = setInterval(() => setGame(g => {
      if (g.phase !== 'question') return g;
      return g.timeLeft <= 1 ? { ...g, timeLeft: 0, phase: 'answered' } : { ...g, timeLeft: g.timeLeft - 1 };
    }), 1000);
    return () => clearInterval(id);
  }, [game.phase, game.card]);

  useEffect(() => {
    if (game.phase !== 'answered' || game.answerId !== null) return;
    toast('انتهى الوقت! اقرئي التفسير ثم تابعي.');
    playSound('timeout');
  }, [game.phase, game.answerId, playSound, toast]);

  useEffect(() => {
    if (game.phase !== 'bot') return;
    const id = setTimeout(() => {
      const die = 1 + Math.floor(Math.random() * 6);
      setGame(g => g.phase !== 'bot' ? g : { ...g, players: movePlayer(g.players, g.turn, die), rolls: g.rolls + 1, die });
    }, 550);
    const id2 = setTimeout(() => setGame(g => {
      if (g.phase !== 'bot') return g;
      const won = Math.random() < .67;
      const players = g.players.map((player, i) => i !== g.turn || !won ? player : {
        ...player, score: player.score + (g.settings.difficulty === 'high' ? 20 : 10),
        badges: player.badges.includes(BOARD[player.pos].name) ? player.badges : [...player.badges, BOARD[player.pos].name]
      });
      const ended = g.rolls >= 12 * g.players.length;
      return { ...g, players, phase: ended ? 'finished' : 'ready', turn: ended ? g.turn : (g.turn + 1) % g.players.length };
    }), 1200);
    return () => { clearTimeout(id); clearTimeout(id2); };
  }, [game.phase, game.turn]);

  useEffect(() => () => { clearTimeout(toastId.current); audio.current?.close(); }, []);
  return { game, sound, setSound, message, start, roll, answer, continueTurn };
}
