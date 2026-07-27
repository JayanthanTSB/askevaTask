'use strict';

const { body } = require('express-validator');

const DEPARTMENTS = [
  'Engineering', 'Marketing', 'Sales', 'Human Resources',
  'Finance', 'Operations', 'Design', 'Legal', 'Customer Support', 'Product',
];

const STATUS = ['active', 'inactive', 'on-leave'];

const createEmployeeValidation = [
  body('fullName')
    .trim().notEmpty().withMessage('Full name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Full name must be 2-100 characters'),

  body('email')
    .trim().notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),

  body('phone')
    .trim().notEmpty().withMessage('Phone number is required')
    .matches(/^[+\d\s\-()]{7,20}$/).withMessage('Please provide a valid phone number'),

  body('department')
    .trim().notEmpty().withMessage('Department is required')
    .isIn(DEPARTMENTS).withMessage('Invalid department'),

  body('designation')
    .trim().notEmpty().withMessage('Designation is required')
    .isLength({ min: 2, max: 100 }).withMessage('Designation must be 2-100 characters'),

  body('salary')
    .notEmpty().withMessage('Salary is required')
    .isNumeric().withMessage('Salary must be a number')
    .isFloat({ min: 0 }).withMessage('Salary cannot be negative'),

  body('status')
    .optional()
    .isIn(STATUS).withMessage('Invalid status'),

  body('joiningDate')
    .notEmpty().withMessage('Joining date is required')
    .isISO8601().withMessage('Please provide a valid date'),

  body('address')
    .optional().trim()
    .isLength({ max: 500 }).withMessage('Address cannot exceed 500 characters'),

  body('profileImage')
    .optional()
    .isURL().withMessage('Profile image must be a valid URL'),
];

const updateEmployeeValidation = [
  body('fullName').optional().trim()
    .isLength({ min: 2, max: 100 }).withMessage('Full name must be 2-100 characters'),

  body('email').optional().trim()
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),

  body('phone').optional().trim()
    .matches(/^[+\d\s\-()]{7,20}$/).withMessage('Please provide a valid phone number'),

  body('department').optional()
    .isIn(DEPARTMENTS).withMessage('Invalid department'),

  body('salary').optional()
    .isNumeric().withMessage('Salary must be a number')
    .isFloat({ min: 0 }).withMessage('Salary cannot be negative'),

  body('status').optional()
    .isIn(STATUS).withMessage('Invalid status'),

  body('joiningDate').optional()
    .isISO8601().withMessage('Please provide a valid date'),

  body('address').optional().trim()
    .isLength({ max: 500 }).withMessage('Address cannot exceed 500 characters'),
];

module.exports = { createEmployeeValidation, updateEmployeeValidation };
