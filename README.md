# Task Manager

A full-stack task manager built with React + Vite on the frontend and Node.js + Express + MongoDB on the backend.

## Highlights

- User signup and login with JWT auth
- Protected task routes
- Create, read, update, and delete tasks
- Tailwind CSS UI
- Docker Compose support for MongoDB

## Tech Stack

- Frontend: React, Vite, React Router, Axios, Tailwind CSS
- Backend: Node.js, Express, Mongoose, JWT, bcryptjs
- Database: MongoDB

## Project Structure

```text
task-manager/
  client/              # React frontend
  server/              # Express API + MongoDB models/routes
  docker-compose.yml   # MongoDB container (optional for local dev)
```

## Quick Start

### 1) Install dependencies

```bash
cd server
npm install

cd ../client
npm install
```

### 2) Configure environment variables

Create `server/.env`:

```env
MONGO_URI=mongodb://localhost:27017/task-manager
JWT_SECRET=your_super_secret_key
PORT=5000
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

### 3) Start MongoDB

Choose one option:

1. Local MongoDB installation, or
2. Docker Compose from project root:

```bash
docker compose up -d
```

Note: The included `docker-compose.yml` uses MongoDB root credentials. Update it before using in shared environments.

### 4) Run the app

Terminal 1 (backend):

```bash
cd server
npm run dev
```

Terminal 2 (frontend):

```bash
cd client
npm run dev
```

Frontend runs on Vite default URL (typically `http://localhost:5173`).

## Scripts

### Server (`/server`)

- `npm run dev` - start API server (`server.js`)
- `npm test` - placeholder test script

### Client (`/client`)

- `npm run dev` - start Vite dev server
- `npm run build` - create production build
- `npm run preview` - preview production build
- `npm run lint` - run ESLint

## API Overview

Base URL: `http://localhost:5000/api`

### Auth Routes

- `POST /auth/signup`
- `POST /auth/login`

### Task Routes (Protected)

- `POST /tasks`
- `GET /tasks`
- `PUT /tasks/:id`
- `DELETE /tasks/:id`

Auth header format:

```http
Authorization: <jwt_token>
```

## Deployment Notes

- The frontend includes `client/vercel.json` rewrite support for SPA routing.
- The backend requires `MONGO_URI` and `JWT_SECRET` at runtime.
- `server.js` validates required env vars on startup and exits if missing.

## Known Limitations

- Signup currently returns the created user document.
- `PUT /tasks/:id` and `DELETE /tasks/:id` do not enforce task ownership checks.
- Auth and task routes do not yet include comprehensive validation/error handling.

## Suggested Next Improvements

- Add request validation (`zod`, `joi`, or `express-validator`)
- Enforce task ownership in update/delete operations
- Add centralized error middleware
- Add backend tests for auth and task routes
- Add frontend loading/error states and notifications
