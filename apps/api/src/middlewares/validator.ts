import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export const validateRegister = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().notEmpty().withMessage('Invalid email format!'),
  body('password')
    .isLength({ min: 6 })
    .notEmpty()
    .withMessage('Password is required'),
  body('referCode').optional(),
  body('role').isIn(['CUSTOMER', 'ORGANIZER', 'ADMIN']),

  (req: Request, res: Response, next: NextFunction) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).send({
        status: 'error',
        msg: error.array(),
      });
    }
    next();
  },
];
