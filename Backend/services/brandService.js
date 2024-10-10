const { brandModel } = require("../models/brandModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const ApiError = require("../utils/apiError");

const addBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const brand = await brandModel.create({
    name: name,
    slug: slugify(name),
  });
  res.status(201).json({ data: brand });
});

const getAllBrands = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const allbrands = await brandModel
    .find()
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    page: page,
    results: allbrands.length,
    data: allbrands,
  });
});

const getSpecificBrand = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const brand = await brandModel.findById(id);

  if (!brand) {
    return next(new ApiError(`No brand with this id ${id}`), 404);
  }
  return res.status(200).json({ data: brand });
});

const updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const brand = await brandModel.findOneAndUpdate(
    { _id: id },
    { name: name, slug: slugify(name) },
    { new: true }
  );

  if (!brand) {
    return next(new ApiError(`No brand found for this id ${id}`), 404);
  }
  return res.status(200).json({ data: brand });
});

const deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await brandModel.findByIdAndDelete(id);

  if (!brand) {
    return next(new ApiError(`No brand for this id ${id}`, 404));
  }
  return res.status(204).json({ data: "category has been deleted" });
});

module.exports = {
  getAllBrands,
  deleteBrand,
  getSpecificBrand,
  updateBrand,
  addBrand,
};
