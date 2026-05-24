# OctoFit Tracker - Multi-Tier Application

A modern multi-tier fitness tracking application built with React, Node.js/Express, and MongoDB.

## Project Structure

```
octofit-tracker/
├── frontend/                 # React 19 + Vite presentation tier
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── tsconfig.json
└── backend/                  # Node.js + Express logic tier
    ├── src/
    │   ├── models/          # Mongoose models
    │   └── index.ts         # Express server
    ├── package.json
    └── tsconfig.json
```

## Tech Stack

### Presentation Tier (Port 5173)
- **React 19** - Modern UI framework
- **Vite** - Lightning-fast build tool
- **React Router DOM** - Client-side routing
- **Bootstrap** - Styling framework

### Logic Tier (Port 8000)
- **Node.js (LTS)** - JavaScript runtime
- **Express** - Web framework
- **TypeScript** - Type-safe development

### Data Tier (Port 27017)
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB schema and data access

## Prerequisites

- Node.js (LTS version)
- npm or yarn
- MongoDB installed and running locally
- Port 5173, 8000, and 27017 available

## Setup Instructions

### 1. Start MongoDB

Ensure MongoDB is running locally:

```bash
# Check if mongod is running
ps aux | grep mongod

# If not running, start the MongoDB service
# On Ubuntu/Debian:
sudo service mongod start

# Or run mongod directly:
mongod --dbpath /path/to/data/directory
```

### 2. Setup Backend

```bash
cd octofit-tracker/backend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Start development server (runs on port 8000)
npm run dev
```

### 3. Setup Frontend

```bash
cd octofit-tracker/frontend

# Install dependencies
npm install

# Start development server (runs on port 5173)
npm run dev
```

## Running the Application

Once both servers are running:
- **Frontend**: Open http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Health Check**: http://localhost:8000/api/health

## Available Scripts

### Backend
- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run compiled JavaScript
- `npm run lint` - Run ESLint

### Frontend
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

## Application Features

- **User authentication and profiles** - Secure user management
- **Activity logging and tracking** - Log fitness activities
- **Team creation and management** - Create and manage teams
- **Competitive leaderboard** - Track rankings and achievements
- **Personalized workout suggestions** - AI-powered recommendations

## Environment Variables

### Backend (.env file)

```
MONGODB_URI=mongodb://localhost:27017/octofit-tracker
PORT=8000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## Mongoose Models

The backend uses Mongoose for MongoDB data access. Models are located in `backend/src/models/`:

- **User** - User profile and authentication data

Each model is TypeScript-based with proper schema validation and type safety.

## API Endpoints

- `GET /` - API status
- `GET /api/health` - Health check endpoint

More endpoints will be added as features are developed.

## Development Notes

- Both frontend and backend are written in TypeScript for type safety
- The backend uses ES modules (type: "module" in package.json)
- All Mongoose operations use typed interfaces
- CORS is enabled for frontend-backend communication

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB service is running: `ps aux | grep mongod`
- Check MongoDB connection string in `.env` file
- Verify MongoDB is listening on port 27017

### Port Already in Use
- Frontend (5173): `lsof -i :5173` to find and kill process
- Backend (8000): `lsof -i :8000` to find and kill process
- MongoDB (27017): `lsof -i :27017` to find and kill process

### Dependencies Issues
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear npm cache: `npm cache clean --force`

## License

MIT
