const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const UserModel = sequelize.define(
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

// Relacionamentos
UserModel.associate = (models) => {
  UserModel.hasOne(models.AddressModel, {
    foreignKey: "userId",
    as: "endereco",
  });
  UserModel.belongsToMany(models.CategoryModel, {
    through: models.UserCategoryModel,
    as: "categorias",
  });
};

module.exports = UserModel;
