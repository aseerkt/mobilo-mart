import { ValidationError } from 'express-validator';

export function formatErrors(errors: ValidationError[]) {
  return errors.map(({ param, msg }) => ({ path: param, message: msg }));
}
