'use strict';

const jwt = require('jsonwebtoken');
const config = require('../config');






const generateToken = (userId) => {
  return jwt.sign({ id: userId }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
};

module.exports = { generateToken };
