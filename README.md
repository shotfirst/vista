# Vista: Las Vegas family trip planner, December 2026

One page the whole family opens on a phone. Everyone taps hearts on places; every phone shows the same hearts. Anyone can add a photo to a place.

## Version 1.5 (23 September 2026)
- Restyled the page in Desert Warm using shared colours, Fraunces headings, Hanken Grotesk body text, rounded cards and pill controls; documented the system in DESIGN.md.
- Dated price cards now share one accessible expandable template. Their price and source remain visible; details open on click or keyboard, with a source/read-time peek on desktop hover.
- Kept the trip controls, totals, places, photos, shared picks, prior research notes and all version 1.4 price data.

## Version 1.4 (23 September 2026)
- Added dated price reads for flights, Las Vegas and Tusayan stays, minivans and attractions, each with its source, Eastern read time, confidence label and earlier estimate.
- Added the 1.4 "What the refute pass changed" findings and "Still to check" list; kept the earlier refute notes and research sources available for reference.
- The switch-driven trip total remains an earlier planning estimate where room counts, taxes, fees or dates have not been confirmed.

## Version 1.3 (23 September 2026)
- New page (version 1.2 content) wired to the shared server: six header photos, cost breakdown and day plan above the places, Learn more link on every card, travel insurance removed.
- Name picker is David, Lauren and Stephanie. Coloured initials show on each card so everyone sees who liked what.
- Shared hearts refresh every 10 seconds. Add a photo and the swipe strip work again. Share button is back.
- Claude workspace storage code removed. The server only accepts David, Lauren and Stephanie.

## Version 1.1 (23 September 2026)
- Same page as version 1.0 (21 places, two durations, three tiers, two stay types, cost breakdown, day plan, refute notes, sources).
- Shared hearts now go through a small server instead of Claude's workspace storage, so nobody needs an account.
- "Add a photo" on every place card. The phone shrinks the image to 1200 pixels wide before sending.
- "Share this link with the family" button.
- Storage: Replit Key Value database when running on Replit (survives deploys); plain files under data/ when run locally.

## Run locally
npm install, then npm start, then open http://localhost:3000
