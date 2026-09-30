/**
 * Sofascore multi-sport service
 * Sofascore heavily protects their API (403 from most server IPs).
 * This module provides:
 *  - Clean interface for football / tennis
 *  - Attempted real fetch with proper headers
 *  - Rich realistic mocks (momentum graphs, stats, possession) so the UI always looks good
 *
 * For production: put a residential proxy or headless browser in front.
 */

const axios = require('axios');

const BASE = 'https://api.sofascore.com/api/v1';

const browserHeaders = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  Accept: 'application/json',
  'Accept-Language': 'en-US,en;q=0.9',
  Origin: 'https://www.sofascore.com',
  Referer: 'https://www.sofascore.com/',
};

async function getLiveEvents(sport = 'football') {
  try {
    const { data } = await axios.get(`${BASE}/sport/${sport}/events/live`, {
      headers: browserHeaders,
      timeout: 8000,
    });
    return (data.events || []).map((e) => normalizeEvent(e, sport));
  } catch (err) {
    console.warn(`Sofascore live ${sport} blocked or failed:`, err.message);
    return getMockLive(sport);
  }
}

async function getEvent(eventId, sport = 'football') {
  try {
    const { data } = await axios.get(`${BASE}/event/${eventId}`, {
      headers: browserHeaders,
      timeout: 8000,
    });
    const event = normalizeEvent(data.event || data, sport);
    // Try to attach graph if available
    const graph = await getEventGraph(eventId);
    if (graph) event.graph = graph;
    return event;
  } catch (err) {
    console.warn('Sofascore event fetch failed:', err.message);
    return getMockEvent(eventId, sport);
  }
}

async function getEventGraph(eventId) {
  try {
    const { data } = await axios.get(`${BASE}/event/${eventId}/graph`, {
      headers: browserHeaders,
      timeout: 8000,
    });
    return data;
  } catch {
    return null;
  }
}

function normalizeEvent(raw, sport) {
  const home = raw.homeTeam || {};
  const away = raw.awayTeam || {};
  return {
    id: raw.id,
    sport,
    source: 'sofascore',
    teams: [
      { name: home.name, id: home.id },
      { name: away.name, id: away.id },
    ],
    score: {
      home: raw.homeScore?.current ?? raw.homeScore?.display ?? 0,
      away: raw.awayScore?.current ?? raw.awayScore?.display ?? 0,
    },
    status: raw.status?.type || raw.status?.description || 'unknown',
    startTimestamp: raw.startTimestamp,
    tournament: raw.tournament?.name || raw.uniqueTournament?.name,
    isFinished: raw.status?.type === 'finished',
  };
}

function getMockLive(sport) {
  if (sport === 'tennis') {
    return [
      {
        id: 120001,
        sport: 'tennis',
        source: 'mock',
        teams: [{ name: 'Alcaraz' }, { name: 'Sinner' }],
        score: { home: 1, away: 1 },
        status: 'inprogress',
        tournament: 'US Open 2026',
        isFinished: false,
      },
    ];
  }
  return [
    {
      id: 150001,
      sport: 'football',
      source: 'mock',
      teams: [{ name: 'Arsenal' }, { name: 'Chelsea' }],
      score: { home: 2, away: 1 },
      status: 'inprogress',
      tournament: 'Premier League',
      isFinished: false,
    },
    {
      id: 150002,
      sport: 'football',
      source: 'mock',
      teams: [{ name: 'Barcelona' }, { name: 'Real Madrid' }],
      score: { home: 0, away: 0 },
      status: 'inprogress',
      tournament: 'La Liga',
      isFinished: false,
    },
  ];
}

function getMockEvent(id, sport) {
  const base = getMockLive(sport)[0];
  const event = { ...base, id: Number(id) || base.id };

  if (sport === 'football') {
    // Generate realistic 90-minute momentum
    const minutes = [];
    const homeMomentum = [];
    const awayMomentum = [];
    let h = 0;
    let a = 0;
    for (let m = 1; m <= 90; m++) {
      minutes.push(m);
      // random walk with slight home bias
      h += (Math.random() - 0.48) * 8;
      a += (Math.random() - 0.52) * 8;
      h = Math.max(-90, Math.min(90, h));
      a = Math.max(-90, Math.min(90, a));
      homeMomentum.push(Math.round(h));
      awayMomentum.push(Math.round(a));
    }

    event.graph = {
      minutes,
      homeMomentum,
      awayMomentum,
      homeName: event.teams[0].name,
      awayName: event.teams[1].name,
    };

    event.possession = { home: 58, away: 42 };
    event.stats = {
      shots: { home: 14, away: 9 },
      shotsOnTarget: { home: 6, away: 3 },
      corners: { home: 7, away: 4 },
      fouls: { home: 11, away: 14 },
      xg: { home: 1.82, away: 0.94 },
      dangerousAttacks: { home: 48, away: 31 },
    };
  }

  if (sport === 'tennis') {
    const points = Array.from({ length: 48 }, (_, i) => i + 1);
    let aMom = 50;
    let bMom = 50;
    const playerAMomentum = [];
    const playerBMomentum = [];

    points.forEach(() => {
      aMom += (Math.random() - 0.48) * 6;
      bMom = 100 - aMom;
      aMom = Math.max(15, Math.min(85, aMom));
      bMom = Math.max(15, Math.min(85, bMom));
      playerAMomentum.push(Math.round(aMom));
      playerBMomentum.push(Math.round(bMom));
    });

    event.graph = {
      points,
      playerAMomentum,
      playerBMomentum,
      playerA: event.teams[0].name,
      playerB: event.teams[1].name,
    };

    event.stats = {
      aces: { a: 8, b: 5 },
      doubleFaults: { a: 2, b: 4 },
      firstServePct: { a: 68, b: 61 },
      breakPoints: { a: '3/7', b: '2/5' },
    };
  }

  return event;
}

module.exports = {
  getLiveEvents,
  getEvent,
  getEventGraph,
};
