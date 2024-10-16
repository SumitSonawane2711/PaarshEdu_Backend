// database.js
import { Sequelize } from 'sequelize';
import { DB_NAME } from '../constants.js';

import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create a new instance of Sequelize
const sequelize = new Sequelize(
  DB_NAME, // Database name
  process.env.DB_USER, // Username
  process.env.DB_PASSWORD, // Password
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql'
});

// Connect to the database
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(`\n MySQL connected!! DB HOST: ${process.env.DB_HOST}`);
  } catch (error) {
    console.error('MySQL connection FAILED: ', error);
    process.exit(1);
  }
};

export { sequelize, connectDB };
