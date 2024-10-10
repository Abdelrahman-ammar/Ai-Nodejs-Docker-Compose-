const express = require("express");
const {
  getAllProducts,
  addProduct,
  searchProduct,
  updateSpecificProduct,
  deleteProduct,
} = require("../services/productService");

const {
  getSpecificProductValidator,
  deleteProductVal,
  updateProductVal,
  addProductVal,
} = require("../utils/validators/productValidators");

const router = express.Router();

router.route("/products").get(getAllProducts).post(addProductVal, addProduct); //anything on the route / if the request  is get then use get , if the request is post then use post (shortcut instead of the long way of the post below)
// router.post("/",addProduct);
router
  .route("/products/:id")
  .get(getSpecificProductValidator, searchProduct)
  .put(updateProductVal, updateSpecificProduct)
  .delete(deleteProductVal, deleteProduct);
module.exports = router;
