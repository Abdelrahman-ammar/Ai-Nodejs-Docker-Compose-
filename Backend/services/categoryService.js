const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const categoryModel = require("../models/categoryModel");

const ApiError = require("../utils/apiError");

const homePage = (req, res) => {
  res.send("<h1> Categories Page </h1>");
};

const getAllCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const allCategories = await categoryModel
    .find()
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit);
  res
    .status(200)
    .json({ results: allCategories.length, page, data: allCategories });
});

const addCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const category = await categoryModel.create({
    name: name,
    slug: slugify(name),
  });
  res.status(201).json({ data: category });
});

const GetSpecificCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await categoryModel.findById(id);

  if (!category) {
    return next(new ApiError(`No category for this id ${id}`, 404));
    // res.status(404).json({ error: `no category with id : ${id}` });
  }
  res.status(200).json({ data: category });
});

const updateSpecificCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const category = await categoryModel.findOneAndUpdate(
    { _id: id },
    { name: name, slug: slugify(name) },
    { new: true }
  );

  if (!category) {
    return next(new ApiError(`No category for this id ${id}`, 404));
    // res
    //   .status(404)
    //   .json({ error: `This category doesn't exit to be updated: ${id}` });
  }
  res.status(200).json({ data: category });
});

const deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const category = await categoryModel.findByIdAndDelete(id);

  if (!category) {
    return next(new ApiError(`No category for this id ${id}`, 404));
    // res.status(404).json({ data: `No category with id ${id}` });
  }
  res.status(204).json({ data: "category has been  deleteed" });
});

module.exports = {
  getAllCategories,
  addCategory,
  homePage,
  GetSpecificCategory,
  updateSpecificCategory,
  deleteCategory,
};
