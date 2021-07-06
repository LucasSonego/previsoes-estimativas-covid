import Sequelize, { Model } from "sequelize";

class Reports extends Model {
  static init(sequelize) {
    super.init(
      {
        casos: Sequelize.INTEGER,
        obitos: Sequelize.INTEGER,
        recuperados: Sequelize.INTEGER,
        investigacao: Sequelize.INTEGER,
      },
      { sequelize, tableName: "boletins" }
    );
  }
  static associate(models) {
    this.hasOne(models.Cities, {
      foreignKey: "municipio",
      as: "municipio_de_origem",
    });
  }
}

export default Reports;
