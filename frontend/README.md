# 7 Wonders Tracker Frontend

Frontend for the 7 Wonders game tracker application, built with React, TypeScript, and Vite.

## Features
- Player management (create, list, delete)
- Game tracking (create, list, delete)
- Wonder information
- Game statistics (player stats, wonder stats, game history)
- Responsive design

## Tech Stack
- React with TypeScript
- Vite
- Tailwind CSS
- React Router
- React Query

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` to set your backend API URL

3. Run the development server:
   ```bash
   npm run dev
   ```

## Build for Production

```bash
npm run build
```

The build output will be in the `dist` directory.
