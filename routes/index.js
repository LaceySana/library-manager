const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("Hello World");
});

//Author Routes
router.use("/authors", require("./authors"));
// Book Routes
router.use("/books", require("./books"));

module.exports = router;
