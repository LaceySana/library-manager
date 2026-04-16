const loanRules = {};

<<<<<<< Updated upstream
=======
// CREATE rules
>>>>>>> Stashed changes
loanRules.create = {
    memberId: "required|string",
    bookId: "required|string",
    dueDate: "required|string",
    status: "string|in:borrowed,returned,overdue"
};

<<<<<<< Updated upstream
loanRules.update = {
    memberId: "string",
    bookId: "string",
    loanDate: "string",
=======
// UPDATE rules
loanRules.update = {
    memberId: "string",
    bookId: "string",
>>>>>>> Stashed changes
    dueDate: "string",
    returnDate: "string",
    status: "string|in:borrowed,returned,overdue"
};

<<<<<<< Updated upstream
module.exports = loanRules;
=======
module.exports = loanRules;
>>>>>>> Stashed changes
