// Vista: shared votes and photos for the Las Vegas family trip planner.
// PostgreSQL stores votes and photo references; App Storage stores JPEG bytes.
const express = require("express");
const path = require("path");
const { randomUUID } = require("crypto");
const { Pool } = require("pg");
const { Client } = require("@replit/object-storage");
const app = express();
app.use(express.json({ limit: "6mb" }));
app.use(express.static(path.join(__dirname, "public"), { extensions: ["html"] }));

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required for persistent trip storage");
const db = new Pool({ connectionString: process.env.DATABASE_URL });
const PEOPLE = ["David", "Lauren", "Stephanie"];

function storage() { return new Client(); }

function stored(result) {
  if (!result.ok) throw new Error(String(result.error));
  return result.value;
}

async function readVotes() {
  const rows = await db.query("SELECT person, picks FROM trip_votes");
  return Object.fromEntries(rows.rows.map(row => [row.person, row.picks]));
}
async function writeVotes(person, picks) {
  await db.query("INSERT INTO trip_votes (person, picks) VALUES ($1, $2) ON CONFLICT (person) DO UPDATE SET picks = EXCLUDED.picks",
    [person, JSON.stringify(picks)]);
}

app.get("/api/votes", async (req, res) => {
  try { res.json(await readVotes()); } catch (e) { res.status(500).json({ error: "read failed" }); }
});
app.post("/api/votes/:person", async (req, res) => {
  const person = req.params.person;
  if (!PEOPLE.includes(person)) return res.status(400).json({ error: "unknown person" });
  const picks = req.body && req.body.picks && typeof req.body.picks === "object" ? req.body.picks : {};
  try { await writeVotes(person, picks); res.json({ ok: true }); } catch (e) { res.status(500).json({ error: "write failed" }); }
});

// Photos: the phone shrinks the image first, then sends a JPEG data URL.
app.get("/api/photos", async (req, res) => {
  try {
    const out = {};
    const rows = await db.query("SELECT place, object_key FROM trip_photos ORDER BY created_at, object_key");
    rows.rows.forEach(({ place, object_key }) => {
      (out[place] = out[place] || []).push("/api/photo/" + encodeURIComponent(object_key));
    });
    res.json(out);
  } catch (e) { res.status(500).json({ error: "list failed" }); }
});
app.get("/api/photo/:key", async (req, res) => {
  try {
    const key = req.params.key;
    const row = await db.query("SELECT 1 FROM trip_photos WHERE object_key = $1", [key]);
    if (!row.rowCount) return res.sendStatus(404);
    const b = stored(await storage().downloadAsBytes(key));
    res.set("Content-Type", "image/jpeg").set("Cache-Control", "public, max-age=86400").send(b);
  } catch (e) { res.sendStatus(500); }
});
app.post("/api/photos/:place", async (req, res) => {
  const place = String(req.params.place).replace(/[^a-z0-9]/gi, "");
  const dataUrl = req.body && req.body.dataUrl;
  if (!place || !dataUrl || !/^data:image\/jpeg;base64,/.test(dataUrl)) return res.status(400).json({ error: "need a jpeg" });
  if (dataUrl.length > 1.5e6) return res.status(413).json({ error: "photo too big" });
  const key = "family-photos/" + place + "/" + Date.now() + "-" + randomUUID() + ".jpg";
  try {
    stored(await storage().uploadFromBytes(key, Buffer.from(dataUrl.split(",")[1], "base64")));
    await db.query("INSERT INTO trip_photos (object_key, place) VALUES ($1, $2)", [key, place]);
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ error: "save failed" }); }
});

app.get("/api/health", async (req, res) => {
  try {
    await db.query("SELECT 1");
    stored(await storage().list({ prefix: "family-photos/", maxResults: 1 }));
    res.json({ ok: true, storage: "replit-db", version: "1.3.0" });
  } catch (e) { res.status(503).json({ ok: false, error: "persistent storage unavailable" }); }
});
const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => console.log("Vista listening on " + port + " using PostgreSQL and App Storage"));
