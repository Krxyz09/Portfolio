import { createClient, Client } from "@libsql/client";

let client: Client | undefined;

function getDbClient(): Client {
  if (client) return client;

  // Initialize Turso Client using your cloud environment variables
  if (!process.env.TURSO_DATABASE_URL) {
    throw new Error("TURSO_DATABASE_URL is not defined in the environment variables.");
  }

  client = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN, 
  });

  client.execute(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `).catch((err) => {
    console.error("Failed to initialize Turso database table:", err);
  });

  return client;
}

export type ContactSubmission = {
  name: string;
  email: string;
  message: string;
};

export async function saveContactSubmission(submission: ContactSubmission) {
  const dbClient = getDbClient();
  
  // Turso uses .execute() with positional parameters passed in an 'args' array
  await dbClient.execute({
    sql: `INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)`,
    args: [submission.name, submission.email, submission.message],
  });
}

export type ContactMessage = {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

export async function getContactMessages(): Promise<ContactMessage[]> {
  const dbClient = getDbClient();
  
  // Fetch data using Turso's standard .execute method
  const result = await dbClient.execute(
    `SELECT id, name, email, message, created_at FROM contact_messages ORDER BY created_at DESC LIMIT 100`
  );

  // Turso returns results in a clean array of objects under .rows
  return result.rows.map((row) => ({
    id: Number(row.id),
    name: String(row.name),
    email: String(row.email),
    message: String(row.message),
    created_at: String(row.created_at),
  }));
}