const booksModel = require("../models/books");
const bookController = {};

bookController.getAll = async (req, res) => {
    try {
        const books = await booksModel.find({ deletedAt: null });
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: "Unable to get books.", error });
    }
};

bookController.get = async (req, res) => {
    try {
       const book = await booksModel.findOne({
        _id: req.params.id,
        deletedAt: null
}); 
       if (!book) {
            return res.status(404).json("No matching book found.");
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: "Unable to get book.", error });
    }
};

bookController.create = async (req, res) => {
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
        res.status(200).json(updatedBook); // Fixed: was 201, should be 200 for updates
    } catch (error) {
        res.status(500).json({ message: "Error updating book.", error });
    }
};

bookController.delete = async (req, res) => {
    try {
        const result = await booksModel.findByIdAndUpdate(
            req.params.id,
            { deletedAt: new Date() },
            { new: true }
        );

        if (!result) {
            return res.status(404).json("No matching book found.");
        }

        res.status(200).json({ message: "Book soft deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error deleting book.", error });
    }
};

module.exports = bookController;