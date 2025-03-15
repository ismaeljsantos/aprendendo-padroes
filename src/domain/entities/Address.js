class Address {
  constructor({
    id,
    logradouro,
    numero,
    complemento,
    bairro,
    cidade,
    estado,
    cep,
    userId,
  }) {
    this.id = id;
    this.logradouro = logradouro;
    this.numero = numero;
    this.complemento = complemento;
    this.bairro = bairro;
    this.cidade = cidade;
    this.estado = estado;
    this.cep = cep;
    this.userId = userId;
  }
}

module.exports = Address;
