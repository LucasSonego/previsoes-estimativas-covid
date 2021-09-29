import Sequelize, { Model } from "sequelize";

class Predictions extends Model {
  static init(sequelize) {
    super.init(
      {
        previsoes: Sequelize.STRING,
        data: Sequelize.STRING,
        dataOffset: Sequelize.STRING,
        alfa: Sequelize.DOUBLE,
        beta: Sequelize.DOUBLE,
      },
      { sequelize, tableName: "previsoes" }
    );
  }
  static associate(models) {
    this.hasOne(models.Cities, {
      foreignKey: "municipio",
      as: "municipio_previsao",
    });
  }
}

export default Predictions;
