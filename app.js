require("dotenv").config();

const express = require("express");
const app = express();
const port = 3000;

const sequelize = require("./src/config/database");

app.use(express.json());

const userRoutes = require("./src/routes/userRoutes");

app.use("/users", userRoutes);

sequelize
  .authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida com sucesso!");
    return sequelize.sync();
  })
  .then(() => {
    console.log("Banco de dados sincronizado com sucesso!");
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  })
  .catch((erro) => {
    console.error("Erro ao conectar ou sincronizar o banco de dados: ", erro);
  });
