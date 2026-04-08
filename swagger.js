const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "Library Manager API",
        description: "API for managing library members, book inventory, authors, and loans."
    },
   host: process.env.RENDER_EXTERNAL_URL
  ? process.env.RENDER_EXTERNAL_URL.replace(/^https?:\/\//, "")
  : `localhost:${process.env.PORT || 5000}`,

schemes: process.env.RENDER_EXTERNAL_URL ? ["https"] : ["http"],

    basePath: "/", 

    tags: [
        {
            name: "authors",
            description: "Endpoints for managing authors"
        },
        {
            name: "books",
            description: "Endpoints for managing books"
        },
        {
        name: "debug",
        description: "Debug endpoints (includes soft deleted data)"
    }
    ]
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];
/*const endpointsFiles = [
    "./routes/books.js",
    "./routes/authors.js"
];
*/
swaggerAutogen(outputFile, endpointsFiles, doc);
