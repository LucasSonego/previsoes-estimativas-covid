"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("boletins", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      municipio: {
        type: Sequelize.STRING,
        allowNull: false,
        references: { model: "municipios", key: "nome" },
      },
      casos: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      obitos: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      recuperados: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      investigacao: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      dia: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  down: async queryInterface => {
    return queryInterface.dropTable("boletins");
  },
};
