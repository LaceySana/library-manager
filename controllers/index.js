const { handleErrors, mapObjects } = require("../utils");

const controllers = {
    authorsController: require("./authors"),
    ontroller: require("./products")
};

// Export all controllers with their handlers wrapped in error handling middleware
module.exports = mapObjects(controllers, handleErrors);
