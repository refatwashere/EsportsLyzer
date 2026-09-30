# EsportsLyzer Project Plan

## 1. Overview

EsportsLyzer is a sports and esports analytics platform focused on match intelligence, predictive insights, and visual storytelling. The long-term product combines live data feeds, match event analysis, and interactive dashboards to help users understand momentum, probability, player impact, and game state.

The current build is a CS2-first results dashboard with partial football and tennis experiences. The CS2 provider supplies recent results, player stats, and ranking estimates, but not a guaranteed live-event feed.

> Current phase status and task ownership live in [CHECKLIST.md](CHECKLIST.md). The exploratory examples after Section 12 are legacy proposals, not implemented behavior or current implementation guidance.

### Status

- Active prototype / MVP in progress
- CSAPI match results, player stats, and ranking-based estimates are integrated; a guaranteed current-live CS2 feed is not
- Multi-sport adapters and personalization UI exist in partial form; reliable provider coverage and saved preferences remain incomplete

## Phase Documents

- [Phase 1: Core Dashboard Foundation](docs/phase_01_core_dashboard_foundation.md)
- [Phase 2: Data Quality and Prediction Refinement](docs/phase_02_data_quality_and_prediction.md)
- [Phase 3: Multi-Sport Expansion](docs/phase_03_multi_sport_expansion.md)
- [Phase 4: Personalization and Engagement](docs/phase_04_personalization_and_engagement.md)
- [Phase 5: Advanced Analytics and Growth](docs/phase_05_advanced_analytics_and_growth.md)
- [Phase Index](docs/phases.md)

---

## 2. Product Goals

### Primary objectives

- Deliver live, readable match data for esports and sports audiences
- Present probability, highlights, and timeline-based insights in a clear interface
- Enable fast comparison between teams, players, and match states
- Build a modular system that can scale beyond CS2 into multiple sports
- Keep the platform lightweight, deployable, and suitable for free-tier hosting

### Core value proposition

EsportsLyzer turns raw match data into a decision-support dashboard that helps users track outcomes, momentum swings, and contextual trends in a visually intuitive way.

---

## 3. Current Feature Scope

### Live dashboard capabilities

- CS2 match results sourced from the public CSAPI
- Recent-match selection and match-detail subscription flow
- Socket.IO refreshes selected match data every 30 seconds
- Provider ranking estimate and team/player summaries
- Timeline and highlight components exist; CSAPI does not currently supply the round events needed to populate them
- Team comparison and player card views
- Sport selector supporting esports, football, and tennis categories
- Favorites and authentication scaffolding using Supabase

### User-facing experience

- Fast overview of recent match results and score states
- Interactive panels for stats, teams, and players
- Context-rich charts for momentum and outcome probability
- Modular frontend experience for future personalization and dashboards

---

## 4. Functional Requirements

### 4.1 Match discovery and selection

- Users should be able to browse active or recent matches
- Match selection should trigger data retrieval and dashboard population
- The system should support user subscriptions or favorites for repeated follow-up

### 4.2 Data ingestion

- Backend services should normalize external match data into a common structure
- Live data should be polled or pushed at predictable intervals
- Data quality checks should handle API outages, rate limiting, and empty responses

### 4.3 Prediction and analysis layer

- The system should compute confidence and momentum estimates from match context
- Prediction logic should consider live scores, player state, team trends, and historical patterns
- Calculations must remain modular so they can evolve from heuristic models to more advanced analytics

### 4.4 Visualization layer

- Charts should present outcome probabilities, cumulative trends, and event timelines
- The UI should emphasize clarity, responsiveness, and rapid updates
- Visual components must be reusable across multiple sports and match types

### 4.5 Personalization

- Users should be able to save favorite teams, matches, or sports
- Supabase integration should support auth and profile state
- Future enhancements may include customizing dashboards and saved views

---

## 5. Architecture Overview

### Backend

The backend is built with Node.js and Express and is responsible for:

- external API integrations
- request routing and match data orchestration
- data transformation and normalization
- prediction and analytics calculations
- WebSocket broadcasting to connected clients

### Frontend

The frontend is built with Next.js and Tailwind CSS and is responsible for:

- rendering dashboard components and panels
- displaying charts and score updates
- handling user interaction and sport selection
- connecting to backend APIs and live updates

### Shared design principles

- clear separation of concerns between services and utilities
- reusable logic for match analysis and storytelling
- extensibility for multiple sports without rewriting the UI core

---

## 6. Technical Stack

### Frontend

- Next.js
- React
- Tailwind CSS
- Charting components for probability and momentum views

### Backend

- Node.js
- Express
- Socket.IO for real-time updates

### Data & integrations

- Public CSAPI for recent match results, player stats, and ranking estimates; current-live events are not guaranteed
- Sofascore service layer for sports expansion
- Supabase for auth and personalization features

### Deployment model

- Frontend: Vercel
- Backend: Render or equivalent lightweight deployment
- Database/Auth: Supabase

---

## 7. Project Structure

```text
esportslyzer/
├── backend/
│   ├── routes/
│   ├── services/
│   │   ├── csapi.js
│   │   ├── sofascore.js
│   │   └── supabase.js
│   ├── utils/
│   │   ├── highlights.js
│   │   ├── players.js
│   │   ├── prediction.js
│   │   ├── teams.js
│   │   └── timeline.js
│   └── server.js
├── frontend/
│   ├── app/
│   ├── components/
│   │   ├── charts/
│   │   ├── panels/
│   │   └── AuthPanel.js
│   ├── hooks/
│   ├── lib/
│   └── styles/
├── docs/
│   ├── ARCHITECTURE.md
│   ├── ROADMAP.md
│   └── SUPABASE_SETUP.md
├── README.md
├── Plan.md
└── REVIEW.md
```

---

## 8. Data Flow

1. User opens the dashboard and selects a sport or match
2. Backend fetches relevant live data from the selected source
3. Data is normalized into a common internal shape
4. Analytics utilities compute predictions, highlights, and timelines
5. Frontend renders updated charts and panels
6. WebSocket push events refresh the UI without full page reloads

This flow keeps the platform responsive while maintaining a structured path from raw data to user insight.

---

## 9. Roadmap

### Phase 1: Core dashboard foundation

- Live match data integration
- Real-time updates
- Team and player summary panels
- Probability curve visualizations
- Basic highlight generation

### Phase 2: Data quality and prediction refinement

- Improve model logic and feature weighting
- Strengthen fallback behavior for unreliable APIs
- Improve event summarization and timeline quality
- Refine chart readability and dashboard responsiveness

### Phase 3: Multi-sport expansion

- Add broader sport coverage using modular source adapters
- Extend visualization and analytics logic beyond CS2
- Improve cross-sport data normalization

### Phase 4: Personalization and engagement

- Supabase auth and account flows
- Favorites and saved content
- Alerts and user-specific dashboard preferences

### Phase 5: Advanced analytics and growth

- Deeper player impact analytics
- Expanded storytelling tools and commentary
- Exporting, advanced filters, and more specialized dashboards

---

## 10. Risks and Constraints

### Data reliability

External APIs may rate-limit, block, or change response formats. The project must be designed with resilience, caching, and meaningful fallback behavior.

### Prediction accuracy

The prediction engine is a heuristic and analytics layer rather than a proprietary betting engine. It should be framed as match intelligence, not guaranteed forecasting.

### Product scope management

The application can grow quickly. The team should prioritize a stable MVP first, then expand into advanced features after validation.

---

## 11. Strategic Recommendation

The best near-term direction is to continue refining the existing CS2-first dashboard while treating the architecture as a reusable multi-sport platform. This keeps the product focused, reduces delivery risk, and provides a clear path toward broader adoption without abandoning the core user experience.

---

## 12. Conclusion

EsportsLyzer is an active prototype with a substantial dashboard foundation, but Phase 1 remains incomplete against its live-data acceptance criteria. The next stage should focus on provider reliability, data quality, and controlled multi-sport expansion.

This document serves as the working blueprint for technical execution and product direction going forward.

