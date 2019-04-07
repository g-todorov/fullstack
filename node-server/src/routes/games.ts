import express from 'express';
// var passport	= require('passport');
const router = express.Router();
import * as gameController from '../controllers/game';

router.route('/')
  .get(gameController.getGames)
  .post(gameController.postGame);

router.route('/:gameId')
  .get(gameController.getGameById);

export default router;