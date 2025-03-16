const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const UserMoldel = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    dataNascimento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    cpfIv: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "O campo cpfIv não pode ser nulo" },
      },
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

const AddressModel = require("./AddressModel");
UserMoldel.hasOne(AddressModel, { foreignKey: "userId", as: "endereco" });
AddressModel.belongsTo(UserMoldel, { foreignKey: "userId", as: "usuario" });

module.exports = UserMoldel;
