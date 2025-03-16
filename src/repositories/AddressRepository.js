// src/repositories/AddressRepository.js
const AddressModel = require("../infrastructure/models/AddressModel");

class AddressRepository {
  async create(address) {
    return await AddressModel.create(address);
  }
  async findByUserId(userId) {
    return await AddressModel.findOne({ where: { userId } });
  }
  async update(addressId, updatedData) {
    const [rowsUpdated] = await AddressModel.update(updatedData, {
      where: { id: addressId },
    });
    return rowsUpdated;
  }
  async getAll() {
    return await AddressModel.findAll();
  }
}

module.exports = new AddressRepository();
