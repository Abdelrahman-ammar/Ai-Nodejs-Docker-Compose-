const { check } = require("express-validator");
const validationMiddleware = require("../../middlewares/validatorMiddleware");
const { updateCategoryVal } = require("./categoryValidators");

const addSubCategoryVal = [
  check("name")
    .notEmpty()
    .withMessage("Name is requireed")
    .isLength({ min: 2 })
    .withMessage("Too short subcategory name")
    .isLength({ max: 32 })
    .withMessage("Too long subcategory name"),
  check("category")
    .isMongoId()
    .withMessage("Invalid Category Id format")
    .notEmpty()
    .withMessage("Category is required"),
  validationMiddleware,
];

const deleteSubCategoryVal = [
  check("id").isMongoId().withMessage("Invalid Mongo ID format"),
  validationMiddleware,
];

const searchSubCategoryVal = [
  check("id").isMongoId().withMessage("Invalid Mongo ID format"),
  validationMiddleware,
];

const updateSubCategoryVal = [
  check("id").isMongoId().withMessage("Invalid Mongo ID format"),
  // check("name")
  //   .notEmpty()
  //   .withMessage("Name is required")
  //   .isLength({ min: 2 })
  //   .withMessage("Too short subcategory name")
  //   .isLength({ max: 32 })
  //   .withMessage("Too long subcategory name"),
  // check("category")
  //   .isMongoId()
  //   .withMessage("invalid mongoid")
  //   .notEmpty("category is required"),
  validationMiddleware,
];
module.exports = {
  addSubCategoryVal,
  searchSubCategoryVal,
  deleteSubCategoryVal,
  updateSubCategoryVal,
};
