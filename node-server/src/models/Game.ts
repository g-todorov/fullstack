import mongoose from 'mongoose';

export interface IGame {
  name: string;
  type: string;
  createdBy: string;
}

export type GameModel = mongoose.Document & {
  name: string;
  type: string;
  createdBy: string;
};

const gameSchema = new mongoose.Schema({
  name: String,
  type: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
 },
}, { timestamps: true });

// export const User: UserType = mongoose.model<UserType>('User', userSchema);
const Game = mongoose.model('Game', gameSchema);
export default Game;
