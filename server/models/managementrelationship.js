"use strict";
module.exports = (sequelize, DataTypes) => {
  const ManagementRelationship = sequelize.define(
    "ManagementRelationship",
    {
      admin: {
        type: DataTypes.STRING,
        unique: "compositeRelationshipRequirement"
      },
      player: {
        type: DataTypes.STRING,
        unique: "compositeRelationshipRequirement"
      }
    },
    {}
  );
  return ManagementRelationship;
};
