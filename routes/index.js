const router = require("express").Router();

router.use("/", (req, res) => {
    res.send("Hello World");
});

// Book Routes
router.use("/books", require("./books"));

module.exports = router;
