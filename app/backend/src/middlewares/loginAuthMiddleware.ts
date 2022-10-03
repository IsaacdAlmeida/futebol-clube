import { NextFunction, Request, Response } from 'express';
import CustomError from '../errors/CustomError';

const validateLoginFields = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) throw new CustomError(400, 'All fields must be filled');

  next();
};

export default validateLoginFields;
