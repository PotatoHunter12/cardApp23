import mongoose, { Schema, Document } from 'mongoose';

export interface IGameWinner extends Document {
  gameId: mongoose.Types.ObjectId; // Reference to the game
  username: string; // Username of the winner
  points: number; // Points scored by the winner
}

const GameWinnerSchema: Schema = new Schema({
  gameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game', // Reference to the Game model
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
});

const GameWinner = mongoose.model<IGameWinner>('GameWinner', GameWinnerSchema);

export default GameWinner;
