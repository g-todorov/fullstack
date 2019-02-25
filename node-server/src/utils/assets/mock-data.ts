import { default as Question, QuestionModel } from '../../models/Question';
import { default as User, UserModel } from '../../models/User';

import * as constants from '../constants/users';

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

export const user = new User({
  email: constants.USER_EMAIL,
  password: constants.USE_PASS,
  role: constants.USER_ROLE,
});
