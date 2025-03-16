// src/middlewares/validateRequest.js
const { body, param } = require("express-validator");

const createUserValidations = [
  body("email").isEmail().withMessage("E-mail inválido"),
  body("cpf").isLength({ min: 11, max: 14 }).withMessage("CPF inválido"),
];

const userIdValidations = [param("id").isUUID().withMessage("ID inválido")];

const updateUserValidations = [
  body("email").optional().isEmail().withMessage("E-mail inválido"),
  body("cpf")
    .optional()
    .isLength({ min: 11, max: 14 })
    .withMessage("CPF inválido"),
];

module.exports = {
  createUserValidations,
  userIdValidations,
  updateUserValidations,
};
