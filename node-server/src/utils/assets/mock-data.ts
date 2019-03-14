import { default as Question, QuestionModel, IQuestion } from '../../models/Question';
import { default as User, UserModel } from '../../models/User';
import { default as Game, GameModel, IGame } from '../../models/Game';
import { default as Session, SessionModel, ISession } from '../../models/Session';

import * as constants from '../constants';

export const admin = new User({
  email: constants.ADMIN_EMAIL,
  password: constants.USE_PASS,
  role: constants.ADMIN_ROLE,
});

export const moderator = new User({
  email: constants.MODERATOR_EMAIL,
  password: constants.USE_PASS,
  role: constants.MODERATOR_ROLE,
});

export const user1 = new User({
  email: constants.USER1_EMAIL,
  password: constants.USE_PASS,
  role: constants.USER_ROLE,
});

export const user2 = new User({
  email: constants.USER2_EMAIL,
  password: constants.USE_PASS,
  role: constants.USER_ROLE,
});

export const mockedUsers = [
  admin,
  moderator,
  user1,
  user2,
];

const game: IGame = {
  name: constants.ADMIN_GAME_NAME,
  type: constants.ADMIN_GAME_TYPE,
  createdBy: undefined,
};

export const mockedGames = [
  game
];

const question1: IQuestion = {
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
  answer: ['value2'],
  game: undefined,
  createdBy: undefined,
};

const question2: IQuestion = {
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
  game: undefined,
  createdBy: undefined,
};

export const mockedQuestions = [
  question1,
  question2,
];

const session1: ISession = {
  status: 'closed',
  createdBy: undefined,
  games: undefined,
  users: undefined,
};

const session2: ISession = {
  status: 'opened',
  createdBy: undefined,
  games: undefined,
  users: undefined,
};

export const mockedSessions = [
  session1,
  session2,
];
