const express = require("express");
const {
  getFacebookLink,
  createFacebookLink,
  updateFacebookLink,
  deleteFacebookLink,
} = require("../services/facebookService");
const {
  createFacebookLinkValidator,
  updateSpecificFacebookLinkValidator,
  deleteSpecificFacebookLinkValidator,
} = require("../utils/validators/facebookValidator");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const router = express.Router();

// /api/v1/facebook
router
  .route("/")
  .get(getFacebookLink)
  .post(verifyTokenAndAdmin, createFacebookLinkValidator, createFacebookLink);

// /api/v1/facebook/:id
router
  .route("/:id")
  .put(
    verifyTokenAndAdmin,
    updateSpecificFacebookLinkValidator,
    updateFacebookLink
  )
  .delete(
    verifyTokenAndAdmin,
    deleteSpecificFacebookLinkValidator,
    deleteFacebookLink
  );

module.exports = router;
