// src/routes/addressRoutes.js
const express = require("express");
const router = express.Router();

const AddressController = require("../controllers/addressController");
const { createAddressValidations } = require("../validations/addressValidator");
const validateRequest = require("../middlewares/validateRequest");

// Rota para criar um endereço
router.post(
  "/",
  createAddressValidations,
  validateRequest,
  AddressController.addAddress
);

// Rota para atualizar um endereço por ID
router.put("/:id", AddressController.updateAddress);

// Rota para listar todos os endereços
router.get("/", AddressController.getAllAddresses);

// Rota para buscar um endereço por ID
router.get("/:id", AddressController.getAddressById);

module.exports = router;
