'use strict';

const mongoose = require('mongoose');
const config = require('../config');




const connectDB = async () => {
  mongoose.connection.on('connected', () => {
    console.log('✅ MongoDB connected successfully');
  });

  mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('⚠️  MongoDB disconnected');
  });

  await mongoose.connect(config.mongo.uri, {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
  });
};

const disconnectDB = async () => {
  await mongoose.connection.close();
  console.log('🔌 MongoDB disconnected gracefully');
};

module.exports = { connectDB, disconnectDB };
