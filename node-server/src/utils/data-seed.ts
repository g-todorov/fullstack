import { default as User, UserModel } from '../models/User';
import { default as Game, GameModel } from '../models/Game';
import { default as Question, QuestionModel } from '../models/Question';
import { default as Session, SessionModel } from '../models/Session';
import { Document } from 'mongoose';

import { admin, moderator, user } from './assets/mock-data';

import * as constants from './constants/users';

const seedUsers = () => {
  User.find({}).then(users => {
    const adminExists = users.some((item: UserModel) => {
      return item.email === constants.ADMIN_EMAIL;
    });
    if (!adminExists) { saveUser(admin); }

    const moderatorExists = users.some((item: UserModel) => {
      return item.email === constants.MODERATOR_EMAIL;
    });
    if (!moderatorExists) { saveUser(moderator); }

    const userExists = users.some((item: UserModel) => {
      return item.email === constants.USER_EMAIL;
    });
    if (!userExists) { saveUser(user); }
  });
};

const saveUser = (user: Document) => {
  user.save((err, savedUser: UserModel) => {
    if (err) { return; }

    if (savedUser.email === constants.ADMIN_EMAIL) {
      saveGame(savedUser.id);
    }
  });
};

const saveGame = (userId: string) => {
  const game = new Game({
    name: 'adminGame',
    type: 'picturePin',
    createdBy: userId,
  });

  game.save((err, savedGame: GameModel) => {
    if (err) { return; }

    if (savedGame.name === 'adminGame') {
      saveSession(userId, [savedGame.id]);
      saveQuestion(savedGame.id, userId);
    }
  });
};

const saveSession = (userId: string, games: string[]) => {
  const session = new Session({
    status: 'closed',
    createdBy: userId,
    games
  });

  session.save();
};

const saveQuestion = (questionId: string, userId: string) => {
  const question1 = new Question({
    name: 'adminQuestion1',
    type: 'options',
    options: [
      {
        label: 'label',
        value: 'value1',
      }
    ,
      {
        label: 'label',
        value: 'value2',
      }
    ],
    answer: 'value2',
    game: questionId,
    createdBy: userId,
  });

  const question2 = new Question({
    name: 'adminQuestion2',
    type: 'multipleOptions',
    options: [
      {
        label: 'label',
        value: 'value1',
      }
    ,
      {
        label: 'label',
        value: 'value2',
      }
      ,
      {
        label: 'label',
        value: 'value3',
      }
    ],
    answer: ['value2', 'value3'],
    game: questionId,
    createdBy: userId,
  });

  question1.save();
  question2.save();
};

export default seedUsers;
