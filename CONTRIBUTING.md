# Contributing

## Local setup

1. Follow the Quick Start instructions in [README.md](README.md).
2. Copy the relevant `.env.example` file for each app and use local credentials. Never commit `.env`, `.env.local`, service-role keys, or other secrets.
3. Keep `backend/` and `frontend/` dependencies installed and locked independently.

## Before opening a pull request

- Run `npm test` from `backend/`.
- Run `npm run build` from `frontend/`.
- Update documentation and [CHECKLIST.md](CHECKLIST.md) when behavior or phase status changes.
- Include tests for changed data normalization or analytics behavior.
- State any provider, API-key, or external-service assumptions in the pull request.

## Pull requests

Keep changes focused, describe user-visible behavior, and include verification results. Do not commit generated output, local environment files, or real credentials.
