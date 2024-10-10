const { check } = require("express-validator");

const validationMiddleware = require("../../middlewares/validatorMiddleware");

const getSpecificBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand id"),
  validationMiddleware,
];

const addBrandVal = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Name must be atleast 2 chars long")
    .isLength({ max: 32 })
    .withMessage("Too long Brand Name"),
  validationMiddleware,
];

const updateBrandVal = [
  check("id").isMongoId().withMessage("Invalid Mongo id"),
  validationMiddleware,
];

const deleteBrandVal = [
  check("id").isMongoId().withMessage("Invalid Mongo Id"),
  validationMiddleware,
];

module.exports = {
  getSpecificBrandValidator,
  updateBrandVal,
  deleteBrandVal,
  addBrandVal,
};
