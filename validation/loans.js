const loanRules = {};

loanRules.create = {
    memberId: "required|string",
    bookId: "required|string",
    dueDate: "required|string",
    status: "string|in:borrowed,returned,overdue"
};

loanRules.update = {
    memberId: "string",
    bookId: "string",
    loanDate: "string",
    dueDate: "string",
    returnDate: "string",
    status: "string|in:borrowed,returned,overdue"
};

module.exports = loanRules;