import { default as Game, GameModel } from '../models/Game';
import { Request, Response, NextFunction } from 'express';
import { IVerifyOptions } from 'passport-local';
import { WriteError } from 'mongodb';
import '../config/passport';
// import User from 'src/models/User';
const request = require('express-validator');


/**
 * POST /game
 * Create game.
 */
export let postGame = (req: Request, res: Response, next: NextFunction) => {
  const game = new Game({
    name: req.body.name,
    type: req.body.type,
    createdBy: req.body.createdBy,
  });

  game.save((err) => {
    if (err) { return next(err); }

    return res.status(201).json({ message: 'Game has been created.' });
  });
};

export let getGamesByUserId = (req: Request, res: Response, next: NextFunction) => {
  Game.find({createdBy: req.query.id}, (err, games: [GameModel]) => {

    if (err) { return next(err); }

    return res.status(201).json({
      games
    });
  });
};
