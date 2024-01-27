const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.createLinkedinLinkValidator = [
  check("link")
    .notEmpty()
    .withMessage("LinkedIn Link is required")
    .matches(
      /^(?:(?:http|https):\/\/)?(?:www\.)?linkedin\.com\/(in\/)?[\w-]+\/?$/
    )
    .withMessage("Invalid LinkedIn Link")
    .isLength({ min: 8 })
    .withMessage("Too short LinkedIn link")
    .isLength({ max: 150 })
    .withMessage("Too long LinkedIn link"),
  validatorMiddleware,
];

exports.updateSpecificLinkedinLinkValidator = [
  check("id").isMongoId().withMessage("Invalid LinkedIn link id format"),
  validatorMiddleware,
];

exports.deleteSpecificLinkedinLinkValidator = [
  check("id").isMongoId().withMessage("Invalid LinkedIn link id format"),
  validatorMiddleware,
];
