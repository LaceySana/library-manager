const Util = {};

// Middleware that wraps functions with a try-catch block to handle errors in async functions
Util.handleErrors = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// Maps over an object's properties and applies a transformation function to each function value
Util.mapProperties = (obj, callback) =>
    Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [
            key,
            typeof value === "function" ? callback(value) : value
        ])
    );

Util.mapObject = (obj, callback) =>
    Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [
            key,
            value && typeof value === "object" && !Array.isArray(value) ? callback(value) : value
        ])
    );

Util.mapObjects = (obj, callback) =>
    Util.mapObject(obj, (inner) => Util.mapProperties(inner, callback));

module.exports = Util;
