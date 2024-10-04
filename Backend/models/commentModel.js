const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = Schema(
  {
    text: {
      type: String,
      required: true,
    },
    classes: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

const commentModel = mongoose.model("Comment", commentSchema);

module.exports = { commentModel };
