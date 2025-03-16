// src/useCases/user/getUserById.js
const crypto = require("crypto");

class GetUserByIdUseCase {
  constructor({ usersRepository }) {
    this.usersRepository = usersRepository;
  }
  decryptCpf(encryptedCpf, iv) {
    const key = crypto.scryptSync("so-jesus-salva", "salt", 32);
    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      key,
      Buffer.from(iv, "hex")
    );

    let decrypted = decipher.update(encryptedCpf, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  }

  async execute(userId) {
    console.log("Buscando usuário com ID:", userId);
    const user = await this.usersRepository.findById(userId);

    console.log("Usuário encontrado:", user);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    console.log("CPF Criptografado:", user.cpf);
    console.log("IV:", user.cpfIv);

    const decryptedCpf = this.decryptCpf(user.cpf, user.cpfIv);

    console.log("CPF Descriptografado:", decryptedCpf);
    return { ...user, cpf: decryptedCpf };
  }
}

module.exports = GetUserByIdUseCase;
