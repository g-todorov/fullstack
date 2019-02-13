import { default as User, UserModel } from '../models/User';
import { default as Game, GameModel } from '../models/Game';
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
    Game.find({}).then(games => {
      if (savedUser.email === ADMIN_EMAIL && savedUser.role === 'admin') {
        savaGame(savedUser.id); }
    });
  });
};

const savaGame = (userId: string) => {
  const game = new Game({
    name: 'adminGame',
    type: 'picturePin',
    createdBy: userId,
  });

  game.save((err, game) => {
    if (err) { return; }
  });
};

export default seedUsers;
