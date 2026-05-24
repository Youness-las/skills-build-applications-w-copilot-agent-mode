# OctoFit Tracker - Complete Setup & Run Guide

This guide will walk you through setting up and running the complete OctoFit Tracker multi-tier application.

## 📋 System Requirements

- **Node.js**: LTS version (v18 or higher)
- **npm**: Comes with Node.js
- **MongoDB**: Community Edition or higher
- **Ports**: 5173 (frontend), 8000 (backend), 27017 (MongoDB)

## 🚀 Quick Start (Local Development)

### Step 1: Start MongoDB

Before running the application, ensure MongoDB is running:

```bash
# Check if MongoDB is running
ps aux | grep mongod

# If not running, start it (command varies by OS)
# macOS (if installed via Homebrew):
brew services start mongodb-community

# Ubuntu/Debian:
sudo service mongod start

# Or run directly:
mongod --dbpath /path/to/data/directory
```

### Step 2: Setup Backend

```bash
cd octofit-tracker/backend

# Install dependencies
npm install

# Create .env file (if not exists)
cp .env.example .env

# Seed the database with test data
npm run seed

# Start the development server
npm run dev
```

The backend will start on **http://localhost:8000**

**API Endpoints:**
- `GET http://localhost:8000/` - API status
- `GET http://localhost:8000/api/health` - Health check
- `GET http://localhost:8000/api/users` - List all users
- `GET http://localhost:8000/api/teams` - List all teams
- `GET http://localhost:8000/api/activities` - List all activities
- `GET http://localhost:8000/api/workouts` - List all workouts
- `GET http://localhost:8000/api/leaderboard` - View leaderboard

### Step 3: Setup Frontend

In a **new terminal**:

```bash
cd octofit-tracker/frontend

# Install dependencies
npm install

# Create .env.local file (optional)
cp .env.local.example .env.local

# Start the development server
npm run dev
```

The frontend will start on **http://localhost:5173**

### Step 4: Open Your App

Visit **http://localhost:5173** in your browser

## 🐙 GitHub Codespaces Setup

If running in GitHub Codespaces, follow these steps:

### Update Backend Configuration

1. Find your Codespaces name:
   ```bash
   echo $CODESPACE_NAME
   ```

2. Update backend `.env`:
   ```bash
   # Set CODESPACE_NAME in octofit-tracker/backend/.env
   CODESPACE_NAME=your-codespace-name-here
   ```

### Update Frontend Configuration

1. Create frontend `.env.local`:
   ```bash
   cp octofit-tracker/frontend/.env.local.example octofit-tracker/frontend/.env.local
   ```

2. Add Codespaces name:
   ```bash
   # In octofit-tracker/frontend/.env.local
   VITE_CODESPACE_NAME=your-codespace-name-here
   ```

3. The frontend will now use:
   ```
   https://your-codespace-name-8000.app.github.dev
   ```

## 📦 Available Scripts

### Backend Commands

```bash
npm run dev          # Start development server with hot reload
npm run build        # Compile TypeScript to JavaScript
npm start            # Run compiled JavaScript
npm run lint         # Run ESLint
npm run seed         # Populate database with test data
```

### Frontend Commands

```bash
npm run dev          # Start Vite development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run preview      # Preview production build locally
```

## 🗄️ Database Operations

### View Database in MongoDB

```bash
# Connect to MongoDB shell
mongosh

# List all databases
show databases

# Use the octofit_db database
use octofit_db

# View all collections
show collections

# View users
db.users.find()

# View activities
db.activities.find()

# Exit
exit
```

### Reset Database

```bash
cd octofit-tracker/backend

# Clear all data and reseed
npm run seed
```

## 🧪 Testing API Endpoints

### Using curl (command line)

```bash
# Get all users
curl http://localhost:8000/api/users

# Get leaderboard
curl http://localhost:8000/api/leaderboard

# Get activities
curl http://localhost:8000/api/activities

# Get workouts
curl http://localhost:8000/api/workouts

# Get teams
curl http://localhost:8000/api/teams
```

### Using VS Code REST Client extension

Create a file `test.http`:

```http
### Get API Status
GET http://localhost:8000/api/health

### Get All Users
GET http://localhost:8000/api/users?page=1&limit=10

### Get All Activities
GET http://localhost:8000/api/activities?page=1&limit=10

### Get Leaderboard
GET http://localhost:8000/api/leaderboard?page=1&limit=50

### Create New User
POST http://localhost:8000/api/users
Content-Type: application/json

{
  "email": "newuser@octofit.com",
  "username": "newuser",
  "password": "password123"
}
```

## 🐛 Troubleshooting

### MongoDB Connection Error

