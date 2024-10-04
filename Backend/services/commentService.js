const asyncHandler = require("express-async-handler");
const { commentModel } = require("../models/commentModel");
const { classifyText } = require("../Ai/toxicClassifyService");

const getAllComments = asyncHandler(async (req, res) => {
  const comments = await commentModel.find().sort({ _id: -1 });

  res.status(200).json({ results: comments.length, comments });
});

const addComment = asyncHandler(async (req, res) => {
  const { text } = req.body;

  const classes = await classifyText(text);

  const comment = await commentModel.create({
    text: text,
    classes: classes,
  });
  res.status(201).json({ data: comment });
});

module.exports = { addComment, getAllComments };
