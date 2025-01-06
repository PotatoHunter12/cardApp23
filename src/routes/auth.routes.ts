import express from 'express';
import { Router } from 'express';
import type{ Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.model';

const router = Router();

router.post('/register', async (req: any, res: any) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully.', user: newUser });
  } catch (error: any) {
    res.status(500).json({ message: 'Error registering user.', error: error.message });
  }
});


export default router;
