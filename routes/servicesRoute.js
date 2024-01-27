const express = require("express");
const {
  getServices,
  createService,
  updateSpecificService,
  deleteSpecificService,
} = require("../services/servicesService");
const {
  createServiceValidator,
  updateSpecificServiceValidator,
  deleteSpecificServiceValidator,
} = require("../utils/validators/serviceValidator.js");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const router = express.Router();

// /api/v1/services
router.route("/").get(getServices).post(verifyTokenAndAdmin, createServiceValidator, createService);

// /api/v1/services/:id
router
  .route("/:id")
  .put(verifyTokenAndAdmin, updateSpecificServiceValidator, updateSpecificService)
  .delete(verifyTokenAndAdmin, deleteSpecificServiceValidator, deleteSpecificService);

module.exports = router;
