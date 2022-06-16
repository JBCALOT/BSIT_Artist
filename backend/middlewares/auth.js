const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");
const User = require("../model/Users");
const catchAsyncErrors = require("./catchAsyncErrors");

exports.authenthicationCheck = catchAsyncErrors(async (req, res, next) => {
  //Get auth header
  const authHeader = req.headers["authorization"];
  const token = await parseBearer(authHeader);

  if (!token || token === "") {
    return next(new ErrorHandler("Unauthorized. Please Login First", 400));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  //req.admin = await Admin.findById(decoded.id);

  next();
});
const parseBearer = (bearer) => {
  const [_, token] = bearer.trim().split(" ");
  return token;
};

exports.authenticateAdmin = (...role) => {
  return (req, res, next) => {
    if (req.admin) {
      if (!role.includes(req.admin.role)) {
        return next(
          new ErrorHandler(
            `Admin with role ${req.admin.role} cannot access this resource`,
            403
          )
        );
      }
    } else {
      return next(
        new ErrorHandler(
          `The user cannot have an access to this resource. Please Login as Admin`,
          403
        )
      );
    }
    next();
  };
};
