"use strict";

import fs from "fs";
import path from "path";
import { DataTypes, Model, ModelDefined, ModelStatic, Options, Sequelize } from "sequelize";
import process from "process";
import configs from "../config/config.js";
const env = process.env.NODE_ENV || "development";
const basename = path.basename(__filename);
const db: DB = {};
const config = configs[env];

interface DB {
    sequelize?: Sequelize
    Sequelize?: typeof Sequelize 
    [key: string] : Model | any
}


let sequelize: Sequelize;
sequelize = new Sequelize(
  config.database!,
  config.username!,
  config.password!,
  config as Options
);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach(async <T extends Model> (file: string) => {
    const model: (arg: Sequelize, arg2 : typeof DataTypes) => T = await import(`./${file}`)
    
    db[model.name as string] = model(
        sequelize,
        DataTypes
      );
  });

Object.keys(db).forEach((modelName) => {
  if ("associate" in db[modelName]) {
    db[modelName]?.associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
