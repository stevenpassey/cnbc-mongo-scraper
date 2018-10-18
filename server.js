const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");
const request = require("request");
const cheerio = require("cheerio");

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

const controller = require("./controllers/controller");

// Define API routes here
app.get("/pull", (req, res) => {
	
	request('http://www.cnbc.com', function (error, response, body) {
		
		const articles = [];
		const $ = cheerio.load(body);
		
		$("#pipeline_assetlist_1 .card .asset .headlineWrapper").each((index, div) => { 
		
			const article_object = {
				title: $(div).children(".headline").find("a").text().trim(),
				url: "https://www.cnbc.com" + $(div).children(".headline").find("a").attr("href"),
				author: $(div).children(".source").find("a").text() ? $(div).children(".source").find("a").first().text() : $(div).children(".source").text(),
				date: $(div).find("time").text()
			};
			
			articles.push(article_object);
		});
		
		res.json(articles);
	});
});

app.post("/save", controller.create);
app.delete("/save/:id", controller.delete);

app.get("/saved", controller.getSaved);

///////////////////////////////////////////

app.post("/note", controller.createNote);
app.delete("/note/:id", controller.deleteNote);

app.get("/note/:id", controller.getNotes);

// Send every other request to the React app
// Define any API routes before this runs

const db = process.env.MONGODB_URI || "mongodb://localhost/cnbcscrape";

mongoose.connect(db, function(error) {

	if (error) { console.error(error); }
	else { console.log("MongoDB connected to cnbcscrape"); }
  
	app.listen(PORT, () => {
		console.log(`Express Server now on port ${PORT}!`);
	});
});



