const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Address = sequelize.define(
  "Address",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    logradouro: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numero: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    complemento: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bairro: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cidade: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING(2), // UF
      allowNull: false,
    },
    cep: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    tableName: "addresses",
    timestamps: true,
  }
);

module.exports = Address;
