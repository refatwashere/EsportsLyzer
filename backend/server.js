require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const matchRoutes = require('./routes/match');
const { getMatch } = require('./services/csapi');
const { getEvent } = require('./services/sofascore');
const { computePrediction } = require('./utils/prediction');
const { generateHighlights } = require('./utils/highlights');
const { buildTimeline } = require('./utils/timeline');
const { buildPlayerStats } = require('./utils/players');
const { buildTeamComparison } = require('./utils/teams');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

app.use(cors());
app.use(express.json());

// REST routes
app.use('/api', matchRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'EsportsLyzer Backend',
    features: ['csapi', 'sofascore', 'supabase-ready']
  });
});

// WebSocket live updates (supports sport type)
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  let interval = null;

  socket.on('subscribeMatch', async (payload) => {
    // Accept either string ID (legacy) or { sport, id }
    const matchId = typeof payload === 'string' ? payload : payload?.id;
    const sport = typeof payload === 'object' ? (payload.sport || 'esports') : 'esports';

    console.log(`Subscribed to ${sport} match ${matchId}`);

    if (interval) clearInterval(interval);

    const pushUpdate = async () => {
      try {
        if (sport === 'esports') {
          const matchData = await getMatch(matchId);
          const prediction = computePrediction(matchData);
          const highlights = generateHighlights(matchData);
          const timeline = buildTimeline(matchData);
          const players = buildPlayerStats(matchData);
          const teams = buildTeamComparison(matchData);

          socket.emit('matchUpdate', {
            sport: 'esports',
            matchData,
            prediction,
            highlights,
            timeline,
            players,
            teams
          });
        } else {
          // football / tennis via Sofascore
          const event = await getEvent(matchId, sport);
          socket.emit('matchUpdate', {
            sport,
            matchData: event,
            prediction: null,
            highlights: [],
            timeline: [],
            players: [],
            teams: []
          });
        }
      } catch (err) {
        console.error('Update error:', err.message);
        socket.emit('error', { message: err.message });
      }
    };

    // Immediate + interval
    await pushUpdate();
    interval = setInterval(pushUpdate, 30000);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    if (interval) clearInterval(interval);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🔥 EsportsLyzer Backend running on port ${PORT}`);
});