```
❌ MongoDB connection failed: connect ECONNREFUSED
```

**Solution:**
- Make sure MongoDB is running: `ps aux | grep mongod`
- Check MongoDB connection string in `.env`
- Verify MongoDB is listening on port 27017

### Port Already in Use

```bash
# Find process using port
lsof -i :8000   # Backend
lsof -i :5173   # Frontend
lsof -i :27017  # MongoDB

# Kill the process
kill -9 <PID>
```

### Dependencies Not Installed

```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
npm cache clean --force
```

### CORS Errors

If frontend can't connect to backend:
- Ensure backend is running on port 8000
- Check that CORS is enabled in backend (it should be by default)
- Verify API base URL in frontend's `utils/api.js`

### TypeScript Errors

```bash
cd octofit-tracker/backend
npm run build  # Check for compilation errors
```

## 📊 Project Structure

```
octofit-tracker/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts       # MongoDB connection
│   │   ├── models/
│   │   │   ├── User.ts
│   │   │   ├── Team.ts
│   │   │   ├── Activity.ts
│   │   │   ├── Workout.ts
│   │   │   └── Leaderboard.ts
│   │   ├── routes/
│   │   │   ├── users.ts
│   │   │   ├── teams.ts
│   │   │   ├── activities.ts
│   │   │   ├── workouts.ts
│   │   │   └── leaderboard.ts
│   │   ├── scripts/
│   │   │   └── seed.ts           # Database seeding script
│   │   └── index.ts              # Express server entry point
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env                      # Environment variables
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Users.jsx
    │   │   ├── Teams.jsx
    │   │   ├── Activities.jsx
    │   │   ├── Workouts.jsx
    │   │   └── Leaderboard.jsx
    │   ├── utils/
    │   │   └── api.js            # API utilities
    │   ├── App.jsx               # Main app with routing
    │   ├── main.jsx              # Entry point
    │   └── App.css
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tsconfig.json
    ├── .env.local                # Local Codespaces config
    └── .env.local.example
```

## 🔌 API Overview

### Users API
- `GET /api/users` - List all users (paginated)
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Teams API
- `GET /api/teams` - List all teams (paginated)
- `GET /api/teams/:id` - Get team by ID
- `POST /api/teams` - Create new team
- `PUT /api/teams/:id` - Update team
- `DELETE /api/teams/:id` - Delete team

### Activities API
- `GET /api/activities` - List all activities (paginated)
- `GET /api/activities/user/:userId` - Get user's activities
- `GET /api/activities/:id` - Get activity by ID
- `POST /api/activities` - Create new activity
- `PUT /api/activities/:id` - Update activity
- `DELETE /api/activities/:id` - Delete activity

### Workouts API
- `GET /api/workouts` - List all workouts (paginated)
- `GET /api/workouts/difficulty/:difficulty` - Filter by difficulty
- `GET /api/workouts/:id` - Get workout by ID
- `POST /api/workouts` - Create new workout
- `PUT /api/workouts/:id` - Update workout
- `DELETE /api/workouts/:id` - Delete workout

### Leaderboard API
- `GET /api/leaderboard` - Get leaderboard (top 50)
- `GET /api/leaderboard/user/:userId` - Get user's rank
- `PUT /api/leaderboard/:id` - Update leaderboard entry

## 📱 Frontend Features

- **Navigation Bar**: Easy access to all sections
- **Home Page**: Overview with quick links
- **Users Page**: Browse all registered users
- **Teams Page**: View and manage teams
- **Activities Page**: Track fitness activities
- **Workouts Page**: Browse workout programs
- **Leaderboard**: Competitive rankings
- **Pagination**: All lists support pagination
- **Responsive Design**: Bootstrap-based layout

## 🎯 Next Steps

1. ✅ Setup MongoDB and start the service
2. ✅ Install and run the backend
3. ✅ Seed the database
4. ✅ Install and run the frontend
5. ✅ Open http://localhost:5173
6. 🔧 Extend features as needed!

## 📚 Technology Stack

- **Frontend**: React 19, Vite, React Router DOM, Bootstrap 5
- **Backend**: Node.js, Express, TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Build Tools**: TypeScript, ESLint

## 📝 Notes

- All sensitive data should be stored in `.env` files (not committed)
- Passwords in seed data are placeholder hashes (in production, use proper hashing)
- CORS is enabled for local development
- All API responses include pagination info where applicable

## 🆘 Need Help?

- Check MongoDB connection: `ps aux | grep mongod`
- Check port availability: `lsof -i :8000` or `lsof -i :5173`
- Check logs in terminal windows
- Verify all dependencies installed: `npm install`
- Review `.env` and `.env.local` configuration

Happy coding! 🚀🐙
