const dotenv = require("dotenv");
dotenv.config();
const { MongoClient } = require("mongodb");

let data = null;

const initDb = (callback) => {
	if (data) {
		console.log("Using existing database connection");
		return callback(null, data);
	}

	const url = process.env.MONGO_URL;
	if (!url) {
		console.warn("MONGO_URL not set — continuing without database connection");
		return callback(null, null);
	}

	MongoClient.connect(url)
		.then((client) => {
			data = client;
			console.log("Connected to MongoDB");
			callback(null, data);
		})
		.catch((err) => {
			console.error("MongoDB connection error:", err);
			callback(err);
		});
};

const getdata = () => {
	if (!data) {
		throw new Error("No database connection");
	}
	return data;
};

module.exports = {
	initDb,
	getdata,
};