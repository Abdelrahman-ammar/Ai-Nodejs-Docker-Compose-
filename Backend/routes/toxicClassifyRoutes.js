const express = require("express");

const { addComment, getAllComments } = require("../services/commentService");

const router = express.Router();

router.route("/").post(addComment).get(getAllComments);

module.exports = router;
