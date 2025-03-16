class UpdateUserUseCase {
  constructor({ usersRepository, addressRepository }) {
    this.usersRepository = usersRepository;
    this.addressRepository = addressRepository;
  }
  async execute(userId, { userData, addressData }) {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }
    if (userData) {
      await this.usersRepository.update(userId, userData);
    }
    if (userData && addressData) {
      throw new Error("Alterar o CPF não é permitido");
    }
    if (addressData) {
      const address = await this.addressRepository.findByUserId(userId);
      if (address) {
        await this.addressRepository.update(address.id, addressData);
      } else {
        throw new Error("Endereço não encontrado para este usuário");
      }
    }
    return this.usersRepository.findById(userId);
  }
}

module.exports = UpdateUserUseCase;
