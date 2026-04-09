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
        type: String
    },
    biography: {
        type: String
    },

    //soft delete feature
    deletedAt: {
        type: Date,
        default: null
    }
});

module.exports = mongoose.model("Authors", authorSchema);
