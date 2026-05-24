import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import workoutsRouter from './routes/workouts';
import leaderboardRouter from './routes/leaderboard';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB().catch((err: Error) => {
  console.error('Database connection failed:', err.message);
  process.exit(1);
});

// API Routes
app.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: 'OctoFit Tracker API Server',
    version: '1.0.0',
    baseUrl: getBaseUrl()
  });
});

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: '✅ API is running' });
});

// Mount API routes
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/workouts', workoutsRouter);
app.use('/api/leaderboard', leaderboardRouter);

// Error handling middleware
app.use((err: Error, req: Request, res: Response) => {
  console.error('Error:', err.message);
  res.status(500).json({ 
    error: err.message || 'Internal server error' 
  });
});

// Get API base URL (Codespaces or localhost)
function getBaseUrl(): string {
  const codespaceName = process.env.CODESPACE_NAME;
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }
  return 'http://localhost:8000';
}

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔════════════════════════════════════════╗
║   OctoFit Tracker API Server           ║
║   ✅ Server running on port ${PORT}        ║
║   📍 Base URL: ${getBaseUrl()}        ║
╚════════════════════════════════════════╝
  `);
});

export default app;
