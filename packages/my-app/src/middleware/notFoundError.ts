/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { Loggers } from '@myorg/winston-logger';

const loggers = new Loggers({ type: 'Common error' });

export function notFoundError(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  // 找不到該路由
  if (!req.route) {
    loggers.error(`API ${req.path} not found`, 'API error');
    const response = { status: 404, errorMessage: 'API not found' };
    res.status(response.status).json(response);
  }
}
