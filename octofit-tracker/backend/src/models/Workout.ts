import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  duration: number;
  targetMuscles: string[];
  exercises: Array<{
    name: string;
    sets: number;
    reps: number;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium',
    },
    duration: {
      type: Number,
      required: true,
      min: 5,
    },
    targetMuscles: [{
      type: String,
    }],
    exercises: [{
      name: {
        type: String,
        required: true,
      },
      sets: {
        type: Number,
        required: true,
        min: 1,
      },
      reps: {
        type: Number,
        required: true,
        min: 1,
      },
    }],
  },
  {
    timestamps: true,
  }
);

const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);

export default Workout;
