import mongoose, { Schema, Document } from 'mongoose';

export interface IGame extends Document {
  _id: mongoose.Types.ObjectId; // Add this field for TypeScript compatibility
  game_name: string;
  game_data?: Record<string, any>; // JSON-compatible structure
  profile_id: mongoose.Types.ObjectId; // Reference to Profile
}

const GameSchema = new Schema<IGame>(
  {
    game_name: { type: String, required: true },
    game_data: { type: Schema.Types.Mixed, required: false },
    profile_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IGame>('Game', GameSchema);
