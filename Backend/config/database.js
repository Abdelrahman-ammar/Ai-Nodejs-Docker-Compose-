const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "config.env" });

console.log("DB_URL:", process.env.DB_URL);

const dbconnection = () => {
  mongoose.connect(process.env.DB_URL).then((res) => {
    console.log("connected to db");
  });
  // .catch((err) => {
  //     console.log(err);
  // });
};

module.exports = dbconnection;
