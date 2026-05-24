import express, { Request, Response } from 'express';
import Team from '../models/Team';

const router = express.Router();

// GET all teams
router.get('/', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const teams = await Team.find()
      .populate('members', '-password')
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await Team.countDocuments();

    res.json({
      teams,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to fetch teams' 
    });
  }
});

// GET team by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const team = await Team.findById(req.params.id).populate('members', '-password');
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to fetch team' 
    });
  }
});

// CREATE team
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, description, members } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Team name is required' });
    }

    const newTeam = new Team({ name, description, members: members || [] });
    await newTeam.save();

    res.status(201).json(newTeam);
  } catch (error) {
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to create team' 
    });
  }
});

// UPDATE team
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { name, description, members } = req.body;
    const team = await Team.findByIdAndUpdate(
      req.params.id,
      { name, description, members },
      { new: true }
    ).populate('members', '-password');

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    res.json(team);
  } catch (error) {
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to update team' 
    });
  }
});

// DELETE team
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    res.json({ message: 'Team deleted successfully' });
  } catch (error) {
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to delete team' 
    });
  }
});

export default router;
