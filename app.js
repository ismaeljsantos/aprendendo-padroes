require("dotenv").config();

const express = require("express");
const routes = require("./src/routes");
const sequelize = require("./src/config/database");

// Importar os modelos
const UserModel = require("./src/infrastructure/models/UserModel");
const AddressModel = require("./src/infrastructure/models/AddressModel");
const CategoryModel = require("./src/infrastructure/models/CategoryModel");
const UserCategoryModel = require("./src/infrastructure/models/UserCategoryModel");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(routes);

// Validação de variáveis de ambiente
const requiredEnvVars = ["DB_NAME", "DB_USER", "DB_PASS", "DB_HOST", "DB_PORT"];
requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`A variável de ambiente: ${key} está faltando.`);
  }
});

// Configuração das associações entre os modelos
UserModel.associate({ AddressModel, CategoryModel, UserCategoryModel });
CategoryModel.associate({ UserModel, UserCategoryModel });

// Conexão e sincronização com o banco de dados
sequelize
  .authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida com sucesso!");
    const isDev = process.env.NODE_ENV === "development";
    return sequelize.sync({ alter: isDev }); // Atualiza tabelas sem destruir dados em desenvolvimento
  })
  .then(() => {
    console.log("Banco de dados sincronizado com sucesso!");
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  })
  .catch((error) => {
    console.error(
      "Erro ao conectar ou sincronizar o banco de dados: ",
      error.message
    );
    console.error(error.stack);
  });

// Middleware global para tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Ocorreu um erro no servidor" });
});
