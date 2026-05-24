import express, { Request, Response } from 'express';
import Leaderboard from '../models/Leaderboard';

const router = express.Router();

// GET leaderboard (sorted by points, top 50)
router.get('/', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;
    const skip = (page - 1) * limit;

    const leaderboard = await Leaderboard.find()
      .populate('userId', '-password')
      .sort({ totalPoints: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await Leaderboard.countDocuments();

    // Update rankings
    const rankedLeaderboard = leaderboard.map((entry, index) => ({
      ...entry.toObject(),
      rank: skip + index + 1,
    }));

    res.json({
      leaderboard: rankedLeaderboard,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to fetch leaderboard' 
    });
  }
});

// GET user rank
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const userEntry = await Leaderboard.findOne({ userId: req.params.userId })
      .populate('userId', '-password');
    
    if (!userEntry) {
      return res.status(404).json({ error: 'User not found in leaderboard' });
    }

    // Calculate rank
    const higherScores = await Leaderboard.countDocuments({ 
      totalPoints: { $gt: userEntry.totalPoints } 
    });

    res.json({
      ...userEntry.toObject(),
      rank: higherScores + 1,
    });
  } catch (error) {
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to fetch user rank' 
    });
  }
});

// UPDATE leaderboard entry
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { totalPoints, activitiesCount, totalCalories } = req.body;
    
    const entry = await Leaderboard.findByIdAndUpdate(
      req.params.id,
      { totalPoints, activitiesCount, totalCalories },
      { new: true }
    ).populate('userId', '-password');

    if (!entry) {
      return res.status(404).json({ error: 'Leaderboard entry not found' });
    }

    res.json(entry);
  } catch (error) {
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to update leaderboard entry' 
    });
  }
});

export default router;
