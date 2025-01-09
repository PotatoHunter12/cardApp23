import mongoose, { Schema, Document } from 'mongoose';

interface IGame extends Document {
  gameId: string;
  userId: string;
  roundNumber: number;
  score: number;
}

const GameSchema: Schema = new Schema({
  gameId: { type: String, required: true },
  userId: { type: String, required: true },
  roundNumber: { type: Number, required: true },
  score: { type: Number, required: true },
});

export default mongoose.model<IGame>('Game', GameSchema);