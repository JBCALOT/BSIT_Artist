const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
//const validator = require("validator");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide your email Address"],
    //validate: [validator.isEmail, "Please Enter a valid Email Address"],
    unique: [true, "This email is already registered. You cannot use this"],
  },
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique:
      "The username already belongs to another account. You cannot use this",
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [6, "Your password must be longer than 6 characters"],
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

/**
 * This section will contain functions for the User Schema
 */

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare user password
userSchema.methods.matchPasswords = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Return JWT token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

userSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = generateToken();

  // Hash and set to resetPasswordToken
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set token expire time
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

  return resetToken;
};

// userSchema.plugin(uniqueValidator);
const generateToken = () => {
  const token = crypto.randomBytes(20).toString("hex");

  return token;
};
const User = mongoose.model("User", userSchema);
module.exports = User;
