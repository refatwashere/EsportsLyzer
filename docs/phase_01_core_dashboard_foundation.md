# Phase 1: Core Dashboard Foundation

## Objective
Establish the MVP foundation for EsportsLyzer by delivering a functional live dashboard, real-time match data ingestion, and the initial analytical UI.

## Outcomes
- Live CS2 match data is available in the backend
- The frontend renders a clean dashboard experience
- Match information updates in near real time
- Key analytics panels are visible and usable

## Scope
### Backend
- Integrate public live CS2 match data source
- Build server routes for match retrieval and dashboard payloads
- Add WebSocket support for live updates
- Normalize external data into a consistent internal structure

### Frontend
- Build responsive home dashboard layout
- Add sport selector and match discovery UI
- Render live score, summary panels, and key statistics
- Display charts for probabilities and momentum

### Analytics
- Generate baseline prediction summary
- Build highlight feed for event storytelling
- Prepare timeline and team/player data objects

## Key Deliverables
- Match list and selection flow
- Live data refresh cycle
- Dashboard summary cards
- Probability charts
- Highlight timeline
- Team and player overview panels

## Suggested Tasks
1. Finalize backend data service integration
2. Build live polling or socket refresh flow
3. Implement dashboard shell and base components
4. Connect data to charts and summary widgets
5. Validate UI responsiveness on desktop and tablet sizes

## Acceptance Criteria
- A user can open the app and see active matches
- A selected match loads live data and updates without full reload
- The dashboard displays score, teams, and core analytics
- Probability and momentum visualizations render without errors

## Risks
- API instability or rate limits
- Inconsistent raw data schema from public sources
- Frontend overloading from frequent refreshes

## Exit Criteria
Phase 1 is complete when the product delivers a stable live match dashboard that users can open and use without a broken or incomplete interface.
