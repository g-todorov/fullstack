
// var passport	= require('passport');
import express from 'express';
const router = express.Router();
import * as sessionController from '../controllers/session';
import * as passportConfig from '../config/passport';

router.route('/')
  .get(sessionController.getSessions)
  .post(passportConfig.isAuthenticated, sessionController.postSession);

router.route('/:sessionId')
  .get(sessionController.getSessionById)
  .put(passportConfig.isAuthenticated, sessionController.updateSession);

export default router;