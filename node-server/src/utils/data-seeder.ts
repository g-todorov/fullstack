import { default as User, UserModel } from '../models/User';
import { default as Game, GameModel } from '../models/Game';
import { default as Question, QuestionModel } from '../models/Question';
import { default as Session, SessionModel } from '../models/Session';
import mongoose from 'mongoose';
import { Document } from 'mongoose';

import { mockedUsers, mockedGames, mockedQuestions, mockedSessions } from './assets/mock-data';

import * as constants from './constants';

const seedDatabase = async () => {
  // Clear database
  await mongoose.connection.db.dropDatabase();

  const existingUsers = await User.find({}).exec();

  // ~~~~~~~~~~~ Users ~~~~~~~~~~~
  if (existingUsers.length === 0) {
    for (const user of mockedUsers) {
      const savedUser = await user.save();
      existingUsers.push(savedUser);
    }
  }

  const adminUser1 = existingUsers.find((user: UserModel) => {
    return user.role === constants.ADMIN_ROLE && user.email === constants.ADMIN1_EMAIL;
  });

  const adminUser2 = existingUsers.find((user: UserModel) => {
    return user.role === constants.ADMIN_ROLE && user.email === constants.ADMIN2_EMAIL;
  });

  const simpleUser1 = existingUsers.find((user: UserModel) => {
    return user.role === constants.USER_ROLE && user.email === constants.USER1_EMAIL;
  });

  const simpleUser2 = existingUsers.find((user: UserModel) => {
    return user.role === constants.USER_ROLE && user.email === constants.USER2_EMAIL;
  });

  // ~~~~~~~~~~~ Games ~~~~~~~~~~~
  const existingGames = await Game.find({}).exec();

  if (existingGames.length === 0) {
    for (const game of mockedGames) {
      game.createdBy = adminUser1.id;
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
      question.createdBy = adminUser1.id;
      question.game = adminGame.id;
      const savedQuestion = await new Question(question).save();

      existingQuestions.push(savedQuestion);
    }
  }

  // ~~~~~~~~~~~ Sessions ~~~~~~~~~~~
  const existingSessions = await Session.find({}).exec();

  if (existingSessions.length === 0) {
    mockedSessions[0].createdBy = adminUser1.id;
    mockedSessions[0].games = [adminGame.id];
    mockedSessions[0].users = [simpleUser1.id];

    mockedSessions[1].createdBy = adminUser1.id;
    mockedSessions[1].games = [adminGame.id];
    mockedSessions[1].users = [simpleUser1.id, simpleUser2.id];

    for (const session of mockedSessions) {
      const savedSession = await new Session(session).save();

      existingSessions.push(savedSession);
    }
  }
};

export default seedDatabase;
