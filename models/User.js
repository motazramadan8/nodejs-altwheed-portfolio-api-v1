const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// Create Schema
const UserSchema = new mongoose.Schema(
  {
    id: Number,
    firstName: {
      type: String,
      required: [true, "Firstname is required"],
      trim: true,
      minlength: [2, "Too short name"],
      maxlength: [100, "Too long name"],
    },
    lastName: {
      type: String,
      required: [true, "Lastname is required"],
      trim: true,
      minlength: [2, "Too short name"],
      maxlength: [100, "Too long name"],
    },
    email: {
      type: String,
      required: [true, "Emial is required"],
      unique: [true, "Email must be unique"],
      trim: true,
      minlength: [10, "Too short email"],
      maxlength: [250, "Too long email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
      minlength: [7, "Too short password"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: [true, "Phone number must be unique"],
    },
    image: {
      type: Object,
      default: {
        url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
        publicId: null,
      },
    },
    role: {
      type: String,
      required: [true, "Role is required"],
    },
  },
  { timestamps: true }
);

// Generate Auth Token
UserSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.JWT_SECRET_KEY
  );
};

// Create Model
module.exports = mongoose.model("User", UserSchema);
