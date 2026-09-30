function buildPlayerStats(matchData) {
  return (matchData.players || []).map((p) => ({
    name: p.name,
    team: p.team,
    rating: p.rating,
    kills: p.kills,
    deaths: p.deaths,
    clutches: p.clutches,
    kast: p.kast
  }));
}

module.exports = { buildPlayerStats };
