const express = require("express");
const CategoryController = require("../controllers/categoryController");

const router = express.Router();

router.post("/", CategoryController.createCategory);

module.exports = router;
