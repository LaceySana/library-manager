const authorsModel = require("../models/authors");
const authorController = {};

// o Id
// o First name
// o Last name
// o Nationality
// o DOB
// o DOD (Optional)
// o Biography (Optional)

authorController.get = async (req, res) => {
    //#swagger.tags = ['authors']
    //#swagger.description = 'Get an author by ID.'

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
    //#swagger.tags = ['authors']
    //#swagger.description = 'Get all the authors in the collection.'

    try {
        const authors = await authorsModel.find({});
        res.status(200).json(authors);
    } catch {
        res.status(500).json({ error: "Failed to get authors" });
    }
};

authorController.create = async (req, res) => {
    /* #swagger.tags = ['authors']
       #swagger.description = 'Create a new author.'
       #swagger.requestBody = {
         required: true,
         content: {
           "application/json": {
             schema: {
               $firstName: "Jane",
               $lastName: "Smith",
               $nationality: "American",
               $dob: "1980-01-01",
               dod: "2040-01-01",
               biography: "Jane Smith is a renowned author known for her fantasy novels."
             }
           }
         }
       }
    */

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
    /* #swagger.tags = ['authors']
       #swagger.description = 'Update an existing author by ID.'
       #swagger.requestBody = {
         required: true,
         content: {
           "application/json": {
             schema: {
               firstName: "Jane",
               lastName: "Smith",
               nationality: "American",
               dob: "1980-01-01",
               dod: "2040-01-01",
               biography: "Jane Smith is a renowned author known for her fantasy novels."
             }
           }
         }
       }
    */

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
    //#swagger.tags = ['authors']
    //#swagger.description = 'Delete an existing author by ID.'

    try {
        const result = await authorsModel.findByIdAndDelete(req.params.id);

        if (!result) {
            return res.status(404).json({ error: "Author not found" });
        }

        res.status(200).json(result);
    } catch {
        res.status(500).json({ error: "Failed to delete author" });
    }
};

module.exports = authorController;
