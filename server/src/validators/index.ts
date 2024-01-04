import { body } from 'express-validator';

export const registerValidators = [
  body('email')
    .isEmail()
    .withMessage('Email is invalid')
    .not()
    .isEmpty()
    .withMessage('Email is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password is too short')
    .not()
    .isEmpty()
    .withMessage('Password is required'),
];
