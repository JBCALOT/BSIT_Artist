const ErrorHandler = require("../utils/ErrorHandler");
const cloudinary = require("cloudinary");

const destroy = async (image) => {
  try {
    await cloudinary.v2.uploader.destroy(image);
    console.log("image deleted");
  } catch (error) {
    console.log(error);
  }
};

module.exports = (err, req, res, next) => {
  console.log(req.body);
  err.statusCode = err.statusCode || 500;
  let error = { ...err };

  error.message = err.message;
  if (req.body.image) {
    destroy(req.body.image[0].public_id);
  }

  // Wrong Mongoose Object ID Error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    error = new ErrorHandler(message, 400);
  }

  // Handling Mongoose Validation Error
  if (err.name === "ValidationError") {
    const errors = {};
    Object.values(err.errors).map(
      (value) => (errors[value.path] = value.message)
    );
    error = new ErrorHandler(JSON.stringify(errors), 400);
  }

  // Handling Mongoose duplicate key errors
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    error = new ErrorHandler(message, 400);
  }

  // Handling wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = "JSON Web Token is invalid. Try Again!!!";
    error = new ErrorHandler(message, 400);
  }

  // Handling Expired JWT error
  if (err.name === "TokenExpiredError") {
    const message = "JSON Web Token is expired. Try Again!!!";
    error = new ErrorHandler(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Internal Server Error",
  });
};
