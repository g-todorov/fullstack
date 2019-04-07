
// var passport	= require('passport');
import express from 'express';
const router = express.Router();
import * as sessionController from '../controllers/session';

router.route('/')
  .get(sessionController.getSessions)
  .post(sessionController.postSession);

router.route('/:sessionId')
  .get(sessionController.getSessionById)
  .put(sessionController.updateSession);

export default router;