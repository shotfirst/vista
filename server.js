// Vista: shared votes and photos for the Las Vegas family trip planner.
// Storage: Replit Key Value database when REPLIT_DB_URL exists (survives deploys),
// otherwise plain files under data/ (local runs).
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
app.use(express.json({ limit: "6mb" }));
app.use(express.static(path.join(__dirname, "public"), { extensions: ["html"] }));

const DB = process.env.REPLIT_DB_URL || null;
const VOTES_FILE = path.join(__dirname, "data", "votes.json");
const PHOTO_DIR = path.join(__dirname, "data", "photos");
const PEOPLE = ["David", "Lauren", "Kai", "Stephanie", "Fei"];

async function dbGet(key) {
  const r = await fetch(DB + "/" + encodeURIComponent(key));
  if (r.status === 404) return null;
  return await r.text();
}
async function dbSet(key, value) {
  await fetch(DB, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: encodeURIComponent(key) + "=" + encodeURIComponent(value) });
}
async function dbList(prefix) {
  const r = await fetch(DB + "?prefix=" + encodeURIComponent(prefix));
  const t = await r.text();
  return t ? t.split("\n").filter(Boolean) : [];
}

async function readVotes() {
  if (DB) {
    const out = {};
    for (const p of PEOPLE) { const v = await dbGet("votes:" + p); if (v) out[p] = JSON.parse(v); }
    return out;
  }
  try { return JSON.parse(fs.readFileSync(VOTES_FILE, "utf8")); } catch (e) { return {}; }
}
async function writeVotes(person, picks) {
  if (DB) return dbSet("votes:" + person, JSON.stringify(picks));
  const all = await readVotes(); all[person] = picks;
  fs.writeFileSync(VOTES_FILE, JSON.stringify(all, null, 1));
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
    if (DB) {
      const keys = await dbList("photo:");
      keys.sort().forEach(k => { const parts = k.split(":"); (out[parts[1]] = out[parts[1]] || []).push("/api/photo/" + encodeURIComponent(k)); });
    } else {
      fs.readdirSync(PHOTO_DIR).filter(f => f.endsWith(".jpg")).sort().forEach(f => {
        const place = f.split("__")[0]; (out[place] = out[place] || []).push("/api/photo/" + encodeURIComponent(f));
      });
    }
    res.json(out);
  } catch (e) { res.status(500).json({ error: "list failed" }); }
});
app.get("/api/photo/:key", async (req, res) => {
  try {
    const key = req.params.key;
    if (DB) {
      const v = await dbGet(key); if (!v) return res.sendStatus(404);
      const b = Buffer.from(v.split(",")[1], "base64");
      res.set("Content-Type", "image/jpeg").set("Cache-Control", "public, max-age=86400").send(b);
    } else {
      const f = path.join(PHOTO_DIR, path.basename(key)); if (!fs.existsSync(f)) return res.sendStatus(404);
      res.set("Cache-Control", "public, max-age=86400").sendFile(f);
    }
  } catch (e) { res.sendStatus(500); }
});
app.post("/api/photos/:place", async (req, res) => {
  const place = String(req.params.place).replace(/[^a-z0-9]/gi, "");
  const dataUrl = req.body && req.body.dataUrl;
  if (!place || !dataUrl || !/^data:image\/jpeg;base64,/.test(dataUrl)) return res.status(400).json({ error: "need a jpeg" });
  if (dataUrl.length > 1.5e6) return res.status(413).json({ error: "photo too big" });
  const stamp = Date.now();
  try {
    if (DB) await dbSet("photo:" + place + ":" + stamp, dataUrl);
    else fs.writeFileSync(path.join(PHOTO_DIR, place + "__" + stamp + ".jpg"), Buffer.from(dataUrl.split(",")[1], "base64"));
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ error: "save failed" }); }
});

app.get("/api/health", (req, res) => res.json({ ok: true, storage: DB ? "replit-db" : "files", version: "1.1.0" }));
const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => console.log("Vista listening on " + port + " using " + (DB ? "Replit DB" : "files")));
