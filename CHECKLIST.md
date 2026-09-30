# EsportsLyzer Development Checklist

Audit basis: current workspace source and documentation, reviewed 2026-09-30. Statuses reflect code present in this repository, not deployment or external service configuration.

## Current development position

**Phase 1 foundation is substantially scaffolded but not complete against its acceptance criteria.** The Next.js dashboard, REST match analysis, and Socket.IO subscription flow exist, and CSAPI provides recent results, stats, and ranking estimates. The provider does not guarantee a current-live feed or round events. Phase 2 has partial reliability/model work; Phase 3 and Phase 4 have partial UI/service scaffolding; Phase 5 is not meaningfully started.

## Phase 1 — Core Dashboard Foundation

- [x] Next.js dashboard shell and reusable chart/panel components
- [x] Backend Express and Socket.IO server with 30-second match update subscription
- [x] Match selection/subscription UI and esports match-analysis REST route
- [x] Baseline timeline, highlights, player, team, and probability helper modules
- [x] Replace hard-coded CS2 fixture with verified CSAPI match, player-stat, and ranking-prediction requests in `backend/services/csapi.js`
- [x] Implement the `GET /api/matches/latest` endpoint used by the frontend, with explicit loading/error/empty behavior
- [ ] Verify live payload normalization and end-to-end dashboard rendering
- [ ] Validate responsive layouts and production configuration

## Phase 2 — Data Quality and Prediction Refinement

- [~] Some provider failure fallback exists for Sofascore, but mocked data can look like live data
- [ ] Add validation for missing, malformed, and delayed provider payloads
- [ ] Make provider source and fallback status visible in API/UI responses
- [~] Replace fixed/mock player, team, round, and probability values with match-derived calculations; players, team aggregates, and ranking estimate now use provider data, but round-level values are unavailable
- [x] Make prediction output use actual team names and identify the CSAPI ranking-model source
- [x] Remove fabricated highlights and random demo analytics from CS2 responses
- [ ] Add bounded caching, timeout/rate-limit handling, and appropriate retry behavior
- [~] Add focused tests for normalization, prediction, and empty data; fallback/HTTP route coverage remains

## Phase 3 — Multi-Sport Expansion

- [x] Sport selector and sport-specific football/tennis dashboard views
- [~] Sofascore adapter attempts live fetches and normalizes a limited event shape; fallback fixtures are generated
- [ ] Add a live match-discovery API for football and tennis
- [ ] Normalize real provider stats, status, teams, and sport-specific events
- [ ] Ensure unsupported sports and partial responses degrade explicitly and safely
- [ ] Verify live and fallback states for both sports

## Phase 4 — Personalization and Engagement

- [x] Client-side Supabase sign-in/sign-up/sign-out flow
- [x] Client-side favorites list and add/remove operations
- [~] Supabase client and backend helper scaffolding exist; working behavior depends on environment keys and database setup
- [ ] Verify database schema, unique constraints, and row-level security policies
- [ ] Handle auth initialization errors and session lifecycle states
- [ ] Add persisted sport/team preferences and restore them on return
- [ ] Add watchlists/alerts only after reliable match discovery and user notification requirements are defined

## Phase 5 — Advanced Analytics and Growth

- [ ] Define and calculate evidence-based player/team impact metrics
- [ ] Add historical performance comparisons and analyst-ready filters
- [ ] Add match recap export/share workflow
- [ ] Evaluate commentary only after reliable source data and explainable analytics exist
- [ ] Review deployment, monitoring, and operational readiness

## Documentation and organization

- [x] Reconcile current-state claims across the README, plan, roadmap, architecture, setup, and overview documents
- [x] Remove or qualify claims that CS2 live data, latest-match discovery, or complete multi-sport support are already functional
- [x] Add an automated backend test command (`npm test`) and CSAPI configuration example
- [x] Core code is separated into backend services/routes/utilities and frontend app/components/hooks
- [ ] Add tests and configuration examples in their owning folders; do not place generated or secret environment files in source control

## GitHub publishing preparation

- [x] Ignore dependencies, generated output, local environment files, and secrets while keeping `.env.example` files trackable
- [x] Add GitHub Actions CI for backend tests and frontend production builds
- [x] Add contribution guidance, security reporting instructions, issue forms, and pull request template
- [x] Add the MIT license referenced by the project README
- [ ] Initialize Git and review `git status`/staged files before the first commit
- [ ] Create the GitHub repository and configure its remote
- [ ] Enable private vulnerability reporting and branch protections as appropriate

## Audit notes

- The legacy appendix after Section 12 in `Plan.md` contains unimplemented code sketches and is explicitly marked non-authoritative; use `CHECKLIST.md` and phase documents for current status.
- The homepage uses `/api/matches/latest`; CSAPI provides recent results, not a guaranteed current-live feed.
- Round-level probability history and clutch events are not supplied by the verified CSAPI endpoints, so timeline/highlight panels currently have no CS2 events to show. Sofascore mocks are still generated when live requests fail.
- Auth and favorites are frontend-driven and require correct Supabase keys/schema/policies; the backend Supabase helper is not mounted in routes.
- Backend `node:test` covers CSAPI normalization, derived analytics, and missing prediction data; upstream failure and frontend interaction coverage remain open.

## Next implementation task

- [x] Restore recent-match discovery and selected-match details using verified CSAPI responses and explicit upstream failure semantics.
- [ ] Continue with real multi-sport discovery/data and the remaining phase 2 reliability and test coverage.
