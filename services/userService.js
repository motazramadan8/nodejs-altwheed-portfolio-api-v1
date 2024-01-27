const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const path = require("path");
const fs = require("fs");
const User = require("../models/User");
const {
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
} = require("../utils/cloudinary");
const ApiError = require("../utils/apiError");

/** -----------------------------------
 * @desc   Get All Users
 * @route  /api/v1/users/profile
 * @method GET
 * @access private (Only Admins)
-----------------------------------*/

module.exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json(users);
});

/** -----------------------------------
 * @desc   Update User Profile
 * @route  /api/v1/users/profile/:id
 * @method PUT
 * @access private (Only User Himself)
-----------------------------------*/

module.exports.updateUserProfile = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(req.params.id);

  const { oldPassword } = req.body;

  // Check The Password
  if (oldPassword) {
    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordMatch) {
      return next(new ApiError("Old Password Is Invalid", 400));
    }
  }

  // Hash The New Password
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }

  // Update User
  const updateUser = await User.findByIdAndUpdate(
    id,
    {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        phone: req.body.phone,
        email: req.body.email,
      },
    },
    { new: true }
  ).select("-password");

  res.status(200).json(updateUser);
});

/** -----------------------------------
 * @desc   Profile Photo Upload
 * @route  /api/v1/users/profile/profile-photo-upload
 * @method POST
 * @access private (Only Logged In Users)
-----------------------------------*/

module.exports.profilePhotoUpload = asyncHandler(async (req, res, next) => {
  // Validation
  if (!req.file) {
    return next(new ApiError("No image provided", 400));
  }

  // Get the path to the image
  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);

  // Upload to Cloudinary
  const result = await cloudinaryUploadImage(imagePath);

  // Get the user from the DB
  const user = await User.findById(req.user.id);

  // Delete the old profile photo if it exists
  if (user.image.publicId !== null) {
    await cloudinaryRemoveImage(user.image.publicId);
  }

  // Change the image field in the DB
  user.image = {
    url: result.secure_url,
    publicId: result.public_id,
  };
  await user.save();

  // Send response to the client
  res.status(200).json({
    user,
  });

  // Remove the image from the server
  await fs.unlinkSync(imagePath);
});

/** -----------------------------------
 * @desc   Delete User Profile
 * @route  /api/v1/users/profile/:id
 * @method DELETE
 * @access private (Only User Himself Or Admins)
-----------------------------------*/

module.exports.deleteUserProfile = asyncHandler(async (req, res, next) => {
  // Get User From DataBase
  const user = await User.findById(req.params.id);
  // Validation
  if (!user) {
    return next(new ApiError("User not found", 404));
  }

  // Delete image From Cloudinary
  if (user.image.publicId !== null) {
    await cloudinaryRemoveImage(user.image.publicId);
  }

  // Delete The User Himself
  await User.findByIdAndDelete(req.params.id);

  // Send Response To The Client
  res.status(204).sensd();
});
