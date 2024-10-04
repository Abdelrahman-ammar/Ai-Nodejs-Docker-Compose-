const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const dbconnection = require("./config/database");
const proudctRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const subCategoryRoutes = require("./routes/subCategoryRoute");
const commentRoutes = require("./routes/toxicClassifyRoutes");
const ApiError = require("./utils/apiError");

dotenv.config({ path: "config.env" });
const globalError = require("./middlewares/globalMiddleWareError");

dbconnection();

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(" App is running ");
});

app.use("/productsApi/", proudctRoutes);
app.use("/categoriesApi/", categoryRoutes);
app.use("/subCategories/", subCategoryRoutes);
app.use("/comments/", commentRoutes);

app.use("*", (req, res, next) => {
  // const err = new Error(`Can't Find this route ${req.original  Url}`);

  next(new ApiError(`Can't Find this route ${req.originalUrl}`, 400));
});

// Globlal Error handling Middleware , where it catches the error from express
app.use(globalError);

process.on("unhandledRejection", (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}  `);

  server.close(() => {
    console.error("Shutting down...");
    process.exit(1);
  });
});
