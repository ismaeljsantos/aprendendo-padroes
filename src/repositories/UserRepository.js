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
      raw: true,
      nest: true,
    });
  }

  async getAll() {
    return await UserModel.findAll({
      attributes: { exclude: ["senha"] },
      include: [
        {
          model: AddressModel,
          as: "endereco",
        },
      ],
    });
  }

  async update(userId, updatedData) {
    const [rowsUpdated] = await UserModel.update(updatedData, {
      where: { id: userId },
    });
    return rowsUpdated;
  }
}

module.exports = new UserRepository();
