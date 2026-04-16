const { mapNestedObjectValues } = require("../utils");
const validate = require("../middleware/validate");

const validators = {
    validateAuthor: require("./authors"),
    validateBook: require("./books"),
    validateMember: require("./members"),
    validateLoan: require("./loans")
};

module.exports = mapNestedObjectValues(validators, validate);