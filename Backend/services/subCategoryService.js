const asyncHandler = require("express-async-handler");

const subCategoryModel = require("../models/subCategoryModel");

const slugify = require("slugify");
const ApiError = require("../utils/apiError");
const { Result } = require("express-validator");

const addSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  const subCategory = await subCategoryModel.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ data: subCategory });
});

const deleteSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await subCategoryModel.findByIdAndDelete(id);

  if (!subCategory) {
    return next(new ApiError(`No SubCategory with id: ${id}`, 404));
  }
  res
    .status(204)
    .json({ data: subCategory, explain: "Category has been deleted" });
});

const searchSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await subCategoryModel.findById(id);
  if (!subCategory) {
    return next(new ApiError(`No SubCategory found: ${id}`, 404));
  }
  res.status(200).json({ data: subCategory });
});

const getAllSubCategories = asyncHandler(async (req, res, next) => {
  const subCategories = await subCategoryModel.find().sort({ _id: -1 });
  if (!subCategories) {
    return next(new ApiError(`No subcategories found`, 401));
  }
  res.status(200).json({
    results: subCategories.length,
    data: subCategories,
  });
});

const updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;
  const subCat = await subCategoryModel.findOneAndUpdate(
    { _id: id },
    { name, category: category, slug: slugify(name) },
    { new: true }
  );

  if (!subCat) {
    return next(new ApiError(`No SubCategory for this id : ${id}`, 404));
  }
  res.status(200).json({ data: subCat });
});

module.exports = {
  addSubCategory,
  deleteSubCategory,
  searchSubCategory,
  getAllSubCategories,
  updateSubCategory,
};
