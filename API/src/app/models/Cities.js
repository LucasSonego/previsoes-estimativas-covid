import Sequelize, { Model } from "sequelize";

class Cities extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        populacao: Sequelize.INTEGER,
      },
      { sequelize, tableName: "municipios" }
    );
  }
  static associate(models) {
    this.hasMany(models.Reports, {
      foreignKey: "municipio",
      as: "boletins",
    });
    this.hasMany(models.Predictions, {
      foreignKey: "municipio",
      as: "previsoes",
    });
  }
}

export default Cities;
