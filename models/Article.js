const mongoose = require("mongoose");

module.exports = mongoose.model("Article", new mongoose.Schema({
	title: String,
	url: String,
	author: String,
	date: String
}));