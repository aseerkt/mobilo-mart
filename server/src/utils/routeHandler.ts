import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import { formatErrors } from './formatErrors';

export function asyncHandler(controller: RequestHandler): RequestHandler {
  return async function (req, res, next) {
    try {
      await controller(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}

export function validateHandler(controllerFn: RequestHandler) {
  return asyncHandler(async function (req, res, next) {
    // deals with express-validator errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: formatErrors(errors.array()) });
    }
    return controllerFn(req, res, next);
  });
}
