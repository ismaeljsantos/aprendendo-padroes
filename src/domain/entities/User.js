class User {
  constructor({ id, nome, email, dataNascimento, cpf, senha }) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.dataNascimento = dataNascimento;
    this.cpf = cpf;
    this.senha = senha;
  }
}

module.exports = User;
