const asyncHandler = require("express-async-handler");

const subCategoryModel = require("../models/subCategoryModel");

const slugify = require("slugify");
const ApiError = require("../utils/apiError");
const { Result } = require("express-validator");

const SetCategoryToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryid;
  next();
};

const addSubCategory = asyncHandler(async (req, res) => {
  console.log(req.params);
  console.log(req.body.name);
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
  const subCategory = await subCategoryModel
    .findById(id)
    .populate({ path: "category", select: "name -_id" });
  if (!subCategory) {
    return next(new ApiError(`No SubCategory found: ${id}`, 404));
  }
  res.status(200).json({ data: subCategory });
});

const getAllSubCategories = asyncHandler(async (req, res, next) => {
  let filter = {};
  if (req.params.categoryid) filter = { category: req.params.categoryid };

  const subCategories = await subCategoryModel
    .find(filter)
    .sort({ _id: -1 })
    .populate({ path: "category", select: "name -_id" });
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
  SetCategoryToBody,
  addSubCategory,
  deleteSubCategory,
  searchSubCategory,
  getAllSubCategories,
  updateSubCategory,
};
