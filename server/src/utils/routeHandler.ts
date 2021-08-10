import { RequestHandler } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';
import { formatErrors } from './formatErrors';

export default function routeHandler(controllerFn: RequestHandler) {
  return expressAsyncHandler(async function (req, res, next) {
    // deals with express-validator errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: formatErrors(errors.array()) });
    }
    return controllerFn(req, res, next);
  });
}
