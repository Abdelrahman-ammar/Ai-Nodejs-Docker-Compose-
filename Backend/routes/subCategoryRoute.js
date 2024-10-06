const express = require("express");

const {
  addSubCategory,
  deleteSubCategory,
  searchSubCategory,
  getAllSubCategories,
  updateSubCategory,
  SetCategoryToBody,
} = require("../services/subCategoryService");
const {
  addSubCategoryVal,
  deleteSubCategoryVal,
  searchSubCategoryVal,
  updateCategoryVal,
  updateSubCategoryVal,
} = require("../utils/validators/subCategoryValidator");

// allow us to access parameters that comes from external routes that is linked to this route
// we need to access Categoryid from category Router
router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(SetCategoryToBody, addSubCategoryVal, addSubCategory)
  .get(getAllSubCategories);

router
  .route("/:id")
  .delete(deleteSubCategoryVal, deleteSubCategory)
  .get(searchSubCategoryVal, searchSubCategory)
  .put(updateSubCategoryVal, updateSubCategory);
module.exports = router;
