class GetAllUsersUseCase {
  constructor({ usersRepository }) {
    //console.log("Injected UserRepository:", usersRepository);
    this.usersRepository = usersRepository;
  }

  async execute() {
    return await this.usersRepository.getAll();
  }
}

module.exports = GetAllUsersUseCase;
