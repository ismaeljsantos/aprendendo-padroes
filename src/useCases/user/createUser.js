const { v4: uuidv4 } = require("uuid");
const User = require("../../domain/entities/User");
const Address = require("../../domain/entities/Address");
const AddressRepository = require("../../repositories/AddressRepository");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

function encryptCpf(cpf) {
  const key = crypto.scryptSync("so-jesus-salva", "salt", 32);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

  let encrypted = cipher.update(cpf, "utf8", "hex");
  encrypted += cipher.final("hex");

  return { encryptedCpf: encrypted, iv: iv.toString("hex") };
}

class CreateUserUseCase {
  constructor({ usersRepository }) {
    this.usersRepository = usersRepository;
  }
  async execute({ nome, email, dataNascimento, cpf, senha, endereco }) {
    //console.log(this.usersRepository);
    const existingUser = await this.usersRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("Este email não pode ser utilizado");
    }
    const id = uuidv4();
    const hashedPassword = await bcrypt.hash(senha, 10);
    const { encryptedCpf, iv } = encryptCpf(cpf);

    const userEntity = new User({
      id,
      nome,
      email,
      dataNascimento,
      cpf: encryptedCpf,
      cpfIv: iv,
      senha: hashedPassword,
    });

    const userToPersist = {
      id: userEntity.id,
      nome: userEntity.nome,
      email: userEntity.email,
      dataNascimento: userEntity.dataNascimento,
      cpf: userEntity.cpf,
      cpfIv: userEntity.cpfIv,
      senha: userEntity.senha,
    };

    const createdUser = await this.usersRepository.create(userToPersist);

    //console.log("endereco recebido:", endereco);

    const AddressEntity = new Address({
      id: uuidv4(),
      userId: createdUser.id,
      cep: endereco.cep,
      logradouro: endereco.logradouro,
      numero: endereco.numero,
      bairro: endereco.bairro,
      cidade: endereco.cidade,
      estado: endereco.estado,
    });

    const addressToPersist = {
      id: AddressEntity.id,
      userId: AddressEntity.userId,
      cep: AddressEntity.cep,
      logradouro: AddressEntity.logradouro,
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
