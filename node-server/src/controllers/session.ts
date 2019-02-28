import { default as Session, SessionModel } from '../models/Session';
import { Request, Response, NextFunction } from 'express';
import { IVerifyOptions } from 'passport-local';
import { WriteError } from 'mongodb';
import '../config/passport';
// import User from 'src/models/User';
const request = require('express-validator');


/**
 * POST /session
 * Create session.
 */
export let postSession = (req: Request, res: Response, next: NextFunction) => {
  const session = new Session({
    status: req.body.status,
    createdBy: req.body.createdBy,
    games: req.body.games,
  });

  session.save((err) => {
    if (err) { return next(err); }

    return res.status(201).json({ message: 'Session has been created.' });
  });
};

export let getSessionsByUserId = (req: Request, res: Response, next: NextFunction) => {
  Session.find({createdBy: req.query.id}, (err, sessions: [SessionModel]) => {

    if (err) { return next(err); }

    return res.status(201).json({
      sessions: sessions
    });
  });
};