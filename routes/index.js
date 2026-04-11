const router = require("express").Router();
const passport = require("passport");
const { handleErrors } = require("../utils");

/* #swagger.start */

// Swagger route
router.use("/", require("./swagger"));

// Authentication Routes
router.get(
    "/login",
    passport.authenticate("github"),
    handleErrors((req, res) => {})
);

router.get(
    "/logout",
    handleErrors((req, res) => {
        req.logout((err) => {
            if (err) {
                return res.status(500).json({ message: "Error logging out." });
            }
            res.redirect("/");
        });
    })
);

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
