const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const connectDB = require("./database/db");
const cors = require("cors");
const path = require("path");

connectDB();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// ✅ Serve swagger.json properly
app.use("/swagger.json", express.static(path.join(__dirname, "swagger.json")));

// ✅ Swagger UI (make sure this exists somewhere)
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Root route
app.get("/", (req, res) => {
    res.send("API is running...");
});

// Routes
app.use("/", require("./routes"));

process.on("uncaughtException", (err, origin) => {
    console.log(`Caught exception: ${err}\nException origin: ${origin}`);
});

app.listen(port, () => {
    console.log(`Web server is listening at http://localhost:${port}`);
});