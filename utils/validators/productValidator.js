const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.deleteProductValidator = [
  check("id").isMongoId().withMessage("Invalid service id format"),
  validatorMiddleware,
];
