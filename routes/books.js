const router = require("express").Router();
const booksController = require("../controller/books");
// const validator = require("../middleware/validate");

router.get("/", booksController.getAll);
router.get("/:id", booksController.getById);
router.post("/", /* validator.createBook, */ booksController.create);
router.put("/:id", /* validator.updateBook, */ booksController.update);
router.delete("/:id", booksController.delete);

module.exports = router;
