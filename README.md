# Vista: Las Vegas family trip planner, December 2026

One page the whole family opens on a phone. Everyone taps hearts on places; every phone shows the same hearts. Anyone can add a photo to a place.

## Version 1.1 (23 September 2026)
- Same page as version 1.0 (21 places, two durations, three tiers, two stay types, cost breakdown, day plan, refute notes, sources).
- Shared hearts now go through a small server instead of Claude's workspace storage, so nobody needs an account.
- "Add a photo" on every place card. The phone shrinks the image to 1200 pixels wide before sending.
- "Share this link with the family" button.
- Storage: Replit Key Value database when running on Replit (survives deploys); plain files under data/ when run locally.

## Run locally
npm install, then npm start, then open http://localhost:3000
