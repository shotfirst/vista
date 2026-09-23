# Running Vista on Replit

This project is a Node.js/Express app. Run the **Start application** workflow to open the web preview. It runs `PORT=5000 npm start`, which starts `server.js` and serves `public/index.html` and the `/api` routes.

Dependencies come from `package.json` and `package-lock.json`. Install them before starting in a fresh environment.

Without `REPLIT_DB_URL`, the app stores votes in `data/votes.json` and uploaded photos in `data/photos/`. Those files are local to the running environment; do not assume uploads will persist across published deployments. The repository's README describes optional Replit Key Value storage, but no database is configured here.