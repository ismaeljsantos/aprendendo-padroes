const CategoryModel = require("../infrastructure/models/UserCategoryModel");

class CategoryController {
  static async createCategory(req, res) {
    try {
      const { nome } = req.body;

      if (!nome) {
        return res.status(400).json({ error: "O campo 'nome' é obrigatório." });
      }

      const existingCategory = await CategoryModel.findOne({ where: { nome } });
      if (existingCategory) {
        return res.status(400).json({ error: "Categoria já existe." });
      }

      const newCategory = await CategoryModel.create({ nome });
      return res.status(201).json({
        message: "Categoria criada com sucesso.",
        data: newCategory,
      });
    } catch (error) {
      console.error("Erro ao criar categoria:", error.message);
      res.status(500).json({ error: "Erro ao criar categoria." });
    }
  }
}
module.exports = CategoryController;
