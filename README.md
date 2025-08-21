# 7 Wonders Tracker

A full-stack application for tracking 7 Wonders games, built with React, TypeScript, and Express.js.

## Project Structure

This is a monorepo containing both the frontend and backend:

- `frontend/` - React frontend application
- `backend/` - Express.js backend API

## Development Setup

1. Install dependencies for both frontend and backend:
   ```bash
   cd frontend && npm install
   cd ../backend && npm install
   ```

2. Set up environment variables:
   ```bash
   cd backend
   cp .env.example .env
   ```
   Then edit `backend/.env` to set your frontend URL if needed

3. Run the development servers:
   ```bash
   # Terminal 1 - Frontend
   cd frontend
   npm run dev
   
   # Terminal 2 - Backend
   cd backend
   npm run dev
   ```

## Deployment

This project is set up for deployment to Railway as a monorepo. For detailed deployment instructions, see [backend/README.md](backend/README.md).