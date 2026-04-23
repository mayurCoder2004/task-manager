# Task Manager (MERN + Tailwind)

A full-stack task manager with authentication, protected dashboard access, and a modern Tailwind CSS UI.

## Tech Stack

- Frontend: React, Vite, React Router, Axios, Tailwind CSS
- Backend: Node.js, Express, Mongoose, JWT, bcrypt
- Database: MongoDB

## Project Structure

- client: React app (UI, routing, API calls)
- server: Express API (auth + task CRUD)
- docker-compose.yml: MongoDB container setup

## Features

- User signup and login
- JWT-based authentication
- Protected dashboard route
- Create, list, update, and delete tasks
- Task completion toggle
- Responsive, styled UI using Tailwind CSS

## Prerequisites

- Node.js 18+
- npm
- MongoDB (local or Docker)

## Environment Variables

Create a file named .env inside the server folder with:

MONGO_URI=mongodb://localhost:27017/task-manager
JWT_SECRET=your_super_secret_key

Create a file named .env inside the client folder with:

VITE_API_URL=http://localhost:5000/api

Notes:
- The server runs on port 5000.
- The client is configured to call http://localhost:5000/api.

## Run with Docker (MongoDB only)

From the project root:

  docker compose up -d

This starts MongoDB on port 27017.

## Install Dependencies

Install server dependencies:

  cd server
  npm install

Install client dependencies:

  cd ../client
  npm install

## Start the App (Development)

Start backend (Terminal 1):

  cd server
  npm run dev

Start frontend (Terminal 2):

  cd client
  npm run dev

Open the app in your browser at the Vite URL shown in terminal (usually http://localhost:5173).

## Available Scripts

Client (inside client folder):

- npm run dev: start Vite dev server
- npm run build: production build
- npm run lint: lint frontend code
- npm run preview: preview production build

Server (inside server folder):

- npm run dev: start API server

## API Endpoints

Base URL: http://localhost:5000/api

Auth:
- POST /auth/signup
- POST /auth/login

Tasks (Authorization header required):
- POST /tasks
- GET /tasks
- PUT /tasks/:id
- DELETE /tasks/:id

Example Authorization header:

  Authorization: <jwt_token>

## Tailwind CSS Notes

Tailwind is configured in:
- client/tailwind.config.js
- client/postcss.config.js
- client/src/index.css

## Current Limitations

- Signup currently returns the created user object from backend.
- Task update and delete endpoints do not validate task ownership by authenticated user.

## Next Improvements

- Add backend validation and centralized error handling
- Enforce task ownership checks on update/delete
- Add toast notifications and loading skeletons
- Add tests for auth and task routes
