// src/repositories/UserRepository.js
const UserModel = require("../infrastructure/models/UserModel");

class UserRepository {
  async create(user) {
    const createdUser = await UserModel.create(user);
    return createdUser;
  }

  async findByEmail(email) {
    return await UserModel.findOne({ where: { email } });
  }

  async findById(id) {
    return await UserModel.findByPk(id);
  }

  async getAll() {
    return await UserModel.findAll();
  }
}

module.exports = new UserRepository();
