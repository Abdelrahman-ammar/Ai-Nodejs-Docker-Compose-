const productModel = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const homePage = (req, res) => {
  res.send("<h1> Home Page </h1>");
};

const getAllProducts = (req, res) => {
  productModel.find().then((result) => {
    res.json({ data: result });
  });
  // .catch((err) => {
  //   console.log(err);
  // });
};

const addProduct = (req, res) => {
  const name = req.body.name;
  const price = req.body.price;
  const product = new productModel({
    Name: name,
    Price: price,
  });

  product.save().then((result) => {
    res.json(result);
  });
  // .catch((err) => {
  //   res.json(err);
  //   console.log(err);
  // });
};

const searchProduct = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const product = await productModel.findById(id);
  console.log(product);
  if (!product) {
    next(new ApiError(`Can't find product with id : ${id}`, 500));
  }
  res.status(200).json({ product: product });
});

module.exports = { getAllProducts, addProduct, homePage, searchProduct };
