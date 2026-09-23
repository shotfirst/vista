# Running Vista on Replit

This project is a Node.js/Express app. Run the **Start application** workflow to open the web preview. It runs `PORT=5000 npm start`, which starts `server.js` and serves `public/index.html` and the `/api` routes.

Dependencies come from `package.json` and `package-lock.json`. Install them before starting in a fresh environment.

In this Replit environment, `REPLIT_DB_URL` is provided and the app uses its existing Replit Key Value storage path for shared votes and photos. No database credentials are needed for local development here. Without `REPLIT_DB_URL`, it falls back to `data/votes.json` and `data/photos/`. Those local files should not be relied on for persistence across published deployments.