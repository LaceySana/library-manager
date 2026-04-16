const router = require("express").Router();
const passport = require("passport");

/* #swagger.start */

router.get("/login", passport.authenticate("github"), (req, res) => {});

router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: "Error logging out." });
        }
        res.redirect("/");
    });
});

router.use("/authors", require("./authors"));
router.use("/books", require("./books"));
router.use("/members", require("./members"));
router.use("/loans", require("./loans"));

// Member Routes
router.use("/members", require("./members"));

// Loan Routes
router.use("/loans", require("./loans"));

/* #swagger.end */

module.exports = router;