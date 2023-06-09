"use strict";

import { DataTypes, UUIDV4 } from "sequelize";
import { DataType, Model, Sequelize } from "sequelize";

interface UserAttributes {
  id: string;
  name: string;
  email: string;
  password: string;
}

export default (
  sequelize: Sequelize,
  DataTypes: { [key: string]: DataType }
) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    name!: string;
    email!: string;
    password!: string;

    static associate(models: any) {
      // define association here
      User.hasMany(models.Bracket);
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
