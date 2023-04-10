import fs from "node:fs";
import url from "node:url";
import path from "node:path";
import { DataTypes, Model, Options, Sequelize } from "sequelize";
import process from "process";
import configs from "../config/config.js";

type ModelRegistry = { [name: string]: AssociativeModel };

interface AssociativeModel extends Model {
  associate(reg: ModelRegistry): void;
}

interface ModelInitializer {
  (seq: Sequelize, dt: DataTypes): AssociativeModel;
  name: string;
}

const env = process.env.NODE_ENV || "development";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = new URL(".", import.meta.url);
const basename = path.basename(__filename);

const config = configs[env];

class DataBase {
  sequelize: Sequelize;
  models: ModelRegistry;
  Sequelize: typeof Sequelize;

  constructor() {
    this.sequelize = new Sequelize(
      config.database!,
      config.username!,
      config.password!,
      config as Options
    );
    this.Sequelize = Sequelize;
    this.models = {};
    this.init();
  }

  private init() {
    // read all models first
    fs.readdirSync(__dirname)
      .filter((file) => {
        return (
          file.indexOf(".") !== 0 &&
          file !== basename &&
          file.slice(-3) === ".js" &&
          file.indexOf(".test.js") === -1
        );
      })
      .forEach(async (file: string) => {
        const { default: model } = await import(`./${file}`);
        this.models[model.name] = model(sequelize, DataTypes);
      });
    this.createAssociations();
  }

  private createAssociations() {
    Object.keys(this.models).forEach((name) => {
      this.models[name]?.associate(this.models);
    });
  }
}
const sequelize = new Sequelize(
  config.database!,
  config.username!,
  config.password!,
  config as Options
);

export default new DataBase();
