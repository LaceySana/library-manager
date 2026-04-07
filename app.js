// REQUIRE STATEMENTS
const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const connectDB = require("./database/db");
const cors = require("cors");

connectDB();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

//Root route for testing
app.get("/", (req, res) => {
    res.send("API is running...");
});
//routes
app.use("/", require("./routes"));

    /*removing this block to reduce redundancy, keeping just app.use(cors)*/
   // .use((req, res, next) => {
     //   res.setHeader("Access-Control-Allow-Origin", "*");
       // next();
    //})

process.on("uncaughtException", (err, origin) => {
    console.log(`Caught exception: ${err}\nException origin: ${origin}`);
});

app.listen(port, () => {
    console.log(`Web server is listening at http://localhost:${port}`);
});