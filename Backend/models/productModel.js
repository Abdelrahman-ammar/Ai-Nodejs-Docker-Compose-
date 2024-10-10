const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchmea = Schema(
  {
    Name: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Too short product name"],
      maxlength: [100, "Too long product name"],
    },
    Price: {
      type: Number,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      minlength: [20, "Too short product description"],
    },
    quantity: {
      type: Number,
      required: [true, "Product Quantity is required"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    priceafterDiscount: Number,

    colors: [String],

    images: [String],

    imageCover: {
      type: String,
      required: [true, "Product Image Cover is required"],
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Product must belong to a category"],
    },
    subCategories: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "SubCategory",
      },
    ],
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "Brand",
    },
    ratingsAverage: {
      type: Number,
      min: [1.0, "Rating must be above or equal 1.0"],
      max: [5.0, "Rating must be below or equal 5.0"],
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const productModel = mongoose.model("Product", productSchmea);

module.exports = productModel;
