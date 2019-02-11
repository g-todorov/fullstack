import mongoose from 'mongoose';

export type GameModel = mongoose.Document & {
  name: string,
  type: string,
  userCreatedBy: string,
};

const gameSchema = new mongoose.Schema({
  name: String,
  type: String,
  userCreatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
 },
}, { timestamps: true });

const Game = mongoose.model('Game', gameSchema);
export default Game;
