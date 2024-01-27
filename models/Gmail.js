const mongoose = require("mongoose");

// Create Schema
const GmailSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Gmail is required"],
      unique: [true, "Gmail must be unique"],
      minlength: [10, "Too short gmail"],
      maxlength: [150, "Too long gmail"],
    },
  },
  { timestamps: true }
);

// Create Model
module.exports = mongoose.model("Gmail", GmailSchema);
