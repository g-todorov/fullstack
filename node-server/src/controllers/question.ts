import async from 'async';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import passport from 'passport';
import { default as User, UserModel, AuthToken } from '../models/User';
import { default as Question, QuestionModel } from '../models/Question';
import { Request, Response, NextFunction } from 'express';
import { IVerifyOptions } from 'passport-local';
import { WriteError } from 'mongodb';
import '../config/passport';
const request = require('express-validator');


/**
 * POST /question
 * Create question.
 */
export let postQuestion = (req: Request, res: Response, next: NextFunction) => {
  const question = new Question({
    name: req.body.name,
    type: req.body.type,
    userCreatedBy: req.body.userCreatedBy,
  });

  question.save((err) => {
    if (err) { return next(err); }

    return res.status(201).json({ message: 'Question has been created.' });
  });
};
