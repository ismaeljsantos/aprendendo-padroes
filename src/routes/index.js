// src/routes/index.js
const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const addressRoutes = require("./addressRoutes");

router.use("/addresses", addressRoutes);
router.use("/users", userRoutes);

module.exports = router;
