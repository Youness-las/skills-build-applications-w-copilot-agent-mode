#!/bin/bash

# OctoFit Tracker - Development Server Startup Script
# This script starts MongoDB, backend, and frontend servers

set -e

echo "╔════════════════════════════════════════╗"
echo "║   OctoFit Tracker Startup Script       ║"
echo "║   Starting all development servers...  ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Function to check if MongoDB is running
check_mongodb() {
    if ps aux | grep -v grep | grep mongod > /dev/null; then
        echo "✅ MongoDB is already running"
        return 0
    else
        echo "⚠️  MongoDB is not running"
        return 1
    fi
}

# Function to check if port is in use
check_port() {
    if lsof -i :$1 > /dev/null 2>&1; then
        echo "⚠️  Port $1 is already in use"
        return 0
    else
        echo "✅ Port $1 is available"
        return 1
    fi
}

# Check MongoDB
echo "📌 Checking MongoDB..."
if ! check_mongodb; then
    echo ""
    echo "⚠️  Please start MongoDB first:"
    echo "   - macOS: brew services start mongodb-community"
    echo "   - Ubuntu: sudo service mongod start"
    echo "   - Or: mongod --dbpath /path/to/data"
    echo ""
    exit 1
fi

echo ""
echo "📌 Checking ports..."
check_port 8000
check_port 5173
check_port 27017

echo ""
echo "📌 Installing dependencies..."

if [ ! -d "octofit-tracker/backend/node_modules" ]; then
    echo "   Installing backend dependencies..."
    npm install --prefix octofit-tracker/backend
else
    echo "   ✅ Backend dependencies already installed"
fi

if [ ! -d "octofit-tracker/frontend/node_modules" ]; then
    echo "   Installing frontend dependencies..."
    npm install --prefix octofit-tracker/frontend
else
    echo "   ✅ Frontend dependencies already installed"
fi

echo ""
echo "📌 Setting up environment files..."

if [ ! -f "octofit-tracker/backend/.env" ]; then
    echo "   Creating backend .env..."
    cp octofit-tracker/backend/.env.example octofit-tracker/backend/.env
fi

if [ ! -f "octofit-tracker/frontend/.env.local" ]; then
    echo "   Creating frontend .env.local..."
    cp octofit-tracker/frontend/.env.local.example octofit-tracker/frontend/.env.local
fi

echo ""
echo "🚀 Starting development servers..."
echo ""
echo "Starting backend on port 8000..."
echo "Starting frontend on port 5173..."
echo ""
echo "Open http://localhost:5173 in your browser"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Start backend in background
npm run dev --prefix octofit-tracker/backend &
BACKEND_PID=$!

# Give backend time to start
sleep 3

# Start frontend in background
npm run dev --prefix octofit-tracker/frontend &
FRONTEND_PID=$!

# Handle cleanup on script termination
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo 'Servers stopped'; exit 0" SIGINT SIGTERM

# Wait for both processes
wait
