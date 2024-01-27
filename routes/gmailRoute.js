const express = require("express");
const {
  getGmail,
  createGmail,
  updateGmail,
  deleteGmail,
} = require("../services/gmailService");
const {
  createGmailValidator,
  updateSpecificGmailValidator,
  deleteSpecificGmailValidator,
} = require("../utils/validators/gmailValidator");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const router = express.Router();

// /api/v1/whatsapp
router
  .route("/")
  .get(getGmail)
  .post(verifyTokenAndAdmin, createGmailValidator, createGmail);

// /api/v1/whatsapp/:id
router
  .route("/:id")
  .put(verifyTokenAndAdmin, updateSpecificGmailValidator, updateGmail)
  .delete(verifyTokenAndAdmin, deleteSpecificGmailValidator, deleteGmail);

module.exports = router;
