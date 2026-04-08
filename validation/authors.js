const authorRules = {};

/* Validation Rules */

// CREATE rules
authorRules.create = {
    firstName: "required|string",
    lastName: "required|string",
    dob: "required|string"
};

// UPDATE rules
authorRules.update = {
    firstName: "string",
    lastName: "string",
    nationality: "string",
    dob: "string",
    dod: "string",
    biography: "string"
};

module.exports = authorRules;
