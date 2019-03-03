import { default as User, UserModel } from '../models/User';
import { default as Game, GameModel } from '../models/Game';
import { default as Question, QuestionModel } from '../models/Question';
import { default as Session, SessionModel } from '../models/Session';
import { Document } from 'mongoose';

import { mockedUsers, mockedGames, mockedQuestions, mockedSessions } from './assets/mock-data';

import * as constants from './constants';

const seedDatabase = async () => {
  const existingUsers = await User.find({}).exec();

  // ~~~~~~~~~~~ Users ~~~~~~~~~~~
  if (existingUsers.length === 0) {
    for (const user of mockedUsers) {
      const savedUser = await user.save();
      existingUsers.push(savedUser);
    }
  }

  const adminUser = existingUsers.find((user: UserModel) => {
    return user.role === constants.ADMIN_ROLE;
  });
  const simpleUser = existingUsers.find((user: UserModel) => {
    return user.role === constants.USER_ROLE;
  });

  // ~~~~~~~~~~~ Games ~~~~~~~~~~~
  const existingGames = await Game.find({}).exec();

  if (existingGames.length === 0) {
    for (const game of mockedGames) {
      game.createdBy = adminUser.id;
      const savedGame = await new Game(game).save();

      existingGames.push(savedGame);
    }
  }

  const adminGame = existingGames.find((game: GameModel) => {
    return game.name === constants.ADMIN_GAME_NAME;
  });

  // ~~~~~~~~~~~ Questions ~~~~~~~~~~~
  const existingQuestions = await Question.find({}).exec();

  if (existingQuestions.length === 0) {
    for (const question of mockedQuestions) {
      question.createdBy = adminUser.id;
      question.game = adminGame.id;
      const savedQuestion = await new Question(question).save();

      existingQuestions.push(savedQuestion);
    }
  }

  // ~~~~~~~~~~~ Sessions ~~~~~~~~~~~
  const existingSessions = await Session.find({}).exec();

  if (existingSessions.length === 0) {
    for (const session of mockedSessions) {
      session.createdBy = adminUser.id;
      session.games = [adminGame.id];
      session.users = [simpleUser.id];
      const savedSession = await new Session(session).save();

      existingSessions.push(savedSession);
    }
  }
};


export default seedDatabase;
