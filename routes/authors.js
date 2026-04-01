const router = require("express").Router();

// const validation = require('./validation/authors');
// const validateAuthor = require('./middleware/validate');

const { authorsController } = require("../controllers");

// Get all authors
router.get("/", authorsController.getAll);
router.get("/:id", authorsController.get);

router.post("/", /*validation.createRules, validateAuthor,*/ authorsController.create);
router.put("/:id", /*validation.updateRules, validateAuthor,*/ authorsController.update);
router.delete("/:id", authorsController.delete);

module.exports = router;
