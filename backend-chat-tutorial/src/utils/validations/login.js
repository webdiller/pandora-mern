const { check } = require("express-validator");

exports.loginValidation = [
  check("email").isEmail(),
  check("password").isLength({ min: 3 }),
];
