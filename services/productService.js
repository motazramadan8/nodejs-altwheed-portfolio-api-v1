const asyncHandler = require("express-async-handler");
const Product = require("../models/Product.");
const ApiError = require("../utils/apiError");
const path = require("path");
const fs = require("fs");
const {
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
} = require("../utils/cloudinary");

/** -----------------------------------
 * @desc   Get All Products
 * @route  /api/v1/products
 * @method GET
 * @access public
-----------------------------------*/

exports.getProducts = asyncHandler(async (req, res) => {
  // Get All Products From DB
  const products = await Product.find({}).populate(
    "user",
    "firstName lastName -_id"
  );

  // Send Response To Client
  res.status(200).json(products);
});

/** -----------------------------------
 * @desc   Create New Product
 * @route  /api/v1/products
 * @method POST
 * @access private (Only Admin)
-----------------------------------*/

exports.createProduct = asyncHandler(async (req, res, next) => {
  // Get Product Title & Image and category From Request
  const { title, category } = req.body;
  const image = req.file;

  // Validation
  if (!image) {
    return next(new ApiError("No image provided", 400));
  }

  // Upload Product Image
  const imagePath = path.join(__dirname, `../images/${image.filename}`);
  const result = await cloudinaryUploadImage(imagePath);

  // Create Product In DB
  const product = await Product.create({
    title,
    category,
    user: req.user.id,
    image: {
      url: result.secure_url,
      publicId: result.public_id,
    },
  });

  // Send Response To Client
  res.status(201).json({ product });

  // Remove the image from the server
  await fs.unlinkSync(imagePath);
});

/** -----------------------------------
 * @desc   Delete Product
 * @route  /api/v1/products/:id
 * @method DELETE
 * @access private (Only Admin)
-----------------------------------*/

exports.deleteProduct = asyncHandler(async (req, res, next) => {
  // Get The Id From Params
  const { id } = req.params;

  // Get Product From DataBase
  const product = await Product.findById(id);
  // Validation
  if (!product) {
    return next(new ApiError("Product not found", 404));
  }

  // Delete image From Cloudinary
  if (product.image.publicId !== null) {
    await cloudinaryRemoveImage(product.image.publicId);
  }

  // Delete The Product
  await Product.findByIdAndDelete(req.params.id);

  // Send Response To The Client
  res.status(204).send();
});
