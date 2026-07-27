'use strict';

const { Router } = require('express');
const {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employee.controller');
const {
  createEmployeeValidation,
  updateEmployeeValidation,
} = require('../validations/employee.validations');
const validate = require('../middleware/validate');
const { protect, authorize } = require('../middleware/auth');

const router = Router();


router.use(protect);

router.route('/')
  .get(getEmployees)
  .post(authorize('admin', 'hr'), createEmployeeValidation, validate, createEmployee);

router.route('/:id')
  .get(getEmployee)
  .put(authorize('admin', 'hr'), updateEmployeeValidation, validate, updateEmployee)
  .delete(authorize('admin'), deleteEmployee);

module.exports = router;
