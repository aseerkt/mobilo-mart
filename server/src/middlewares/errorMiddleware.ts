import { ErrorRequestHandler, RequestHandler } from 'express';
import { __prod__ } from '../constants';

// credits https://github.com/bradtraversy/proshop_mern/blob/master/backend/middleware/errorMiddleware.js

export const notFound: RequestHandler = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  if (!__prod__) console.error(err);
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: __prod__ ? null : err.stack,
  });
};
