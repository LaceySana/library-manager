const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const connectDB = require("./database/db");
const passport = require("passport");
const session = require("express-session");
const GitHubstrategy = require("passport-github2").Strategy;
const cors = require("cors");

connectDB();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(
    session({
        secret: process.env.SESSION_SECRET || "secret",
        resave: false,
        saveUninitialized: false
    })
);

app.use(passport.initialize()).use(passport.session());

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/", require("./routes"));

passport.use(
    new GitHubstrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.CALLBACK_URL
        },
        (accessToken, refreshToken, profile, done) => {
            done(null, profile);
        }
    )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

process.on("uncaughtException", (err, origin) => {
    console.log(`Caught exception: ${err}\nException origin: ${origin}`);
});

app.get("/", (req, res) => {
    res.send(
        req.session.user
            ? `Hello, you logged in as ${req.session.user.username}!`
            : "Logged Out"
    );
});

app.get(
    "/github/callback",
    passport.authenticate("github", {
        failureRedirect: "/api-docs",
        session: true
    }),
    (req, res) => {
        req.session.user = req.user;
        res.redirect("/");
    }
);

// Only start server when run directly, not when required by tests
if (require.main === module) {
    app.listen(port, () => {
        console.log(`\nWeb server is listening at \x1b[34mhttp://localhost:${port}\x1b[0m`);
    });
}

module.exports = app;