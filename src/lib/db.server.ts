import path from "path";
import fs from "fs";
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

let db: Database | undefined;

function getDbPath(): string {
  // allow override with env var, default to ./data/portfolio_contact_db.sqlite
  return process.env.SQLITE_DB_PATH ?? path.join(process.cwd(), "data", "portfolio_contact_db.sqlite");
}

async function getDb(): Promise<Database> {
  if (db) return db;
  const dbPath = getDbPath();
  await fs.promises.mkdir(path.dirname(dbPath), { recursive: true });
  db = await open({ filename: dbPath, driver: sqlite3.Database });

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

export type ContactSubmission = {
  name: string;
  email: string;
  message: string;
};

export async function saveContactSubmission(submission: ContactSubmission) {
  const database = await getDb();
  await database.run(
    `INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)`,
    submission.name,
    submission.email,
    submission.message,
  );
}

export type ContactMessage = {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

export async function getContactMessages(): Promise<ContactMessage[]> {
  const database = await getDb();
  const rows = await database.all<{
    id: number;
    name: string;
    email: string;
    message: string;
    created_at: string;
  }>(`SELECT id, name, email, message, created_at FROM contact_messages ORDER BY created_at DESC LIMIT 100`);

  return rows.map((row) => ({
    id: Number(row.id),
    name: String(row.name),
    email: String(row.email),
    message: String(row.message),
    created_at: String(row.created_at),
  }));
}
