const UserRepository = require("../repositories/UserRepository");
const AddressRepository = require("../repositories/AddressRepository");
const CreateUserUseCase = require("../useCases/user/createUser");
const GetAllUsersUseCase = require("../useCases/user/getAllUsers");
const UpdateUserUseCase = require("../useCases/user/updateUser");

const createUserUseCase = new CreateUserUseCase({
  usersRepository: UserRepository,
});
const getAllUsersUseCase = new GetAllUsersUseCase({
  usersRepository: UserRepository,
});
const updateUserUseCase = new UpdateUserUseCase({
  usersRepository: UserRepository,
  addressRepository: AddressRepository,
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

  async updateUser(req, res) {
    try {
      const userId = req.params.id;
      const { userData, addressData } = req.body;
      const updatedUser = await updateUserUseCase.execute(userId, {
        userData,
        addressData,
      });
      return res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new UserController();
