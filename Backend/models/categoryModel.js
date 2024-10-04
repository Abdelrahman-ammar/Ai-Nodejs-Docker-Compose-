const mongoose = require("mongoose");

const { Schema } = mongoose;

const categorySchema = Schema(
  {
    name: {
      type: String,
      required: true,
      unique: [true, "Category must be unique"],
      minlength: [3, "Category must be more than 3 chars"],
      maxlength: 32,
    },
    slug: {
      type: String,
      lowercase: true,
    },
  },
  { timestamps: true }
);

const categoryModel = mongoose.model("Category", categorySchema);

module.exports = categoryModel;
