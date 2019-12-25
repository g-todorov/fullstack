import express from 'express';
// var passport	= require('passport');
import * as passportConfig from '../config/passport';
const router = express.Router();
import * as gameController from '../controllers/game';

router.route('/')
  .get(gameController.getGames)
  .post(passportConfig.isAuthenticated, gameController.postGame);

router.route('/:gameId')
  .get(gameController.getGameById);

export default router;