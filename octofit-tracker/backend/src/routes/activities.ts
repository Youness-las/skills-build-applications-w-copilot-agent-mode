import express, { Request, Response } from 'express';
import Activity from '../models/Activity';

const router = express.Router();

// GET all activities
router.get('/', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const activities = await Activity.find()
      .populate('userId', '-password')
      .skip(skip)
      .limit(limit)
      .sort({ date: -1 })
      .exec();

    const total = await Activity.countDocuments();

    res.json({
      activities,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to fetch activities' 
    });
  }
});

// GET activities by user
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const activities = await Activity.find({ userId: req.params.userId })
      .skip(skip)
      .limit(limit)
      .sort({ date: -1 })
      .exec();

    const total = await Activity.countDocuments({ userId: req.params.userId });

    res.json({
      activities,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to fetch user activities' 
    });
  }
});

// GET activity by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findById(req.params.id).populate('userId', '-password');
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json(activity);
  } catch (error) {
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to fetch activity' 
    });
  }
});

// CREATE activity
router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, type, duration, calories, distance, notes } = req.body;

    if (!userId || !type || !duration || calories === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newActivity = new Activity({ 
      userId, 
      type, 
      duration, 
      calories, 
      distance: distance || 0, 
      notes 
    });
    await newActivity.save();

    res.status(201).json(newActivity);
  } catch (error) {
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to create activity' 
    });
  }
});

// UPDATE activity
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { type, duration, calories, distance, notes } = req.body;
    const activity = await Activity.findByIdAndUpdate(
      req.params.id,
      { type, duration, calories, distance, notes },
      { new: true }
    ).populate('userId', '-password');

    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    res.json(activity);
  } catch (error) {
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to update activity' 
    });
  }
});

// DELETE activity
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);

    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    res.json({ message: 'Activity deleted successfully' });
  } catch (error) {
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to delete activity' 
    });
  }
});

export default router;
