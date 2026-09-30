# EsportsLyzer Roadmap

## Phase 1 — Core Dashboard Foundation (In Progress)
- [x] Express + Socket.IO dashboard backend
- [x] CSAPI recent results, match detail, player stats, and ranking estimate
- [x] Recent-result selection and match subscription flow
- [x] Team/player panels and dashboard shell
- [ ] Obtain a current-live/event-level data source for round timelines and highlights
- [ ] Complete end-to-end and responsive validation

## Phase 2 — Data Quality and Prediction Refinement (In Progress)
- [x] Normalize CSAPI match results and player stats
- [x] Use provider ranking estimate with source attribution
- [x] Remove fabricated CS2 analytics from normal responses
- [ ] Add provider error, malformed payload, and partial-data tests
- [ ] Improve Sofascore fallback labeling and reliability
- [ ] Refine model explainability and match narrative quality

## Phase 3 — Multi-Sport (Partial)
- [x] Sport selector and football/tennis dashboard views
- [~] Sofascore event adapter with generated mock fallback
- [ ] Live match discovery and verified normalized data for both sports

## Phase 4 — Personalization (Partial)
- [x] Supabase sign-in/sign-up UI and client-side favorites operations
- [ ] Verify configured schema and row-level security
- [ ] Persist sport/team preferences and saved views
- [ ] Add alerts after reliable discovery and notification requirements are established

## Phase 5 — Advanced Analytics (Not Started)
- [ ] Evidence-based impact metrics and historical comparisons
- [ ] Match recap export/share
- [ ] Analyst filters and saved views
- [ ] Production monitoring and deployment readiness

## Deployment (Free Tier)
- Frontend → Vercel
- Backend → Render / Railway
- DB/Auth → Supabase
