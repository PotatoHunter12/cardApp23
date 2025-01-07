import express from 'express';
import type { Request, Response, Application, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import Element from './models/Element';
import connectToDatabase from './models/db.config';
import Profile from './models/profile.model';
import Game from './models/game.model';
import authRoutes from './routes/auth.routes';

const app: Application = express();
const port = process.env.PORT || 3000;

const asyncHandler = (fn: (req: Request, res: Response, next: express.NextFunction) => Promise<void>) => 
  (req: Request, res: Response, next: express.NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

connectToDatabase();

// MongoDB connection
const mongoUri = 'mongodb://mongo:27017/games';
mongoose.connect(mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

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
  console.log(import.meta.env.VITE_BACKEND_URL);
  console.log(`Server running at http://localhost:${port}`);
});

// Profiles API
app.post('/api/profiles', async (req: Request, res: Response) => {
  try {
    const profile = await Profile.create(req.body);
    res.status(201).json(profile);
  } catch (err: any) {
    res.status(500).json({ message: 'Error creating profile', error: err.message });
  }
});

// Get all profiles
app.get('/api/profiles', async (req: Request, res: Response) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (err: any) {
    res.status(500).json({ message: 'Error fetching profiles', error: err.message });
  }
});

// delite profile
app.delete('/api/profiles/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Profile.findByIdAndDelete(id);
    if (deleted) {
      res.status(200).json({ message: 'Profile deleted successfully' });
    } else {
      res.status(404).json({ message: 'Profile not found' });
    }
  } catch (err: any) {
    res.status(500).json({ message: 'Error deleting profile', error: err.message });
  }
});

// Games API
app.post(
  '/api/profiles/:profileId/games',
  async (req: Request<{ profileId: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { profileId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(profileId)) {
        res.status(400).json({ message: 'Invalid profile ID' });
        return;
      }

      const profile = await Profile.findById(profileId);
      if (!profile) {
        res.status(404).json({ message: 'Profile not found' });
        return;
      }

      const game = await Game.create({
        ...req.body,
        profile_id: new mongoose.Types.ObjectId(profileId),
      });

      profile.games.push(game._id);
      await profile.save();

      res.status(201).json(game);
    } catch (err: any) {
      next(err); // Forward the error to Express error-handling middleware
    }
  }
);


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

