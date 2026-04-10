const router = require("express").Router();
const { authorsController } = require("../controllers");
const { validateAuthor } = require("../validation");
const { authenticate } = require("../middleware/authentication");


router.get(
    "/debug/all",
    /* #swagger.tags = ['debug']
  #swagger.description = 'Get ALL authors including soft deleted (debug only)'
*/
    async (req, res) => {
        try {
            const authorsModel = require("../models/authors");
            const authors = await authorsModel.find({});

            res.status(200).json(authors);
        } catch (error) {
            res.status(500).json({ message: "Error fetching debug data", error });
        }
    }
);

// Get all authors
router.get(
    "/",
    /* #swagger.tags = ['authors']
  #swagger.description = 'Get all the authors in the collection.'
*/
    authorsController.getAll
);

router.get(
    "/:id",
    /* #swagger.tags = ['authors']
  #swagger.description = 'Get an author by ID.'
  #swagger.parameters['id'] = {
     in: 'path',
     description: 'Author ID',
     required: true,
     type: 'string'
  }
*/
    authorsController.get
);

router.post(
    "/",
    validateAuthor.create,
    /* #swagger.tags = ['authors']
  #swagger.description = 'Create a new author.'
  #swagger.parameters['body'] = {
     in: 'body',
     description: 'Author data',
     required: true,
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
    authenticate,
    authorsController.create
);

router.put(
    "/:id",
    validateAuthor.update,
    /* #swagger.tags = ['authors']
  #swagger.description = 'Update an existing author by ID.'
  #swagger.parameters['id'] = {
     in: 'path',
     description: 'Author ID',
     required: true,
     type: 'string'
  }
  #swagger.parameters['body'] = {
     in: 'body',
     description: 'Author data',
     required: true,
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
    authenticate,
    authorsController.update
);

router.delete(
    "/:id",
    /* #swagger.tags = ['authors']
  #swagger.description = 'Delete an existing author by ID.'
  #swagger.parameters['id'] = {
     in: 'path',
     description: 'Author ID',
     required: true,
     type: 'string'
  }
*/
    authenticate,
    authorsController.delete
);
module.exports = router;
