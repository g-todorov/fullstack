import express from 'express';
const router = express.Router();

import usersRouter from './users';
import * as userController from '../controllers/user';
import questionRouter from './questions';
import gameController from './games';
import sessionController from './sessions';

router.use('/users', usersRouter);
router.use('/questions', questionRouter);
router.use('/games', gameController);
router.use('/sessions', sessionController);

router.post('/login', userController.login);
router.post('/register', userController.register);
router.get('/logout', userController.logout);

router.get('/', function(req, res) {
  res.send('server home page');
});

export default router;
