import Sequelize from "sequelize";
import databaseConfig from "../config/database";

import Cities from "../app/models/Cities";
import Reports from "../app/models/Reports";

const models = [Cities, Reports];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
    models.map(
      model => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();
