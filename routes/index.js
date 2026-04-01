const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("Hello World");
});

//Author Routes
router.use("/authors", require("./authors"));

module.exports = router;
