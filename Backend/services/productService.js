const slugify = require("slugify");
const productModel = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

const getAllProducts = asyncHandler(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  products = await productModel
    .find()
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit)
    .populate({ path: "category", select: "name" });

  res.status(200).json({ results: products.length, page, data: products });
});

const addProduct = asyncHandler(async (req, res) => {
  console.log("proudct add");
  req.body.slug = slugify(req.body.Name);
  const product = await productModel.create(req.body);

  res.status(201).json({ data: product });
});

const searchProduct = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const product = await productModel.findById(id);
  console.log(product);
  if (!product) {
    next(new ApiError(`Can't find product with id : ${id}`, 500));
  }
  res.status(200).json({ product: product });
});

const updateSpecificProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.Name) req.body.slug = slugify(req.body.Name);

  const product = await productModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });

  if (!product) {
    return next(new ApiError(`No category for this id ${id}`, 404));
    // res
    //   .status(404)
    //   .json({ error: `This category doesn't exit to be updated: ${id}` });
  }
  res.status(200).json({ data: product });
});

const deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await productModel.findByIdAndDelete(id);

  if (!product) {
    return next(new ApiError(`No category for this id ${id}`, 404));
    // res.status(404).json({ data: `No category with id ${id}` });
  }
  res.status(204).json({ data: "category has been  deleteed" });
});

module.exports = {
  getAllProducts,
  addProduct,
  searchProduct,
  updateSpecificProduct,
  deleteProduct,
};
