const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.loginValidator = [
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email")
    .isLength({ min: 10 })
    .withMessage("Too short email")
    .isLength({ max: 250 })
    .withMessage("Too long email"),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Too short password"),
  validatorMiddleware,
];
