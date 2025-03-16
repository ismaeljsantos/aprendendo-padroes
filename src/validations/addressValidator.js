// src/validations/addressValidator.js
const { body } = require("express-validator");

const createAddressValidations = [
  body("cep").isLength({ min: 8, max: 9 }).withMessage("CEP inválido"),
  body("cidade").notEmpty().withMessage("cidade é obrigatória"),
  body("estado")
    .isLength({ min: 2, max: 2 })
    .withMessage("estado é obrigatório"),
];
module.exports = { createAddressValidations };
