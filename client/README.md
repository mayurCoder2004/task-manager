# Task Manager Frontend

This is the React + Vite frontend for the Task Manager application.

## Stack

- React
- Vite
- React Router
- Axios
- Tailwind CSS

## Commands

From this folder:

	npm install
	npm run dev

Build and lint:

	npm run build
	npm run lint

## API Base URL

Set this variable in client/.env:

	VITE_API_URL=http://localhost:5000/api

The frontend uses this value as the backend API base URL.

Default used in code if missing:

	http://localhost:5000/api

Make sure the backend server is running before using login, signup, and dashboard features.

## Styling

Tailwind CSS is configured with:

- tailwind.config.js
- postcss.config.js
- src/index.css

## App Routes

- /login
- /signup
- /dashboard (protected)
