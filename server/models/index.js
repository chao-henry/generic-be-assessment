require("dotenv").config();

import Sequelize from "sequelize";

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// Model imports
const User = sequelize.import(__dirname + "/user");

db.User = User;
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
