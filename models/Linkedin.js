const mongoose = require("mongoose");

// Create Schema
const LinkedinSchema = new mongoose.Schema(
  {
    link: {
      type: String,
      required: [true, "Linkedin link is required"],
      unique: [true, "Linkedin must be unique"],
      minlength: [8, "Too short linkedin name"],
      maxlength: [150, "Too long linkedin name"],
    },
  },
  { timestamps: true }
);

// Create Model
module.exports = mongoose.model("Linkedin", LinkedinSchema);