```

---

## 🚀 User Experience
- **HLTV Data:** Round‑by‑round probabilities, highlights, timeline, player cards, team comparison.  
- **Sofascore Data:** Live score, match status, and statistical feed (possession, shots, momentum).  
- **Unified Dashboard:** Both sources update live via WebSocket, giving a richer, cross‑verified view of the match.  

---

✨ With Sofascore support, your app now becomes a **multi‑source live tracker**, combining HLTV’s esports‑focused stats with Sofascore’s broader live data feed.  

---

Here’s how you can add a **toggle view for HLTV ↔ Sofascore data** so users can switch between sources in the frontend UI:

---

## 🎨 Frontend Toggle Component

```jsx
// frontend/components/DataSourceToggle.js
export default function DataSourceToggle({ source, setSource }) {
  return (
    <div className="flex space-x-4 mb-4">
      <button
        onClick={() => setSource('hltv')}
        className={`px-4 py-2 rounded ${source === 'hltv' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        HLTV Data
      </button>
      <button
        onClick={() => setSource('sofascore')}
        className={`px-4 py-2 rounded ${source === 'sofascore' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
      >
        Sofascore Data
      </button>
    </div>
  );
}
```

---

## 🖥️ Integrating into the Page

```jsx
// frontend/pages/index.js
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import DataSourceToggle from '../components/DataSourceToggle';
import ProbabilityChart from '../components/ProbabilityChart';
import CumulativeChart from '../components/CumulativeChart';
import HighlightFeed from '../components/HighlightFeed';
import RoundTimeline from '../components/RoundTimeline';
import PlayerCards from '../components/PlayerCards';
import TeamComparison from '../components/TeamComparison';
import MatchSummary from '../components/MatchSummary';
import SofascorePanel from '../components/SofascorePanel';

const socket = io('http://localhost:3001');

export default function Home() {
  const [matchId, setMatchId] = useState('');
  const [data, setData] = useState(null);
  const [source, setSource] = useState('hltv'); // default HLTV

  const subscribeMatch = () => {
    socket.emit('subscribeMatch', matchId);
  };

  useEffect(() => {
    socket.on('matchUpdate', (update) => {
      setData(update);
    });
    return () => socket.off('matchUpdate');
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Match Predictor (HLTV + Sofascore)</h1>
      <input
        type="text"
        placeholder="Paste match ID"
        value={matchId}
        onChange={e => setMatchId(e.target.value)}
        className="border p-2 mr-2"
      />
      <button onClick={subscribeMatch} className="bg-blue-500 text-white p-2">
        Subscribe Live
      </button>

      <DataSourceToggle source={source} setSource={setSource} />

      {data && source === 'hltv' && (
        <div className="space-y-6">
          <ProbabilityChart data={data.prediction.probabilities[0]} />
          <CumulativeChart seriesData={...} />
          <HighlightFeed highlights={data.highlights || []} />
          <RoundTimeline timeline={data.timeline || []} />
          <PlayerCards players={data.players || []} />
          <TeamComparison teams={data.teams || []} />
          <MatchSummary summary={data.summary} />
        </div>
      )}

      {data && source === 'sofascore' && (
        <SofascorePanel sofascore={data.sofascore} />
      )}
    </div>
  );
}
```

---

## 🚀 User Experience

- **Toggle Buttons:** Users can switch between HLTV and Sofascore views instantly.  
- **HLTV View:** Shows esports‑specific data (probability curves, highlights, timeline, player cards, team comparison, summary).  
- **Sofascore View:** Shows live score, match status, and general sports stats.  
- **Unified Flow:** Both sources update live via WebSocket, but the user chooses which dataset to visualize.  

---

✨ With this toggle, your app becomes a **multi‑source live tracker**: esports‑focused HLTV data and broader Sofascore stats, all in one smooth interface.  

---

Here’s how you can build a **hybrid HLTV + Sofascore view** so users see both sources side‑by‑side without toggling:

---

## 🏗️ Backend

You already fetch HLTV and Sofascore data separately. For hybrid view, just return both in the same payload:

```js
// backend/server.js
app.get('/api/match/:id', async (req, res) => {
  const matchId = req.params.id;
  const hltvData = await getMatch(matchId);
  const sofascoreData = await getSofascoreMatch(matchId);

  res.json({
    hltv: hltvData,
    sofascore: sofascoreData,
    prediction: computePrediction(hltvData),
  });
});
```

---

## 🎨 Frontend Hybrid Panel

```jsx
// frontend/components/HybridView.js
import ProbabilityChart from './ProbabilityChart';
import CumulativeChart from './CumulativeChart';
import HighlightFeed from './HighlightFeed';
import RoundTimeline from './RoundTimeline';
import PlayerCards from './PlayerCards';
import TeamComparison from './TeamComparison';
import MatchSummary from './MatchSummary';
import SofascorePanel from './SofascorePanel';

export default function HybridView({ data }) {
  if (!data) return null;
  return (
    <div className="grid grid-cols-2 gap-6">
      {/* HLTV side */}
      <div className="space-y-6">
        <h2 className="text-lg font-bold">HLTV Data</h2>
        <ProbabilityChart data={data.prediction.probabilities[0]} />
        <CumulativeChart seriesData={...} />
        <HighlightFeed highlights={data.highlights || []} />
        <RoundTimeline timeline={data.timeline || []} />
        <PlayerCards players={data.players || []} />
        <TeamComparison teams={data.teams || []} />
        <MatchSummary summary={data.summary} />
      </div>

      {/* Sofascore side */}
      <div className="space-y-6">
        <h2 className="text-lg font-bold">Sofascore Data</h2>
        <SofascorePanel sofascore={data.sofascore} />
      </div>
    </div>
  );
}
```

---

## 🖥️ Page Integration

```jsx
// frontend/pages/index.js
import HybridView from '../components/HybridView';

{data && <HybridView data={data} />}
```

---

## 🚀 User Experience

- **Single Dashboard:** HLTV and Sofascore data displayed side‑by‑side.  
- **HLTV Side:** Probabilities, highlights, timeline, player cards, team comparison, summary.  
- **Sofascore Side:** Live score, match status, general sports stats.  
- **Live Updates:** Both sources refresh together via WebSocket, ensuring synchronized insights.  

---

✨ With this hybrid view, your app becomes a **comprehensive match companion**, blending HLTV’s esports‑specific depth with Sofascore’s broader live feed.  

---

To build a **synchronized timeline** that merges HLTV round outcomes with Sofascore momentum stats, here’s the approach:

---

## 🏗️ Backend (Unified Timeline Builder)

```js
// backend/utils/hybridTimeline.js
function buildHybridTimeline(hltvData, sofascoreData) {
  const timeline = [];

  // HLTV rounds
  hltvData.rounds.forEach((round, i) => {
    timeline.push({
      type: 'round',
      index: i + 1,
      winner: round.winner,
      isPistol: round.isPistol,
      clutch: round.clutch ? `${round.player} ${round.clutch}v${round.clutchOpponents}` : null,
    });
  });

  // Sofascore momentum events
  if (sofascoreData && sofascoreData.stats && sofascoreData.stats.momentum) {
    sofascoreData.stats.momentum.forEach((event, i) => {
      timeline.push({
        type: 'momentum',
        index: i + 1,
        description: event.description,
        value: event.value,
      });
    });
  }

  // Sort by index/time if both sources have timestamps
  return timeline.sort((a, b) => a.index - b.index);
}

module.exports = { buildHybridTimeline };
```

Update WebSocket emitter:

```js
// backend/server.js
const { buildHybridTimeline } = require('./utils/hybridTimeline');

socket.on('subscribeMatch', async (matchId) => {
  const interval = setInterval(async () => {
    const hltvData = await getMatch(matchId);
    const sofascoreData = await getSofascoreMatch(matchId);
    const prediction = computePrediction(hltvData);
    const highlights = generateHighlights(hltvData);
    const timeline = buildHybridTimeline(hltvData, sofascoreData);

    socket.emit('matchUpdate', { hltv: hltvData, sofascore: sofascoreData, prediction, highlights, timeline });
  }, 30000);
});
```

---

## 🎨 Frontend Hybrid Timeline Component

```jsx
// frontend/components/HybridTimeline.js
export default function HybridTimeline({ timeline }) {
  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <h3 className="font-bold mb-2">Synchronized Timeline</h3>
      <div className="flex overflow-x-auto space-x-2">
        {timeline.map((item, i) => (
          <div
            key={i}
            className={`w-12 h-12 flex items-center justify-center rounded-full text-xs font-bold ${
              item.type === 'round'
                ? item.winner === 'Nexus'
                  ? 'bg-blue-400 text-white'
                  : 'bg-red-400 text-white'
                : 'bg-green-300 text-black'
            }`}
            title={
              item.type === 'round'
                ? `Round ${item.index}: ${item.winner}${item.isPistol ? ' (Pistol)' : ''}${item.clutch ? ' | ' + item.clutch : ''}`
                : `Momentum: ${item.description} (${item.value})`
            }
          >
            {item.type === 'round' ? item.index : 'M'}
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 🖥️ Page Integration

```jsx
// frontend/pages/index.js
import HybridTimeline from '../components/HybridTimeline';

{data && (
  <div className="mt-6 space-y-6">
    <HybridTimeline timeline={data.timeline || []} />
  </div>
)}
```

---

## 🚀 User Experience

- **Unified Flow:** HLTV rounds (blue/red) and Sofascore momentum events (green) appear in one timeline.  
- **Tooltips:** Hovering shows round details (winner, pistol, clutch) or momentum descriptions.  
- **Dynamic Updates:** WebSocket pushes new rounds and momentum stats every 30s.  
- **Visual Clarity:** Users instantly see how esports‑specific outcomes (HLTV) align with broader momentum swings (Sofascore).  

---

✨ With this synchronized timeline, your app now delivers a **truly hybrid match tracker**: HLTV’s round‑by‑round depth and Sofascore’s momentum stats woven together into one smooth visual flow.  

---

Here’s how you can extend your hybrid HLTV + Sofascore dashboard with a **momentum graph overlay** — a line chart that shows HLTV win probability curves alongside Sofascore momentum values, so users can visually correlate the two:

---

## 🏗️ Backend (Merge Probability + Momentum)

```js
// backend/utils/momentumGraph.js
function buildMomentumGraph(hltvData, sofascoreData) {
  const rounds = hltvData.rounds.map((r, i) => ({
    round: i + 1,
    nexusProb: r.nexusProb,
    rustecProb: r.rustecProb,
  }));

  const momentum = sofascoreData?.stats?.momentum || [];

  return rounds.map((r, i) => ({
    round: r.round,
    nexusProb: r.nexusProb,
    rustecProb: r.rustecProb,
    momentum: momentum[i] ? momentum[i].value : null,
  }));
}

module.exports = { buildMomentumGraph };
```

Update emitter:

```js
// backend/server.js
const { buildMomentumGraph } = require('./utils/momentumGraph');

socket.on('subscribeMatch', async (matchId) => {
  const interval = setInterval(async () => {
    const hltvData = await getMatch(matchId);
    const sofascoreData = await getSofascoreMatch(matchId);
    const prediction = computePrediction(hltvData);
    const highlights = generateHighlights(hltvData);
    const timeline = buildHybridTimeline(hltvData, sofascoreData);
    const momentumGraph = buildMomentumGraph(hltvData, sofascoreData);

    socket.emit('matchUpdate', { hltv: hltvData, sofascore: sofascoreData, prediction, highlights, timeline, momentumGraph });
  }, 30000);
});
```

---

## 🎨 Frontend Momentum Graph Component

```jsx
// frontend/components/MomentumGraph.js
import { Line } from 'react-chartjs-2';

export default function MomentumGraph({ data }) {
  if (!data) return null;

  const chartData = {
    labels: data.map(d => `R${d.round}`),
    datasets: [
      {
        label: 'Nexus Win Probability',
        data: data.map(d => d.nexusProb * 100),
        borderColor: 'blue',
        yAxisID: 'y',
      },
      {
        label: 'ex-RUSTEC Win Probability',
        data: data.map(d => d.rustecProb * 100),
        borderColor: 'red',
        yAxisID: 'y',
      },
      {
        label: 'Sofascore Momentum',
        data: data.map(d => d.momentum),
        borderColor: 'green',
        borderDash: [5, 5],
        yAxisID: 'y1',
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: { mode: 'index', intersect: false },
    stacked: false,
    plugins: {
      title: { display: true, text: 'Win Probability vs Sofascore Momentum' },
    },
    scales: {
      y: { type: 'linear', position: 'left', title: { display: true, text: 'Win Probability (%)' } },
      y1: { type: 'linear', position: 'right', title: { display: true, text: 'Momentum' }, grid: { drawOnChartArea: false } },
    },
  };

  return <Line data={chartData} options={options} />;
}
```

---

## 🖥️ Page Integration

```jsx
// frontend/pages/index.js
import MomentumGraph from '../components/MomentumGraph';

{data && (
  <div className="mt-6 space-y-6">
    <HybridTimeline timeline={data.timeline || []} />
    <MomentumGraph data={data.momentumGraph || []} />
  </div>
)}
```

---

## 🚀 User Experience

- **Overlay Chart:** HLTV win probabilities (blue/red lines) plotted against Sofascore momentum (green dashed line).  
- **Dual Axes:** Left axis = probability (%), right axis = momentum values.  
- **Correlation Insight:** Users can see how Sofascore’s momentum swings align with HLTV’s probability shifts (e.g., pistol wins, streaks, clutches).  
- **Live Updates:** Graph refreshes every 30s via WebSocket.  

---

✨ With this momentum overlay, your app now delivers a **deep analytical view**: not only round outcomes and highlights, but also how statistical momentum correlates with win probability.  

---

Here’s how you can add a **match flow heatmap** — a color‑coded intensity grid that shows round dominance and Sofascore momentum swings in one unified visualization:

---

## 🏗️ Backend (Heatmap Data Builder)

```js
// backend/utils/heatmap.js
function buildHeatmapData(hltvData, sofascoreData) {
  const rounds = hltvData.rounds.map((r, i) => ({
    round: i + 1,
    winner: r.winner,
    nexusProb: r.nexusProb,
    rustecProb: r.rustecProb,
  }));

  const momentum = sofascoreData?.stats?.momentum || [];

  return rounds.map((r, i) => ({
    round: r.round,
    winner: r.winner,
    dominance: Math.abs(r.nexusProb - r.rustecProb), // intensity of win probability gap
    momentum: momentum[i] ? momentum[i].value : 0,
  }));
}

module.exports = { buildHeatmapData };
```

Update emitter:

```js
// backend/server.js
const { buildHeatmapData } = require('./utils/heatmap');

socket.on('subscribeMatch', async (matchId) => {
  const interval = setInterval(async () => {
    const hltvData = await getMatch(matchId);
    const sofascoreData = await getSofascoreMatch(matchId);
    const prediction = computePrediction(hltvData);
    const highlights = generateHighlights(hltvData);
    const timeline = buildHybridTimeline(hltvData, sofascoreData);
    const momentumGraph = buildMomentumGraph(hltvData, sofascoreData);
    const heatmap = buildHeatmapData(hltvData, sofascoreData);

    socket.emit('matchUpdate', { hltv: hltvData, sofascore: sofascoreData, prediction, highlights, timeline, momentumGraph, heatmap });
  }, 30000);
});
```

---

## 🎨 Frontend Heatmap Component

```jsx
// frontend/components/MatchFlowHeatmap.js
import { Chart as ChartJS } from 'chart.js/auto';
import { HeatmapController, ColorScale } from 'chartjs-chart-heatmap';
import { Chart } from 'react-chartjs-2';

ChartJS.register(HeatmapController, ColorScale);

export default function MatchFlowHeatmap({ data }) {
  if (!data) return null;

  const chartData = {
    labels: data.map(d => `R${d.round}`),
    datasets: [
      {
        label: 'Dominance Heatmap',
        data: data.map((d, i) => ({ x: i, y: 0, v: d.dominance })),
      },
      {
        label: 'Momentum Heatmap',
        data: data.map((d, i) => ({ x: i, y: 1, v: d.momentum })),
      },
    ],
  };

  const options = {
    plugins: {
      title: { display: true, text: 'Match Flow Heatmap (Dominance + Momentum)' },
    },
    scales: {
      x: { type: 'category', labels: data.map(d => `R${d.round}`) },
      y: { type: 'category', labels: ['Dominance', 'Momentum'] },
    },
  };

  return <Chart type="heatmap" data={chartData} options={options} />;
}
```

---

## 🖥️ Page Integration

```jsx
// frontend/pages/index.js
import MatchFlowHeatmap from '../components/MatchFlowHeatmap';

{data && (
  <div className="mt-6 space-y-6">
    <HybridTimeline timeline={data.timeline || []} />
    <MomentumGraph data={data.momentumGraph || []} />
    <MatchFlowHeatmap data={data.heatmap || []} />
  </div>
)}
```

---

## 🚀 User Experience

- **Heatmap Rows:**  
  - Row 1 = HLTV dominance (probability gap intensity).  
  - Row 2 = Sofascore momentum values.  
- **Color Coding:** Darker = stronger dominance/momentum swing.  
- **Round Labels:** Each column corresponds to a round.  
- **Unified Flow:** Users instantly see which rounds had the biggest probability gaps and how they align with Sofascore momentum spikes.  
- **Live Updates:** Heatmap refreshes every 30s via WebSocket.  

---

✨ With this heatmap, your app now delivers a **multi‑layered match flow visualization**: HLTV probabilities, Sofascore momentum, synchronized timeline, and a color‑coded intensity grid that makes dominance swings crystal clear.  

---

Here’s how you can extend your hybrid HLTV + Sofascore dashboard with a **player impact overlay heatmap** — so each round shows which players had the biggest influence, layered alongside dominance and momentum:

---

## 🏗️ Backend (Player Impact Heatmap Data)

```js
// backend/utils/playerImpact.js
function buildPlayerImpactHeatmap(hltvData) {
  return hltvData.rounds.map((round, i) => {
    // Find top impact player per round (kills, clutch, ADR contribution)
    const topPlayer = round.players.reduce((best, p) => {
      const impactScore = (p.kills * 2) + (p.clutch ? 5 : 0) + (p.adrContribution || 0);
      return impactScore > best.score ? { name: p.name, team: p.team, score: impactScore } : best;
    }, { name: null, team: null, score: -Infinity });

    return {
      round: i + 1,
      player: topPlayer.name,
      team: topPlayer.team,
      impactScore: topPlayer.score,
    };
  });
}

module.exports = { buildPlayerImpactHeatmap };
```

Update emitter:

```js
// backend/server.js
const { buildPlayerImpactHeatmap } = require('./utils/playerImpact');

socket.on('subscribeMatch', async (matchId) => {
  const interval = setInterval(async () => {
    const hltvData = await getMatch(matchId);
    const sofascoreData = await getSofascoreMatch(matchId);
    const prediction = computePrediction(hltvData);
    const highlights = generateHighlights(hltvData);
    const timeline = buildHybridTimeline(hltvData, sofascoreData);
    const momentumGraph = buildMomentumGraph(hltvData, sofascoreData);
    const heatmap = buildHeatmapData(hltvData, sofascoreData);
    const playerImpact = buildPlayerImpactHeatmap(hltvData);

    socket.emit('matchUpdate', { hltv: hltvData, sofascore: sofascoreData, prediction, highlights, timeline, momentumGraph, heatmap, playerImpact });
  }, 30000);
});
```

---

## 🎨 Frontend Player Impact Heatmap Component

```jsx
// frontend/components/PlayerImpactHeatmap.js
import { Chart } from 'react-chartjs-2';

export default function PlayerImpactHeatmap({ data }) {
  if (!data) return null;

  const chartData = {
    labels: data.map(d => `R${d.round}`),
    datasets: [
      {
        label: 'Player Impact',
        data: data.map((d, i) => ({ x: i, y: 0, v: d.impactScore })),
      },
    ],
  };

  const options = {
    plugins: {
      title: { display: true, text: 'Player Impact Heatmap' },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const round = data[ctx.dataIndex];
            return `${round.player} (${round.team}) Impact: ${round.impactScore}`;
          },
        },
      },
    },
    scales: {
      x: { type: 'category', labels: data.map(d => `R${d.round}`) },
      y: { type: 'category', labels: ['Impact'] },
    },
  };

  return <Chart type="heatmap" data={chartData} options={options} />;
}
```

---

## 🖥️ Page Integration

```jsx
// frontend/pages/index.js
import PlayerImpactHeatmap from '../components/PlayerImpactHeatmap';

{data && (
  <div className="mt-6 space-y-6">
    <HybridTimeline timeline={data.timeline || []} />
    <MomentumGraph data={data.momentumGraph || []} />
    <MatchFlowHeatmap data={data.heatmap || []} />
    <PlayerImpactHeatmap data={data.playerImpact || []} />
  </div>
)}
```

---

## 🚀 User Experience

- **Heatmap Rows:**  
  - Dominance (probability gap intensity).  
  - Momentum (Sofascore swings).  
  - Player Impact (top performer per round).  
- **Tooltips:** Hover shows which player had the biggest impact each round, with team and score.  
- **Visual Clarity:** Users can instantly see how individual performances tie into dominance and momentum shifts.  
- **Live Updates:** Overlay refreshes every 30s, keeping player impact current.  

---

✨ With this player impact overlay, your app now delivers a **full 360° match visualization**: HLTV probabilities, Sofascore momentum, synchronized timeline, dominance heatmap, and per‑round player impact.  

---

Here’s how you can extend your dashboard with an **MVP tracker** — a live leaderboard that auto‑updates to show the most impactful players across the whole match:

---

## 🏗️ Backend (MVP Leaderboard Builder)

```js
// backend/utils/mvpTracker.js
function buildMVPTracker(hltvData) {
  // Aggregate impact scores across all rounds
  const playerStats = {};

  hltvData.rounds.forEach(round => {
    round.players.forEach(p => {
      const impactScore = (p.kills * 2) + (p.clutch ? 5 : 0) + (p.adrContribution || 0);
      if (!playerStats[p.name]) {
        playerStats[p.name] = { team: p.team, score: 0, kills: 0, deaths: 0, clutches: 0 };
      }
      playerStats[p.name].score += impactScore;
      playerStats[p.name].kills += p.kills;
      playerStats[p.name].deaths += p.deaths;
      if (p.clutch) playerStats[p.name].clutches += 1;
    });
  });

  // Sort players by score
  return Object.entries(playerStats)
    .map(([name, stats]) => ({ name, ...stats }))
    .sort((a, b) => b.score - a.score);
}

module.exports = { buildMVPTracker };
```

Update emitter:

```js
// backend/server.js
const { buildMVPTracker } = require('./utils/mvpTracker');

socket.on('subscribeMatch', async (matchId) => {
  const interval = setInterval(async () => {
    const hltvData = await getMatch(matchId);
    const sofascoreData = await getSofascoreMatch(matchId);
    const prediction = computePrediction(hltvData);
    const highlights = generateHighlights(hltvData);
    const timeline = buildHybridTimeline(hltvData, sofascoreData);
    const momentumGraph = buildMomentumGraph(hltvData, sofascoreData);
    const heatmap = buildHeatmapData(hltvData, sofascoreData);
    const playerImpact = buildPlayerImpactHeatmap(hltvData);
    const mvpTracker = buildMVPTracker(hltvData);

    socket.emit('matchUpdate', { hltv: hltvData, sofascore: sofascoreData, prediction, highlights, timeline, momentumGraph, heatmap, playerImpact, mvpTracker });
  }, 30000);
});
```

---

## 🎨 Frontend MVP Tracker Component

```jsx
// frontend/components/MVPTracker.js
export default function MVPTracker({ players }) {
  if (!players || players.length === 0) return null;

  return (
    <div className="bg-yellow-50 p-4 rounded shadow mt-6">
      <h3 className="font-bold mb-2">MVP Tracker</h3>
      <ol className="list-decimal pl-5">
        {players.slice(0, 5).map((p, i) => (
          <li key={i}>
            {p.name} ({p.team}) — Impact {p.score}, K/D {p.kills}/{p.deaths}, Clutches {p.clutches}
          </li>
        ))}
      </ol>
    </div>
  );
}
```

---

## 🖥️ Page Integration

```jsx
// frontend/pages/index.js
import MVPTracker from '../components/MVPTracker';

{data && (
  <div className="mt-6 space-y-6">
    <HybridTimeline timeline={data.timeline || []} />
    <MomentumGraph data={data.momentumGraph || []} />
    <MatchFlowHeatmap data={data.heatmap || []} />
    <PlayerImpactHeatmap data={data.playerImpact || []} />
    <MVPTracker players={data.mvpTracker || []} />
  </div>
)}
```

---

## 🚀 User Experience

- **Leaderboard:** Shows top 5 players ranked by cumulative impact score.  
- **Stats:** Each entry includes team, impact score, K/D, and clutch count.  
- **Auto‑Updating:** Refreshes every 30s via WebSocket, so leaderboard shifts as match progresses.  
- **End of Match:** Final MVP ranking doubles as a highlight in the match summary.  

---

✨ With this MVP tracker, your app now delivers a **complete performance narrative**: round outcomes, momentum swings, player impact per round, and a live leaderboard of the most impactful players.  

---

Here’s how you can add a **team MVP badge** feature — highlighting the top player from each team separately, so fans instantly see who carried Nexus and ex‑RUSTEC:

---

## 🏗️ Backend (Team MVP Builder)

```js
// backend/utils/teamMVP.js
function buildTeamMVP(hltvData) {
  const teamPlayers = {};

  hltvData.rounds.forEach(round => {
    round.players.forEach(p => {
      const impactScore = (p.kills * 2) + (p.clutch ? 5 : 0) + (p.adrContribution || 0);
      if (!teamPlayers[p.team]) teamPlayers[p.team] = {};
      if (!teamPlayers[p.team][p.name]) {
        teamPlayers[p.team][p.name] = { score: 0, kills: 0, deaths: 0, clutches: 0 };
      }
      teamPlayers[p.team][p.name].score += impactScore;
      teamPlayers[p.team][p.name].kills += p.kills;
      teamPlayers[p.team][p.name].deaths += p.deaths;
      if (p.clutch) teamPlayers[p.team][p.name].clutches += 1;
    });
  });

  // Pick top player per team
  const badges = Object.entries(teamPlayers).map(([team, players]) => {
    const top = Object.entries(players)
      .map(([name, stats]) => ({ name, team, ...stats }))
      .sort((a, b) => b.score - a.score)[0];
    return top;
  });

  return badges;
}

module.exports = { buildTeamMVP };
```

Update emitter:

```js
// backend/server.js
const { buildTeamMVP } = require('./utils/teamMVP');

socket.on('subscribeMatch', async (matchId) => {
  const interval = setInterval(async () => {
    const hltvData = await getMatch(matchId);
    const sofascoreData = await getSofascoreMatch(matchId);
    const prediction = computePrediction(hltvData);
    const highlights = generateHighlights(hltvData);
    const timeline = buildHybridTimeline(hltvData, sofascoreData);
    const momentumGraph = buildMomentumGraph(hltvData, sofascoreData);
    const heatmap = buildHeatmapData(hltvData, sofascoreData);
    const playerImpact = buildPlayerImpactHeatmap(hltvData);
    const mvpTracker = buildMVPTracker(hltvData);
    const teamMVP = buildTeamMVP(hltvData);

    socket.emit('matchUpdate', { hltv: hltvData, sofascore: sofascoreData, prediction, highlights, timeline, momentumGraph, heatmap, playerImpact, mvpTracker, teamMVP });
  }, 30000);
});
```

---

## 🎨 Frontend Team MVP Badge Component

```jsx
// frontend/components/TeamMVPBadge.js
export default function TeamMVPBadge({ badges }) {
  if (!badges || badges.length === 0) return null;

  return (
    <div className="bg-purple-50 p-4 rounded shadow mt-6">
      <h3 className="font-bold mb-2">Team MVPs</h3>
      <div className="flex space-x-6">
        {badges.map((p, i) => (
          <div key={i} className="p-4 border rounded bg-white">
            <h4 className="font-bold">{p.team} MVP</h4>
            <p>{p.name}</p>
            <p>Impact: {p.score}</p>
            <p>K/D: {p.kills}/{p.deaths}</p>
            <p>Clutches: {p.clutches}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 🖥️ Page Integration

```jsx
// frontend/pages/index.js
import TeamMVPBadge from '../components/TeamMVPBadge';

{data && (
  <div className="mt-6 space-y-6">
    <HybridTimeline timeline={data.timeline || []} />
    <MomentumGraph data={data.momentumGraph || []} />
    <MatchFlowHeatmap data={data.heatmap || []} />
    <PlayerImpactHeatmap data={data.playerImpact || []} />
    <MVPTracker players={data.mvpTracker || []} />
    <TeamMVPBadge badges={data.teamMVP || []} />
  </div>
)}
```

---

## 🚀 User Experience

- **Team MVP Badges:** Each team’s top performer is highlighted separately.  
- **Stats:** Impact score, K/D, clutches shown for each MVP.  
- **Visual Clarity:** Fans instantly see who carried Nexus and ex‑RUSTEC.  
- **Live Updates:** Badges refresh every 30s, so MVPs can change dynamically as match progresses.  

---

✨ With this addition, your app now delivers a **complete performance ecosystem**: round outcomes, momentum swings, player impact, MVP leaderboard, and team MVP badges.  

---

Got it — you want to add the **live graphical match view** feature (like Sofascore’s web interface for tennis and football) into your app. This is a great enhancement because it transforms raw stats into an interactive, visual experience.

---

## 🏗️ Backend Data Handling

Sofascore provides **live event feeds** with positional/momentum data. For tennis and football:

- **Tennis:** Point‑by‑point updates, serve direction, rally length, break points.
- **Football:** Attack momentum graph, possession %, dangerous attacks, live score progression.

You’ll need to:

1. Fetch Sofascore’s live JSON feed (`/event/{matchId}/graph` or `/event/{matchId}/statistics`).
2. Normalize into a timeline array with timestamps + values.
3. Stream via WebSocket so the frontend updates in real time.

---

## 🎨 Frontend Visualization

### Tennis Match View

```jsx
// frontend/components/TennisGraph.js
import { Line } from 'react-chartjs-2';

export default function TennisGraph({ data }) {
  if (!data) return null;

  const chartData = {
    labels: data.map(d => d.point),
    datasets: [
      {
        label: 'Player A Momentum',
        data: data.map(d => d.playerA),
        borderColor: 'blue',
      },
      {
        label: 'Player B Momentum',
        data: data.map(d => d.playerB),
        borderColor: 'red',
      },
    ],
  };

  return <Line data={chartData} />;
}
```

### Football Match View

```jsx
// frontend/components/FootballGraph.js
import { Line } from 'react-chartjs-2';

export default function FootballGraph({ data }) {
  if (!data) return null;

  const chartData = {
    labels: data.map(d => d.minute),
    datasets: [
      {
        label: 'Home Team Attack Momentum',
        data: data.map(d => d.homeMomentum),
        borderColor: 'green',
      },
      {
        label: 'Away Team Attack Momentum',
        data: data.map(d => d.awayMomentum),
        borderColor: 'orange',
      },
    ],
  };

  return <Line data={chartData} />;
}
```

---

## 🖥️ Page Integration

```jsx
{data && (
  <div className="mt-6 space-y-6">
    {data.sport === 'tennis' && <TennisGraph data={data.sofascore.graph} />}
    {data.sport === 'football' && <FootballGraph data={data.sofascore.graph} />}
  </div>
)}
```

---

## 🚀 User Experience

- **Tennis:** Users see a live line graph of point‑by‑point momentum, break points, and serve dominance.  
- **Football:** Users see attack momentum curves, possession swings, and dangerous attack spikes.  
- **Dynamic Updates:** Graph refreshes every 30s (or faster) via WebSocket.  
- **Visual Storytelling:** Fans instantly grasp match flow without reading raw stats.  

---

✨ With this feature, your app now mirrors Sofascore’s **signature live graphical match view**, making tennis and football matches visually engaging and interactive.  

---

Perfect — let’s design a **combined hybrid panel** so your app can handle **multiple sports (esports via HLTV + traditional sports via Sofascore)** in one unified dashboard.  

---

## 🏗️ Backend (Multi‑Sport Normalization)

Extend your WebSocket emitter to detect sport type and normalize accordingly:

```js
// backend/utils/multiSport.js
function normalizeMatchData(source, sport, rawData) {
  if (sport === 'esports') {
    return {
      type: 'esports',
      prediction: computePrediction(rawData),
      highlights: generateHighlights(rawData),
      timeline: buildHybridTimeline(rawData, null),
      players: buildPlayerStats(rawData),
      teams: buildTeamComparison(rawData),
    };
  } else if (sport === 'football') {
    return {
      type: 'football',
      score: `${rawData.homeScore.current}-${rawData.awayScore.current}`,
      momentumGraph: rawData.stats.momentum,
      possession: rawData.stats.possession,
      attacks: rawData.stats.attacks,
    };
  } else if (sport === 'tennis') {
    return {
      type: 'tennis',
      score: `${rawData.homeScore.current}-${rawData.awayScore.current}`,
      pointGraph: rawData.stats.graph,
      serveStats: rawData.stats.serves,
      breakPoints: rawData.stats.breakPoints,
    };
  }
}
```

---

## 🎨 Frontend Hybrid Panel

```jsx
// frontend/components/MultiSportPanel.js
import HybridTimeline from './HybridTimeline';
import MomentumGraph from './MomentumGraph';
import MatchFlowHeatmap from './MatchFlowHeatmap';
import PlayerImpactHeatmap from './PlayerImpactHeatmap';
import MVPTracker from './MVPTracker';
import TeamMVPBadge from './TeamMVPBadge';
import FootballGraph from './FootballGraph';
import TennisGraph from './TennisGraph';

export default function MultiSportPanel({ data }) {
  if (!data) return null;

  if (data.type === 'esports') {
    return (
      <div className="space-y-6">
        <HybridTimeline timeline={data.timeline || []} />
        <MomentumGraph data={data.momentumGraph || []} />
        <MatchFlowHeatmap data={data.heatmap || []} />
        <PlayerImpactHeatmap data={data.playerImpact || []} />
        <MVPTracker players={data.mvpTracker || []} />
        <TeamMVPBadge badges={data.teamMVP || []} />
      </div>
    );
  }

  if (data.type === 'football') {
    return (
      <div className="space-y-6">
        <FootballGraph data={data.momentumGraph || []} />
        <p>Possession: {data.possession.home}% vs {data.possession.away}%</p>
        <p>Attacks: Home {data.attacks.home}, Away {data.attacks.away}</p>
      </div>
    );
  }

  if (data.type === 'tennis') {
    return (
      <div className="space-y-6">
        <TennisGraph data={data.pointGraph || []} />
        <p>Serve Stats: {JSON.stringify(data.serveStats)}</p>
        <p>Break Points: {JSON.stringify(data.breakPoints)}</p>
      </div>
    );
  }

  return null;
}
```

---

## 🚀 User Experience

- **Esports (HLTV):** Probabilities, highlights, timeline, player impact, MVP leaderboard, team MVP badges.  
- **Football (Sofascore):** Live attack momentum graph, possession %, dangerous attacks.  
- **Tennis (Sofascore):** Point‑by‑point momentum graph, serve stats, break points.  
- **Unified Dashboard:** One panel adapts dynamically based on sport type.  

---

✨ With this combined hybrid panel, your app becomes a **multi‑sport live tracker**: esports, football, and tennis all visualized in one place, with the same polished experience.  

---

Here’s how you can add a **sport selector UI** so users can easily switch between esports (HLTV), football, and tennis views without needing separate pages:

---

## 🎨 Sport Selector Component

```jsx
// frontend/components/SportSelector.js
export default function SportSelector({ sport, setSport }) {
  return (
    <div className="flex space-x-4 mb-4">
      <button
        onClick={() => setSport('esports')}
        className={`px-4 py-2 rounded ${sport === 'esports' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        Esports (HLTV)
      </button>
      <button
        onClick={() => setSport('football')}
        className={`px-4 py-2 rounded ${sport === 'football' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
      >
        Football (Sofascore)
      </button>
      <button
        onClick={() => setSport('tennis')}
        className={`px-4 py-2 rounded ${sport === 'tennis' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
      >
        Tennis (Sofascore)
      </button>
    </div>
  );
}
```

---

## 🖥️ Page Integration

```jsx
// frontend/pages/index.js
import { useState } from 'react';
import SportSelector from '../components/SportSelector';
import MultiSportPanel from '../components/MultiSportPanel';

export default function Home() {
  const [sport, setSport] = useState('esports'); // default HLTV

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Multi-Sport Live Dashboard</h1>
      <SportSelector sport={sport} setSport={setSport} />
      {data && <MultiSportPanel data={{ ...data, type: sport }} />}
    </div>
  );
}
```

---

## 🚀 User Experience

- **Selector Buttons:** Users can switch between esports, football, and tennis views instantly.  
- **Dynamic Panel:** The `MultiSportPanel` adapts to the selected sport type.  
- **Unified Flow:** One dashboard handles multiple sports without separate pages.  
- **Consistency:** Same polished UI across esports and traditional sports.  

---

✨ With this sport selector, your app now becomes a **true multi‑sport hub**: HLTV esports, Sofascore football, and Sofascore tennis all accessible in one place with a single click.  

---

Here’s how you can add a **multi‑match selector UI** so users can jump between different ongoing matches (across esports, football, and tennis) without reloading:

---

## 🏗️ Backend (Expose Match List)

Create an endpoint that fetches available matches from HLTV and Sofascore:

```js
// backend/server.js
app.get('/api/matches', async (req, res) => {
  const esportsMatches = await getHLTVMatches();       // HLTV API wrapper
  const footballMatches = await getSofascoreMatches('football');
  const tennisMatches = await getSofascoreMatches('tennis');

  res.json({
    esports: esportsMatches,
    football: footballMatches,
    tennis: tennisMatches,
  });
});
```

---

## 🎨 Frontend Match Selector Component

```jsx
// frontend/components/MatchSelector.js
export default function MatchSelector({ matches, selectedMatch, setSelectedMatch }) {
  if (!matches) return null;

  return (
    <div className="mb-4">
      <h3 className="font-bold mb-2">Select Match</h3>
      <select
        value={selectedMatch}
        onChange={e => setSelectedMatch(e.target.value)}
        className="border p-2 rounded w-full"
      >
        <option value="">-- Choose a match --</option>
        {Object.entries(matches).map(([sport, list]) =>
          list.map(m => (
            <option key={m.id} value={`${sport}:${m.id}`}>
              {sport.toUpperCase()} — {m.homeTeam} vs {m.awayTeam}
            </option>
          ))
        )}
      </select>
    </div>
  );
}
```

---

## 🖥️ Page Integration

```jsx
// frontend/pages/index.js
import { useState, useEffect } from 'react';
import MatchSelector from '../components/MatchSelector';
import MultiSportPanel from '../components/MultiSportPanel';

export default function Home() {
  const [matches, setMatches] = useState(null);
  const [selectedMatch, setSelectedMatch] = useState('');
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/matches').then(res => res.json()).then(setMatches);
  }, []);

  useEffect(() => {
    if (!selectedMatch) return;
    const [sport, id] = selectedMatch.split(':');
    // subscribe to chosen match via WebSocket
    socket.emit('subscribeMatch', { sport, id });
    socket.on('matchUpdate', update => setData(update));
    return () => socket.off('matchUpdate');
  }, [selectedMatch]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Multi-Sport Live Dashboard</h1>
      <MatchSelector matches={matches} selectedMatch={selectedMatch} setSelectedMatch={setSelectedMatch} />
      {data && <MultiSportPanel data={data} />}
    </div>
  );
}
```

---

## 🚀 User Experience

- **Dropdown Selector:** Users can pick any ongoing match across esports, football, or tennis.  
- **Dynamic Subscription:** WebSocket switches to the selected match feed automatically.  
- **Unified Panel:** The `MultiSportPanel` adapts to the sport type (HLTV esports, Sofascore football, Sofascore tennis).  
- **Seamless Navigation:** No reloads or page changes — just select and view instantly.  

---

✨ With this multi‑match selector, your app becomes a **true live hub**: users can browse and jump between esports, football, and tennis matches in real time, all within one dashboard.  

---

Here’s how you can add a **favorites feature** so users can star matches and keep them pinned at the top of the selector:

---

## 🏗️ Backend (Favorites Storage)

You’ll need a simple persistence layer (could be DB, Redis, or even local JSON for dev):

```js
// backend/services/favorites.js
let favorites = {};

function addFavorite(userId, match) {
  if (!favorites[userId]) favorites[userId] = [];
  if (!favorites[userId].find(m => m.id === match.id && m.sport === match.sport)) {
    favorites[userId].push(match);
  }
}

function removeFavorite(userId, matchId, sport) {
  if (!favorites[userId]) return;
  favorites[userId] = favorites[userId].filter(m => !(m.id === matchId && m.sport === sport));
}

function getFavorites(userId) {
  return favorites[userId] || [];
}

module.exports = { addFavorite, removeFavorite, getFavorites };
```

Expose endpoints:

```js
// backend/server.js
const { addFavorite, removeFavorite, getFavorites } = require('./services/favorites');

app.post('/api/favorites', (req, res) => {
  const { userId, match } = req.body;
  addFavorite(userId, match);
  res.json(getFavorites(userId));
});

app.delete('/api/favorites', (req, res) => {
  const { userId, matchId, sport } = req.body;
  removeFavorite(userId, matchId, sport);
  res.json(getFavorites(userId));
});

app.get('/api/favorites/:userId', (req, res) => {
  res.json(getFavorites(req.params.userId));
});
```

---

## 🎨 Frontend Match Selector with Favorites

```jsx
// frontend/components/MatchSelector.js
export default function MatchSelector({ matches, favorites, selectedMatch, setSelectedMatch, toggleFavorite }) {
  if (!matches) return null;

  return (
    <div className="mb-4">
      <h3 className="font-bold mb-2">Select Match</h3>

      {favorites.length > 0 && (
        <div className="mb-2">
          <h4 className="font-semibold">⭐ Favorites</h4>
          <ul>
            {favorites.map(m => (
              <li key={m.id} className="flex justify-between items-center">
                <button onClick={() => setSelectedMatch(`${m.sport}:${m.id}`)}>
                  {m.sport.toUpperCase()} — {m.homeTeam} vs {m.awayTeam}
                </button>
                <button onClick={() => toggleFavorite(m)}>★</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <select
        value={selectedMatch}
        onChange={e => setSelectedMatch(e.target.value)}
        className="border p-2 rounded w-full"
      >
        <option value="">-- Choose a match --</option>
        {Object.entries(matches).map(([sport, list]) =>
          list.map(m => (
            <option key={m.id} value={`${sport}:${m.id}`}>
              {sport.toUpperCase()} — {m.homeTeam} vs {m.awayTeam}
            </option>
          ))
        )}
      </select>
    </div>
  );
}
```

---

## 🖥️ Page Integration

```jsx
// frontend/pages/index.js
import { useState, useEffect } from 'react';
import MatchSelector from '../components/MatchSelector';
import MultiSportPanel from '../components/MultiSportPanel';

export default function Home() {
  const [matches, setMatches] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState('');
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/matches').then(res => res.json()).then(setMatches);
    fetch('/api/favorites/robuil').then(res => res.json()).then(setFavorites); // userId example
  }, []);

  const toggleFavorite = async (match) => {
    const isFav = favorites.find(f => f.id === match.id && f.sport === match.sport);
    if (isFav) {
      await fetch('/api/favorites', { method: 'DELETE', body: JSON.stringify({ userId: 'robuil', matchId: match.id, sport: match.sport }) });
    } else {
      await fetch('/api/favorites', { method: 'POST', body: JSON.stringify({ userId: 'robuil', match }) });
    }
    const updated = await fetch('/api/favorites/robuil').then(res => res.json());
    setFavorites(updated);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Multi-Sport Live Dashboard</h1>
      <MatchSelector
        matches={matches}
        favorites={favorites}
        selectedMatch={selectedMatch}
        setSelectedMatch={setSelectedMatch}
        toggleFavorite={toggleFavorite}
      />
      {data && <MultiSportPanel data={data} />}
    </div>
  );
}
```

---

## 🚀 User Experience

- **Favorites Section:** Starred matches appear pinned at the top.  
- **Toggle Star:** Clicking ★ adds/removes from favorites instantly.  
- **Persistent Storage:** Favorites saved per user (via backend).  
- **Unified Selector:** Dropdown still shows all matches, but favorites are highlighted separately.  

---

✨ With this favorites feature, your app now becomes a **personalized sports hub**: users can star their favorite esports, football, or tennis matches and keep them pinned for quick access.  

---
Here’s how you can extend your app with a **favorites notifications system** — so users get alerts when a starred match starts or when key events happen:

---

## 🏗️ Backend (Notifications Engine)

1. **Track favorites per user** (already implemented).
2. **Monitor match events** (via HLTV/Sofascore feeds).
3. **Trigger notifications** when:
   - Match status changes to *live*.
   - Key events occur (goal, set point, clutch, overtime).
   - Match ends (final score).

```js
// backend/services/notifications.js
const subscribers = {};

function subscribe(userId, matchId, sport) {
  if (!subscribers[userId]) subscribers[userId] = [];
  subscribers[userId].push({ matchId, sport });
}

function notify(userId, message) {
  // Example: WebSocket push
  io.to(userId).emit('notification', { message });
}

async function checkEvents() {
  for (const [userId, favs] of Object.entries(subscribers)) {
    for (const fav of favs) {
      const data = await fetchMatchData(fav.matchId, fav.sport);
      if (data.status === 'live' && !fav.notifiedLive) {
        notify(userId, `⭐ Your favorite match ${data.homeTeam} vs ${data.awayTeam} is now LIVE!`);
        fav.notifiedLive = true;
      }
      if (data.keyEvent) {
        notify(userId, `⚡ Key event: ${data.keyEvent}`);
      }
      if (data.status === 'finished' && !fav.notifiedEnd) {
        notify(userId, `🏁 Match ended: ${data.homeTeam} ${data.homeScore} - ${data.awayScore} ${data.awayTeam}`);
        fav.notifiedEnd = true;
      }
    }
  }
}
```

Run `checkEvents()` on an interval (e.g., every 30s).

---

## 🎨 Frontend Notifications UI

```jsx
// frontend/components/Notifications.js
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

export default function Notifications() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('notification', (note) => {
      setMessages(prev => [...prev, note.message]);
    });
    return () => socket.off('notification');
  }, []);

  return (
    <div className="fixed bottom-4 right-4 space-y-2">
      {messages.map((msg, i) => (
        <div key={i} className="bg-yellow-200 p-3 rounded shadow">
          {msg}
        </div>
      ))}
    </div>
  );
}
```

---

## 🖥️ Page Integration

```jsx
// frontend/pages/index.js
import Notifications from '../components/Notifications';

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Multi-Sport Live Dashboard</h1>
      <MatchSelector ... />
      <MultiSportPanel ... />
      <Notifications />
    </div>
  );
}
```

---

## 🚀 User Experience

- **Live Alerts:** Pop‑up notifications when a favorited match goes live.  
- **Key Events:** Instant alerts for goals, set points, clutches, or overtime.  
- **Final Score:** End‑of‑match notification with result.  
- **Persistent Favorites:** Works across esports, football, and tennis.  

---

✨ With notifications, your app now feels like a **personal match assistant**: users star their favorites, and the app proactively keeps them updated on the action.  

---

Great — instead of browser push notifications, here are some other **enhancements and updates** you could add to make your multi‑sport dashboard even richer and more engaging:

---

## ⚡ Feature Enhancements

- **Live Commentary Feed:** Integrate text commentary (play‑by‑play for football/tennis, round commentary for esports) alongside your graphs.
- **Interactive Stats Drill‑Down:** Click on a round (HLTV) or minute (football) to expand detailed stats (kills, passes, rallies).
- **Head‑to‑Head History:** Show past encounters between the same teams/players with win/loss records and performance trends.
- **Momentum Alerts:** Instead of push notifications, highlight momentum swings directly in the UI (e.g., flashing graph segments when probability shifts >20%).

---

## 🎨 Visualization Upgrades

- **Shot Maps (Football):** Overlay where shots were taken, color‑coded by danger level.
- **Serve Maps (Tennis):** Visualize serve placement and success rates.
- **Round Economy Graph (Esports):** Show team economy progression (buy rounds, eco rounds, force buys).

---

## 👥 Personalization

- **Custom Dashboards:** Let users pin their favorite visualization modules (timeline, heatmap, MVP tracker).
- **Theme Modes:** Dark/light themes, or sport‑specific color palettes (green pitch for football, blue court for tennis).
- **Favorite Players:** Extend favorites beyond matches — star individual players and get impact highlights.

---

## 📊 Analytical Insights

- **Win Probability Forecast:** Use historical data + live stats to project likely outcomes.
- **Clutch Probability (Esports):** Show chance of winning a round given remaining players/economy.
- **Expected Goals (Football):** Add xG metrics to contextualize momentum graphs.
- **Break Point Conversion (Tennis):** Track efficiency of break point opportunities.

---

✨ These upgrades would make your app not just a live tracker, but a **full analytical companion** across esports and traditional sports.  

---

Here’s a **modular dashboard layout sketch** that shows how all your widgets can fit together in a clean, grid‑based design. This way, whether the user is watching esports (HLTV) or traditional sports (football/tennis via Sofascore), the interface feels consistent and powerful:

---

## 🖼️ Modular Dashboard Layout

### **Top Bar**

- **Sport Selector** (Esports / Football / Tennis)
- **Match Selector** (dropdown with favorites pinned)
- **Live Notifications** (alerts for favorited matches/events)

---

### **Main Grid (2×2 or 3×2 depending on screen size)**

**Left Column (Match Flow & Momentum)**

- **Hybrid Timeline** (rounds + momentum events unified)
- **Momentum Graph Overlay** (probability vs Sofascore momentum)
- **Match Flow Heatmap** (dominance + momentum intensity)

**Center Column (Performance & Impact)**

- **Player Impact Heatmap** (per‑round top performer)
- **MVP Tracker Leaderboard** (top 5 players overall)
- **Team MVP Badges** (highlighting best player per team)

**Right Column (Sport‑Specific Visuals)**

- **Football Graphs:** Attack momentum, possession %, shot maps
- **Tennis Graphs:** Point‑by‑point momentum, serve maps, break point conversion
- **Esports Extras:** Round economy graph, clutch probability

---

### **Bottom Bar**

- **Live Commentary Feed** (play‑by‑play text stream)
- **Head‑to‑Head History Widget** (past encounters between teams/players)
- **Analytical Insights Panel** (xG for football, break point efficiency for tennis, win forecast for esports)

---

## 🚀 User Experience

- **Modularity:** Each widget is a card that can be rearranged or pinned by the user.  
- **Personalization:** Users can star modules they care about most (e.g., always show MVP tracker + football possession).  
- **Consistency:** Same grid layout across sports, but right column adapts to sport‑specific visuals.  
- **Scalability:** Easy to add new widgets (e.g., serve maps, shot maps, economy graphs) without breaking layout.  

---

✨ With this modular design, your app becomes a **customizable live sports hub**: esports, football, and tennis all share a unified dashboard, but each sport gets its own tailored visuals.  

---

Here’s how you can add a **drag‑and‑drop customization mode** so users can rearrange modules and build their own dashboard layout:

---

## 🏗️ Backend

No major backend changes are needed — the customization is mostly a frontend feature.  
Optionally, you can store user layouts (per account) in a DB:

```js
// backend/services/layouts.js
let layouts = {};

function saveLayout(userId, layout) {
  layouts[userId] = layout;
}

function getLayout(userId) {
  return layouts[userId] || null;
}

module.exports = { saveLayout, getLayout };
```

---

## 🎨 Frontend (Drag‑and‑Drop Grid)

Use a library like **react‑grid‑layout** or **react‑beautiful‑dnd**:

```jsx
// frontend/components/CustomDashboard.js
import GridLayout from 'react-grid-layout';
import HybridTimeline from './HybridTimeline';
import MomentumGraph from './MomentumGraph';
import MatchFlowHeatmap from './MatchFlowHeatmap';
import PlayerImpactHeatmap from './PlayerImpactHeatmap';
import MVPTracker from './MVPTracker';
import TeamMVPBadge from './TeamMVPBadge';
import FootballGraph from './FootballGraph';
import TennisGraph from './TennisGraph';

export default function CustomDashboard({ data, layout, setLayout }) {
  const defaultLayout = [
    { i: 'timeline', x: 0, y: 0, w: 4, h: 3 },
    { i: 'momentum', x: 4, y: 0, w: 4, h: 3 },
    { i: 'heatmap', x: 0, y: 3, w: 4, h: 3 },
    { i: 'impact', x: 4, y: 3, w: 4, h: 3 },
    { i: 'mvp', x: 0, y: 6, w: 4, h: 2 },
    { i: 'teamMvp', x: 4, y: 6, w: 4, h: 2 },
  ];

  return (
    <GridLayout
      className="layout"
      layout={layout || defaultLayout}
      cols={8}
      rowHeight={100}
      width={1200}
      onLayoutChange={setLayout}
    >
      <div key="timeline"><HybridTimeline timeline={data.timeline} /></div>
      <div key="momentum"><MomentumGraph data={data.momentumGraph} /></div>
      <div key="heatmap"><MatchFlowHeatmap data={data.heatmap} /></div>
      <div key="impact"><PlayerImpactHeatmap data={data.playerImpact} /></div>
      <div key="mvp"><MVPTracker players={data.mvpTracker} /></div>
      <div key="teamMvp"><TeamMVPBadge badges={data.teamMVP} /></div>
      {data.type === 'football' && <div key="football"><FootballGraph data={data.momentumGraph} /></div>}
      {data.type === 'tennis' && <div key="tennis"><TennisGraph data={data.pointGraph} /></div>}
    </GridLayout>
  );
}
```

---

## 🚀 User Experience

- **Drag‑and‑Drop:** Users can click and drag modules to rearrange them in the grid.  
- **Resizable:** Modules can be resized (wider/narrower, taller/shorter).  
- **Persistent Layouts:** Save user layouts to backend so they load automatically next time.  
- **Personalization:** Each user builds their own “sports cockpit” — esports fans can emphasize MVP trackers, football fans can emphasize possession graphs, tennis fans can emphasize serve maps.  

---

✨ With this customization mode, your app becomes a **personalized sports control center**: every user can design their own dashboard layout, mixing esports and traditional sports modules however they like.  

---

Here’s how you can add a **preset layouts feature** so users can instantly switch between curated dashboard styles like *Analyst View*, *Fan View*, or *Minimal View*:

---

## 🏗️ Backend (Preset Layouts)

Define preset configurations that can be loaded per sport:

```js
// backend/services/presetLayouts.js
const presetLayouts = {
  analyst: [
    { i: 'timeline', x: 0, y: 0, w: 4, h: 3 },
    { i: 'momentum', x: 4, y: 0, w: 4, h: 3 },
    { i: 'heatmap', x: 0, y: 3, w: 4, h: 3 },
    { i: 'impact', x: 4, y: 3, w: 4, h: 3 },
    { i: 'mvp', x: 0, y: 6, w: 4, h: 2 },
    { i: 'teamMvp', x: 4, y: 6, w: 4, h: 2 },
  ],
  fan: [
    { i: 'timeline', x: 0, y: 0, w: 6, h: 3 },
    { i: 'momentum', x: 0, y: 3, w: 6, h: 3 },
    { i: 'mvp', x: 6, y: 0, w: 2, h: 2 },
    { i: 'teamMvp', x: 6, y: 2, w: 2, h: 2 },
  ],
  minimal: [
    { i: 'timeline', x: 0, y: 0, w: 8, h: 3 },
    { i: 'momentum', x: 0, y: 3, w: 8, h: 3 },
  ],
};

function getPresetLayout(name) {
  return presetLayouts[name] || presetLayouts.minimal;
}

module.exports = { getPresetLayout };
```

---

## 🎨 Frontend Preset Selector

```jsx
// frontend/components/PresetSelector.js
export default function PresetSelector({ setLayout }) {
  const presets = ['analyst', 'fan', 'minimal'];

  return (
    <div className="flex space-x-4 mb-4">
      {presets.map(p => (
        <button
          key={p}
          onClick={() => setLayout(p)}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
        >
          {p.charAt(0).toUpperCase() + p.slice(1)} View
        </button>
      ))}
    </div>
  );
}
```

---

## 🖥️ Page Integration

```jsx
// frontend/pages/index.js
import { useState } from 'react';
import CustomDashboard from '../components/CustomDashboard';
import PresetSelector from '../components/PresetSelector';
import { getPresetLayout } from '../services/presetLayouts';

export default function Home() {
  const [layout, setLayout] = useState(getPresetLayout('fan'));

  const handlePresetChange = (preset) => {
    setLayout(getPresetLayout(preset));
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Multi-Sport Live Dashboard</h1>
      <PresetSelector setLayout={handlePresetChange} />
      <CustomDashboard data={data} layout={layout} setLayout={setLayout} />
    </div>
  );
}
```

---

## 🚀 User Experience

- **Instant Switching:** Users click a preset button to instantly rearrange the dashboard.  
- **Analyst View:** Dense with stats, heatmaps, and probability graphs.  
- **Fan View:** Emphasizes timeline and MVP highlights.  
- **Minimal View:** Clean, focused on momentum and score flow.  
- **Customizable:** Users can still drag‑and‑drop modules after loading a preset.  

---

✨ With preset layouts, your app now offers both **curated experiences** for quick use and **customizable dashboards** for power users.  

---

Here are some **plan updates and enhancements** you could add to your multi‑sport + esports dashboard project, building on everything we’ve already sketched out:

---

## ⚡ Functional Enhancements

- **Multi‑Match Favorites Hub:** Instead of just pinning matches, create a dedicated “Favorites Hub” where users see all their starred matches across sports in one glance, with live scores and quick‑switch buttons.
- **Series MVP Award:** At the end of a best‑of series (esports or tennis), crown the single most impactful player across all maps/sets.
- **Cross‑Sport Comparison Mode:** Let users compare momentum swings in football vs. tennis vs. esports — a fun analytical crossover.
- **Event Timeline Sync:** Merge HLTV round events with Sofascore football/tennis events into one unified timeline, so users can scroll through “what happened at minute 15 in football vs. round 10 in CS.”

---

## 🎨 Visualization Upgrades

- **Shot Maps (Football):** Add a pitch diagram showing shot locations, color‑coded by xG or danger.
- **Serve Maps (Tennis):** Court visualization showing serve placement and success rates.
- **Economy Flow (Esports):** Round‑by‑round team economy graph (buy/eco/force) layered with win probability.
- **Momentum Heat Alerts:** Highlight graph segments when momentum swings exceed a threshold (e.g., >20%).

---

## 👥 Personalization

- **Preset Layouts + Drag‑and‑Drop:** Already planned — extend with “Save My Layout” so users can store multiple custom dashboards.
- **Favorite Players:** Star individual players (not just matches) and get impact highlights whenever they play.
- **Theme Modes:** Sport‑specific themes (green pitch for football, blue court for tennis, dark arena for esports).

---

## 📊 Analytical Insights

- **Win Probability Forecast:** Use historical + live stats to project likely outcomes.
- **Clutch Probability (Esports):** Show chance of winning a round given remaining players/economy.
- **Expected Goals (Football):** Add xG metrics alongside momentum graphs.
- **Break Point Conversion (Tennis):** Track efficiency of break point opportunities.

---

## 🚀 Next‑Level Updates

- **Social Sharing:** Export dashboards or highlights as shareable images/clips.
- **Collaborative Mode:** Let friends view the same dashboard together with synced highlights.
- **AI Commentary:** Auto‑generate short narrative summaries (“Nexus pulled ahead after round 12 clutch…”).

---

✨ These updates would transform your project from a **live tracker** into a **full analytical hub + personalized fan experience**.  

---

Here’s a **roadmap plan** that prioritizes the enhancements we’ve discussed, broken down into short‑term, mid‑term, and long‑term phases so you can decide what to build first:

---

## 🟢 Short‑Term (Next 1–2 months)

Focus on **core usability and personalization**:

- **Multi‑Match Selector + Favorites Hub** → users can star matches and switch quickly.
- **Notifications System** → alerts for live starts, key events, and final scores.
- **Preset Layouts + Drag‑and‑Drop Customization** → curated views plus user‑built dashboards.
- **Team MVP Badges + Series MVP Award** → highlight standout performers per team and across series.

---

## 🟡 Mid‑Term (2–6 months)

Add **sport‑specific visuals and deeper analytics**:

- **Football Shot Maps** (pitch diagram with xG overlay).
- **Tennis Serve Maps + Break Point Conversion**.
- **Esports Economy Flow Graph** (buy/eco/force rounds).
- **Head‑to‑Head History Widget** → past encounters and performance trends.
- **Analytical Insights Panel** → win probability forecast, clutch probability, expected goals.

---

## 🔵 Long‑Term (6–12 months)

Expand into **advanced features and social engagement**:

- **Cross‑Sport Comparison Mode** → compare momentum swings across esports, football, tennis.
- **Collaborative Mode** → friends view the same dashboard together with synced highlights.
- **AI Commentary Generator** → auto‑summaries of match flow (“Nexus pulled ahead after round 12 clutch…”).
- **Social Sharing** → export dashboards or highlights as shareable images/clips.
- **Custom Dashboards with Player Favorites** → star individual players and track their impact across matches.

---

## 🚀 Strategic Outcome

- **Short‑Term:** Build a solid, personalized live hub.  
- **Mid‑Term:** Layer in rich sport‑specific analytics and visuals.  
- **Long‑Term:** Transform into a collaborative, shareable, AI‑powered sports companion.  

---

✨ This roadmap balances **quick wins** (favorites, notifications, layouts) with **deeper analytics** (shot maps, economy graphs) and **future‑proof features** (collaboration, AI commentary).  

---

Here’s a **technical architecture plan** showing how all the modules we’ve discussed connect together — so you can see the flow from data sources to frontend dashboards:

---

## 🏗️ High‑Level Architecture

### **1. Data Sources**

- **HLTV API** → esports match data (rounds, kills, economy, probabilities).
- **Sofascore API** → football & tennis live feeds (momentum, possession, serve stats, shot maps).
- **Favorites DB** → user‑starred matches and players.
- **Layouts DB** → saved dashboard layouts (custom + presets).

---

### **2. Backend Layer**

- **Data Fetchers**
  - `getHLTVMatches()`, `getSofascoreMatches(sport)` → pull live match data.
- **Normalizers**
  - `normalizeMatchData()` → unify esports/football/tennis into a common schema.
- **Analytics Builders**
  - `buildMomentumGraph()`, `buildPlayerImpactHeatmap()`, `buildMVPTracker()`, `buildTeamMVP()`.
  - Sport‑specific: `buildShotMap()`, `buildServeMap()`, `buildEconomyFlow()`.
- **Notification Engine**
  - Monitors favorites, triggers WebSocket alerts for live starts, key events, match end.
- **Layout Service**
  - Stores/retrieves user layouts and presets.

---

### **3. WebSocket Layer**

- **Match Updates** → pushes normalized data every 30s.
- **Notifications** → pushes alerts instantly when triggered.
- **Layout Sync** → updates frontend when user changes layout.

---

### **4. Frontend Layer**

- **Selector Components**
  - Sport Selector (Esports / Football / Tennis).
  - Match Selector (with Favorites pinned).
  - Preset Selector (Analyst / Fan / Minimal).
- **Dashboard Modules (Cards)**
  - Esports: Timeline, Momentum Graph, Heatmap, Player Impact, MVP Tracker, Team MVP, Economy Flow.
  - Football: Momentum Graph, Possession %, Shot Map, xG.
  - Tennis: Point Graph, Serve Map, Break Point Conversion.
- **Customization**
  - Drag‑and‑Drop Grid (react‑grid‑layout).
  - Save/Load Layouts.
- **Notifications UI**
  - Pop‑up alerts for favorited matches/events.

---

### **5. Storage & Persistence**

- **User DB**
  - Favorites (matches, players).
  - Layouts (custom + presets).
- **Cache Layer**
  - Redis/memory cache for live match data to reduce API calls.

---

## 🚀 Flow Example

1. User stars a football match → stored in Favorites DB.  
2. Backend monitors Sofascore feed → detects match goes live.  
3. Notification Engine pushes WebSocket alert → frontend shows pop‑up.  
4. User switches to “Analyst View” preset → Layout Service loads preset grid.  
5. Frontend renders football modules (momentum graph, possession, shot map).  
6. User drags MVP Tracker card into center → layout saved to DB.  

---

✨ With this architecture, your app is **modular, scalable, and sport‑agnostic**: HLTV esports, Sofascore football, and Sofascore tennis all flow through the same pipeline, with personalization and analytics layered on top.

---

Here’s a **deployment plan** tailored for a **totally cost‑free setup**, so you can run your multi‑sport + esports dashboard without spending money:

---

## 🏗️ Tech Stack (Free‑Friendly Choices)

- **Frontend:**  
  - **React + Vite/Next.js** → modern, fast, free framework.  
  - **TailwindCSS** → free utility‑first styling.  
  - **Chart.js / D3.js** → free libraries for graphs and visualizations.  

- **Backend:**  
  - **Node.js + Express** → lightweight, free server framework.  
  - **WebSocket (Socket.IO)** → free real‑time updates.  
  - **SQLite** (file‑based DB) or **PostgreSQL on Supabase free tier** → free persistence for favorites/layouts.  

- **Data Sources:**  
  - **HLTV API (community endpoints)** → free esports match data.  
  - **Sofascore unofficial JSON feeds** → free football/tennis live stats.  
  - **Redis alternative:** Use in‑memory caching (no paid Redis).  

---

## ☁️ Hosting (Free Options)

- **Frontend Hosting:**  
  - **Vercel** or **Netlify** → free tier for React apps, auto‑deploy from GitHub.  

- **Backend Hosting:**  
  - **Render** or **Railway** → free Node.js server hosting with WebSocket support.  
  - **Fly.io** → free tier for small containers.  

- **Database Hosting:**  
  - **Supabase free tier** → PostgreSQL + auth + storage.  
  - Or **SQLite file** stored in repo (works fine for small projects).  

---

## 🔄 Scaling Strategy (Free‑Friendly)

- **Stateless Backend:** Keep backend lightweight; rely on free APIs for data.  
- **Caching:** Use in‑memory caching to reduce API calls.  
- **Static Assets:** Host graphs and layouts as static JSON where possible.  
- **Rate Limits:** Respect HLTV/Sofascore limits by polling every 30s (not too frequent).  

---

## 🛠️ DevOps Workflow

- **GitHub Actions (Free):** Auto‑deploy frontend to Vercel/Netlify and backend to Render/Railway.  
- **Monitoring:** Use free tools like **UptimeRobot** for health checks.  
- **Error Logging:** Use console logs + free Sentry tier if needed.  

---

## 🚀 Roadmap for Free Deployment

1. **Phase 1:**  
   - Host frontend on Vercel (free).  
   - Host backend on Render (free).  
   - Use SQLite for persistence.  

2. **Phase 2:**  
   - Migrate DB to Supabase free tier for scalability.  
   - Add caching layer (in‑memory).  

3. **Phase 3:**  
   - Optimize polling intervals.  
   - Add free monitoring/logging.  

---

✨ With this plan, you can run your dashboard **end‑to‑end at zero cost** using free tiers and community APIs. It’s lightweight, scalable enough for personal or small‑community use, and future‑proof if you ever decide to upgrade.

---

Here’s a **step‑by‑step deployment guide** you can follow like a checklist — fully cost‑free:

---

## 🟢 Step 1: Prepare Your Codebase

- Put your **frontend (React/Next.js)** and **backend (Node.js/Express)** in separate folders.
- Use **SQLite** locally for persistence (favorites/layouts).
- Add a `Procfile` or `start` script in `package.json` for backend (`node server.js`).

---

## 🟡 Step 2: Version Control

- Create a **GitHub repository** (free).
- Push both frontend and backend code.
- Organize with two folders: `/frontend` and `/backend`.

---

## 🔵 Step 3: Frontend Deployment (Free)

- **Vercel** or **Netlify**:
  - Connect your GitHub repo.
  - Select `/frontend` folder.
  - Auto‑deploy on every push.
  - Free tier includes SSL, CDN, and global hosting.

---

## 🟠 Step 4: Backend Deployment (Free)

- **Render** or **Railway**:
  - Connect GitHub repo.
  - Select `/backend` folder.
  - Define build command (`npm install`) and start command (`npm start`).
  - Free tier gives you ~750 hours/month runtime.
- Alternative: **Fly.io** for containerized deployment.

---

## 🟣 Step 5: Database (Free)

- **Option A: SQLite file** → simplest, bundled with backend.
- **Option B: Supabase free tier**:
  - PostgreSQL hosting + API.
  - Store favorites/layouts in Supabase tables.
  - Free tier includes generous limits.

---

## 🟤 Step 6: WebSocket Setup

- Use **Socket.IO** in backend.
- Connect frontend to backend WebSocket endpoint.
- Free tiers support WebSockets (Render, Railway).

---

## ⚪ Step 7: Monitoring & Logs

- **UptimeRobot (Free)** → monitor backend health.
- **GitHub Actions (Free)** → auto‑deploy pipeline.
- **Console logs** → basic debugging.
- Optional: **Sentry free tier** for error tracking.

---

## 🚀 Step 8: Scaling Strategy

- Poll HLTV/Sofascore APIs every 30s (avoid rate limits).
- Cache results in memory (no paid Redis).
- Keep backend stateless for easy redeploys.
- Use free tiers until traffic grows.

---

## ✅ Deployment Checklist

- [ ] GitHub repo created with frontend + backend folders.  
- [ ] Frontend deployed to Vercel/Netlify.  
- [ ] Backend deployed to Render/Railway.  
- [ ] SQLite or Supabase DB connected.  
- [ ] WebSocket live updates working.  
- [ ] Monitoring set up with UptimeRobot.  
- [ ] Auto‑deploy pipeline via GitHub Actions.  

---

✨ With this guide, you’ll have a **zero‑cost, production‑ready deployment**: frontend on Vercel, backend on Render, DB on Supabase or SQLite, all tied together with GitHub Actions.

---

Here’s a **minimal Supabase schema** you can copy‑paste directly to set up tables for **users, favorites, and layouts** — all free on Supabase’s starter tier:

---

## 🗂️ Supabase Schema (SQL)

```sql
-- Users table
create table users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamp default now()
);

-- Favorites table
create table favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  sport text not null,          -- 'esports', 'football', 'tennis'
  match_id text not null,       -- external match identifier
  home_team text,
  away_team text,
  created_at timestamp default now()
);

-- Layouts table
create table layouts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  name text not null,           -- e.g. 'analyst', 'fan', 'minimal', or custom
  layout jsonb not null,        -- stores grid layout JSON
  created_at timestamp default now()
);
```

---

## 🔑 Notes

- **Users:** Basic table with `id` + `email`. You can skip email if you don’t need auth.  
- **Favorites:** Links a user to matches they star. Includes sport type + match info.  
- **Layouts:** Stores either preset or custom dashboard layouts as JSON.  

---

## 🚀 How to Use

1. Go to **Supabase dashboard** → SQL editor.  
2. Paste the schema above and run it.  
3. Use Supabase’s free REST API or client libraries (`@supabase/supabase-js`) to query these tables.  
4. Example:  
   - `supabase.from('favorites').insert({ user_id, sport, match_id, home_team, away_team })`  
   - `supabase.from('layouts').select('*').eq('user_id', userId)`  

---

✨ With this schema, you now have a **free, cloud‑hosted database** for user accounts, favorites, and custom/preset layouts — perfectly aligned with your dashboard project.

---

Here’s a **Supabase client integration example** you can drop right into your React frontend to connect with the schema we designed (users, favorites, layouts):

---

## 🛠️ Install Supabase Client

```bash
npm install @supabase/supabase-js
```

---

## 🔑 Initialize Supabase

Create a helper file:

```js
// frontend/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
```

> ⚠️ Add your Supabase project URL and anon key in `.env`:
```
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
```

---

## ⭐ Favorites Integration

```js
// frontend/hooks/useFavorites.js
import { supabase } from '../lib/supabaseClient';

export async function getFavorites(userId) {
  const { data, error } = await supabase
    .from('favorites')
    .select('*')
    .eq('user_id', userId);
  if (error) throw error;
  return data;
}

export async function toggleFavorite(userId, match) {
  const { data: existing } = await supabase
    .from('favorites')
    .select('*')
    .eq('user_id', userId)
    .eq('match_id', match.id)
    .eq('sport', match.sport);

  if (existing.length > 0) {
    await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('match_id', match.id)
      .eq('sport', match.sport);
  } else {
    await supabase
      .from('favorites')
      .insert([{ user_id: userId, sport: match.sport, match_id: match.id, home_team: match.homeTeam, away_team: match.awayTeam }]);
  }
}
```

---

## 📐 Layouts Integration

```js
// frontend/hooks/useLayouts.js
import { supabase } from '../lib/supabaseClient';

export async function getLayout(userId, name) {
  const { data, error } = await supabase
    .from('layouts')
    .select('layout')
    .eq('user_id', userId)
    .eq('name', name)
    .single();
  if (error) throw error;
  return data?.layout;
}

export async function saveLayout(userId, name, layout) {
  const { data: existing } = await supabase
    .from('layouts')
    .select('*')
    .eq('user_id', userId)
    .eq('name', name);

  if (existing.length > 0) {
    await supabase
      .from('layouts')
      .update({ layout })
      .eq('user_id', userId)
      .eq('name', name);
  } else {
    await supabase
      .from('layouts')
      .insert([{ user_id: userId, name, layout }]);
  }
}
```

---

## 🚀 Usage Example in React

```jsx
import { useEffect, useState } from 'react';
import { getFavorites, toggleFavorite } from '../hooks/useFavorites';
import { getLayout, saveLayout } from '../hooks/useLayouts';

export default function Dashboard({ userId }) {
  const [favorites, setFavorites] = useState([]);
  const [layout, setLayout] = useState(null);

  useEffect(() => {
    getFavorites(userId).then(setFavorites);
    getLayout(userId, 'fan').then(setLayout);
  }, [userId]);

  const handleToggleFavorite = async (match) => {
    await toggleFavorite(userId, match);
    const updated = await getFavorites(userId);
    setFavorites(updated);
  };

  const handleSaveLayout = async () => {
    await saveLayout(userId, 'fan', layout);
  };

  return (
    <div>
      <h1>My Dashboard</h1>
      <button onClick={handleSaveLayout}>Save Layout</button>
      <pre>{JSON.stringify(favorites, null, 2)}</pre>
    </div>
  );
}
```

---

## ✨ Outcome

- **Favorites:** Users can star/unstar matches, stored in Supabase.  
- **Layouts:** Users can save and load custom/preset dashboard layouts.  
- **Free Hosting:** Supabase free tier handles all persistence.  

---

Here’s how you can **secure your Supabase setup with Auth**, so each user has their own account and private favorites/layouts:

---

## 🛠️ Enable Supabase Auth

1. Go to your **Supabase dashboard** → **Authentication**.  
2. Enable **Email + Password** sign‑in (free tier supports this).  
3. Optionally enable **OAuth providers** (Google, GitHub, etc.) — also free.  

---

## 🔑 Update Schema

Tie favorites/layouts to authenticated users automatically:

```sql
-- Add RLS (Row Level Security)
alter table favorites enable row level security;
alter table layouts enable row level security;

-- Policies: only allow users to access their own rows
create policy "Favorites are private"
on favorites for all
using (auth.uid() = user_id);

create policy "Layouts are private"
on layouts for all
using (auth.uid() = user_id);
```

This ensures each user only sees their own favorites/layouts.

---

## 🎨 Frontend Integration

```js
// frontend/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
```

### Sign‑Up / Sign‑In

```js
// Sign up
await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'securepassword',
});

// Sign in
await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'securepassword',
});

// Get current user
const { data: { user } } = await supabase.auth.getUser();
```

---

## ⭐ Favorites & Layouts (Secure)

Update your hooks to use `auth.uid()` automatically:

```js
// Example: get favorites for current user
export async function getFavorites() {
  const { data: { user } } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from('favorites')
    .select('*')
    .eq('user_id', user.id);
  if (error) throw error;
  return data;
}
```

---

## 🚀 User Experience

- **Private Accounts:** Each user signs in with email/password.  
- **Secure Data:** Row Level Security ensures users only see their own favorites/layouts.  
- **Free Tier:** Supabase Auth + DB + API all included at no cost.  
- **Scalable:** You can later add OAuth (Google, GitHub) for easier sign‑in.  

---

✨ With Supabase Auth + RLS, your dashboard becomes a **personalized, secure sports hub**: every user has their own account, private favorites, and custom layouts — all on the free tier.

---

Perfect — let’s sketch out a **login/signup UI flow** in React so your users can sign in, sign up, and access protected routes with Supabase Auth:

---

## 🟢 Auth Context Setup

```jsx
// frontend/context/AuthContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
```

---

## 🟡 Sign‑Up Component

```jsx
// frontend/components/SignUp.js
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else alert('Check your email for confirmation!');
  };

  return (
    <div className="p-4 border rounded">
      <h2 className="font-bold mb-2">Sign Up</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="border p-2 mb-2 w-full" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="border p-2 mb-2 w-full" />
      <button onClick={handleSignUp} className="bg-blue-500 text-white px-4 py-2 rounded">Sign Up</button>
    </div>
  );
}
```

---

## 🔵 Sign‑In Component

```jsx
// frontend/components/SignIn.js
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
  };

  return (
    <div className="p-4 border rounded">
      <h2 className="font-bold mb-2">Sign In</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="border p-2 mb-2 w-full" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="border p-2 mb-2 w-full" />
      <button onClick={handleSignIn} className="bg-green-500 text-white px-4 py-2 rounded">Sign In</button>
    </div>
  );
}
```

---

## 🟠 Protected Route Wrapper

```jsx
// frontend/components/ProtectedRoute.js
import { useAuth } from '../context/AuthContext';
import SignIn from './SignIn';

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <SignIn />;
  return children;
}
```

---

## 🚀 Usage in App

```jsx
// frontend/App.js
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import SignUp from './components/SignUp';

export default function App() {
  return (
    <AuthProvider>
      <div className="p-6">
        <h1 className="text-xl font-bold">Multi-Sport Dashboard</h1>
        <SignUp />
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </div>
    </AuthProvider>
  );
}
```

---

## ✨ Outcome

- **Sign‑Up:** Users register with email + password.  
- **Sign‑In:** Users log in securely.  
- **Protected Routes:** Only authenticated users can access dashboard, favorites, and layouts.  
- **Free Tier:** Supabase Auth + RLS ensures privacy at zero cost.  

---

Here’s a **Profile Settings page design** you can add to your React app so users can manage their account (auth, favorites, layouts) securely with Supabase:

---

## 🟢 Profile Settings Component

```jsx
// frontend/components/ProfileSettings.js
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { getFavorites, toggleFavorite } from '../hooks/useFavorites';
import { getLayout, saveLayout } from '../hooks/useLayouts';

export default function ProfileSettings() {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [layout, setLayout] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      if (data.user) {
        getFavorites().then(setFavorites);
        getLayout(data.user.id, 'fan').then(setLayout);
      }
    });
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const handlePasswordReset = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(user.email);
    if (error) alert(error.message);
    else alert('Password reset email sent!');
  };

  return (
    <div className="p-6 border rounded">
      <h2 className="text-xl font-bold mb-4">Profile Settings</h2>

      {user ? (
        <>
          <p><strong>Email:</strong> {user.email}</p>
          <button onClick={handlePasswordReset} className="bg-yellow-500 text-white px-4 py-2 rounded mt-2">
            Reset Password
          </button>
          <button onClick={handleSignOut} className="bg-red-500 text-white px-4 py-2 rounded mt-2">
            Sign Out
          </button>

          <h3 className="font-semibold mt-6">Favorites</h3>
          <ul>
            {favorites.map(f => (
              <li key={f.id} className="flex justify-between items-center">
                {f.sport.toUpperCase()} — {f.home_team} vs {f.away_team}
                <button onClick={() => toggleFavorite(user.id, f)}>Remove</button>
              </li>
            ))}
          </ul>

          <h3 className="font-semibold mt-6">Saved Layout</h3>
          <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(layout, null, 2)}</pre>
        </>
      ) : (
        <p>Please sign in to manage your profile.</p>
      )}
    </div>
  );
}
```

---

## 🚀 Features

- **Account Info:** Shows user email.  
- **Password Reset:** Sends reset email via Supabase.  
- **Sign Out:** Ends session securely.  
- **Favorites Management:** Lists starred matches with remove option.  
- **Layout Management:** Displays saved dashboard layout JSON.  

---

## ✨ Outcome

This page gives users a **self‑service hub**: they can reset their password, sign out, manage favorites, and view/edit their saved layouts — all backed by Supabase Auth + RLS for privacy.

---

Here’s a **Profile Settings page extension** that lets users manage their account inside the app — without touching email updates, since you asked to skip that:

---

## 🟢 Features to Include

- **Password Reset** → trigger Supabase reset email.  
- **Sign Out** → securely end session.  
- **Favorites Management** → view and remove starred matches.  
- **Layout Management** → view, save, and reset dashboard layouts.  
- **Delete Account** → optional, allow users to remove their account entirely.  

---

## 🟡 Example React Component

```jsx
// frontend/components/ProfileSettings.js
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { getFavorites, toggleFavorite } from '../hooks/useFavorites';
import { getLayout, saveLayout } from '../hooks/useLayouts';

export default function ProfileSettings() {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [layout, setLayout] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      if (data.user) {
        getFavorites().then(setFavorites);
        getLayout(data.user.id, 'fan').then(setLayout);
      }
    });
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const handlePasswordReset = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(user.email);
    if (error) alert(error.message);
    else alert('Password reset email sent!');
  };

  const handleDeleteAccount = async () => {
    // Supabase doesn't allow direct delete via client; you’d call a backend function
    alert('Account deletion requires backend function. Add RPC to remove user.');
  };

  return (
    <div className="p-6 border rounded">
      <h2 className="text-xl font-bold mb-4">Profile Settings</h2>

      {user ? (
        <>
          <p><strong>Email:</strong> {user.email}</p>
          <button onClick={handlePasswordReset} className="bg-yellow-500 text-white px-4 py-2 rounded mt-2">
            Reset Password
          </button>
          <button onClick={handleSignOut} className="bg-red-500 text-white px-4 py-2 rounded mt-2">
            Sign Out
          </button>
          <button onClick={handleDeleteAccount} className="bg-gray-500 text-white px-4 py-2 rounded mt-2">
            Delete Account
          </button>

          <h3 className="font-semibold mt-6">Favorites</h3>
          <ul>
            {favorites.map(f => (
              <li key={f.id} className="flex justify-between items-center">
                {f.sport.toUpperCase()} — {f.home_team} vs {f.away_team}
                <button onClick={() => toggleFavorite(user.id, f)}>Remove</button>
              </li>
            ))}
          </ul>

          <h3 className="font-semibold mt-6">Saved Layout</h3>
          <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(layout, null, 2)}</pre>
        </>
      ) : (
        <p>Please sign in to manage your profile.</p>
      )}
    </div>
  );
}
```

---

## 🚀 Outcome

- Users can **reset password**, **sign out**, and **manage favorites/layouts**.  
- Optional **delete account** button (requires backend RPC).  
- Keeps everything private thanks to Supabase Auth + RLS.  

---

✨ This makes your app feel like a **complete personal hub**: secure login, personalized favorites, custom layouts, and account management — all free on Supabase.

---

Here’s how you can implement a **backend RPC for account deletion** in Supabase, so the “Delete Account” button actually removes the user securely:

---

## 🟢 Step 1: Create a Supabase Function (SQL)

Supabase doesn’t allow direct user deletion from the client for security reasons. You need a **Postgres function**:

```sql
-- Create a secure function to delete the current user
create or replace function delete_user()
returns void
language sql
security definer
as $$
  delete from auth.users where id = auth.uid();
$$;

-- Allow only the authenticated user to call this
grant execute on function delete_user() to authenticated;
```

This ensures only the logged‑in user can delete their own account.

---

## 🟡 Step 2: Call RPC from Backend/Frontend

```js
// frontend/hooks/useDeleteAccount.js
import { supabase } from '../lib/supabaseClient';

export async function deleteAccount() {
  const { error } = await supabase.rpc('delete_user');
  if (error) throw error;
}
```

---

## 🔵 Step 3: Wire It to Your UI

Update your **ProfileSettings** component:

```jsx
const handleDeleteAccount = async () => {
  try {
    await deleteAccount();
    alert('Your account has been deleted.');
    await supabase.auth.signOut();
    setUser(null);
  } catch (err) {
    alert('Error deleting account: ' + err.message);
  }
};
```

---

## 🚀 Outcome

- **Secure:** Only the authenticated user can delete themselves.  
- **Clean:** Deletes user from `auth.users` and cascades to linked favorites/layouts (thanks to foreign keys).  
- **Free:** Works entirely on Supabase free tier.  

---

✨ With this RPC, your **Delete Account** button becomes fully functional — users can remove their account and all associated data securely.

---

Here’s how you can set up a **data cascade strategy** so that when a user deletes their account, all their linked favorites and layouts are automatically removed:

---

## 🟢 Schema Setup with Cascades

We already linked `favorites` and `layouts` to `users` with foreign keys. To ensure automatic cleanup:

```sql
-- Favorites table
create table favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  sport text not null,
  match_id text not null,
  home_team text,
  away_team text,
  created_at timestamp default now()
);

-- Layouts table
create table layouts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  name text not null,
  layout jsonb not null,
  created_at timestamp default now()
);
```

The `on delete cascade` ensures that when a user row is deleted, all their favorites and layouts are automatically purged.

---

## 🟡 RPC Function for Account Deletion

We already created a `delete_user()` function. With cascades, it now cleans up everything:

```sql
create or replace function delete_user()
returns void
language sql
security definer
as $$
  delete from auth.users where id = auth.uid();
$$;

grant execute on function delete_user() to authenticated;
```

---

## 🔵 Frontend Integration

```js
import { supabase } from '../lib/supabaseClient';

export async function deleteAccount() {
  const { error } = await supabase.rpc('delete_user');
  if (error) throw error;
}
```

And in your UI:

```jsx
const handleDeleteAccount = async () => {
  try {
    await deleteAccount();
    alert('Your account and all linked data have been deleted.');
    await supabase.auth.signOut();
    setUser(null);
  } catch (err) {
    alert('Error deleting account: ' + err.message);
  }
};
```

---

## 🚀 Outcome

- **Automatic Cleanup:** Favorites and layouts vanish when the user deletes their account.  
- **No Orphans:** Database stays clean, no leftover rows.  
- **Secure:** Only the authenticated user can trigger their own deletion.  
- **Free Tier:** Works entirely within Supabase’s free tier.  

---

✨ With this cascade strategy, your app now has a **complete lifecycle**: users can sign up, personalize their dashboard, and securely delete everything if they choose.

---

Here’s how you can finish off the **account lifecycle** with a clean **cascade deletion strategy**:

---

## 🟢 Why Cascades Matter

When a user deletes their account, you don’t want “orphaned” rows left behind in `favorites` or `layouts`. By using **foreign keys with `ON DELETE CASCADE`**, the database automatically removes all linked data.

---

## 🟡 Schema Recap

We already set this up:

```sql
create table favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  sport text not null,
  match_id text not null,
  home_team text,
  away_team text,
  created_at timestamp default now()
);

create table layouts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  name text not null,
  layout jsonb not null,
  created_at timestamp default now()
);
```

---

## 🔵 RPC Function

The `delete_user()` function removes the user from `auth.users`. Because of the cascade, all their favorites and layouts vanish automatically:

```sql
create or replace function delete_user()
returns void
language sql
security definer
as $$
  delete from auth.users where id = auth.uid();
$$;

grant execute on function delete_user() to authenticated;
```

---

## 🟠 Frontend Integration

```js
import { supabase } from '../lib/supabaseClient';

export async function deleteAccount() {
  const { error } = await supabase.rpc('delete_user');
  if (error) throw error;
}
```

And in your UI:

```jsx
const handleDeleteAccount = async () => {
  try {
    await deleteAccount();
    alert('Your account and all linked data have been deleted.');
    await supabase.auth.signOut();
    setUser(null);
  } catch (err) {
    alert('Error deleting account: ' + err.message);
  }
};
```

---

## 🚀 Outcome

- **Automatic cleanup:** Favorites and layouts are deleted with the user.  
- **No manual cleanup needed:** Database stays tidy.  
- **Secure:** Only the authenticated user can trigger their own deletion.  
- **Free tier:** Works seamlessly on Supabase without extra cost.  

---

✨ With this, your app now has a **complete lifecycle**: sign‑up, personalization, secure deletion, and automatic cleanup. It’s production‑ready even on the free tier.

---

Here’s a **final architecture diagram (textual)** that ties everything together — frontend, backend, Supabase, and data flow — so you can visualize the system end‑to‑end:

---

## 🏗️ System Architecture Overview

```
                ┌─────────────────────────────┐
                │         Frontend             │
                │  React / Next.js + Tailwind  │
                │  Chart.js / D3.js            │
                │  Components:                 │
                │   - Sport Selector           │
                │   - Match Selector           │
                │   - Preset/Layout Selector   │
                │   - Dashboard Cards          │
                │   - Auth UI (SignIn/SignUp)  │
                │   - Profile Settings         │
                └───────────────▲─────────────┘
                                │
                                │ WebSocket + REST
                                │
                ┌───────────────┴─────────────┐
                │          Backend             │
                │  Node.js + Express           │
                │  Modules:                    │
                │   - Data Fetchers (HLTV,     │
                │     Sofascore APIs)          │
                │   - Normalizers (unify data) │
                │   - Analytics Builders       │
                │     (momentum, MVP, maps)    │
                │   - Notification Engine      │
                │   - Layout Service           │
                └───────────────▲─────────────┘
                                │
                                │ SQL / RPC
                                │
                ┌───────────────┴─────────────┐
                │         Supabase             │
                │  PostgreSQL + Auth           │
                │  Tables:                     │
                │   - users                    │
                │   - favorites (ON DELETE CASCADE)
                │   - layouts  (ON DELETE CASCADE)
                │  Features:                   │
                │   - Row Level Security (RLS) │
                │   - RPC delete_user()        │
                │   - Free tier hosting        │
                └───────────────▲─────────────┘
                                │
                                │ API Calls
                                │
                ┌───────────────┴─────────────┐
                │        External APIs         │
                │   HLTV (Esports)             │
                │   Sofascore (Football/Tennis)│
                │   Free JSON feeds            │
                └─────────────────────────────┘
```

---

## 🔄 Data Flow

1. **User signs in** → Supabase Auth issues session token.  
2. **Frontend requests favorites/layouts** → Supabase DB (secured with RLS).  
3. **Backend polls HLTV/Sofascore** → normalizes into unified schema.  
4. **Backend pushes updates via WebSocket** → frontend dashboard cards update live.  
5. **User customizes layout** → saved in Supabase `layouts` table.  
6. **User deletes account** → RPC `delete_user()` triggers cascade → favorites/layouts auto‑deleted.  

---

## 🚀 Benefits

- **Free tier friendly:** Vercel/Netlify (frontend), Render/Railway (backend), Supabase (DB/Auth).  
- **Secure:** RLS ensures each user only sees their own data.  
- **Clean lifecycle:** Sign‑up → personalize → delete with cascades.  
- **Modular:** Easy to add new sports or analytics modules.  

---

✨ With this diagram, you now have a **complete mental map** of your system: frontend UI, backend services, Supabase persistence, and external APIs all working together.

---

Here’s your **first deployment run checklist** — a practical launch guide from empty repo → live app, all on free tiers:

---

## 🟢 Step 1: Repo Setup

- [ ] Create a new GitHub repo.  
- [ ] Add `/frontend` (React/Next.js + Tailwind) and `/backend` (Node.js/Express).  
- [ ] Add `.env.example` with Supabase keys placeholders.  
- [ ] Commit and push initial code.  

---

## 🟡 Step 2: Supabase Setup

- [ ] Create free Supabase project.  
- [ ] Run schema SQL for `users`, `favorites`, `layouts`.  
- [ ] Enable **Auth (email/password)**.  
- [ ] Add **Row Level Security (RLS)** policies.  
- [ ] Create RPC `delete_user()` function.  
- [ ] Copy project URL + anon key → `.env`.  

---

## 🔵 Step 3: Frontend Deployment

- [ ] Connect GitHub repo to **Vercel** (or Netlify).  
- [ ] Point to `/frontend` folder.  
- [ ] Add environment variables (`REACT_APP_SUPABASE_URL`, `REACT_APP_SUPABASE_ANON_KEY`).  
- [ ] Deploy → verify live site URL.  

---

## 🟠 Step 4: Backend Deployment

- [ ] Connect GitHub repo to **Render** (or Railway).  
- [ ] Point to `/backend` folder.  
- [ ] Define build command (`npm install`) and start command (`npm start`).  
- [ ] Add environment variables (Supabase keys, API endpoints).  
- [ ] Deploy → verify backend API URL.  

---

## 🟣 Step 5: Integration

- [ ] Update frontend API calls to point to backend URL.  
- [ ] Test WebSocket connection for live match updates.  
- [ ] Test Supabase queries for favorites/layouts.  
- [ ] Confirm Auth login/signup works.  

---

## ⚪ Step 6: Monitoring

- [ ] Add **UptimeRobot** free monitor for backend URL.  
- [ ] Enable GitHub Actions for auto‑deploy pipeline.  
- [ ] Add console logging for backend errors.  

---

## 🚀 Step 7: Final Verification

- [ ] Sign up → confirm account created.  
- [ ] Star a match → check favorites table.  
- [ ] Save a layout → check layouts table.  
- [ ] Delete account → confirm cascades remove favorites/layouts.  
- [ ] Dashboard live updates working.  

---

✨ Once you tick through this checklist, you’ll have a **fully deployed, secure, cost‑free sports dashboard** running end‑to‑end.

---

Here’s a **sample `.env` template** you can copy straight into your project — one for the **frontend** and one for the **backend**. This keeps your Supabase keys and API endpoints organized and secure:

---

## 🟢 Frontend (`/frontend/.env`)

```env
# Supabase project settings
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key

# Backend API (Render/Railway/Fly.io)
REACT_APP_BACKEND_URL=https://your-backend.onrender.com
```

---

## 🟡 Backend (`/backend/.env`)

```env
# Supabase project settings
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# External APIs
HLTV_API_URL=https://api.hltv.org
SOFASCORE_API_URL=https://api.sofascore.com

# Server settings
PORT=3000
NODE_ENV=production
```

---

## 🔑 Notes

- **Frontend:** Only use the **anon key** (safe for client‑side).  
- **Backend:** Use the **service role key** (never expose this to frontend).  
- **Backend URL:** Replace with your Render/Railway/Fly.io deployment URL.  
- **External APIs:** HLTV and Sofascore endpoints can be set here for easy reuse.  

---

## 🚀 Workflow

1. Copy these templates into `.env` files in your project.  
2. Add `.env` to `.gitignore` so secrets aren’t pushed to GitHub.  
3. Configure environment variables in Vercel (frontend) and Render/Railway (backend) dashboards.  
4. Deploy → your app will read these automatically.  

---

✨ With this setup, you now have a **secure, production‑ready environment configuration** that works seamlessly across free hosting tiers.

---

Here’s a **ready‑to‑use GitHub Actions workflow file** that will auto‑deploy both your frontend (Vercel) and backend (Render) every time you push to `main`:

---

## 📂 `.github/workflows/deploy.yml`

```yaml
name: CI/CD Deploy

on:
  push:
    branches:
      - main

jobs:
  frontend-deploy:
    name: Deploy Frontend to Vercel
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repo
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: cd frontend && npm install

      - name: Build frontend
        run: cd frontend && npm run build

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./frontend

  backend-deploy:
    name: Deploy Backend to Render
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repo
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: cd backend && npm install

      - name: Deploy to Render
        uses: johnbeynon/render-deploy-action@v1
        with:
          service-id: ${{ secrets.RENDER_SERVICE_ID }}
          api-key: ${{ secrets.RENDER_API_KEY }}
```

---

## 🔑 Secrets to Add in GitHub

Go to **GitHub repo → Settings → Secrets → Actions** and add:

- `VERCEL_TOKEN` → from Vercel dashboard.  
- `VERCEL_ORG_ID` → your Vercel org ID.  
- `VERCEL_PROJECT_ID` → your Vercel project ID.  
- `RENDER_SERVICE_ID` → your Render service ID.  
- `RENDER_API_KEY` → your Render API key.  

---

## 🚀 Workflow

1. Push code to `main`.  
2. GitHub Actions runs → builds frontend and backend.  
3. Frontend auto‑deploys to Vercel.  
4. Backend auto‑deploys to Render.  
5. You get live URLs updated automatically.  

---

✨ With this workflow, you now have **hands‑free deployment**: every push to `main` updates both frontend and backend instantly, all on free tiers.

---

Here’s a **developer onboarding guide** you can hand to new contributors — it walks them through cloning, setup, local dev, and deployment:

---

## 🟢 Step 1: Clone the Repo

- Install **Git** and **Node.js (v18+)**.  
- Run:
  ```bash
  git clone https://github.com/your-org/your-dashboard.git
  cd your-dashboard
  ```

---

## 🟡 Step 2: Environment Setup

- Copy `.env.example` → `.env` in both `/frontend` and `/backend`.  
- Fill in values:
  - **Frontend:** `REACT_APP_SUPABASE_URL`, `REACT_APP_SUPABASE_ANON_KEY`, `REACT_APP_BACKEND_URL`.  
  - **Backend:** `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, API URLs, `PORT`.  
- Make sure `.env` is in `.gitignore`.

---

## 🔵 Step 3: Install Dependencies

```bash
cd frontend && npm install
cd ../backend && npm install
```

---

## 🟠 Step 4: Run Locally

- **Frontend:**  
  ```bash
  cd frontend
  npm run dev
  ```
  → App runs at `http://localhost:5173` (Vite) or `http://localhost:3000` (Next.js).

- **Backend:**  
  ```bash
  cd backend
  npm start
  ```
  → API runs at `http://localhost:3000`.

---

## 🟣 Step 5: Supabase Setup

- Sign in at [Supabase](https://supabase.com).  
- Create a project → copy URL + keys.  
- Run schema SQL for `users`, `favorites`, `layouts`.  
- Enable **Auth (email/password)**.  
- Add **RLS policies** + `delete_user()` RPC.  

---

## ⚪ Step 6: Verify Integration

- Sign up in frontend → confirm user created.  
- Star a match → check `favorites` table.  
- Save a layout → check `layouts` table.  
- Delete account → confirm cascades remove data.  

---

## 🚀 Step 7: Deployment

- **Frontend:** Connect repo to **Vercel** (or Netlify).  
- **Backend:** Connect repo to **Render** (or Railway).  
- Add environment variables in each dashboard.  
- Push to `main` → GitHub Actions auto‑deploys both.  

---

## 🟤 Step 8: Contributor Workflow

- Create a new branch for features/bugfixes.  
- Run locally → test with Supabase dev project.  
- Push branch → open PR.  
- Merge to `main` → auto‑deploy triggers.  

---

✨ With this onboarding guide, any new developer can go from **clone → local dev → live deployment** in under an hour, all on free tiers.

---

