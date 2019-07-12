"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;

    return queryInterface
      .createTable(
        "Players",
        {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID
          },
          first_name: {
            type: Sequelize.STRING
          },
          last_name: {
            type: Sequelize.STRING
          },
          rating: {
            type: Sequelize.INTEGER
          },
          handedness: {
            type: Sequelize.STRING
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
          }
        },
        {
          uniqueKeys: {
            compositeNameRequirement: {
              fields: ["first_name", "last_name"]
            }
          }
        }
      )
      .then(() =>
        queryInterface.addConstraint("Players", ["handedness"], {
          type: "check",
          where: {
            [Op.or]: [
              {
                handedness: {
                  [Op.eq]: "left"
                },
                handedness: {
                  [Op.eq]: "right"
                }
              }
            ]
          }
        })
      );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Players");
  }
};
