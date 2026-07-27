'use strict';






function requireEnv(key) {
  const value = process.env[key];
  if (!value) {
    throw new Error(`[Config] Missing required environment variable: ${key}`);
  }
  return value;
}

const config = {
  env: process.env.NODE_ENV ?? 'development',
  port: parseInt(process.env.PORT ?? '5000', 10),

  mongo: {
    uri: requireEnv('MONGODB_URI'),
  },

  jwt: {
    secret: requireEnv('JWT_SECRET'),
    expiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
    refreshSecret: requireEnv('JWT_REFRESH_SECRET'),
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? '30d',
  },

  cors: {
    origin: process.env.CLIENT_URL ?? 'http://localhost:5173',
  },

  cookie: {
    secret: process.env.COOKIE_SECRET ?? 'fallback_cookie_secret',
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
  },

  isDev: process.env.NODE_ENV !== 'production',
};

module.exports = config;
