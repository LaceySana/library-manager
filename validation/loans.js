// loan.js
const loanRules = {};

/* Validation Rules */

// CREATE rules
loanRules.create = {
    memberId: "required|string",
    bookId: "required|string",
    loanDate: "required|string",
    returnDate: "string"
};

// UPDATE rules
loanRules.update = {
    memberId: "string",
    bookId: "string",
    loanDate: "string",
    returnDate: "string"
};

module.exports = loanRules;
