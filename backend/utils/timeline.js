function buildTimeline(matchData) {
  if (!matchData.rounds) return [];

  return matchData.rounds.map((round, index) => ({
    round: index + 1,
    winner: round.winner,
    isPistol: round.isPistol || false,
    clutch: round.clutch
      ? `${round.player} ${round.clutch}v${round.clutchOpponents}`
      : null
  }));
}

module.exports = { buildTimeline };
