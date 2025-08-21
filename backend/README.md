# 7 Wonders Tracker Backend

Backend API for tracking 7 Wonders games, built with Express.js, TypeScript, and a file-based database (development) or PostgreSQL (production).

## Features
- Player management (create, list, delete)
- Game tracking (create, list, delete)
- Wonder information
- Game statistics (player stats, wonder stats, game history)
- RESTful API

## Tech Stack
- Node.js with TypeScript
- Express.js
- File-based JSON database (development) or PostgreSQL (production)
- Zod for validation

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` to set your frontend URL if needed

3. Run the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Health Check
- `GET /api/health` - Check if the API is running

### Wonders
- `GET /api/wonders` - Get all wonders

### Players
- `GET /api/players` - List all players
- `POST /api/players` - Create a new player
- `DELETE /api/players/:id` - Delete a player

### Games
- `GET /api/games` - List all games
- `POST /api/games` - Create a new game
- `DELETE /api/games/:id` - Delete a game

### Statistics
- `GET /api/stats/players` - Get player statistics
- `GET /api/stats/wonders` - Get wonder statistics
- `GET /api/games/history` - Get game history

## Monorepo Deployment

This project is set up as a monorepo with both frontend and backend. For deployment to Railway:

1. Go to [railway.app](https://railway.app/) and create an account or sign in

2. Create a new project:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your GitHub account and select this repository

3. Add a PostgreSQL database:
   - In your Railway project, click "+ New"
   - Select "Database"
   - Choose "PostgreSQL"

4. Configure the backend service:
   - Click on the backend service (not the database)
   - Go to "Settings" tab
   - Set "Root Directory" to `/backend`

5. Configure environment variables:
   In the Railway dashboard, go to your backend service settings and add these environment variables:
   - `NODE_ENV` - Set to "production"
   - `FRONTEND_URL` - Your frontend URL (for CORS, optional if serving frontend from backend)

6. Deploy:
   Railway will automatically deploy your application. The deployment URL will be available in the dashboard.

### Environment Variables for Deployment

Make sure to set these environment variables in your deployment environment:
- `NODE_ENV` - Should be set to "production" for Railway deployment
- `FRONTEND_URL` - Your frontend URL (for CORS, optional if serving frontend from backend)
- `DATABASE_URL` - Set automatically by Railway when you add PostgreSQL database

## Development

For local development, the backend uses a file-based database (`data.json`) for simplicity. In production, it uses PostgreSQL.

The frontend is served by the backend in production but runs on a separate development server (Vite) during development.