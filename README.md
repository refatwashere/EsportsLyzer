# EsportsLyzer 🔥

## Developer

- Robiul Islam Refat
- [Website](https://refatishere.free.nf)
- [Email](mailto:rbl.islam.refat2@gmail.com)
- [GitHub](https://github.com/refatwashere/EsportsLyzer)

CS2 and multi-sport match analytics prototype.

## What’s implemented now

- CS2 match results, map scores, player stats, and ranking-based estimates via public CSAPI (`api.csapi.de`)
- Recent results list with selectable match details
- Socket.IO refreshes selected match data every 30 seconds; CSAPI does not guarantee a current-live match feed
- Player cards and team comparison; round timeline and event highlights require event-level data not currently supplied by CSAPI
- **Sport selector**: Esports / Football / Tennis
- Sofascore service layer (realistic mocks when API blocks)
- Supabase sign-in/sign-up and favorites UI (requires project keys, schema, and row-level security configuration)

## Quick Start

For Windows PowerShell / Command Prompt, use `copy` instead of `cp`:

```bash
# Backend
cd backend
copy .env.example .env
npm install
npm run dev

# Frontend (new terminal)
cd frontend
copy .env.example .env.local
npm install
npm run dev
```

If you're on macOS or Linux, the equivalent commands are `cp .env.example .env` and `cp .env.example .env.local`.

Open [http://localhost:3000](http://localhost:3000).

### Supabase (optional but recommended)

See [docs/supabase-setup.md](docs/supabase-setup.md) for the exact SQL + keys.

## Documentation Index

### Core project documents

- [docs/overview.md](docs/overview.md) — project summary, vision, and current state
- [docs/roadmap.md](docs/roadmap.md) — roadmap, milestones, and delivery phases
- [docs/developer-guide.md](docs/developer-guide.md) — architecture, workflow, and engineering guidance

### Supporting references

- [docs/architecture.md](docs/architecture.md)
- [docs/supabase-setup.md](docs/supabase-setup.md)
- [docs/phases.md](docs/phases.md)
- [docs/phase_01_core_dashboard_foundation.md](docs/phase_01_core_dashboard_foundation.md)
- [docs/phase_02_data_quality_and_prediction.md](docs/phase_02_data_quality_and_prediction.md)
- [docs/phase_03_multi_sport_expansion.md](docs/phase_03_multi_sport_expansion.md)
- [docs/phase_04_personalization_and_engagement.md](docs/phase_04_personalization_and_engagement.md)
- [docs/phase_05_advanced_analytics_and_growth.md](docs/phase_05_advanced_analytics_and_growth.md)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for setup and verification steps. Please report security issues privately as described in [SECURITY.md](SECURITY.md).

## Project Structure

```text
esportslyzer/
├── backend/
│   ├── services/     # csapi.js, sofascore.js, supabase.js
│   ├── utils/        # prediction, highlights, timeline...
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── app/
│   ├── components/   # AuthPanel, SportSelector, charts, panels
│   ├── hooks/useAuth.js
│   └── lib/supabaseClient.js
└── docs/
```

## Notes

- HLTV.org itself is behind Cloudflare → we use the excellent free CSAPI instead for real match data.
- Sofascore requests may fail or return 403 from datacenter IPs; the service currently falls back to generated mock data, which is not suitable as a live-data claim.
- All free-tier friendly (Vercel + Render + Supabase).

Backend tests: run `npm test` from `backend/`.

Licensed under the [MIT License](LICENSE).
