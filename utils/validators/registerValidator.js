const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.registerValidator = [
  check("firstName")
    .notEmpty()
    .withMessage("Firstname is required")
    .isLength({ min: 2 })
    .withMessage("Too short firstname")
    .isLength({ max: 100 })
    .withMessage("Too long firstname"),
  check("lastName")
    .notEmpty()
    .withMessage("Firstname is required")
    .isLength({ min: 2 })
    .withMessage("Too short firstname")
    .isLength({ max: 100 })
    .withMessage("Too long firstname"),
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
    .isLength({ min: 7 })
    .withMessage("Too short password"),
  check("phone")
    .notEmpty()
    .withMessage("Phone is required")
    .matches(
      /^(\+\d{1,3}\s?)?(\(\d{1,3}\)\s?)?\d{1,4}[\s-]?\d{1,4}[\s-]?\d{1,9}$/
    ),
  check("role").notEmpty().withMessage("Role is required"),
  validatorMiddleware,
];
