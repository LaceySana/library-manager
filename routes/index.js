const router = require("express").Router();

/* #swagger.start */

// Swagger route
router.use("/", require("./swagger"));

// Author Routes
router.use("/authors", require("./authors"));

// Book Routes
router.use("/books", require("./books"));

// Member Routes
router.use("/members", require("./members"));

// Loan Routes
router.use("/loans", require("./loans"));

/* #swagger.end */

module.exports = router;
