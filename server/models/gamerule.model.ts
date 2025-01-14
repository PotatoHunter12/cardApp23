import mongoose, { Schema, Document } from 'mongoose';

export interface IRule extends Document {
  id: number;
  name: string;
  points: number;
  diff: boolean;
}

const GRSchema: Schema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  points: { type: Number, required: true },
  diff: { type: Boolean, required: true },
});

const Rule = mongoose.model<IRule>('Rule', GRSchema);

// Initial data
const initialData = [
  { id: 1, name: "Three", points: 10, diff: true },
  { id: 2, name: "Two", points: 20, diff: true },
  { id: 3, name: "One", points: 30, diff: true },
  { id: 4, name: "Solo Three", points: 40, diff: true },
  { id: 5, name: "Solo Two", points: 50, diff: true },
  { id: 6, name: "Solo One", points: 60, diff: true },
  { id: 7, name: "Beggar", points: 70, diff: false },
  { id: 8, name: "Solo no Talon", points: 80, diff: true },
  { id: 9, name: "Three - Valat of Color", points: 100, diff: false },
  { id: 10, name: "Two - Valat of Color", points: 110, diff: false },
  { id: 11, name: "One - Valat of Color", points: 120, diff: false },
  { id: 12, name: "Solo Three - Valat of Color", points: 125, diff: false },
  { id: 13, name: "Solo Two - Valat of Color", points: 150, diff: false },
  { id: 14, name: "Solo One - Valat of Color", points: 175, diff: false },
  { id: 15, name: "Solo no Talon - Valat of Color", points: 250, diff: false },
  { id: 16, name: "Three - Valat", points: 200, diff: false },
  { id: 17, name: "Two - Valat", points: 220, diff: false },
  { id: 18, name: "One - Valat", points: 240, diff: false },
  { id: 19, name: "Solo Three - Valat", points: 250, diff: false },
  { id: 20, name: "Solo Two - Valat", points: 300, diff: false },
  { id: 21, name: "Solo One - Valat", points: 350, diff: false },
  { id: 22, name: "Solo no Talon - Valat", points: 500, diff: false },
];

const populateInitialData = async () => {
  try {
    const count = await Rule.countDocuments();
    if (count === 0) {
      await Rule.insertMany(initialData);
      console.log('Initial data populated successfully');
    }
  } catch (error) {
    console.error('Failed to populate initial data', error);
  }
};

export { Rule, populateInitialData };