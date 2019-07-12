"use strict";
module.exports = (sequelize, DataTypes) => {
  const ManagementRelationship = sequelize.define("ManagementRelationship", {
    adminUUID: {
      type: DataTypes.UUID,
      unique: "compositeRelationshipRequirement"
    },
    playerUUID: {
      type: DataTypes.UUID,
      unique: "compositeRelationshipRequirement"
    }
  });

  return ManagementRelationship;
};
