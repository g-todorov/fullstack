import { default as User, UserModel } from '../models/User';
import { default as Game, GameModel } from '../models/Game';
import { default as Question, QuestionModel } from '../models/Question';
import { Document } from 'mongoose';

const ADMIN_EMAIL = 'admin@test.com';
const MODERATOR_EMAIL = 'moderator@test.com';
const USER_EMAIL = 'user@test.com';
const USE_PASS = '123qwe';

const seedUsers = () => {
  const admin = new User({
    email: ADMIN_EMAIL,
    password: USE_PASS,
    role: 'admin',
  });

  const moderator = new User({
    email: MODERATOR_EMAIL,
    password: USE_PASS,
    role: 'moderator',
  });

  const user = new User({
    email: USER_EMAIL,
    password: USE_PASS,
    role: 'user'
  });

  User.find({}).then(users => {
    const adminExists = users.some((item: UserModel) => {
      return item.email === ADMIN_EMAIL;
    });
    if (!adminExists) { saveUser(admin); }

    const moderatorExists = users.some((item: UserModel) => {
      return item.email === MODERATOR_EMAIL;
    });
    if (!moderatorExists) { saveUser(moderator); }

    const userExists = users.some((item: UserModel) => {
      return item.email === USER_EMAIL;
    });
    if (!userExists) { saveUser(user); }
  });
};

const saveUser = (user: Document) => {
  user.save((err, savedUser: UserModel) => {
    if (err) { return; }

    if (savedUser.email === ADMIN_EMAIL) {
      savaGame(savedUser.id);
    }
  });
};

const savaGame = (userId: string) => {
  const game = new Game({
    name: 'adminGame',
    type: 'picturePin',
    createdBy: userId,
  });

  game.save((err, savedGame: GameModel) => {
    if (err) { return; }

    if (savedGame.name === 'adminGame') {
      savaQuestion(savedGame.id, userId);
    }
  });
};

const savaQuestion = (questionId: string, userId: string) => {
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
