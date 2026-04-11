const router = require("express").Router();
const { booksController } = require("../controllers");
const { validateBook } = require("../validation");
const { authenticate } = require("../middleware/authentication");

// DEBUG ROUTE (shows ALL books including soft deleted)
router.get(
    "/debug/all",
    /* #swagger.tags = ['debug']
       #swagger.description = 'Get ALL books including soft deleted (debug only)'
    */
    async (req, res) => {
        try {
            const booksModel = require("../models/books");
            const books = await booksModel.find({});
            res.status(200).json(books);
        } catch (error) {
            res.status(500).json({ message: "Error fetching debug data", error });
        }
    }
);

//GET ALL
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
    validateBook.create,
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
    authenticate,

    booksController.create
);

router.put(
    "/:id",
    validateBook.update,
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
    authenticate,
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
    authenticate,
    booksController.delete
);

module.exports = router;
