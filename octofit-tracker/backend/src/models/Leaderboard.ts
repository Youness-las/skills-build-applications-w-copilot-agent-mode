import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboard extends Document {
  userId: mongoose.Types.ObjectId;
  username: string;
  totalPoints: number;
  activitiesCount: number;
  totalCalories: number;
  rank: number;
  createdAt: Date;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboard>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    totalPoints: {
      type: Number,
      default: 0,
    },
    activitiesCount: {
      type: Number,
      default: 0,
    },
    totalCalories: {
      type: Number,
      default: 0,
    },
    rank: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Leaderboard = mongoose.model<ILeaderboard>('Leaderboard', leaderboardSchema);

export default Leaderboard;
