const authorsModel = require("../models/authors");
const authorController = {};

// o Id
// o First name
// o Last name
// o Nationality (Optional)
// o DOB
// o DOD (Optional)
// o Biography (Optional)

authorController.get = async (req, res) => {
    try {
        const author = await authorsModel.findById(req.params.id);

        if (!author) {
            return res.status(404).json({ error: "Author not found" });
        }

        res.status(200).json(author);
    } catch {
        res.status(500).json({ error: "Failed to get author" });
    }
};

authorController.getAll = async (req, res) => {
    try {
        const authors = await authorsModel.find({});
        res.status(200).json(authors);
    } catch {
        res.status(500).json({ error: "Failed to get authors" });
    }
};

authorController.create = async (req, res) => {
    try {
        const author = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            nationality: req.body.nationality,
            dob: req.body.dob,
            dod: req.body.dod,
            biography: req.body.biography
        };

        const result = await authorsModel.create(author);
        res.status(201).json(result);
    } catch {
        res.status(500).json({ error: "Failed to create author" });
    }
};

authorController.update = async (req, res) => {
    try {
        const updatedAuthor = await authorsModel.findByIdAndUpdate(
            req.params.id,
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                nationality: req.body.nationality,
                dob: req.body.dob,
                dod: req.body.dod,
                biography: req.body.biography
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedAuthor) {
            return res.status(404).json({ error: "Author not found" });
        }

        res.status(200).json(updatedAuthor);
    } catch {
        res.status(500).json({ error: "Failed to update author" });
    }
};

authorController.delete = async (req, res) => {
    try {
        const result = await authorsModel.findByIdAndDelete(req.params.id);

        if (!result) {
            return res.status(404).json({ error: "Author not found" });
        }

        res.status(200).json({msg: "Author deleted successfully."});
    } catch {
        res.status(500).json({ error: "Failed to delete author" });
    }
};

module.exports = authorController;
