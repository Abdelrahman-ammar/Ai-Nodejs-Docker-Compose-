const { check } = require("express-validator");
const validationMiddleware = require("../../middlewares/validatorMiddleware");
const categoryModel = require("../../models/categoryModel");

const getSpecificProductValidator = [
  check("id").isMongoId().withMessage("Invalid Product id"),
  validationMiddleware,
];

const addProductVal = [
  check("Name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be atleast 3 chars long")
    .isLength({ max: 100 })
    .withMessage("Too long Product name"),

  check("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ max: 2000 })
    .withMessage("Max length for description is 2000"),

  check("quantity")
    .notEmpty()
    .withMessage("Quantity required")
    .isNumeric()
    .withMessage("Quantity must be a number"),

  check("imageCover").notEmpty().withMessage("Product image is required"),

  check("category")
    .notEmpty()
    .withMessage("Product category is required")
    .isMongoId()
    .withMessage("Invlaid Mongoid format")
    .custom((categoryid) => {
      categoryModel.findById(categoryid).then((category) => {
        if (!category) {
          return Promise.reject(`No category for this id : ${id}`);
        }
      });
    }),

  check("sold").isNumeric().withMessage("Product Quantity must be a number"),

  check("Price")
    .notEmpty()
    .withMessage("Product Price is required")
    .isNumeric()
    .withMessage("Product price must be a number"),

  check("priceafterDiscount")
    .optional()
    .toFloat()
    .isNumeric()
    .withMessage("Product price after discount must be a number")
    .custom((value, { req }) => {
      if (req.body.Price <= value) {
        throw new Error("Price After discount must be lower than the price");
      }
      return true;
    }),

  check("colors")
    .optional()
    .isArray()
    .withMessage("Images should be array of colors"),

  check("subCategories")
    .optional()
    .isMongoId()
    .withMessage("Invalid Id format"),

  check("brand").optional().isMongoId().withMessage("Invalid Id format"),

  check("ratingsAverage")
    .isNumeric()
    .withMessage("Product Rating Average is required")
    .optional()
    .isLength({ min: 1 })
    .withMessage("Miniumum rating is 1")
    .isLength({ max: 5 })
    .withMessage("Maximum rating is 1"),

  check("ratingsAverage")
    .optional()
    .isNumeric()
    .withMessage("rating Quantity must be a number"),

  validationMiddleware,
];

const updateProductVal = [
  check("id").isMongoId().withMessage("Invalid Mongo id"),
  validationMiddleware,
];

const deleteProductVal = [
  check("id").isMongoId().withMessage("Invalid Mongo id"),
  validationMiddleware,
];

module.exports = {
  getSpecificProductValidator,
  deleteProductVal,
  updateProductVal,
  addProductVal,
};
