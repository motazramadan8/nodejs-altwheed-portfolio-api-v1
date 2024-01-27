const router = require("express").Router();

const { registerUser, loginUser } = require("../services/authService");
const { loginValidator } = require("../utils/validators/loginValidator");
const { registerValidator } = require("../utils/validators/registerValidator");

// /api/v1/auth/register
router.post("/register", registerValidator, registerUser);

// /api/v1/auth/login
router.post("/login", loginValidator, loginUser);

module.exports = router;
