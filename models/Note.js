const mongoose = require("mongoose");

module.exports = mongoose.model("Note", new mongoose.Schema({
	article_id: String,
	content: String,
}));