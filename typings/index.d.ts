import { DataType, Sequelize } from "sequelize";

declare module "sequelize" {
  export type DataTypes = Record<string, DataType>;
}
