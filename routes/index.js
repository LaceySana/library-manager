const router = require("express").Router();

/* #swagger.start */

// Swagger route
router.use("/", require("./swagger"));

// Author Routes
router.use("/authors", require("./authors"));

// Book Routes
router.use("/books", require("./books"));

/* #swagger.end */

module.exports = router;
