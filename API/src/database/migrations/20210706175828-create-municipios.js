"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("municipios", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      populacao: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },

  down: async queryInterface => {
    return queryInterface.dropTable("municipios");
  },
};
