const axios = require('axios');

const BASE_URL = (process.env.CSAPI_BASE_URL || 'https://api.csapi.de').replace(/\/$/, '');
const REQUEST_TIMEOUT_MS = 8000;

function normalizeMatchSummary(raw) {
  if (!raw || raw.id == null || !raw.team1?.name || !raw.team2?.name) return null;

  return {
    id: raw.id,
    teams: [
      { id: raw.team1.id, name: raw.team1.name, rank: raw.team1.rank },
      { id: raw.team2.id, name: raw.team2.name, rank: raw.team2.rank },
    ],
    score: {
      team1: raw.team1.score ?? 0,
      team2: raw.team2.score ?? 0,
    },
    maps: Array.isArray(raw.maps) ? raw.maps : [],
    bestOf: raw.best_of,
    date: raw.date,
    event: raw.event,
    winner: raw.winner?.name || null,
    isFinished: Boolean(raw.winner),
    source: 'csapi',
  };
}

function normalizeMatch(raw, stats = [], prediction = null) {
  const summary = normalizeMatchSummary(raw);
  if (!summary) throw new Error('CSAPI returned an invalid match payload');

  const allStats = Array.isArray(stats)
    ? stats.find((entry) => entry.name === 'All') || stats[0]
    : null;
  const players = [
    ...(allStats?.team1?.players || []).map((player) => ({
      name: player.name,
      team: summary.teams[0].name,
      rating: player.rating,
      kills: player.k,
      deaths: player.d,
      clutches: null,
      kast: player.kast > 1 ? player.kast / 100 : player.kast,
      adr: player.adr,
    })),
    ...(allStats?.team2?.players || []).map((player) => ({
      name: player.name,
      team: summary.teams[1].name,
      rating: player.rating,
      kills: player.k,
      deaths: player.d,
      clutches: null,
      kast: player.kast > 1 ? player.kast / 100 : player.kast,
      adr: player.adr,
    })),
  ];

  return {
    ...summary,
    prediction: Number.isFinite(prediction?.ranking_win_prob)
      ? { rankingWinProbability: prediction.ranking_win_prob }
      : null,
    maps: summary.maps.map((map) => ({
      id: map.id,
      name: map.name,
      team1Score: map.team1_score,
      team2Score: map.team2_score,
      score: `${map.team1_score}-${map.team2_score}`,
      winner:
        map.team1_score === map.team2_score
          ? null
          : map.team1_score > map.team2_score
            ? summary.teams[0].name
            : summary.teams[1].name,
    })),
    players,
    rounds: [],
  };
}

async function getLatestMatches(limit = 10) {
  const parsedLimit = Number(limit);
  const safeLimit = Number.isInteger(parsedLimit)
    ? Math.min(50, Math.max(1, parsedLimit))
    : 10;
  const { data } = await axios.get(`${BASE_URL}/matches/latest`, {
    params: { limit: safeLimit },
    timeout: REQUEST_TIMEOUT_MS,
  });

  if (!Array.isArray(data)) throw new Error('CSAPI returned an invalid latest-matches payload');
  return data.map(normalizeMatchSummary).filter(Boolean);
}

async function getMatch(matchId) {
  if (!/^\d+$/.test(String(matchId))) throw new Error('Match ID must be numeric');

  const matchResponse = await axios.get(`${BASE_URL}/matches/${matchId}`, {
    timeout: REQUEST_TIMEOUT_MS,
  });
  const [statsResponse, predictionResponse] = await Promise.all([
    axios
      .get(`${BASE_URL}/matches/${matchId}/stats`, { timeout: REQUEST_TIMEOUT_MS })
      .catch((error) => {
        console.warn(`CSAPI player stats unavailable for match ${matchId}:`, error.message);
        return { data: [] };
      }),
    axios
      .get(
        `${BASE_URL}/predict/${matchResponse.data.team1.id}/${matchResponse.data.team2.id}`,
        { timeout: REQUEST_TIMEOUT_MS }
      )
      .catch((error) => {
        console.warn(`CSAPI prediction unavailable for match ${matchId}:`, error.message);
        return { data: null };
      }),
  ]);

  return normalizeMatch(matchResponse.data, statsResponse.data, predictionResponse.data);
}

module.exports = {
  getLatestMatches,
  getMatch,
  normalizeMatch,
  normalizeMatchSummary,
};