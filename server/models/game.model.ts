import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
    players: [{
      name: { type: String, required: true },
      value: { type: Number, default: 0 }
    }]
});
  
const Game = mongoose.model('Game', gameSchema);
export default Game;
