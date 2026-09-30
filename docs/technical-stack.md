# Technical Stack

## Frontend
- Next.js
- React
- Tailwind CSS
- Charting components for probability and momentum views

## Backend
- Node.js
- Express
- Socket.IO for real-time updates

## Data sources
- Public CSAPI for recent CS2 results, match details, player stats, and ranking estimates; no guaranteed current-live event feed
- Sofascore service layer for multi-sport expansion
- Supabase for auth and personalization

## Deployment model
- Frontend: Vercel
- Backend: Render or similar lightweight host
- Database/Auth: Supabase

## Project structure
```text
esportslyzer/
├── backend/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── server.js
├── frontend/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   └── styles/
├── docs/
├── README.md
├── Plan.md
└── REVIEW.md
```

## Data flow
1. Users select a sport or live match.
2. The backend fetches available provider data (recent CS2 results or Sofascore events).
3. Data is normalized into a shared shape.
4. Analytics utilities compute predictions and highlights.
5. Frontend components render charts and panels.
6. WebSocket events refresh the dashboard without reloading the page.
