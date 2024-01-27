const mongoose = require("mongoose");

// Create Schema
const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      minlength: [2, "Too short product name"],
      maxlength: [25, "Too long product name"],
    },
    image: {
      type: Object,
      required: [true, "Product image cover is required"],
      default: {
        url: "",
        publicId: null,
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
    },
  },
  { timestamps: true }
);

// Create Model
module.exports = mongoose.model("Product", ProductSchema);
