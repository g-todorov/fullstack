import _ from 'lodash';
import passport from 'passport';
import { default as Question, QuestionModel } from '../models/Question';
import { Request, Response, NextFunction } from 'express';
import '../config/passport';

export let postQuestion = (req: Request, res: Response, next: NextFunction) => {
  const question = new Question({
    name: req.body.name,
    type: req.body.type,
    createdBy: req.body.createdBy,
  });

  question.save((err) => {
    if (err) { return next(err); }

    return res.status(201).json({
      message: 'Question has been created.'
    });
  });
};

export const getQuestions = (req: Request, res: Response, next: NextFunction) => {
  const { query } = req;

  const findQuery = {
    createdBy: query.createdBy,
  };

  Question.find(_.omitBy(findQuery, _.isNil), (err, questions: [QuestionModel]) => {

    if (err) { return next(err); }

    return res.status(201).json({
      questions
    });
  });
};