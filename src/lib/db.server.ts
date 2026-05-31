import mysql from "mysql2/promise";

type DbConfig = {
  host: string;
  user: string;
  password: string;
  port: number;
  database: string;
};

let pool: mysql.Pool | undefined;

function getDbConfig(): DbConfig {
  return {
    host: process.env.MYSQL_HOST ?? "127.0.0.1",
    user: process.env.MYSQL_USER ?? "root",
    password: process.env.MYSQL_PASSWORD ?? "",
    port: Number(process.env.MYSQL_PORT ?? "3306"),
    database: process.env.MYSQL_DATABASE ?? "portfolio_contact_db",
  };
}

export async function getContactPool() {
  if (pool) return pool;

  const config = getDbConfig();
  const adminConnection = await mysql.createConnection({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
  });

  await adminConnection.query(`CREATE DATABASE IF NOT EXISTS \`${config.database}\``);
  await adminConnection.end();

  pool = mysql.createPool({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database,
    waitForConnections: true,
    connectionLimit: 10,
  });

  await pool.query(`
    CREATE TABLE IF NOT EXISTS \`${config.database}\`.\`contact_messages\` (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  `);

  return pool;
}

export type ContactSubmission = {
  name: string;
  email: string;
  message: string;
};

export async function saveContactSubmission(submission: ContactSubmission) {
  const db = await getContactPool();
  await db.execute(
    "INSERT INTO `contact_messages` (`name`, `email`, `message`) VALUES (?, ?, ?)",
    [submission.name, submission.email, submission.message],
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
  const db = await getContactPool();
  const [rows] = await db.query<mysql.RowDataPacket[]>(
    "SELECT id, name, email, message, created_at FROM `contact_messages` ORDER BY created_at DESC LIMIT 100",
  );
  return rows.map((row) => ({
    id: Number(row.id),
    name: String(row.name),
    email: String(row.email),
    message: String(row.message),
    created_at: String(row.created_at),
  }));
}
