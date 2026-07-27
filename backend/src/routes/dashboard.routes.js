'use strict';

const { Router } = require('express');
const { getDashboardStats } = require('../controllers/dashboard.controller');
const { protect } = require('../middleware/auth');

const router = Router();

router.get('/stats', protect, getDashboardStats);

module.exports = router;
