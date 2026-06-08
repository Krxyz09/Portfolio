# Portfolio Backend

This is a minimal standalone backend for the portfolio contact API. It uses SQLite (file at `../data/portfolio_contact_db.sqlite` by default) and exposes two endpoints:

- `POST /api/contact` — accepts `{ name, email, message }` and stores it
- `GET /api/admin/messages` — returns recent contact messages

Quick start:

```bash
cd backend
npm install
npm start
```

Environment variables:
- `SQLITE_DB_PATH` — override the default sqlite file path
- `PORT` — port to listen on (defaults to `3001`)

Deploy notes:
- This server can be deployed to platforms that provide a persistent filesystem (DigitalOcean App Platform, Fly, Render, a VM, etc.).
- For serverless platforms (Vercel), use a managed DB instead of local SQLite.
