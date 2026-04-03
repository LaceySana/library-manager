// REQUIRE STATEMENTS
const express = require("express");
const app = express();
require("dotenv").config();
const mongodb = require("./database/db");    
const bodyParser = require("body-parser");  
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const session = require("express-session");
const cors = require("cors");


const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        next();
    })

    .use(cors({origin: "*"}))
    .use("/", require("./routes"))
    .use("/api-docs", require("./routes/swagger"));


passport.use(
	new GitHubStrategy(
		{
			clientID: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
			callbackURL: process.env.CALLBACK_URL,
		},
		(accessToken, refreshToken, profile, done) => {
			// User.findOrCreate({ githubId: profile.id }, function (err, user) => {
			done(null, profile);
			//});
		},
	),
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

process.on("uncaughtException", (err, origin) => {
	console.error(`Caught exception: ${err}\nException origin: ${origin}`);
	process.exit(1);
});

app.get("/", (req, res) => {
	res.send(
		req.session.user
			? `Hello, you logged in as ${req.session.user.username}!`
			: "Logged Out",
	);
});

app.get(
	"/github/callback",
	passport.authenticate("github", {
		failureRedirect: "/api-docs",
		session: true,
	}),
	(req, res) => {
		req.session.user = req.user;
		res.redirect("/");
	},
);

mongodb.initDb((err) => {
	if (err) {
		console.error("Database initialization failed:", err);
		console.warn(
			"Starting server without a database connection (development mode).",
		);
		app.listen(port, () => {
			console.log(`Server is running on http://localhost:${port}`);
		});
	} else {
		app.listen(port, () => {
			console.log(`Server is running on http://localhost:${port}`);
		});
	}
});