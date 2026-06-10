import express from "express";
import cors from "cors";
import { createClient } from "@libsql/client";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// 1. Resolve path and dynamically execute dotenv BEFORE initializing the DB client
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// 2. Initialize Turso Client using the newly loaded env variables
const dbClient = createClient({
  url: process.env.TURSO_DATABASE_URL || "fallback-to-prevent-crash",
  authToken: process.env.TURSO_AUTH_TOKEN,
});

// Helper function to initialize the database table in Turso if it doesn't exist
async function initDb() {
  await dbClient.execute(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
}

// Run the initialization
initDb().catch((err) => {
  console.error("Failed to initialize Turso database table:", err);
});

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body ?? {};
  if (!name || !email || !message) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Turso uses .execute() with positional arguments named as 'args'
    await dbClient.execute({
      sql: "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)",
      args: [name, email, message],
    });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal error" });
  }
});

app.get("/api/admin/messages", async (req, res) => {
  try {
    const result = await dbClient.execute(
      "SELECT id, name, email, message, created_at FROM contact_messages ORDER BY created_at DESC LIMIT 100"
    );
    // Turso returns an array of rows under the 'rows' property
    res.json({ messages: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal error" });
  }
});

// Health check for deployment platforms
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

const port = process.env.PORT ?? 3001;
app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});