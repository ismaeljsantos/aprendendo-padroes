const UserRepository = require("../repositories/UserRepository");
const CreateUserUseCase = require("../useCases/user/createUser");
const GetAllUsersUseCase = require("../useCases/user/getAllUsers");

const createUserUseCase = new CreateUserUseCase({
  usersRepository: UserRepository,
});
const getAllUsersUseCase = new GetAllUsersUseCase({
  usersRepository: UserRepository,
});

class UserController {
  async createUser(req, res) {
    try {
      const { nome, email, dataNascimento, cpf, senha, endereco } = req.body;
      const user = await createUserUseCase.execute({
        nome,
        email,
        dataNascimento,
        cpf,
        senha,
        endereco,
      });
      return res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  async getAllUsers(req, res) {
    try {
      const users = await getAllUsersUseCase.execute();
      res.json(users);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new UserController();
