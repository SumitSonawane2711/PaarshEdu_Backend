// database.js
import { Sequelize } from 'sequelize';
import { DB_NAME } from '../constants.js';

// Create a new instance of Sequelize
const sequelize = new Sequelize("paarsh", "root", "pass123", {
  host: "localhost",
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
