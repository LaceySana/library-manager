const { mapNestedObjectValues } = require("../utils");
const validate = require("../middleware/validate");

const validators = {
    validateAuthor: require("./authors"),
    validateBook: require("./books"),
    validateMember: require("./members"),
    validateLoan: require("./loans")
};

// Export all validators with their rules wrapped in a validation handler middleware
module.exports = mapNestedObjectValues(validators, validate);