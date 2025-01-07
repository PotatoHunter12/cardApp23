import express, {type Request,type Response } from 'express';
import User from '../models/user.model';

const router = express.Router();

router.post(
  '/register',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, password } = req.body;

      // Validate input
      if (!username || !password) {
        res.status(400).json({ message: 'Username and password are required' });
        return;
      }

      // Check if the user already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        res.status(409).json({ message: 'User already exists' });
        return;
      }

      // Create a new user
      const newUser = new User({ username, password });
      await newUser.save();

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error: any) {
      res.status(500).json({ message: 'Registration failed', error: error.message });
    }
  }
);

export default router;
