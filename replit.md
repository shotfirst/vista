# Running Vista on Replit (v1.0.1)

This project is a Node.js/Express app. Run the **Start application** workflow to open the web preview. It runs `PORT=5000 npm start`, which starts `server.js` and serves `public/index.html` and the `/api` routes.

Dependencies come from `package.json` and `package-lock.json`. Install them before starting in a fresh environment.

Votes use the built-in PostgreSQL database (`DATABASE_URL`). Uploaded JPEGs use the project's default App Storage bucket; PostgreSQL holds their object references. Both services must be available in development and production. The legacy `REPLIT_DB_URL` key-value service is not available to Autoscale published apps and must not be used as a fallback. If storage is unavailable, the API reports an error rather than silently writing to disposable local files.

The development and production PostgreSQL databases are separate. Replit applies the development schema to production during Publish. App Storage objects are shared between the two environments for this project. Before publishing, confirm the `trip_votes` and `trip_photos` tables exist in development and a default App Storage bucket is attached.

## Changelog

- v1.0.1 (2026-09-23): Documented persistent PostgreSQL and App Storage requirements.