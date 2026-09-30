function computePrediction(matchData) {
  const probability = matchData.prediction?.rankingWinProbability;
  if (!Number.isFinite(probability)) return null;

  const team1Win = Math.min(1, Math.max(0, probability));
  const [team1, team2] = matchData.teams || [];

  return {
    source: 'CSAPI ranking model',
    series: {
      team1Name: team1?.name || 'Team 1',
      team2Name: team2?.name || 'Team 2',
      team1Win,
      team2Win: 1 - team1Win,
    },
  };
}

module.exports = { computePrediction };
