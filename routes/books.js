const router = require("express").Router();
const bookController = require("../controllers/books");
// const validator = require("../middleware/validate");

router.get("/", bookController.getAll);
router.get("/:id", bookController.get);
router.post("/", /* validator.createBook, */ bookController.create);
router.put("/:id", /* validator.updateBook, */ bookController.update);
router.delete("/:id", bookController.delete);

module.exports = router;
