import express from 'express';
import type { Request, Response, Application, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import bcrypt from 'bcrypt';
import jwt, { type JwtPayload } from 'jsonwebtoken';

import Game from './models/game.model';
import User from './models/user.model';
import Profile from './models/profile.model';
import { Rule, populateInitialData } from './models/gamerule.model';
import { log } from 'console';


const app: Application = express();
const port = process.env.PORT || 3000;

const asyncHandler = (fn: (req: Request, res: Response, next: express.NextFunction) => Promise<void>) => 
  (req: Request, res: Response, next: express.NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };


// MongoDB connection
const mongoUri = 'mongodb://mongo:27017/games';
mongoose.connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB\n')
    populateInitialData();
  })
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// POST route
app.post('/api/games', async (req, res) => {
  const { players } = req.body;

  if (!players || players.length < 3) {
    res.status(400).json({ message: 'At least 3 players are required' });
  }

  try {
    const newGame = new Game({ players });
    await newGame.save();

    res.status(201).json({ message: 'Game created successfully' });
    console.log('Game created successfully');
  } catch (error) {
    res.status(500).json({ message: 'Failed to created game', error });
  }
});

// GET route 
app.get('/api/games', async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
    console.log('Games fetched successfully');  
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch games', error });
  }
});
app.get('/api/games/get', async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
    console.log('Games fetched successfully');  
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch games', error });
  }
});
app.get('/api/games/find', async (req, res) => {
  try {
    const game = await Game.findById(req.query.id);
    res.json(game);
    console.log('Game fetched successfully');  
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch games', error });
  }
});

app.post('/api/games/update', async (req, res) => {
  const { gameId, player, partner, value } = req.body;

  try {
    const game = await Game.findById(gameId);
    console.log(gameId);
    if (!game) {
      res.status(404).json({ message: 'Game not found' });
    } else {
      game.players.forEach(p => {
        console.log(p);
        
        if (p.name === player || p.name === partner) {
          p.value += value;
          console.log(p.name, p.value);
          
        }
      });
  
      await game.save();
      res.json({ message: 'Game updated successfully' });
      console.log('Game updated successfully');

    }
    
  } catch (error) {
    res.status(500).json({ message: 'Failed to update game', error });
  }
});

// Register endpoint
app.post('/api/users/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({ message: 'All fields are required' });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    res.status(400).json({ message: 'Username already exists' });
  }
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    res.status(400).json({ message: 'Email already linked to an account' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  await newUser.save();

  res.status(201).json({ message: 'User registered successfully' });
  console.log('User registered successfully');
});

const JWT_SECRET = 'your_jwt_secret_key1';

app.post('/api/users/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: 'All fields are required' });
  }

  const user = await User.findOne({ username });
  if (!user) {
    res.status(400).json({ message: 'Invalid username or password' });
  }else{
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
    console.log('User logged in successfully');

  }
  
});

app.get('/api/rules', async (req, res) => {
  try {
    const rules = await Rule.find();
    res.json(rules);
    console.log('Rules fetched successfully');
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch rules', error });
  }
});
app.get('/api/profiles', async (req, res) => {
  try {
    const rules = await Profile.find();
    res.json(rules);
    console.log('Profiles fetched successfully');
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch profiles', error });
  }
});

app.get('/api/users/profiles', async (req, res) => {
  const token = req.headers['authorization'] || "";
  const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
  
  try {
    const users = await User.findById(decoded.userId).select('-password');
    res.json(users);
    console.log('User profile fetched successfully');
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error });
  }
  
});

app.get('/api/users/get', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
    console.log('Users fetched successfully');
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error });
  }
});



app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// SPA routing
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

// Serve static files from the "dist" directory
app.use(express.static(path.join(__dirname, '../dist')));

