// src/routes/userRoutes.js
const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", authMiddleware, userController.updateUser);
router.post("/login", userController.loginUser);

module.exports = router;
