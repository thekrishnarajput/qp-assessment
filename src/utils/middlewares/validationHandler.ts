import { body, check } from 'express-validator';

export const validator = {
    email: body('email').notEmpty().withMessage('Email address is required!').isEmail().withMessage('Email address is invalid!'),
    mobileNumber: body('mobileNumber').notEmpty().withMessage('Mobile number is required!').isMobilePhone('any', { strictMode: false }).withMessage('Mobile number is invalid!'),
    password: body('password').notEmpty().withMessage('Password is required!').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long!'),
    adminPassword: body('password').notEmpty().withMessage('Password is required!').isLength({ min: 4 }).withMessage('Password must be at least 8 characters long!'),
    firstName: body('firstName').notEmpty().withMessage('First name is required!').isLength({ min: 2 }).withMessage('First name must be at least 2 characters long!'),
    lastName: body('lastName').notEmpty().withMessage('Last name is required!').isLength({ min: 2 }).withMessage('Last name must be at least 2 characters long!'),
    role: body('role').notEmpty().withMessage('Role is required!').isIn(['admin', 'user']),
}