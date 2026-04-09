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

// ✅ Swagger UI ONLY (this is enough)
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
    console.log(`\nWeb server is listening at \x1b[34mhttp://localhost:${port}\x1b[0m`);
});
