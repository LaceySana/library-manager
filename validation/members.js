const { body } = require("express-validator");

const validateMember = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Valid email is required"),

  body("membershipDate")
    .notEmpty()
    .withMessage("Membership date is required")
];

module.exports = validateMember;