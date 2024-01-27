const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.createServiceValidator = [
  check("title")
    .notEmpty()
    .withMessage("Service title is required")
    .isString()
    .withMessage("Service description must be a string")
    .isLength({ min: 3 })
    .withMessage("Too short service name")
    .isLength({ max: 30 })
    .withMessage("Too long service name"),
  check("description")
    .notEmpty()
    .withMessage("Service description is required")
    .isString()
    .withMessage("Service description must be a string")
    .isLength({ min: 15 })
    .withMessage("Too short service name"),
  validatorMiddleware,
];

exports.updateSpecificServiceValidator = [
  check("id").isMongoId().withMessage("Invalid service id format"),
  validatorMiddleware,
];

exports.deleteSpecificServiceValidator = [
  check("id").isMongoId().withMessage("Invalid service id format"),
  validatorMiddleware,
];
