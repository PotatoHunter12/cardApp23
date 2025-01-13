import express from 'express';
import type { Request, Response, Application, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import Element from './models/Element';
import connectToDatabase from './models/db.config';
import Profile from './models/profile.model';
import authRoutes from './routes/auth.routes';
import Game from './models/Games';
import User from './models/user.model';
import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
import './express.d.ts';

const app: Application = express();
const port = process.env.PORT || 3000;

const asyncHandler = (fn: (req: Request, res: Response, next: express.NextFunction) => Promise<void>) => 
  (req: Request, res: Response, next: express.NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };


// MongoDB connection
const mongoUri = 'mongodb://mongo:27017/games';
mongoose.connect(mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

const authenticateToken = (req: Request, res: Response, next: express.NextFunction) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'Access denied' });

  // jwt.verify(token, JWT_SECRET, (err, user) => {
  //   if (err) return res.status(403).json({ message: 'Invalid token' });
  //   req.user = user;
  //   next();
  // });
};
// Routes
app.use('/api', authRoutes);

// POST route
app.post('/api/elements', async (req, res) => {
  const { items } = req.body;

  if (!items || items.length < 3) {
    res.status(400).json({ message: 'At least 3 items are required' });
  }

  try {
    const newElement = new Element({ items });
    await newElement.save();
    res.status(201).json({ message: 'Element added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add element', error });
  }
});

app.post('/api/end-round', async (req, res) => {
  const { gameId, userId, roundNumber, score } = req.body;

  if (!gameId || !userId || roundNumber === undefined || score === undefined) {
    res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newGame = new Game({ gameId, userId, roundNumber, score });
    await newGame.save();
    res.status(201).json({ message: 'Game data saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save game data', error });
  }
});

// Register endpoint
app.post('/api/users/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: 'All fields are required' });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    res.status(400).json({ message: 'Username already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();

  res.status(201).json({ message: 'User registered successfully' });
});

const JWT_SECRET = 'your_jwt_secret_key';

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

    // const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    // res.json({ token });

  }

  
});
// app.get('/api/users/profile', authenticateToken(req,res), async (req, res) => {
//   const user = await User.findById(req.user?req.user.userId:0).select('-password');
//   if (!user) {
//     res.status(404).json({ message: 'User not found' });
//   } else {
//     res.json(user);
//   }
  
// });

// GET route 
app.get('/api/elements', async (req: Request, res: Response) => {
  try {
    const elements = await Element.find();
    res.json(elements);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch elements', error });
  }
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

///test for game
app.post('/test-game', async (req: Request, res: Response) => {
  try {
    const testProfileId = new mongoose.Types.ObjectId(); // Replace with an actual Profile ID if you have one

    const newGame = await Game.create({
      game_name: 'Test Game',
      game_data: { exampleKey: 'exampleValue' },
      profile_id: testProfileId, // Associate the game with a test Profile ID
    });

    res.status(201).json({ message: 'Game created successfully!', game: newGame });
  } catch (err: any) {
    res.status(500).json({ message: 'Error creating game', error: err.message });
  }
});


// Get games for a profile
app.get('/api/profiles/:profileId/games', async (req: Request, res: Response) => {
  try {
    const { profileId } = req.params;
    const games = await Game.find({ profile_id: profileId }); // Find games by profile_id
    res.json(games);
  } catch (err: any) {
    res.status(500).json({ message: 'Error fetching games', error: err.message });
  }
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// SPA routing
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


// Test route
app.post('/api/profiles/:profileId/games', (req: Request, res: Response) => {
  console.log(req.body, req.params.profileId);
  res.status(200).json({ message: 'Test route works!' });
});

// Serve static files from the "dist" directory
app.use(express.static(path.join(__dirname, 'dist')));

