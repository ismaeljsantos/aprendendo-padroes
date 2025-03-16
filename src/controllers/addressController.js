const AddressRepository = require("../repositories/AddressRepository");
const validarCep = require("../utils/cepValidator");

class AddressController {
  async addAddress(req, res) {
    try {
      const {
        userId,
        cep,
        logradouro,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
      } = req.body;

      if (!validarCep(cep)) {
        return res
          .status(400)
          .json({ error: "CEP inválido. Verifique o formato." });
      }

      const address = await AddressRepository.create({
        userId,
        cep,
        logradouro,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
      });

      return res.status(201).json(address);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateAddress(req, res) {
    try {
      const addressId = req.params.id;
      const { cep, logradouro, numero, complemento, bairro, cidade, estado } =
        req.body;

      if (!validarCep(cep)) {
        return res
          .status(400)
          .json({ error: "CEP inválido. Verifique o formato." });
      }

      const updateRows = await AddressRepository.update(addressId, {
        cep,
        logradouro,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
      });

      if (updateRows === 0) {
        return res.status(404).json({ error: "Endereço não encontrado." });
      }

      return res
        .status(200)
        .json({ message: "Endereço atualizado com sucesso." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllAddresses(req, res) {
    try {
      const addresses = await AddressRepository.getAll();
      return res.json(addresses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAddressById(req, res) {
    try {
      const addressId = req.params.id;
      const address = await AddressRepository.findByUserId(addressId);

      if (!address) {
        return res.status(404).json({ error: "Endereço não encontrado." });
      }

      return res.json(address);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

// Certifique-se de exportar uma nova instância da classe
module.exports = new AddressController();
