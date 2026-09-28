import test from 'node:test';
import assert from 'node:assert/strict';
import { BOARD } from './questions.js';
import { shuffle, drawQuestion, makePlayers, movePlayer } from './game.js';

test('every board question has exactly one correct answer', () => {
  for (const tile of BOARD) for (const question of tile.questions)
    assert.equal(question.answers.filter(answer => answer.isCorrect).length, 1, `${tile.name}: ${question.question}`);
});
test('shuffle changes position but preserves answer correctness', () => {
  const question = BOARD[0].questions[0];
  const shuffled = shuffle(question.answers, () => 0);
  assert.notDeepEqual(shuffled.map(answer => answer.id), question.answers.map(answer => answer.id));
  assert.equal(shuffled.find(answer => answer.isCorrect).text, question.answers.find(answer => answer.isCorrect).text);
  assert.deepEqual(question.answers.map(answer => answer.id), [0,1,2]);
});
test('all 24 spaces supply a question in either difficulty', () => {
  for (const tile of BOARD) for (const difficulty of ['medium','high']) {
    const card = drawQuestion(tile, difficulty, () => 0);
    assert.ok(card.question);
    assert.equal(card.answers.filter(answer => answer.isCorrect).length, 1);
  }
});
test('solo mode adds bot and movement wraps around', () => {
  const players = makePlayers(1);
  assert.equal(players.length, 2);
  assert.equal(players[1].bot, true);
  const moved = movePlayer([{ ...players[0], pos: 23 }, players[1]], 0, 4);
  assert.equal(moved[0].pos, 3);
  assert.equal(players[0].pos, 0);
});
