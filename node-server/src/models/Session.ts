import mongoose from 'mongoose';

export type ISession = & {
  status: Status,
  createdBy: string,
  games: string[],
  users: string[],
};

export type SessionModel = mongoose.Document & {
  status: Status,
  createdBy: string,
  games: string[],
  users: string[],
};

export type Status = 'opened'|'closed'|'running'|'empty';

const sessionSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: [ 'opened', 'closed', 'running', 'empty']
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  games: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
  }],
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }]
}, { timestamps: true, collection: 'gameSessions' });

const Session = mongoose.model('Session', sessionSchema);
export default Session;
