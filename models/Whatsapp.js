const mongoose = require("mongoose");

// Create Schema
const WhatsappSchema = new mongoose.Schema(
  {
    number: {
      type: String,
      required: [true, "Whatsapp number is required"],
      unique: [true, "Whatsapp must be unique"],
      minlength: [7, "Too short whatsapp number"],
      maxlength: [25, "Too long whatsapp number"],
    },
  },
  { timestamps: true }
);

// Create Model
module.exports = mongoose.model("Whatsapp", WhatsappSchema);
