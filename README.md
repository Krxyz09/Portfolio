# Krish Jindal Portfolio

A modern portfolio website built to showcase my work, skills, and experiences as a Software Engineer and Full-Stack Developer.

The goal of this portfolio is to provide a clean and engaging way to explore the projects I've built, the technologies I work with, and my journey as a developer. It reflects my passion for creating scalable applications, solving real-world problems, and continuously learning new technologies.

## Features

* Modern and responsive design
* Smooth animations and interactive user experience
* Project showcase with detailed descriptions
* Organized technical skills section
* Contact and social links
* SEO-friendly metadata
* Fully optimized for desktop and mobile devices

## Tech Stack

### Frontend

* React
* Next.js
* TypeScript
* Tailwind CSS
* Framer Motion

### Backend

* Node.js
* Express.js
* MongoDB
* PostgreSQL
* Redis

### DevOps & Infrastructure

* Docker
* Nginx
* Git
* Vercel

## Purpose

This portfolio serves as a central place to showcase my development work, share what I'm building, and connect with fellow developers, recruiters, and potential collaborators.

## Connect

Feel free to explore the projects, reach out, or connect with me to discuss software engineering, web development, and technology.

## Deployment (Frontend on Vercel, Backend on Render)

Recommended quick setup:

1. Backend (Render)
	- Deploy the `backend/` folder as a web service on Render (or any host with persistent storage).
	- Set environment variables on Render: `SQLITE_DB_PATH` (optional) and `PORT` (optional).
	- Start command: `npm start` (the project includes `backend/server.js`).

2. Frontend (Vercel)
	- Deploy the repo root on Vercel, using the existing Vite project.
	- In Vercel project settings, add an Environment Variable `VITE_API_BASE` with the full URL of your deployed backend (for example `https://your-backend.onrender.com`).
	- Build command: `npm run build` (Vite) and output directory as `dist`.

3. Local testing
	- Run backend locally:
```bash
cd backend
npm install
npm start
```

	- Run frontend locally and point to the backend:
```bash
cd C:\Project\Portfolio
cp .env.example .env
# edit VITE_API_BASE in .env to http://localhost:3001
npm install
npm run dev
```

Notes:
- The frontend uses `import.meta.env.VITE_API_BASE` (set in Vercel) to call the backend API. If empty, it will call same-origin.
- SQLite is fine for local and for the backend if you host it on Render/VPS. Do not use SQLite with Vercel serverless functions.

