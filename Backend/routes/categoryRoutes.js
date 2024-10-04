const express = require("express");

const {
  getSpecificCategoryValidator,
  deleteCategoryVal,
  updateCategoryVal,
  addCategoryVal,
} = require("../utils/validators/categoryValidators");

const {
  getAllCategories,
  addCategory,
  homePage,
  GetSpecificCategory,
  updateSpecificCategory,
  deleteCategory,
} = require("../services/categoryService");

const router = express.Router();

router.get("/home", homePage);
router.get("/categories", getAllCategories);
router.post("/add-category", addCategoryVal, addCategory);
router
  .route("/:id")
  .get(getSpecificCategoryValidator, GetSpecificCategory)
  .put(updateCategoryVal, updateSpecificCategory)
  .delete(deleteCategoryVal, deleteCategory);

module.exports = router;
