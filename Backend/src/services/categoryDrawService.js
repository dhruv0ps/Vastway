const Category = require("../config/models/categoryModel");
const SubCategory = require("../config/models/subcategories");
const createCategory = async (name, singleDigitKey) => {
  try {
    console.log(name)
    const newCategory = new Category({ name, singleDigitKey });
    return await newCategory.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllCategories = async () => {
  try {
    return await Category.find();
  } catch (error) {
    throw new Error(error.message);
  }
};

const getCategoryById = async (id) => {
  try {
    return await Category.findById(id);
  } catch (error) {
    throw new Error("Category not found");
  }
};

const deleteCategory = async (id) => {
  try {
    return await Category.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Error deleting category");
  }
};

const createSubCategory = async (name, ID, categoryId) => {
  try {
    const category = await Category.findById(categoryId);
    if (!category) throw new Error("Category not found");

    const newSubCategory = new SubCategory({ name, ID, category: categoryId });
    return await newSubCategory.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

 const getAllSubCategories= async (id) => {
  try {
      const subCategories = await SubCategory.find({ category: id });
      return subCategories;
  } catch (error) {
      throw error;
  }
};

const getSubCategoryById = async (id) => {
  try {
    return await SubCategory.findById(id).populate("category");
  } catch (error) {
    throw new Error("SubCategory not found");
  }
};

const deleteSubCategory = async (id) => {
  try {
    return await SubCategory.findByIdAndUpdate(id, { status: "DELETED" }, { new: true });
  } catch (error) {
    throw new Error("Error deleting subcategory");
  }
};


module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  deleteCategory,
  createSubCategory,
  getAllSubCategories,
  getSubCategoryById,
  deleteSubCategory,
};
