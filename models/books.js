const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    authorId: {
        type: String,
        required: true
    },
    publishYear: {
        type: Number
    },
    isbn: {
        type: String,
        required: true,
        unigue: true
    },
    genre: {
        type: String
    },
    image: {
        type: String
    },
    awards: {
        type: [String]
    },
    copiesOwned: {
        type: Number,
        required: true,
        min: 0
    },
    copiesAvailable: {
        type: Number,
        required: true,
        min: 0
    }
});

module.exports = mongoose.model("Books", bookSchema);
