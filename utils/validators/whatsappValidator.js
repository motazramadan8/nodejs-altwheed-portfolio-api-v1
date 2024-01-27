const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.createWhatsappValidator = [
  check("number")
    .notEmpty()
    .withMessage("Whatsapp number is required")
    .matches(
      /^(\+\d{1,3}\s?)?(\(\d{1,3}\)\s?)?\d{1,4}[\s-]?\d{1,4}[\s-]?\d{1,9}$/
    )
    .withMessage("Invalid whatsapp number")
    .isLength({ min: 8 })
    .withMessage("Too short Whatsapp number")
    .isLength({ max: 150 })
    .withMessage("Too long Whatsapp number"),
  validatorMiddleware,
];

exports.updateSpecificWhatsappValidator = [
  check("id").isMongoId().withMessage("Invalid Whatsapp number id format"),
  validatorMiddleware,
];

exports.deleteSpecificWhatsappValidator = [
  check("id").isMongoId().withMessage("Invalid Whatsapp number id format"),
  validatorMiddleware,
];
