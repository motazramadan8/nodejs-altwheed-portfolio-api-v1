const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.createGmailValidator = [
  check("email")
    .notEmpty()
    .withMessage("Gmail is required")
    .isEmail()
    .withMessage("Invalid gmail")
    .isLength({ min: 10 })
    .withMessage("Too short gmail")
    .isLength({ max: 150 })
    .withMessage("Too long gmail"),
  validatorMiddleware,
];

exports.updateSpecificGmailValidator = [
  check("id").isMongoId().withMessage("Invalid gmail id format"),
  validatorMiddleware,
];

exports.deleteSpecificGmailValidator = [
  check("id").isMongoId().withMessage("Invalid gmail id format"),
  validatorMiddleware,
];
