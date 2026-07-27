'use strict';

const { Router } = require('express');
const { register, login, logout, getMe } = require('../controllers/auth.controller');
const { loginValidation, registerValidation } = require('../validations/auth.validations');
const validate = require('../middleware/validate');
const { protect } = require('../middleware/auth');

const router = Router();

router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);

module.exports = router;
