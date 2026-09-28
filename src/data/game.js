import { BOARD, ADVANCED, ICONS, COLORS } from './questions.js';

export const DICE = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

// Fisher–Yates returns a new array; each option carries its own correct flag.
export function shuffle(items, random = Math.random) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function makePlayers(count) {
  const players = Array.from({ length: count }, (_, i) => ({
    id: i, name: i === 0 ? 'أنت' : `اللاعب ${i + 1}`,
    icon: ICONS[i], color: COLORS[i], pos: 0, score: 0, badges: [], bot: false
  }));
  if (count === 1) players.push({ id: 1, name: 'المنافس الافتراضي', icon: '🤖', color: COLORS[1], pos: 0, score: 0, badges: [], bot: true });
  return players;
}

export function drawQuestion(tile, difficulty, random = Math.random) {
  const matches = ADVANCED.filter(question => question.category === tile.name);
  const list = difficulty === 'high' ? (matches.length ? matches : ADVANCED) : tile.questions;
  const question = list[Math.floor(random() * list.length)];
  return { tile, ...question, answers: shuffle(question.answers, random) };
}

export function movePlayer(players, turn, die) {
  return players.map((player, i) => i === turn ? { ...player, pos: (player.pos + die) % BOARD.length } : player);
}
