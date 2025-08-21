# 7 Wonders Tracker Backend

Backend API for tracking 7 Wonders games, built with Express.js, TypeScript, and a file-based database.

## Features
- Player management (create, list, delete)
- Game tracking (create, list, delete)
- Wonder information
- Game statistics (player stats, wonder stats, game history)
- RESTful API

## Tech Stack
- Node.js with TypeScript
- Express.js
- File-based JSON database
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

## Deployment

### Deploy to Railway

1. Go to [railway.app](https://railway.app/) and create an account or sign in

2. Create a new project:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your GitHub account and select this repository

3. Configure environment variables:
   In the Railway dashboard, go to your project settings and add these environment variables:
   - `FRONTEND_URL` - Your frontend URL (for CORS)
   - `NODE_ENV` - Set to "production"

4. Deploy:
   Railway will automatically deploy your application. The deployment URL will be available in the dashboard.

### Environment Variables for Deployment

Make sure to set these environment variables in your deployment environment:
- `FRONTEND_URL` - Your frontend URL (for CORS)