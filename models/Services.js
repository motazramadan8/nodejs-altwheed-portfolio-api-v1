const mongoose = require("mongoose");

// Create Schema
const ServiceSchema = new mongoose.Schema(
  {
    id: Number,
    title: {
      type: String,
      required: [true, "Service is required"],
      minlength: [3, "Too short service name"],
      maxlength: [30, "Too long service name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Product description is required"],
      minlength: [15, "Too short product description"],
    },
  },
  { timestamps: true }
);

// Create Model
module.exports = mongoose.model("Service", ServiceSchema);
