const mongoose = require("mongoose");
const { Schema } = mongoose;

const brandSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [2, "brand must be more than 2 chars"],
      maxlength: 32,
      unique: [true, "Brand must be unique"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);

const brandModel = mongoose.model("Brand", brandSchema);

module.exports = { brandModel };
