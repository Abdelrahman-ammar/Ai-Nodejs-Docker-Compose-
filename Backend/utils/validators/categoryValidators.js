const { check } = require("express-validator");
const validationMiddleware = require("../../middlewares/validatorMiddleware");

const getSpecificCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Category id"),
  validationMiddleware,
];

const addCategoryVal = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be atleast 3 chars long")
    .isLength({ max: 32 })
    .withMessage("Too long category name"),
  validationMiddleware,
];

const updateCategoryVal = [
  check("id").isMongoId().withMessage("Invalid Mongo id"),
  validationMiddleware,
];

const deleteCategoryVal = [
  check("id").isMongoId().withMessage("Invalid Mongo id"),
  validationMiddleware,
];

module.exports = {
  getSpecificCategoryValidator,
  deleteCategoryVal,
  updateCategoryVal,
  addCategoryVal,
};
