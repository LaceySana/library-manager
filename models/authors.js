const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    nationality: {
        type: String
    },
    dob: {
        type: String,
        required: true
    },
    dod: {
        type: String,
        default: Date.now
    },
    biography: {
        type: String
    }
});

module.exports = mongoose.model("authors", authorSchema);
