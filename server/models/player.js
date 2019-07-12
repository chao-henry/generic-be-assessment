"use strict";

import uuid from "uuid/v4";

module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define("Player", {
    first_name: {
      type: DataTypes.STRING,
      unique: "compositeNameRequirement"
    },
    last_name: {
      type: DataTypes.STRING,
      unique: "compositeNameRequirement"
    },
    rating: DataTypes.INTEGER,
    handedness: DataTypes.STRING
  });
  Player.beforeCreate((player, _) => {
    return (player.id = uuid());
  });
  return Player;
};
