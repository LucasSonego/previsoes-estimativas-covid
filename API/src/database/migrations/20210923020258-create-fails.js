"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("falhas", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      municipio: {
        type: Sequelize.STRING,
        allowNull: false,
        references: { model: "municipios", key: "nome" },
      },
      data: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      data_offset: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  down: async queryInterface => {
    return queryInterface.dropTable("falhas");
  },
};
