const globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 400;
  console.log(err.statusCode);
  err.status = err.status || "error";

  if (process.env.NODE_ENV == "production") {
    errorProduction(err, res);
  } else {
    console.log(process.env.NODE_ENV);
    errorDevelopment(err, res);
  }
};

const errorDevelopment = (err, res) => {
  return res.status(err.statusCode).json({
    statusCode: err.statusCode,
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
    mode: "development",
  });
};

const errorProduction = (err, res) => {
  return res.status(err.statusCode).json({
    statusCode: err.statusCode,
    status: err.status,
    message: err.message,
    mode: "production",
  });
};

module.exports = globalError;
