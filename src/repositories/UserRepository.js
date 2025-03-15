// src/repositories/UserRepository.js
const UserModel = require("../infrastructure/models/UserModel");
const AddressModel = require("../infrastructure/models/AddressModel");

class UserRepository {
  async create(user) {
    return await UserModel.create(user);
  }

  async findByEmail(email) {
    return await UserModel.findOne({ where: { email } });
  }

  async findById(id) {
    return await UserModel.findByPk(id, {
      include: [{ model: AddressModel, as: "endereco" }],
    });
  }

  async getAll() {
    return await UserModel.findAll({
      include: [
        {
          model: AddressModel,
          as: "endereco",
        },
      ],
    });
  }
}

module.exports = new UserRepository();
