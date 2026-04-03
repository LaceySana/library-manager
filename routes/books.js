const router = require("express").Router();
const { bookController } = require("../controllers");
// const validator = require("../middleware/validate");

router.get(
  "/",
  /* #swagger.description = 'Get all books.'
     #swagger.tags = ['books']
  */
  bookController.getAll
);
router.get(
  "/:id", 
  /* #swagger.description = 'Get one book by ID.'
     #swagger.tags = ['books']
  */
  bookController.get
);

router.post(
  "/", 
  /* #swagger.description = "Create a new book."
     #swagger.tags = ["books"]
     #swagger.parameter["body"] = {
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
  /* validator.createBook, */
  bookController.create
);
router.put(
  "/:id",
  /* #swagger.description = "Update book by ID."
     #swagger.tags = ["books"]
     #swagger.parameter["body"] = {
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
    }
  */
  /* validator.updateBook, */
  bookController.update
);
router.delete(
  "/:id", 
  /* #swagger.description = 'Delete book by ID.'
     #swagger.tags = ['books']
  */
  bookController.delete
);

module.exports = router;
