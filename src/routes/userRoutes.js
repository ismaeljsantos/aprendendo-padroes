// src/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const validateRequest = require("../middlewares/validateRequest");
const {
  createUserValidations,
  userIdValidations,
  updateUserValidations,
} = require("../validations/userValidations");

router.post(
  "/",
  createUserValidations,
  validateRequest,
  userController.createUser
);
router.get("/", userController.getAllUsers);
router.get(
  "/:id",
  userIdValidations,
  validateRequest,
  userController.getUserById
);
router.put(
  "/:id",
  authMiddleware,
  updateUserValidations,
  validateRequest,
  userController.updateUser
);
router.post("/login", userController.loginUser);

module.exports = router;
