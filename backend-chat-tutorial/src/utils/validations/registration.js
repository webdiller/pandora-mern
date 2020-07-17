const { check } = require("express-validator");

exports.registerValidation = [
  check("email").isEmail(),
  check("fullname").isLength({ min: 3 }),
  check("password").isLength({ min: 3 }),
];
