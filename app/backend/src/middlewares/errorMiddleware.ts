import { Request, Response, NextFunction } from 'express';
import CustomError from '../errors/CustomError';

const errorMiddleware = (err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
};

export default errorMiddleware;
