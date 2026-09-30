# Developer Guide

## Project purpose
EsportsLyzer is a match analytics prototype for sports and esports. The system fetches CS2 results and available stats, normalizes them, computes supported analytics, and renders dashboard content. Current CSAPI coverage does not guarantee live-match events or round history.

## Core architecture
### Backend
The backend is responsible for:
- fetching data from external match providers
- normalizing raw responses into a consistent shape
- computing available insights such as ranking estimates, player summaries, and team comparisons
- broadcasting updates to the frontend via WebSocket

### Frontend
The frontend is responsible for:
- rendering dashboards and panels
- interacting with selected matches and sports
- showing live updates without page reloads
- visualizing analytics data with reusable chart components

## Folder responsibilities
```text
backend/
  routes/          API endpoints and match flows
  services/        Source adapters (CSAPI, Sofascore, Supabase)
  utils/           Event, prediction, timeline, team, and player helpers
  server.js        Express + Socket.IO entry point

frontend/
  app/             App Router layout and pages
  components/      Reusable UI elements and chart panels
  hooks/           Custom hooks for state and auth behavior
  lib/             Shared API and client helpers
  styles/          Tailwind and global styling
```

## Data flow
1. User selects a sport or match.
2. Backend fetches provider data; the current CS2 feed is recent results, not a guaranteed live event stream.
3. Data is normalized into a shared structure.
4. Utility modules produce supported summaries; round timelines/highlights require event-level source data.
5. Frontend consumes the prepared payload and renders updates.
6. WebSocket emits refreshed snapshots on a 30-second interval.

## Implementation principles
- Keep integrations isolated in services
- Keep analysis logic separate from transport and UI logic
- Normalize external schema differences early
- Keep the frontend reusable across sports
- Prefer graceful failure handling over fragile assumptions

## Recommended development sequence
### Phase 1
- Stabilize backend data fetches
- Validate live WebSocket updates
- Build the core dashboard layout
- Connect probability and insight panels

### Phase 2
- Tune prediction logic and data quality checks
- Improve narrative generation and UI readability
- Test edge cases for missing or partial data

### Phase 3
- Add sport-specific adapters and normalization rules
- Build a shared multi-sport dashboard layer
- Validate consistency across esports, football, and tennis views

### Phase 4
- Integrate Supabase auth and saved preferences
- Add favorites and user personalization
- Improve dashboard customization workflow

### Phase 5
- Expand impact metrics and summary exports
- Review performance, growth, and deployment readiness
- Prepare analytics features for broader scale

## Operational considerations
- External APIs may fail or rate-limit
- Different sports expose different data dimensions
- Real-time UI state must be resilient and lightweight
- Predictions should be framed as analysis, not guaranteed outcomes

## Working guidelines
- Keep service adapters isolated from UI code
- Use a shared internal model for data aggregation
- Log API errors clearly for debugging and fallback decisions
- Validate that the frontend remains stable under frequent updates
- Keep documentation synchronized with implementation changes
