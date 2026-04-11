const bookRules = {};

/* Validation Rules */

// CREATE rules
bookRules.create = {
    title: "required|string",
    authorId: "required|string",
    isbn: "required|string",
    copiesOwned: "required|integer|min:0",
    copiesAvailable: "required|integer|min:0"
};

// UPDATE rules
bookRules.update = {
    title: "string",
    authorId: "string",
    isbn: "string",
    copiesOwned: "integer|min:0",
    copiesAvailable: "integer|min:0"
};

module.exports = bookRules;
