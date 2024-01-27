const mongoose = require("mongoose");

// Create Schema
const FacebookSchema = new mongoose.Schema(
  {
    link: {
      type: String,
      required: [true, "Facebook link is required"],
      unique: [true, "Facebook must be unique"],
      minlength: [8, "Too short facebook name"],
      maxlength: [200, "Too long facebook name"],
    },
  },
  { timestamps: true }
);

// Create Model
module.exports = mongoose.model("Facebook", FacebookSchema);
