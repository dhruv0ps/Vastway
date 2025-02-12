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
      .populate("previousDraw", "title drawDate")
      .sort({ createdAt: -1 });
      
  },

  async getDrawById(id) {
    return await Draw.findById(id)
      .populate("category", "name")
      .populate("subCategories", "name")
      .populate("nocCodes")
      .populate("previousDraw", "title drawDate");
  },
  async getDrawByLinkEdit(id) {
    try {
     
      const draw = await Draw.findOne({ linkEdit: id })
        .populate("category", "name")
        .populate("subCategories", "name")
        .populate("nocCodes")
        .populate("previousDraw", "title drawDate");
  
      if (!draw) {
        return null; 
      }
  
     
      const relatedDraws = await Draw.find({
        category: draw.category?._id,
        _id: { $ne: draw._id }, 
      })
        .populate("subCategories", "name")
  
      return {
        draw,
        relatedDraws,
      };
    } catch (error) {
      console.error("Error fetching draw by linkEdit:", error);
      throw new Error("Error fetching draw details.");
    }
  }
,  


  async updateDraw(id, drawData) {
    return await Draw.findByIdAndUpdate(id, drawData, { new: true });
  },

  async deleteDraw(id) {
    return await Draw.findByIdAndDelete(id);
  },
};

module.exports = drawService;
