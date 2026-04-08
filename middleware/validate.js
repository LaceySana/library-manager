const Validator = require("validatorjs");

const validate = (rules) => {
    return (req, res, next) => {
        const validation = new Validator(req.body, rules);

        if (validation.fails()) {
            return res.status(400).json({
                message: "Validation failed",
                errors: validation.errors.all()
            });
        }

        next();
    };
};

module.exports = validate;
