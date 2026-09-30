function buildTeamComparison(matchData) {
  const teams = matchData.teams || [];
  const players = matchData.players || [];
  const maps = matchData.maps || [];

  return teams.map((team, index) => {
    const teamPlayers = players.filter((player) => player.team === team.name);
    const completedMaps = maps.filter((map) => map.winner);
    const mapWins = completedMaps.filter((map) => map.winner === team.name).length;
    const average = (key) => {
      const values = teamPlayers.map((player) => player[key]).filter(Number.isFinite);
      return values.length
        ? Number((values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(1))
        : null;
    };

    return {
      name: team.name,
      adr: average('adr'),
      economy: null,
      utility: null,
      rating: average('rating'),
      winRate: completedMaps.length ? mapWins / completedMaps.length : null,
      score: index === 0 ? matchData.score?.team1 : matchData.score?.team2,
    };
  });
}

module.exports = { buildTeamComparison };
