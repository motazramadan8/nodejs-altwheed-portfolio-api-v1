const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.createFacebookLinkValidator = [
  check("link")
    .notEmpty()
    .withMessage("Facebook Link is required")
    .matches(
      /^(?:(?:http|https):\/\/)?(?:www\.)?facebook\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile\.php\?id=(?=\d.*))?([\w\-]*)?$/
    )
    .withMessage("Invalid facebook Link")
    .isLength({ min: 8 })
    .withMessage("Too short facebook link")
    .isLength({ max: 200 })
    .withMessage("Too long facebook link"),
  validatorMiddleware,
];

exports.updateSpecificFacebookLinkValidator = [
  check("id").isMongoId().withMessage("Invalid facebook link id format"),
  validatorMiddleware,
];

exports.deleteSpecificFacebookLinkValidator = [
  check("id").isMongoId().withMessage("Invalid facebook link id format"),
  validatorMiddleware,
];
