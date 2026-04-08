const router = require("express").Router();
const { booksController } = require("../controllers");
const validate = require("../middleware/validate");

//Validation rules
const bookRules = {
    title: "required|string",
    authorId: "required|string",
    isbn: "required|string",
    copiesOwned: "required|integer|min:0",
    copiesAvailable: "required|integer|min:0"
};

// UPDATE rules (optional fields allowed)
const updateBookRules = {
    title: "string",
    authorId: "string",
    isbn: "string",
    copiesOwned: "integer|min:0",
    copiesAvailable: "integer|min:0"
};

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
     validate(bookRules),
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
     validate(updateBookRules),
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