const express = require("express");
const {
  getAllProducts,
  addProduct,
  homePage,
  searchProduct,
} = require("../services/productService");

const router = express.Router();

router.route("/products").get(getAllProducts).post(addProduct); //anything on the route / if the request  is get then use get , if the request is post then use post (shortcut instead of the long way of the post below)
// router.post("/",addProduct);
router.route("/products/:id").get(searchProduct);
router.get("/home", homePage);

module.exports = router;
