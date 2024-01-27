const express = require("express");
const {
  getAllUsers,
  updateUserProfile,
  getUsersCount,
  profilePhotoUpload,
  deleteUserProfile,
} = require("../services/userService");
const {
  verifyTokenAndOnlyUser,
  verifyTokenAndAdmin,
  verifyToken,
  verifyTokenAndOnlyUserOrAdmins,
} = require("../middlewares/verifyToken");
const {
  updateUserValidator,
  deleteUserValidator,
} = require("../utils/validators/userValidator");
const photoUpload = require("../middlewares/photoUpload");
const router = express.Router();

// /api/v1/users/profile
router.route("/").get(verifyTokenAndAdmin, getAllUsers);

// /api/v1/users/profile/:id
router
  .route("/:id")
  .put(verifyTokenAndOnlyUser, updateUserValidator, updateUserProfile)
  .delete(
    verifyTokenAndOnlyUserOrAdmins,
    deleteUserValidator,
    deleteUserProfile
  );

// /api/v1/users/profile/profile-photo-upload
router
  .route("/profile-photo-upload")
  .post(verifyToken, photoUpload.single("image"), profilePhotoUpload);

module.exports = router;
