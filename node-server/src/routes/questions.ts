import express from 'express';
// var passport	= require('passport');
const router = express.Router();
import * as questionController from '../controllers/question';
import * as passportConfig from '../config/passport';

router.route('/')
  .get(questionController.getQuestions)
  .post(passportConfig.isAuthenticated, questionController.postQuestion);

// router.route('/:userId')
//   .get(questionController.getQuestionsByUserId);
//   .put(users.update)
//   .delete(users.delete);

export default router;