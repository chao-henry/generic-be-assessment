"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;

    return queryInterface
      .createTable("Players", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
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
      })
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
