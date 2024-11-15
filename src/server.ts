import express, { type Request, type Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import Element from './models/Element';

const app = express();
const port = 3000;

// MongoDB connection
const mongoUri = 'mongodb://mongo:27017/games';
mongoose.connect(mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

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
  console.log(`Server running at http://localhost:${port}`);
});



