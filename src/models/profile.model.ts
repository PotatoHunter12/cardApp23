import mongoose, { Schema, Document } from 'mongoose';

// Interface for TypeScript
export interface IProfile extends Document {
  name: string;
  email: string;
  games: mongoose.Types.ObjectId[]; // Array of references to Game
}

// Mongoose Schema Definition
const ProfileSchema = new mongoose.Schema<IProfile>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true },
    games: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game', default: [] }], // Default to an empty array
  },
  { timestamps: true }
);


const Profile = mongoose.model<IProfile>('Profile', ProfileSchema);

export default Profile;
