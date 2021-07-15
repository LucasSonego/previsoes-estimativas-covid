"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("previsoes", {
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
      previsoes: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      data: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      data_offset: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("previsoes");
  },
};
