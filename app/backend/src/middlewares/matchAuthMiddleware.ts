import { NextFunction, Request, Response } from 'express';
import * as Jwt from 'jsonwebtoken';
import CustomError from '../errors/CustomError';
import IToken from '../interfaces/token.interface';

const validateMatches = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const { homeTeam, awayTeam } = req.body;

  if (homeTeam === awayTeam) {
    throw new CustomError(401, 'It is not possible to create a match with two equal teams');
  }

  try {
    if (!authorization) throw new CustomError(401, 'Invalid Token!');
    const token = authorization.replace('Bearer ', ''); // https://stackoverflow.com/questions/43915379/i-need-to-replace-bearer-from-the-header-to-verify-the-token

    Jwt.verify(token, 'jwt_secret') as IToken;
  } catch (error) {
    throw new CustomError(401, 'Token must be a valid token');
  }

  next();
};

export default validateMatches;
