const express = require("express");
const {
  addBrand,
  getAllBrands,
  getSpecificBrand,
  deleteBrand,
  updateBrand,
} = require("../services/brandService");

const {
  getSpecificBrandValidator,
  updateBrandVal,
  deleteBrandVal,
  addBrandVal,
} = require("../utils/validators/brandValidators");

router = express.Router();

router.route("/brands/").get(getAllBrands).post(addBrandVal, addBrand);

router
  .route("/brands/:id")
  .delete(deleteBrandVal, deleteBrand)
  .get(getSpecificBrandValidator, getSpecificBrand)
  .put(updateBrandVal, updateBrand);

module.exports = router;
