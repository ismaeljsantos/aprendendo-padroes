const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const UserCategoryModel = sequelize.define(
  "UserCategory",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users", // Nome correto da tabela referenciada
        key: "id",
      },
      onDelete: "CASCADE",
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "categorias", // Nome correto da tabela referenciada
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "user_categories", // Nome da tabela intermediária
    timestamps: true,
  }
);

module.exports = UserCategoryModel;
