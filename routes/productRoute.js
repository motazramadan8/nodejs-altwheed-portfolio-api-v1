const express = require("express");
const {
  getProducts,
  createProduct,
  deleteProduct,
} = require("../services/productService");
const photoUpload = require("../middlewares/photoUpload");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const {
  deleteProductValidator,
} = require("../utils/validators/productValidator");
const router = express.Router();

// /api/v1/products
router
  .route("/")
  .get(getProducts)
  .post(
    verifyTokenAndAdmin,
    photoUpload.single("image"),
    createProduct
  );

router
  .route("/:id")
  .delete(deleteProductValidator, verifyTokenAndAdmin, deleteProduct);
module.exports = router;
