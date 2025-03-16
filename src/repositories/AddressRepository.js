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
}

module.exports = new AddressRepository();
