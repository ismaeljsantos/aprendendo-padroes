// src/controllers/userController.js
const AuthenticateUserUseCase = require("../useCases/user/authenticateUser");
const UserRepository = require("../repositories/userRepository");
const AddressRepository = require("../repositories/AddressRepository");
const CreateUserUseCase = require("../useCases/user/createUser");
const GetAllUsersUseCase = require("../useCases/user/getAllUsers");
const UpdateUserUseCase = require("../useCases/user/updateUser");
const GetUserByIdUseCase = require("../useCases/user/getUserById");

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
const authenticateUserUseCase = new AuthenticateUserUseCase({
  userRepository: UserRepository,
});
const getUserByIdUseCase = new GetUserByIdUseCase({
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

  async loginUser(req, res) {
    try {
      const { email, senha } = req.body;
      const { user, token } = await authenticateUserUseCase.execute({
        email,
        senha,
      });
      return res.json({ user, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getUserById(req, res) {
    try {
      const userId = req.params.id;
      const user = await getUserByIdUseCase.execute(userId);

      const userData = user.get ? user.get({ plain: true }) : user;
      return res.json(userData);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new UserController();
