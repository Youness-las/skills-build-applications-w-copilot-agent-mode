import mongoose from 'mongoose';

export async function connectDB() {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
    
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB (octofit_db)');
    
    return mongoose.connection;
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

export function disconnectDB() {
  return mongoose.disconnect();
}
