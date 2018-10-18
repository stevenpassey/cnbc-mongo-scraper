const Article = require("../models/Article");
const Note = require("../models/Note");

module.exports = {
	create: (req, res) => {
		Article.create(req.body).then((doc) => {
			res.json(doc);
		}).catch((error) => { res.json(error) });
	},
	
	delete: (req, res) => {
		Article.deleteOne({_id: req.params.id}).then((doc1) => {
			
			Note.deleteMany({article_id: req.params.id}).then((doc) => {
				res.json(doc);
			}).catch((error) => { res.json(error) });
			
		}).catch((error) => { res.json(error) });
	},
	
	getSaved: (req, res) => {
		Article.find().then((doc) => {
			res.json(doc);
		}).catch((error) => { res.json(error); });
	},
	
	//////////////////////////////////////////////
	
	createNote: (req, res) => {
		Note.create(req.body).then((doc) => {
			res.json(doc);
		}).catch((error) => { res.json(error) });
	},
	
	getNotes: (req, res) => {
		Note.find({article_id: req.params.id}).then((doc) => {
			res.json(doc);
		}).catch((error) => { res.json(error); });
	},
	
	deleteNote: (req, res) => {
		Note.deleteOne({_id: req.params.id}).then((doc) => {
			res.json(doc);
		}).catch((error) => { res.json(error) });
	}
}