const router = require("express").Router();
const passport = require("passport");

/* #swagger.start */

// Swagger route
router.use("/", require("./swagger"));

// Authentication Routes
router.get("/login", passport.authenticate("github"), (req, res) => {});

router.get("/logout", (req, res) => {
	req.logout((err) => {
		if (err) {
			return res.status(500).json({ message: "Error logging out." });
		}
		res.redirect("/");
	});
});

// Author Routes
router.use("/authors", require("./authors"));

// Book Routes
router.use("/books", require("./books"));

/* #swagger.end */

module.exports = router;
