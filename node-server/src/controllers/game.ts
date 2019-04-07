import _ from 'lodash';
import { default as Game, GameModel } from '../models/Game';
import { Request, Response, NextFunction } from 'express';
import { IVerifyOptions } from 'passport-local';
import { WriteError } from 'mongodb';
import '../config/passport';
const request = require('express-validator');

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

export const getGames = (req: Request, res: Response, next: NextFunction) => {
  const { query } = req;

  const findQuery = {
    createdBy: query.createdBy,
  };

  Game.find(_.omitBy(findQuery, _.isNil), (err, games: [GameModel]) => {

    if (err) { return next(err); }

    return res.status(201).json({
      games
    });
  });
};

export let getGameById = (req: Request, res: Response, next: NextFunction) => {
  Game.findById(req.params.gameId, (err, game: GameModel) => {
    if (err) { return next(err); }

    return res.status(200).json({
      data: game,
      message: 'Game found.'
    });
  });
};
