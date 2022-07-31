const User = require("../model/Users");
const ErrorHandler = require("../utils/ErrorHandler");
const sendToken = require("../utils/jwtToken");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

exports.register = catchAsyncErrors(async (req, res, next) => {
  const user = await User.create(req.body);
  return res.status(200).json({
    success: true,
    message: "Account has been successfully Added",
    user: user,
  });
  // sendToken(admin, "admin", 200, res);
});

// Start Login Block
exports.login = catchAsyncErrors(async (req, res, next) => {
    console.log(req.body);
    const { email, password } = req.body;
    //check if field are blank
  
    if (!email || !password) {
      return next(new ErrorHandler("Please enter Email and Password", 400));
    }
  
    // check if username or email was entered
    const user = await User.findOne({
      $or: [{ email: email }, { username: email }],
    }).select("+password");
    // if no match
  
    if (!user) {
      return next(new ErrorHandler("No Admin Found!", 404));
    }
  
    //match password
    const isMatch = await user.matchPasswords(password);
    if (!isMatch) {
      return next(new ErrorHandler("Invalid Credentials", 401));
    }
  
    /* // valid credentials to send token
    sendToken(
      admin,
      admin.role !== "superadmin" ? "admin" : "superadmin",
      200,
      res
    ); */
  });

  exports.getProfile = catchAsyncErrors(async (req, res, next) => {
      const user = await User.findById(req.user._id);
      return res.status(200).json({
        sucess: true,
        user,
      });
  });