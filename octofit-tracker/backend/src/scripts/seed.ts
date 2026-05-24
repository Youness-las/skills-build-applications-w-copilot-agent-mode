import dotenv from 'dotenv';
import { connectDB, disconnectDB } from '../config/database';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import Workout from '../models/Workout';
import Leaderboard from '../models/Leaderboard';

dotenv.config();

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seed...\n');

    await connectDB();

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Workout.deleteMany({});
    await Leaderboard.deleteMany({});

    // Create users
    console.log('👥 Creating users...');
    const users = await User.insertMany([
      { email: 'alice@octofit.com', username: 'alice', password: 'hashed_password_1' },
      { email: 'bob@octofit.com', username: 'bob', password: 'hashed_password_2' },
      { email: 'charlie@octofit.com', username: 'charlie', password: 'hashed_password_3' },
      { email: 'diana@octofit.com', username: 'diana', password: 'hashed_password_4' },
      { email: 'eve@octofit.com', username: 'eve', password: 'hashed_password_5' },
    ]);
    console.log(`✅ Created ${users.length} users\n`);

    // Create teams
    console.log('🏆 Creating teams...');
    const teams = await Team.insertMany([
      { name: 'Octopi Warriors', description: 'Elite fitness team', members: [users[0]._id, users[1]._id] },
      { name: 'Code Runners', description: 'Tech-focused fitness enthusiasts', members: [users[2]._id, users[3]._id] },
      { name: 'Open Source Athletes', description: 'Community driven team', members: [users[4]._id, users[0]._id] },
    ]);
    console.log(`✅ Created ${teams.length} teams\n`);

    // Create activities
    console.log('🏃 Creating activities...');
    const activities = await Activity.insertMany([
      { userId: users[0]._id, type: 'running', duration: 45, calories: 500, distance: 8.5, notes: 'Morning run' },
      { userId: users[0]._id, type: 'gym', duration: 60, calories: 450, notes: 'Upper body workout' },
      { userId: users[1]._id, type: 'cycling', duration: 90, calories: 800, distance: 35, notes: 'Weekend ride' },
      { userId: users[2]._id, type: 'swimming', duration: 30, calories: 350, distance: 1.5, notes: 'Pool session' },
      { userId: users[3]._id, type: 'yoga', duration: 60, calories: 200, notes: 'Relaxation session' },
      { userId: users[4]._id, type: 'running', duration: 30, calories: 350, distance: 5, notes: 'Quick jog' },
    ]);
    console.log(`✅ Created ${activities.length} activities\n`);

    // Create workouts
    console.log('💪 Creating workouts...');
    const workouts = await Workout.insertMany([
      {
        title: 'Beginner Full Body',
        description: 'Perfect for fitness beginners',
        difficulty: 'easy',
        duration: 30,
        targetMuscles: ['chest', 'back', 'legs'],
        exercises: [
          { name: 'Squats', sets: 3, reps: 12 },
          { name: 'Push-ups', sets: 3, reps: 10 },
          { name: 'Plank', sets: 3, reps: 30 },
        ],
      },
      {
        title: 'Intermediate Upper Body',
        description: 'Build strength in upper body',
        difficulty: 'medium',
        duration: 45,
        targetMuscles: ['chest', 'back', 'shoulders', 'arms'],
        exercises: [
          { name: 'Bench Press', sets: 4, reps: 8 },
          { name: 'Barbell Rows', sets: 4, reps: 8 },
          { name: 'Shoulder Press', sets: 3, reps: 10 },
        ],
      },
      {
        title: 'Advanced HIIT',
        description: 'High-intensity interval training',
        difficulty: 'hard',
        duration: 30,
        targetMuscles: ['full body'],
        exercises: [
          { name: 'Burpees', sets: 5, reps: 20 },
          { name: 'Jump Squats', sets: 5, reps: 15 },
          { name: 'Mountain Climbers', sets: 5, reps: 20 },
        ],
      },
    ]);
    console.log(`✅ Created ${workouts.length} workouts\n`);

    // Create leaderboard entries
    console.log('🏅 Creating leaderboard entries...');
    const leaderboardEntries = await Leaderboard.insertMany([
      { userId: users[0]._id, username: 'alice', totalPoints: 1500, activitiesCount: 2, totalCalories: 950 },
      { userId: users[1]._id, username: 'bob', totalPoints: 1200, activitiesCount: 1, totalCalories: 800 },
      { userId: users[2]._id, username: 'charlie', totalPoints: 900, activitiesCount: 1, totalCalories: 350 },
      { userId: users[3]._id, username: 'diana', totalPoints: 800, activitiesCount: 1, totalCalories: 200 },
      { userId: users[4]._id, username: 'eve', totalPoints: 1100, activitiesCount: 1, totalCalories: 350 },
    ]);
    console.log(`✅ Created ${leaderboardEntries.length} leaderboard entries\n`);

    console.log('✨ Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   • Users: ${users.length}`);
    console.log(`   • Teams: ${teams.length}`);
    console.log(`   • Activities: ${activities.length}`);
    console.log(`   • Workouts: ${workouts.length}`);
    console.log(`   • Leaderboard Entries: ${leaderboardEntries.length}`);

    await disconnectDB();
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error instanceof Error ? error.message : error);
    await disconnectDB();
    process.exit(1);
  }
}

// Run seed
seedDatabase();
