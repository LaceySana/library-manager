const { handleErrors, mapObjects } = require("../utils");

const controllers = {
    authorsController: require("./authors"),
    booksController: require("./books"),
    membersController: require("./members"),
    loansController: require("./loans")
};

module.exports = mapObjects(controllers, handleErrors);