const { handleErrors, mapObjects } = require("../utils");

const controllers = {
    authorsController: require("./authors")
    // ,booksController: require("./books")
};

// Export all controllers with their handlers wrapped in error handling middleware
module.exports = mapObjects(controllers, handleErrors);
