import { IQuestion } from '../../interfaces';
import { default as Question, QuestionModel } from '../../models/Question';
import { default as User, UserModel } from '../../models/User';
import { default as Game, GameModel, IGame } from '../../models/Game';
import { default as Session, SessionModel, ISession } from '../../models/Session';

import * as constants from '../constants';

export const admin1 = new User({
  email: constants.ADMIN1_EMAIL,
  password: constants.USER_PASS,
  role: constants.ADMIN_ROLE,
});

export const admin2 = new User({
  email: constants.ADMIN2_EMAIL,
  password: constants.USER_PASS,
  role: constants.ADMIN_ROLE,
});

export const moderator = new User({
  email: constants.MODERATOR_EMAIL,
  password: constants.USER_PASS,
  role: constants.MODERATOR_ROLE,
});

export const user1 = new User({
  email: constants.USER1_EMAIL,
  password: constants.USER_PASS,
  role: constants.USER_ROLE,
});

export const user2 = new User({
  email: constants.USER2_EMAIL,
  password: constants.USER_PASS,
  role: constants.USER_ROLE,
});

export const mockedUsers = [
  admin1,
  admin2,
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
  type: 'singleOption',
  label: 'Who is te fastest football player for 2019?',
  options: [
    {
      label: 'Mbappe',
      value: 'mbappe',
    }
    ,
    {
      label: 'Rashford',
      value: 'rashford',
    }
  ],
  answer: ['Mbappe'],
  game: undefined,
  createdBy: undefined,
};

const question2: IQuestion = {
  name: 'adminQuestion2',
  type: 'singleOption',
  label: 'Who won the CL in 1999?',
  options: [
    {
      label: 'Real Madrid',
      value: 'realMadrid',
    }
    ,
    {
      label: 'Manchester United',
      value: 'manchesterUnited',
    }
    ,
    {
      label: 'Arsenal',
      value: 'arsenal',
    }
  ],
  answer: ['manchesterUnited'],
  game: undefined,
  createdBy: undefined,
};

export const mockedQuestions = [
  question1,
  question2,
];

const session1: ISession = {
  name: 'Session 1',
  status: 'closed',
  createdBy: undefined,
  games: undefined,
  users: undefined,
};

const session2: ISession = {
  name: 'Session 2',
  status: 'opened',
  createdBy: undefined,
  games: undefined,
  users: undefined,
};

export const mockedSessions = [
  session1,
  session2,
];
