const booksModel = require("../models/authors");
const bookController = {};

bookController.getAll = async (req, res) => {
    // #swagger.description = 'Get all books.'
    // #swagger.tags = ['books']

    try {
        const books = await booksModel.find({});
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: "Unable to get books.", error });
    }
};

bookController.get = async (req, res) => {
    // #swagger.description = 'Get one book by ID.'
    // #swagger.tags = ['books']

    try {
        const book = await booksModel.findById(req.params.id);
        if (!book) {
            return res.status(404).json("No matching book found.");
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: "Unable to get book.", error });
    }
};

bookController.create = async (req, res) => {
    // #swagger.description = "Create a new book."
    // #swagger.tags = ["books"]
    /* #swagger.parameter["body"] = {
        in: 'body',
        schema: {
            $title: "",
            $authorId: "",
            publishYear: "",
            $isbn: "",
            genre: "",
            image: "",
            awards: "",
            $copiesOwned: "",
            $copiesAvailable: ""
        }
    } */

    try {
        const book = {
            title: req.body.title,
            authorId: req.body.authorId,
            publishYear: req.body.publishYear,
            isbn: req.body.isbn,
            genre: req.body.genre,
            image: req.body.image,
            awards: req.body.awards,
            copiesOwned: req.body.copiesOwned,
            copiesAvailable: req.body.copiesAvailable
        };
        const result = await booksModel.create(book);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: "Error creating book.", error });
    }
};

bookController.update = async (req, res) => {
    // #swagger.description = "Update book by ID."
    // #swagger.tags = ["books"]
    /* #swagger.parameter["body"] = {
        in: 'body',
        schema: {
            $title: "",
            $authorId: "",
            publishYear: "",
            $isbn: "",
            genre: "",
            image: "",
            awards: "",
            $copies owned: "",
            $copies available: ""
        }
    } */

    try {
        const updatedBook = await booksModel.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                authorId: req.body.authorId,
                publishYear: req.body.publishYear,
                isbn: req.body.isbn,
                genre: req.body.genre,
                image: req.body.image,
                awards: req.body.awards,
                copiesOwned: req.body.copiesOwned,
                copiesAvailable: req.body.copiesAvailable
            },
            {
                new: true,
                runValidators: true
            }
        );
        if (!updatedBook) {
            return res.status(404).json("No matching book found.");
        }
        res.status(201).json(updatedBook);
    } catch (error) {
        res.status(500).json({ message: "Error updating book.", error });
    }
};

bookController.deleteById = async (req, res) => {
    // #swagger.description = 'Delete book by ID.'
    // #swagger.tags = ['books']

    try {
        const result = await booksModel.findByIdAndDelete(req.params.id);

        if (!result) {
            return res.status(404).json("No matching book found.");
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating book.", error });
    }
};

module.exports = bookController;
