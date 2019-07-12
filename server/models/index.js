require("dotenv").config();

import Sequelize from "sequelize";

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// Model imports
const User = sequelize.import(__dirname + "/user");
const Player = sequelize.import(__dirname + "/player");
const ManagementRelationship = sequelize.import(
  __dirname + "/managementrelationship"
);

const db = {
  User,
  Player,
  ManagementRelationship,
  sequelize,
  Sequelize
};

module.exports = db;
