const configServices = require("../services/categoryDrawService");

const addCategory = async (req, res) => {
  try {
    const { name, singleDigitKey } = req.body;
    const category = await configServices.createCategory(name, singleDigitKey);
    
    return res.json({ status: true, data: category, err: {} });
  } catch (error) {
    return res.json({ status: false, data: {}, err: error.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await configServices.getAllCategories();
    return res.json({ status: true, data: categories, err: {} });
  } catch (error) {
    return res.json({ status: false, data: {}, err: error.message });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await configServices.getCategoryById(req.params.id);
    if (!category) {
      return res.json({ status: false, data: {}, err: "Category not found" });
    }
    return res.json({ status: true, data: category, err: {} });
  } catch (error) {
    return res.json({ status: false, data: {}, err: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    await configServices.deleteCategory(req.params.id);
    return res.json({ status: true, message: "Category deleted successfully", err: {} });
  } catch (error) {
    return res.json({ status: false, data: {}, err: error.message });
  }
};

const addSubCategory = async (req, res) => {
  try {
    const {name,ID} = req.body;
    const categoryId = req.params.id;
    const subCategory = await configServices.createSubCategory(name, ID, categoryId);
    return res.json({ status: true, data: subCategory, err: {} });
  } catch (error) {
    return res.json({ status: false, data: {}, err: error.message });
  }
};

const getAllSubCategories = async (req, res) => {
  try {
    
    const subCategories = await configServices.getAllSubCategories(req.params.id);
    return res.json({ status: true, data: subCategories, err: {} });
  } catch (error) {
    return res.json({ status: false, data: {}, err: error.message });
  }
};

const getSubCategoryById = async (req, res) => {
  try {
    const subCategory = await configServices.getSubCategoryById(req.params.id);
    if (!subCategory) {
      return res.json({ status: false, data: {}, err: "SubCategory not found" });
    }
    return res.json({ status: true, data: subCategory, err: {} });
  } catch (error) {
    return res.json({ status: false, data: {}, err: error.message });
  }
};

const deleteSubCategory = async (req, res) => {
  try {
    await configServices.deleteSubCategory(req.params.id);
    return res.json({ status: true, message: "SubCategory deleted successfully", err: {} });
  } catch (error) {
    return res.json({ status: false, data: {}, err: error.message });
  }
};

module.exports = {
  addCategory,
  getAllCategories,
  getCategoryById,
  deleteCategory,
  addSubCategory,
  getAllSubCategories,
  getSubCategoryById,
  deleteSubCategory,
};
