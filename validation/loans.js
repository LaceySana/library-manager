const { body } = require("express-validator");

const validateLoan = [
  body("memberId")
    .notEmpty()
    .withMessage("Member ID is required"),

  body("bookId")
    .notEmpty()
    .withMessage("Book ID is required"),

  body("loanDate")
    .notEmpty()
    .withMessage("Loan date is required"),

  body("returnDate")
    .optional()
];

module.exports = validateLoan;