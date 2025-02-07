const Draw = require("../config/models/drawModel");
const Category = require("../config/models/categoryModel");
const SubCategory = require("../config/models/subcategories");

const drawService = {
  async createDraw(drawData) {
    try {
      const categoryExists = await Category.findById(drawData.category);
      if (!categoryExists) throw new Error("Category not found");

      const validSubCategories = await SubCategory.find({ _id: { $in: drawData.subCategories } });
      if (validSubCategories.length !== drawData.subCategories.length) {
        throw new Error("Some subcategories are invalid");
      }

      const draw = new Draw(drawData);
      return await draw.save();
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async getAllDraws() {
    return await Draw.find()
      .populate("category")
      .populate("subCategories")
      .populate("nocCodes")
      .populate("previousDraw", "title drawDate");
  },

  async getDrawById(id) {
    return await Draw.findById(id)
      .populate("category", "name")
      .populate("subCategories", "name")
      .populate("nocCodes")
      .populate("previousDraw", "title drawDate");
  },

  async updateDraw(id, drawData) {
    return await Draw.findByIdAndUpdate(id, drawData, { new: true });
  },

  async deleteDraw(id) {
    return await Draw.findByIdAndDelete(id);
  },
};

module.exports = drawService;
