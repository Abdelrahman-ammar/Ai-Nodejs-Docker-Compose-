const axios = require("axios");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

const classifyText = async (text) => {
  try {
    const response = await axios.post("http://127.0.0.1:9000/classify", {
      text,
    });
    return response.data.Classes;
  } catch {
    throw new ApiError("There was an error in classification");
  }
};

module.exports = { classifyText };
