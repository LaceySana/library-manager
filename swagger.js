const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "Library Manager API",
        description: "API for managing library members, book inventory, authors, and loans."
    },
    tags: [
        {
            name: "authors",
            description: "Endpoints for managing authors"
        },
        {
            name: "books",
            description: "Endpoints for managing books"
        }
    ]
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
