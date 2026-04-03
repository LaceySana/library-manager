const router = require("express").Router();
const { booksController } = require("../controllers");
// const validator = require("../middleware/validate");

router.get(
    "/",
    /* #swagger.description = 'Get all books.'
       #swagger.tags = ['books']
    */
    booksController.getAll
);

router.get(
    "/:id",
    /* #swagger.description = 'Get one book by ID.'
       #swagger.tags = ['books']
       #swagger.parameters['id'] = {
          in: 'path',
          description: 'Book ID',
          required: true,
          type: 'string'
       }
    */
    booksController.get
);

router.post(
    "/",
    /* #swagger.description = "Create a new book."
       #swagger.tags = ["books"]
       #swagger.parameters['body'] = {
          in: 'body',
          description: 'Book data',
          required: true,
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
       }
    */
    /* validator.createBook, */
    booksController.create
);

router.put(
    "/:id",
    /* #swagger.description = "Update book by ID."
       #swagger.tags = ["books"]
       #swagger.parameters['id'] = {
          in: 'path',
          description: 'Book ID',
          required: true,
          type: 'string'
       }
       #swagger.parameters['body'] = {
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
       }
    */
    /* validator.updateBook, */
    booksController.update
);

router.delete(
    "/:id",
    /* #swagger.description = 'Delete book by ID.'
       #swagger.tags = ['books']
       #swagger.parameters['id'] = {
          in: 'path',
          description: 'Book ID',
          required: true,
          type: 'string'
       }
    */
    booksController.delete
);

module.exports = router;
