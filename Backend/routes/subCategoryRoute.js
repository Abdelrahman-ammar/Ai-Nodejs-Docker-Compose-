const express = require("express");

const {
  addSubCategory,
  deleteSubCategory,
  searchSubCategory,
  getAllSubCategories,
  updateSubCategory,
} = require("../services/subCategoryService");
const {
  addSubCategoryVal,
  deleteSubCategoryVal,
  searchSubCategoryVal,
  updateCategoryVal,
  updateSubCategoryVal,
} = require("../utils/validators/subCategoryValidator");

router = express.Router();

router
  .route("/")
  .post(addSubCategoryVal, addSubCategory)
  .get(getAllSubCategories);

router
  .route("/:id")
  .delete(deleteSubCategoryVal, deleteSubCategory)
  .get(searchSubCategoryVal, searchSubCategory)
  .put(updateSubCategoryVal, updateSubCategory);
module.exports = router;
