"use strict";

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn("previsoes", "alfa", {
        type: Sequelize.DOUBLE,
        allowNull: true,
      }),
      queryInterface.addColumn("previsoes", "beta", {
        type: Sequelize.DOUBLE,
        allowNull: true,
      }),
    ]);
  },

  down: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn("previsoes", "alfa"),
      queryInterface.removeColumn("previsoes", "beta"),
    ]);
  },
};
