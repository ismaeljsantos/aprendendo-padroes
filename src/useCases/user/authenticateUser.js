const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserRepository = require("../../repositories/userRepository");

class AuthenticateUserUseCase {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }
  async execute({ email, senha }) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("Usuário ou senha inválidos");
    }

    const isPasswordValid = await bcrypt.compare(senha, user.senha);
    if (!isPasswordValid) {
      throw new Error("Usuário ou senha inválidos");
    }

    const token = jwt.sign({ userId: user.id }, "so-jesus-salva", {
      expiresIn: "1d",
    });

    return { user, token };
  }
}

module.exports = AuthenticateUserUseCase;
