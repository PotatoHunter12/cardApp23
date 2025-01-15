// import Game from './game.model'; // Your Game model
// import GameWinner from './gameWinners.model';

// const saveGameWinner = async (gameId: mongoose.Types.ObjectId) => {
//   try {
//     const game = await Game.findById(gameId);

//     if (!game || !game.players || game.players.length === 0) {
//       throw new Error('Game not found or has no players');
//     }

    
//     const winner = game.players.reduce((prev, current) =>
//       current.value > prev.value ? current : prev
//     );

    
//     const newGameWinner = new GameWinner({
//       gameId,
//       username: winner.name,
//       points: winner.value,
//     });

//     await newGameWinner.save();

//     console.log(`Winner saved: ${winner.name} with ${winner.value} points`);
//   } catch (error) {
//     console.error('Failed to save game winner:', error);
//   }
// };
