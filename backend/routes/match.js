const express = require('express');
const router = express.Router();
const { getLatestMatches, getMatch } = require('../services/csapi');
const { computePrediction } = require('../utils/prediction');
const { generateHighlights } = require('../utils/highlights');
const { buildTimeline } = require('../utils/timeline');
const { buildPlayerStats } = require('../utils/players');
const { buildTeamComparison } = require('../utils/teams');

router.get('/matches/latest', async (req, res) => {
  const requestedLimit = req.query.limit === undefined ? 10 : Number(req.query.limit);
  if (!Number.isInteger(requestedLimit) || requestedLimit < 1) {
    return res.status(400).json({ error: 'limit must be a positive integer' });
  }

  try {
    const matches = await getLatestMatches(Math.min(requestedLimit, 50));
    return res.json(matches);
  } catch (err) {
    console.error('Latest matches error:', err.message);
    return res.status(502).json({ error: 'Unable to fetch latest matches from CSAPI' });
  }
});

router.get('/match/:id', async (req, res) => {
  try {
    const matchId = req.params.id;
    const matchData = await getMatch(matchId);
    const prediction = computePrediction(matchData);
    const highlights = generateHighlights(matchData);
    const timeline = buildTimeline(matchData);
    const players = buildPlayerStats(matchData);
    const teams = buildTeamComparison(matchData);

    res.json({
      matchData,
      prediction,
      highlights,
      timeline,
      players,
      teams
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch match data' });
  }
});

module.exports = router;
