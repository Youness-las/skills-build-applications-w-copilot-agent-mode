import express, { Request, Response } from 'express';
import Workout from '../models/Workout';

const router = express.Router();

// GET all workouts
router.get('/', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const workouts = await Workout.find()
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await Workout.countDocuments();

    res.json({
      workouts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to fetch workouts' 
    });
  }
});

// GET workouts by difficulty
router.get('/difficulty/:difficulty', async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find({ difficulty: req.params.difficulty });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to fetch workouts' 
    });
  }
});

// GET workout by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json(workout);
  } catch (error) {
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to fetch workout' 
    });
  }
});

// CREATE workout
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, description, difficulty, duration, targetMuscles, exercises } = req.body;

    if (!title || !description || !duration || !exercises) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newWorkout = new Workout({ 
      title, 
      description, 
      difficulty: difficulty || 'medium', 
      duration, 
      targetMuscles: targetMuscles || [], 
      exercises 
    });
    await newWorkout.save();

    res.status(201).json(newWorkout);
  } catch (error) {
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to create workout' 
    });
  }
});

// UPDATE workout
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { title, description, difficulty, duration, targetMuscles, exercises } = req.body;
    const workout = await Workout.findByIdAndUpdate(
      req.params.id,
      { title, description, difficulty, duration, targetMuscles, exercises },
      { new: true }
    );

    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    res.json(workout);
  } catch (error) {
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to update workout' 
    });
  }
});

// DELETE workout
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);

    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    res.json({ message: 'Workout deleted successfully' });
  } catch (error) {
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to delete workout' 
    });
  }
});

export default router;
