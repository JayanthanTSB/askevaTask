'use strict';

require('dotenv').config();

const app = require('./app');
const config = require('./config');
const { connectDB, disconnectDB } = require('./database/connection');


const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(config.port, () => {
      console.log(
        `🚀 Server running in ${config.env} mode on http://localhost:${config.port}`,
      );
    });

    
    const shutdown = async (signal) => {
      console.log(`\n🛑 ${signal} received. Shutting down gracefully...`);
      server.close(async () => {
        await disconnectDB();
        console.log('✅ Process exited cleanly.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

    process.on('unhandledRejection', (reason) => {
      console.error('❌ Unhandled Rejection:', reason);
      server.close(() => process.exit(1));
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
