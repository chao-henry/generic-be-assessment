require('dotenv').config();

const pool_config = {
  min: 0,
  max: 10,
  acquire: 30000,
  idle: 10000,
  evict: 1000
};

module.exports = {
  test: {
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    dialect: 'postgres',
    pool: pool_config
  },
  development: {
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    dialect: 'postgres',
    pool: pool_config
  },
  production: {
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    dialect: 'postgres',
    pool: pool_config
  }
};
