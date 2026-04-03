const router = require("express").Router();

router.use("/", require("./swagger"));

//Author Routes
router.use("/authors", require("./authors"));
// Book Routes
router.use("/books", require("./books"));

module.exports = router;
