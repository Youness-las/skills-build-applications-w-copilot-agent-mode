import express, { Request, Response } from 'express';
import User from '../models/User';

const router = express.Router();

// GET all users
router.get('/', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .select('-password')
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await User.countDocuments();

    res.json({
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to fetch users' 
    });
  }
});

// GET user by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to fetch user' 
    });
  }
});

// CREATE user
router.post('/', async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newUser = new User({ email, username, password });
    await newUser.save();

    res.status(201).json({ 
      id: newUser._id, 
      email: newUser.email, 
      username: newUser.username 
    });
  } catch (error) {
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to create user' 
    });
  }
});

// UPDATE user
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { email, username } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { email, username },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to update user' 
    });
  }
});

// DELETE user
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to delete user' 
    });
  }
});

export default router;
