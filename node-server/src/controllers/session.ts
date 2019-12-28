import { default as Session, SessionModel } from '../models/Session';
import { Request, Response, NextFunction } from 'express';
import { IVerifyOptions } from 'passport-local';
import { WriteError } from 'mongodb';
import '../config/passport';
import { emitSessionUpdate } from '../events/sessions';
import { default as User, UserModel, AuthToken } from '../models/User';
// const request = require('express-validator');

import _ from 'lodash';
import { queue } from 'async';

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

export const getSessions = (req: Request, res: Response, next: NextFunction) => {
  const { query } = req;

  const findQuery = {
    createdBy: query.createdBy,
    status: query.status,
    users: query.user,
  };

  Session.find(_.omitBy(findQuery, _.isNil), (err, sessions: [SessionModel]) => {

    if (err) { return next(err); }

    return res.status(201).json({
      sessions
    });
  });
};

export const getSessionById = (req: Request, res: Response, next: NextFunction) => {
  const sessionId = req.params.sessionId;

  Session.findById(req.params.sessionId, (err, session: [SessionModel]) => {

    if (err) { return next(err); }

    return res.status(201).json({
      session
    });
  });
};

export const updateSession = (req: Request, res: Response, next: NextFunction) => {
  Session.findById(req.params.sessionId).exec((err, session: SessionModel) => {
    session = _.extend(session, req.body);

    session.save((err: any, session: SessionModel) => {
      if (err) { return next(err); }

      const user = req.user as UserModel;
      emitSessionUpdate(user.id, session.users);
      return res.status(201).json({ message: 'Session has been updated.' });
    });
  });
};
