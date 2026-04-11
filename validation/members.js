// members.js
const memberRules = {};

/* Validation Rules */

// CREATE rules
memberRules.create = {
    name: "required|string",
    email: "required|string|email",
    membershipDate: "required|string"
};

// UPDATE rules
memberRules.update = {
    name: "string",
    email: "string|email",
    membershipDate: "string"
};

module.exports = memberRules;
