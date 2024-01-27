const express = require("express");

const {
  getLinkedinLink,
  createLinkedinLink,
  updateLinkedinLink,
  deleteLinkedinLink,
} = require("../services/LinkedinService");
const {
  createLinkedinLinkValidator,
  updateSpecificLinkedinLinkValidator,
  deleteSpecificLinkedinLinkValidator,
} = require("../utils/validators/linkedinValidator");
const {
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");
const router = express.Router();

// /api/v1/linkedin
router
  .route("/")
  .get(getLinkedinLink)
  .post(verifyTokenAndAdmin, createLinkedinLinkValidator, createLinkedinLink);

// /api/v1/linkedin/:id
router
  .route("/:id")
  .put(
    verifyTokenAndAdmin,
    updateSpecificLinkedinLinkValidator,
    updateLinkedinLink
  )
  .delete(
    verifyTokenAndAdmin,
    deleteSpecificLinkedinLinkValidator,
    deleteLinkedinLink
  );

module.exports = router;
