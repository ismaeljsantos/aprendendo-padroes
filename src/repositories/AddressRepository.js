const AddressModel = require("../infrastructure/models/AddressModel");

class AddressRepository {
  async create(address) {
    const createdAddress = await AddressModel.create(address);
    return createdAddress;
  }
  async findByUserId(userId) {
    return await AddressModel.findOne({ where: { userId } });
  }
}

module.exports = new AddressRepository();
