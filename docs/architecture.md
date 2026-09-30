# EsportsLyzer Architecture

## High-Level Flow

1. Frontend requests recent CS2 results from `GET /api/matches/latest`.
2. User selects a result; the frontend emits `subscribeMatch` via Socket.IO.
3. Backend fetches CSAPI match details, player stats, and a team-ranking estimate.
4. Backend emits `matchUpdate` every 30 seconds with the normalized match and available analytics.
5. Frontend renders scores, map results, player stats, team comparisons, and the ranking estimate.

CSAPI provides match results rather than a guaranteed live-event stream. It does not currently supply round history or clutch events, so the timeline/highlight panels may be empty. Football and tennis requests use Sofascore and can return generated mock data after upstream failures.

## Folder Responsibilities

### Backend
- `services/` → external data sources (`csapi.js`, Sofascore, Supabase helpers)
- `utils/` → pure calculation functions (prediction, highlights, etc.)
- `routes/` → REST endpoints
- `server.js` → Express + Socket.IO entry point

### Frontend
- `app/` → Next.js App Router pages
- `components/charts/` → Chart.js visualizations
- `components/panels/` → UI cards (timeline, players, teams...)
- `hooks/` → custom React hooks (future)
- `lib/` → clients (socket, supabase later)

## Current Gaps

1. Add tests for upstream failures, route status codes, and partial provider payloads.
2. Replace Sofascore-generated fixtures with reliable live discovery and normalized data.
3. Complete user preference persistence and verify Supabase row-level security.
4. Add event-level CS2 analytics only when the provider exposes the underlying events.
5. Reconcile remaining documentation and deployment configuration with verified behavior.
