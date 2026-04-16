const memberRules = {};

<<<<<<< Updated upstream
=======
// CREATE rules
>>>>>>> Stashed changes
memberRules.create = {
    firstName: "required|string",
    lastName: "required|string",
    phone: "required|string",
    email: "required|email",
    password: "required|string|min:6",
    status: "string|in:active,inactive",
    role: "string|in:member,admin"
};

<<<<<<< Updated upstream
=======
// UPDATE rules
>>>>>>> Stashed changes
memberRules.update = {
    firstName: "string",
    lastName: "string",
    phone: "string",
    email: "email",
    password: "string|min:6",
    status: "string|in:active,inactive",
    role: "string|in:member,admin"
};

<<<<<<< Updated upstream
module.exports = memberRules;
=======
module.exports = memberRules;
>>>>>>> Stashed changes
