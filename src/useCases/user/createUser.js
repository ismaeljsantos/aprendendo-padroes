const { v4: uuidv4 } = require("uuid");
const User = require("../../domain/entities/User");

class CreateUserUseCase {
  constructor({ usersRepository }) {
    this.usersRepository = usersRepository;
  }
  async execute({ nome, email, dataNascimento, cpf, senha }) {
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
    return createdUser;
  }
}

module.exports = CreateUserUseCase;
