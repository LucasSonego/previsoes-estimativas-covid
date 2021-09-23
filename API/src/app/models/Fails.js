import Sequelize, { Model } from "sequelize";

class Fails extends Model {
  static init(sequelize) {
    super.init(
      {
        data: Sequelize.STRING,
        dataOffset: Sequelize.STRING,
      },
      { sequelize, tableName: "falhas", timestamps: false }
    );
  }
  static associate(models) {
    this.hasOne(models.Cities, {
      foreignKey: "municipio",
      as: "municipio_previsao_falha",
    });
  }
}

export default Fails;
