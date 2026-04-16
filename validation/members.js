const memberRules = {};

memberRules.create = {
    firstName: "required|string",
    lastName: "required|string",
    phone: "required|string",
    email: "required|email",
    password: "required|string|min:6",
    status: "string|in:active,inactive",
    role: "string|in:member,admin"
};

memberRules.update = {
    firstName: "string",
    lastName: "string",
    phone: "string",
    email: "email",
    password: "string|min:6",
    status: "string|in:active,inactive",
    role: "string|in:member,admin"
};

module.exports = memberRules;