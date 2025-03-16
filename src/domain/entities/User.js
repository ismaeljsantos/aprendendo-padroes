// src/domain/entities/User.js
class User {
  constructor({ id, nome, email, dataNascimento, cpf, cpfIv, senha }) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.dataNascimento = dataNascimento;
    this.cpf = cpf;
    this.cpfIv = cpfIv;
    this.senha = senha;
  }
}

module.exports = User;
