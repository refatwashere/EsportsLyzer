const test = require('node:test');
const assert = require('node:assert/strict');
const { normalizeMatch, normalizeMatchSummary } = require('../services/csapi');
const { computePrediction } = require('../utils/prediction');
const { generateHighlights } = require('../utils/highlights');
const { buildTeamComparison } = require('../utils/teams');

const rawMatch = {
  id: 2396949,
  team1: { id: 7020, name: 'Spirit', score: 2, rank: 1 },
  team2: { id: 11283, name: 'Falcons', score: 0, rank: 3 },
  maps: [{ id: 3, name: 'Ancient', team1_score: 13, team2_score: 11 }],
  best_of: 3,
  date: '2026-09-05',
  event: 'BLAST Open Porto 2026',
  winner: { id: 7020, name: 'Spirit' },
};

test('normalizes CSAPI summaries to the dashboard match shape', () => {
  const match = normalizeMatchSummary(rawMatch);

  assert.deepEqual(match.teams.map((team) => team.name), ['Spirit', 'Falcons']);
  assert.deepEqual(match.score, { team1: 2, team2: 0 });
  assert.equal(match.winner, 'Spirit');
  assert.equal(match.source, 'csapi');
});

test('normalizes map scores and real player stats', () => {
  const match = normalizeMatch(rawMatch, [
    {
      name: 'All',
      team1: {
        players: [
          { name: 'donk', k: 34, d: 30, rating: 1, kast: 82, adr: 77.8 },
        ],
      },
      team2: { players: [] },
    },
  ]);

  assert.equal(match.maps[0].score, '13-11');
  assert.equal(match.maps[0].winner, 'Spirit');
  assert.deepEqual(match.players[0], {
    name: 'donk',
    team: 'Spirit',
    rating: 1,
    kills: 34,
    deaths: 30,
    clutches: null,
    kast: 0.82,
    adr: 77.8,
  });
});

test('derives probabilities and team comparisons from provider data', () => {
  const match = normalizeMatch(
    rawMatch,
    [
      {
        name: 'All',
        team1: {
          players: [
            { name: 'donk', k: 34, d: 30, rating: 1.2, kast: 82, adr: 77.8 },
          ],
        },
        team2: {
          players: [
            { name: 'NiKo', k: 21, d: 33, rating: 0.8, kast: 64, adr: 65.6 },
          ],
        },
      },
    ],
    { ranking_win_prob: 0.7 }
  );
  const prediction = computePrediction(match);
  const teams = buildTeamComparison(match);

  assert.equal(prediction.series.team1Name, 'Spirit');
  assert.equal(prediction.series.team1Win, 0.7);
  assert.ok(Math.abs(prediction.series.team2Win - 0.3) < Number.EPSILON);
  assert.deepEqual(teams.map((team) => team.name), ['Spirit', 'Falcons']);
  assert.equal(teams[0].adr, 77.8);
  assert.equal(teams[0].economy, null);
  assert.deepEqual(generateHighlights(match), []);
});

test('does not create a probability estimate without provider data', () => {
  assert.equal(computePrediction({ teams: [] }), null);
});

test('rejects match payloads without the required identity and teams', () => {
  assert.equal(normalizeMatchSummary({ id: 1 }), null);
  assert.throws(() => normalizeMatch({ id: 1 }), /invalid match payload/);
});