/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { Loggers } from '@myorg/winston-logger';

const loggers = new Loggers({ type: 'Common error' });

export function commonError(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  loggers.error(err, 'Common error handler');
  const response = {
    status: 500,
    errorMessage: 'No handler resolve this error',
  };
  res.status(response.status).json(response);
}
