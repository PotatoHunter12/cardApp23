import mongoose, { Schema, Document } from 'mongoose';
import User from './user.model'; // Adjust the path as necessary

interface IProfile extends Document {
    profileId: mongoose.Types.ObjectId;
    nickname: string;
    roundsPlayed: number;
    roundsWon: number;
    soloPlays: number;
    soloPlaysWon: number;
    beggarsPlayed: number;
    beggarsWon: number;
    avgTickScore: number;
    gamesPlayed: number;
    gamesWon: number;
    gamesInProgress: number;
    totalPts: number;
}

const ProfileSchema: Schema = new Schema({
    profileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    nickname: { type: Number, default: 0 },
    roundsPlayed: { type: Number, default: 0 },
    roundsWon: { type: Number, default: 0 },
    soloPlays: { type: Number, default: 0 },
    soloPlaysWon: { type: Number, default: 0 },
    beggarsPlayed: { type: Number, default: 0 },
    beggarsWon: { type: Number, default: 0 },
    avgTickScore: { type: Number, default: 0 },
    gamesPlayed: { type: Number, default: 0 },
    gamesWon: { type: Number, default: 0 },
    gamesInProgress: { type: Number, default: 0 },
    totalPts: { type: Number, default: 0 }
});

const Profile = mongoose.model<IProfile>('profile', ProfileSchema);

export default Profile;