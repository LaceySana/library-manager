// REQUIRE STATEMENTS
const express = require("express");
const app = express();
require("dotenv").config();
const mongodb = require("./database/db");    
const bodyParser = require("body-parser");  

const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        next();
    })
    .use("/", require("./routes"));


process.on("uncaughtException", (err, origin) => {
	console.error(`Caught exception: ${err}\nException origin: ${origin}`);
	process.exit(1);
});

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