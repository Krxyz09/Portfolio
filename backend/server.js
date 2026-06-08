import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = process.env.SQLITE_DB_PATH ?? path.join(__dirname, "..", "data", "portfolio_contact_db.sqlite");

async function getDb() {
  await fs.promises.mkdir(path.dirname(dbPath), { recursive: true });
  const db = await open({ filename: dbPath, driver: sqlite3.Database });
  await db.exec(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
  return db;
}

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body ?? {};
  if (!name || !email || !message) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const db = await getDb();
    await db.run("INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)", [name, email, message]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal error" });
  }
});

app.get("/api/admin/messages", async (req, res) => {
  try {
    const db = await getDb();
    const rows = await db.all("SELECT id, name, email, message, created_at FROM contact_messages ORDER BY created_at DESC LIMIT 100");
    res.json({ messages: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal error" });
  }
});

// Health check for Render or other platforms
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

const port = process.env.PORT ?? 3001;
app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});
