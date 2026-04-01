const authorsModel = require("../models/authors");
const authorController = {};

// o	Id
// o	First name
// o	Last name
// o	Nationality (Optional)
// o	DOB
// o	DOD (Optional)
// o	Biography (Optional)

authorController.get = async (req, res) => {
    //#swagger.tags = ['authors']
    //#swagger.description = 'Get an author by ID.'

    const author = await authorsModel.get(req.params.id);

    res.status(200).json(author);
};

authorController.getAll = async (req, res) => {
    //#swagger.tags = ['authors']
    //#swagger.description = 'Get all the authors in the collection.'
    const authors = await authorsModel.getAll();

    res.status(200).json(authors);
};

authorController.create = async (req, res) => {
    /* #swagger.tags = ['authors']
       #swagger.description = 'Create a new author.'
       #swagger.parameters['body'] = {
         in: 'body',
         schema: {
           $firstName: "Jane",
           $lastName: "Smith",
           nationality: "American",
           $dob: "1980-01-01",
           dod: "2040-01-01",
           biography: "Jane Smith is a renowned author known for her fantasy novels."
         }
       }
    */
    const author = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nationality: req.body.nationality,
        dob: req.body.dob,
        dod: req.body.dod,
        biography: req.body.biography
    };

    const result = await authorsModel.create(author);

    if (result.acknowledged) {
        res.status(201).json(result);
    } else {
        res.status(500).json({ error: "Failed to create author" });
    }
};

authorController.update = async (req, res) => {
    /*  #swagger.tags = ['authors']
        #swagger.description = 'Update an existing author by ID.'
        #swagger.parameters['body'] = {
         in: 'body',
         schema: {
           firstName: "Jane",
           lastName: "Smith",
           nationality: "American",
           dob: "1980-01-01",
           dod: "2040-01-01",
           biography: "Jane Smith is a renowned author known for her fantasy novels."
         }
       }
    */
    const author = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nationality: req.body.nationality,
        dob: req.body.dob,
        dod: req.body.dod,
        biography: req.body.biography
    };

    const result = await authorsModel.update(req.params.id, author);

    if (result.modifiedCount > 0) {
        res.status(200).json(result);
    } else {
        res.status(500).json({ error: "Failed to update author" });
    }
};

authorController.delete = async (req, res) => {
    //#swagger.tags = ['authors']
    //#swagger.description = 'Delete an existing author by ID.'
    const result = await authorsModel.delete(req.params.id);

    if (result.deletedCount > 0) {
        res.status(200).json(result);
    } else {
        res.status(500).json({ error: "Failed to delete author" });
    }
};

module.exports = authorController;
