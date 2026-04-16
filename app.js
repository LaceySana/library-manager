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

<<<<<<< Updated upstream
=======
// Session configuration
>>>>>>> Stashed changes
app.use(
    session({
        secret: process.env.SESSION_SECRET || "secret",
        resave: false,
        saveUninitialized: false
    })
);
<<<<<<< Updated upstream

app.use(passport.initialize()).use(passport.session());

=======

// Initialize Passport and restore authentication state, if any, from the session.
app.use(express.json())
    .use(passport.initialize())
    .use(passport.session());

// Swagger UI
>>>>>>> Stashed changes
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

<<<<<<< Updated upstream
=======
// Routes
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
        }
    )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
=======
        },
    ),
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});
>>>>>>> Stashed changes

process.on("uncaughtException", (err, origin) => {
    console.log(`Caught exception: ${err}\nException origin: ${origin}`);
});

<<<<<<< Updated upstream
=======
// Root Route
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
// Only start server when run directly, not when required by tests
=======
// Only start the server if this file is run directly (not imported by tests)
>>>>>>> Stashed changes
if (require.main === module) {
    app.listen(port, () => {
        console.log(`\nWeb server is listening at \x1b[34mhttp://localhost:${port}\x1b[0m`);
    });
}

<<<<<<< Updated upstream
module.exports = app;
=======
module.exports = app;
>>>>>>> Stashed changes
