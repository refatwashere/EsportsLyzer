# Feature Scope

## Current feature set
- CS2 results, map scores, player stats, and ranking-based estimates via CSAPI
- Recent-results list and match selection flow
- Socket.IO refreshes selected match data every 30 seconds; this is not a guarantee of live-match coverage
- Ranking estimate display; round-based probability charts are not currently backed by provider data
- Timeline/highlight components exist, but CSAPI does not provide the round events needed to populate them
- Team comparison and player-card views
- Sport selector for esports, football, and tennis
- Supabase auth and favorites UI scaffolding (requires configured keys, schema, and row-level security)

## Functional requirements
### Match discovery and selection
Users should be able to browse active or recent matches and select one to analyze.

### Data ingestion
The backend should normalize third-party data into a consistent structure, even when APIs are incomplete or delayed.

### Prediction and analysis
The platform should estimate live confidence, momentum, and change in match state using contextual indicators.

### Visualization
Charts and panels should highlight trends clearly and remain responsive across devices.

### Personalization
Users should eventually be able to save favorite teams, matches, and dashboard preferences.
