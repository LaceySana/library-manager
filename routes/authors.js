const router = require("express").Router();

// const validation = require('./validation/authors');
// const validateAuthor = require('./middleware/validate');

const { authorsController } = require("../controllers");

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
    /*validation.createRules, validateAuthor, */
    authorsController.create
);

router.put(
    "/:id",
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
    /*validation.updateRules, validateAuthor, */
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
    authorsController.delete
);

module.exports = router;
