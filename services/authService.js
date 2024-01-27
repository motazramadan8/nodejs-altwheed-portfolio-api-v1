const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const ApiError = require("../utils/apiError");
// End Main Varibles

/** ----------------------------------- 
 * @desc   Register New User
 * @route  /api/v1/auth/register
 * @method POST
 * @access public
-----------------------------------*/
module.exports.registerUser = asyncHandler(async (req, res, next) => {
  // Validation If User Already Exists
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return next(new ApiError("This email is already used", 400));
  }

  let userPhone = await User.findOne({ phone: req.body.phone });
  if (userPhone) {
    return next(new ApiError("This phone is already used", 400));
  }

  // Hash The Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Generate ID
  const userId = (await User.count()) + 1;

  // New User & Save It In DataBase
  user = new User({
    id: userId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    password: hashedPassword,
    role: req.body.role,
  });
  await user.save();

  // Send Response To Client
  res.status(201).json({ user });
});

/** -----------------------------------
 * @desc   Log in User
 * @route  /api/v1/auth/login
 * @method POST
 * @access public
-----------------------------------*/
module.exports.loginUser = asyncHandler(async (req, res, next) => {
  // Is User Exists
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ApiError("Invalid Email Or Password", 400));
  }

  // Check The Password
  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordMatch) {
    return next(new ApiError("Invalid Email Or Password", 400));
  }

  // Generate Token (JWT)
  const token = user.generateAuthToken();

  // Send Response To Client
  res.status(200).json({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    role: user.role,
    image: user.image,
    token,
  });
});
