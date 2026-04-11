const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const connectDB = require("./database/db");
const passport = require("passport");
const session = require("express-session");
const GitHubstrategy = require("passport-github2").Strategy;
const cors = require("cors");

if (process.env.NODE_ENV !== "test") {
    connectDB();
}

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}
// Session configuration
app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: false
    })
);
// Initialize Passport and restore authentication state, if any, from the session.
app.use(express.json()).use(passport.initialize()).use(passport.session());

// ✅ Swagger UI ONLY (this is enough)
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/", require("./routes"));

passport.use(
    new GitHubstrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.CALLBACK_URL
        },
        (accessToken, refreshToken, profile, done) => {
            // User.findOrCreate({ githubId: profile.id }, function (err, user) => {
            done(null, profile);
            //});
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

process.on("uncaughtException", (err, origin) => {
    console.log(`Caught exception: ${err}\nException origin: ${origin}`);
});

// Test route to check if the user is logged in
// Root Route
app.get("/", (req, res) => {
    res.send(
        req.session.user ? `Hello, you logged in as ${req.session.user.username}!` : "Logged Out"
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

if (process.env.NODE_ENV !== "test") {
    app.listen(port, () => {
        console.log(`\nWeb server is listening at \x1b[34mhttp://localhost:${port}\x1b[0m`);
    });
}

module.exports = app;
