const { v4: uuidv4 } = require("uuid");
const User = require("../../domain/entities/User");
const Address = require("../../domain/entities/Address");
const AddressRepository = require("../../repositories/AddressRepository");

class CreateUserUseCase {
  constructor({ usersRepository }) {
    this.usersRepository = usersRepository;
  }
  async execute({ nome, email, dataNascimento, cpf, senha, endereco }) {
    console.log(this.usersRepository);
    const existingUser = await this.usersRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("Este email não pode ser utilizado");
    }
    const id = uuidv4();

    const userEntity = new User({
      id,
      nome,
      email,
      dataNascimento,
      cpf,
      senha,
    });

    const userToPersist = {
      id: userEntity.id,
      nome: userEntity.nome,
      email: userEntity.email,
      dataNascimento: userEntity.dataNascimento,
      cpf: userEntity.cpf,
      senha: userEntity.senha,
    };

    const createdUser = await this.usersRepository.create(userToPersist);

    const AddressEntity = new Address({
      id: uuidv4(),
      user_id: createdUser.id,
      cep: endereco.cep,
      rua: endereco.rua,
      numero: endereco.numero,
      bairro: endereco.bairro,
      cidade: endereco.cidade,
      estado: endereco.estado,
    });

    const addressToPersist = {
      id: AddressEntity.id,
      user_id: AddressEntity.user_id,
      cep: AddressEntity.cep,
      rua: AddressEntity.rua,
      numero: AddressEntity.numero,
      bairro: AddressEntity.bairro,
      cidade: AddressEntity.cidade,
      estado: AddressEntity.estado,
    };

    await AddressRepository.create(addressToPersist);

    return createdUser;
  }
}

module.exports = CreateUserUseCase;
