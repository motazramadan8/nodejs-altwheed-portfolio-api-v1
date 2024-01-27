const express = require("express");

const {
  getWhatsapp,
  createWhatsapp,
  updateWhatsapp,
  deleteWhatsapp,
} = require("../services/whatsappService");
const {
  updateSpecificWhatsappValidator,
  createWhatsappValidator,
  deleteSpecificWhatsappValidator,
} = require("../utils/validators/whatsappValidator");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const router = express.Router();

// /api/v1/whatsapp
router
  .route("/")
  .get(getWhatsapp)
  .post(verifyTokenAndAdmin, createWhatsappValidator, createWhatsapp);

// /api/v1/whatsapp/:id
router
  .route("/:id")
  .put(verifyTokenAndAdmin, updateSpecificWhatsappValidator, updateWhatsapp)
  .delete(verifyTokenAndAdmin, deleteSpecificWhatsappValidator, deleteWhatsapp);

module.exports = router;
