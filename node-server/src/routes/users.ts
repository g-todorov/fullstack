import express from 'express';
// var passport	= require('passport');
const router = express.Router();
import * as passportConfig from '../config/passport';
import * as userController from '../controllers/user';

// router.route('/')
//   .get(users.list);

router.get('/me', passportConfig.isAuthenticated, userController.getAuthenticatedUser);

router.route('/:userId')
  .get(userController.getUserById);
//   .put(users.update)
//   .delete(users.delete);

export default router;