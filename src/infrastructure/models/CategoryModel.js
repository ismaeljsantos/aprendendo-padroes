const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const CategoryModel = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: "O nome da categoria não pode estar vazio" },
        len: {
          args: [3, 100],
          msg: "O nome da categoria deve ter entre 3 e 100 caracteres",
        },
      },
    },
  },
  {
    tableName: "categorias",
    timestamps: true,
  }
);

// Associação será configurada no momento da inicialização
CategoryModel.associate = (models) => {
  CategoryModel.belongsToMany(models.UserModel, {
    through: models.UserCategoryModel,
    as: "usuarios",
  });
};

module.exports = CategoryModel;
