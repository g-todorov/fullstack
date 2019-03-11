import { default as Session, SessionModel } from '../models/Session';
import { Request, Response, NextFunction } from 'express';
import { IVerifyOptions } from 'passport-local';
import { WriteError } from 'mongodb';
import '../config/passport';
import { emitSessionUpdate } from '../events/sessions';
const request = require('express-validator');

import _ from 'lodash';


/**
 * POST /session
 * Create session.
 */
export const postSession = (req: Request, res: Response, next: NextFunction) => {
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

export const getSessionsByUserId = (req: Request, res: Response, next: NextFunction) => {
  Session.find({createdBy: req.query.id}, (err, sessions: [SessionModel]) => {

    if (err) { return next(err); }

    return res.status(201).json({
      sessions: sessions
    });
  });
};

export const updateSession = (req: Request, res: Response, next: NextFunction) => {
  Session.findById(req.params.sessionId).exec((err, session: SessionModel) => {
    session = _.extend(session, req.body);

    session.save((err: any) => {
      if (err) { return next(err); }

      emitSessionUpdate();
      return res.status(201).json({ message: 'Session has been updated.' });
    });
  });
};
