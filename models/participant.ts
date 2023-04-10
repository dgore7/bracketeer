import { Model } from "sequelize";
import type { DataTypes, Sequelize } from "sequelize";

export default function (sequelize: Sequelize, dt: DataTypes) {
  class Participant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }
  Participant.init(
    {
      name: dt.TEXT,
      seed: dt.NUMBER,
      rating: dt.NUMBER,
    },
    {
      sequelize,
      modelName: "Participant",
    }
  );
  return Participant;
}
