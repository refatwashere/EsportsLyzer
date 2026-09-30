function generateHighlights(matchData) {
  const highlights = [];

  if (matchData.lastRound) {
    const r = matchData.lastRound;
    if (r.isPistol) highlights.push(`${r.winner} wins the pistol round!`);
    if (r.clutch) highlights.push(`${r.player} clutches ${r.clutch}v${r.clutchOpponents}`);
    if (r.streak >= 3) highlights.push(`${r.winner} on a ${r.streak}-round streak`);
  }

  return highlights.slice(-8); // keep last 8
}

module.exports = { generateHighlights };
