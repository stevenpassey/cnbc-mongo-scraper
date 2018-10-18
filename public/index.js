/*var article_array = [{title: "AbbVie shares fall after California insurance regulator sues company over alleged kickbacks", author: "CARMIN CHAPPELL", date: "SEPTEMBER 18, 2018", url: "https://www.cnbc.com/2018/09/18/abbvie-shares-fall-after-california-insurance-regulator-sues-company-over-alleged-kickbacks.html", summary: '<ul><li>AbbVie shares fell almost 3 percent on Tuesday following a lawsuit by the California Department of Insurance alleging that the pharmaceutical company gave health-care providers kickbacks to prescribe its arthritis drug Humira.</li><li>The allegations were brought to the attention of the department by a whistleblower.</li></ul>'},
					 {title: "Crypto exchanges are ripe for manipulation and aren't doing much to stop it, New York AG says", author: "KATE ROONEY", date: "SEPTEMBER 18, 2018", url: "https://www.cnbc.com/2018/09/18/ny-ag-cryptocurrency-exchanges-are-ripe-for-manipulation.html", summary: '<ul><li>A months-long investigation by the New York Attorney General’s office found that cryptocurrency exchanges are vulnerable to market manipulation and fall short on consumer protection. </li><li>In a 32-page report published Tuesday, the attorney general’s office highlighted issues of “transparency, fairness, and security” in crypto trading.</li><li>The "Virtual Markets Integrity Report” said that in many cases, exchanges are not doing much to stop unfair market practices. </li></ul>'}];
*/
var current_article_index = 0;
var saved_article_index = 0;
var saved_array = [];
var title_font = 36;
var article_array;
var current_note_title = "";
var current_note_element;

window.onload = function () {
	
	axios.get("/pull").then((res) => { 
		
		article_array = res.data;
		
		advanceArticle(0);

		sizeFooter();
		placeButtons();
		
		if(window.innerWidth > 680)
		{
			size_title_ellipsis();
		}
		else
		{
			size_title(document.getElementById("title"));
		}

		document.getElementById("title").onmousemove = function (e) {
		
			let newY = e.clientY + 10;
			let newX = e.clientX + 10;

			let currentWidth = document.getElementById("full-title").offsetWidth;
			let theLeftSide = newX + currentWidth;

			if(theLeftSide > window.innerWidth)
			{
				newX = newX - (theLeftSide - window.innerWidth);
			}

			document.getElementById("full-title").style.top = newY + "px";
			document.getElementById("full-title").style.left = newX + "px";
		}
	
		axios.get("/saved").then((res) => {
			saved_array = res.data;
			create_from_saved();
		});
	});
}

function create_from_saved()
{
	let article_array = saved_array;
	let current_article_index = saved_article_index
	
	if(article_array.length < 1)
	{
		return;
	}
	
	document.getElementById("saved-article-cards").classList.remove('empty');
	document.getElementById("saved-article-cards").innerHTML += `<div class="card__paragraph" onmouseenter="showRemoveButton(this)" onmouseleave="hideRemoveButton(this)">
																	<p class="card__site-placard">
																		<img src="https://www.google.com/s2/favicons?domain=cnbc.com"> 
																		&nbsp; <span class="card__link" onmouseup="newTabLink(event, '${article_array[current_article_index].url}')">CNBC &#8250</span>
																	</p>
																	<p class="card__title">
																		${article_array[current_article_index].title}
																	</p>
																	<div class="card__full-title">
																		${article_array[current_article_index].title}
																	</div>
																	<p class="card__author">
																		${article_array[current_article_index].author}
																		<span class="card__date">${article_array[current_article_index].date}</span>
																	</p>
																	<div class="remove-button" onmouseup="clickRemoveButton(this.parentElement)">
																		<svg width="50" height="60" version="1.1" xmlns="http://www.w3.org/2000/svg">
																				<line x1="30" y1="15" 
																					x2="20" y2="5" style="stroke-width:4" />
																			  
																				<line x1="20" y1="15" 
																					x2="30" y2="5" style="stroke-width:4" />
																		</svg>
																	</div>
																	<div class="notes-button" onmouseup="clickNotesButton(this.parentElement)">
																		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" enable-background="new 0 0 50 50">
																			<path d="M9.6 40.4l2.5-9.9L27 15.6l7.4 7.4-14.9 14.9-9.9 2.5zm4.3-8.9l-1.5 6.1 6.1-1.5L31.6 23 27 18.4 13.9 31.5z"/>
																			<path d="M17.8 37.3c-.6-2.5-2.6-4.5-5.1-5.1l.5-1.9c3.2.8 5.7 3.3 6.5 6.5l-1.9.5z"/>
																			<path d="M29.298 19.287l1.414 1.414-13.01 13.02-1.414-1.412z"/>
																			<path d="M11 39l2.9-.7c-.3-1.1-1.1-1.9-2.2-2.2L11 39z"/>
																			<path d="M35 22.4L27.6 15l3-3 .5.1c3.6.5 6.4 3.3 6.9 6.9l.1.5-3.1 2.9zM30.4 15l4.6 4.6.9-.9c-.5-2.3-2.3-4.1-4.6-4.6l-.9.9z"/>
																		</svg>
																	</div>
																</div>`
	size_title(document.querySelector("#saved-article-cards .card__paragraph:last-of-type .card__title"));
	
	saved_article_index++;
	
	document.getElementById("saved-article-cards").style.overflowX = "scroll";
	document.getElementById("saved-article-cards").style.overflowY = "hidden";
	
	
	if(saved_article_index > article_array.length - 1)
	{
		
	}
	else
	{
		setTimeout(create_from_saved, 50);
	}
}

window.onresize = function () {

	sizeFooter();
	placeButtons();

	if(document.getElementById("title").offsetHeight !== 86)
	{
		advanceArticle(0)
	}
}

function sizeFooter()
{
	if(window.innerHeight > 900)
	{
		document.getElementById("footer").style.height = ((window.innerHeight - 379) - (document.getElementById("paragraph").offsetHeight) - 110) + "px";
	}
}

function placeButtons()
{
	var beforeWidth = window.innerWidth;
	document.getElementById("up-arrow").style.top = (document.getElementById("site-placard").getBoundingClientRect().top - 20) + "px";
	document.getElementById("up-arrow").style.left = ((document.getElementById("site-placard").getBoundingClientRect().right + 15) - 60) + "px";

	document.getElementById("next-arrow").style.top = (document.getElementById("site-placard").getBoundingClientRect().top + 90) + "px";
	document.getElementById("next-arrow").style.left = ((document.getElementById("site-placard").getBoundingClientRect().right + 115)) + "px";
	
	document.getElementById("prev-arrow").style.top = (document.getElementById("site-placard").getBoundingClientRect().top + 90) + "px";
	document.getElementById("prev-arrow").style.left = ((document.getElementById("site-placard").getBoundingClientRect().left - 165)) + "px";

	if(parseInt(document.getElementById("next-arrow").style.left) > beforeWidth)
	{
		document.getElementById("next-arrow").style.top = (document.getElementById("site-placard").getBoundingClientRect().top - 67) + "px";
		document.getElementById("next-arrow").style.left = (beforeWidth - 50) + "px";
		
		document.getElementById("prev-arrow").style.top = (document.getElementById("site-placard").getBoundingClientRect().top - 67) + "px";
		document.getElementById("prev-arrow").style.left = "18px";
	}

	/*document.getElementById("up-arrow").style.top = document.getElementById("site-placard").getBoundingClientRect().top - 20;
	document.getElementById("up-arrow").style.left = (document.getElementById("site-placard").getBoundingClientRect().right + 15) - 60;*/
}

function newTabLink(e, href)
{
	if(e.button !== 2) 
	{ 
		window.open(href, '_blank'); 
	}
}

function size_title(element)
{
	if(element.offsetHeight > 86)
	{
		title_font = parseInt(window.getComputedStyle(element).getPropertyValue('font-size'));
		title_font -= 1;
		element.style.fontSize = title_font + "px";
		
		if(element.offsetHeight > 86)
		{
			size_title(element);
		}
		else
		{
			var halfPadding = Math.abs(86 - element.offsetHeight) / 2;
			element.style.paddingTop = halfPadding + "px";
			element.style.paddingBottom = halfPadding + "px";
		}
	}
}

function size_title_ellipsis()
{
	let newText = "";

	if(document.getElementById("title").offsetHeight !== 86)
	{
		let oldText = document.getElementById("title").textContent;
		document.getElementById("title").textContent = oldText.slice(0, -1);

		if(document.getElementById("title").offsetHeight > 86)
		{
			size_title_ellipsis();
		}
		else
		{
			document.getElementById("title").textContent = document.getElementById("title").textContent.slice(0, -3);

			let lastSpaceIndex = document.getElementById("title").textContent.lastIndexOf(" ");
			document.getElementById("title").textContent = document.getElementById("title").textContent.slice(0, lastSpaceIndex);

			newText = document.getElementById("title").textContent;

			document.getElementById("title").textContent += "...";
			document.getElementById("title").classList.add("ellipsis");

			document.getElementById("full-title").textContent = document.getElementById("full-title").textContent.replace(newText, "...");
		}
	}
}

function addToSaved()
{
	var alreadyAdded = false;
	saved_array.forEach(article => { 
		if(article.url === article_array[current_article_index].url)
		{
			alreadyAdded = true;
		}
	});
	if(alreadyAdded)
	{
		return;
	}
	
	article_array[current_article_index].date = todaysDate();
	
	axios.post("/save", article_array[current_article_index]).then((res) => {
		document.getElementById("saved-article-cards").classList.remove('empty');
		document.getElementById("saved-article-cards").innerHTML += `<div class="card__paragraph" onmouseenter="showRemoveButton(this)" onmouseleave="hideRemoveButton(this)">
																		<p class="card__site-placard">
																			<img src="https://www.google.com/s2/favicons?domain=cnbc.com"> 
																			&nbsp; <span class="card__link" onmouseup="newTabLink(event, '${article_array[current_article_index].url}')">CNBC &#8250</span>
																		</p>
																		<p class="card__title">
																			${article_array[current_article_index].title}
																		</p>
																		<div class="card__full-title">
																			${article_array[current_article_index].title}
																		</div>
																		<p class="card__author">
																			${article_array[current_article_index].author}
																			<span class="card__date">${article_array[current_article_index].date}</span>
																		</p>
																		<div class="remove-button" onmouseup="clickRemoveButton(this.parentElement)">
																			<svg width="50" height="60" version="1.1" xmlns="http://www.w3.org/2000/svg">
																					<line x1="30" y1="15" 
																						x2="20" y2="5" style="stroke-width:4" />
																				  
																					<line x1="20" y1="15" 
																						x2="30" y2="5" style="stroke-width:4" />
																			</svg>
																		</div>
																		<div class="notes-button" onmouseup="clickNotesButton(this.parentElement)">
																			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" enable-background="new 0 0 50 50">
																				<path d="M9.6 40.4l2.5-9.9L27 15.6l7.4 7.4-14.9 14.9-9.9 2.5zm4.3-8.9l-1.5 6.1 6.1-1.5L31.6 23 27 18.4 13.9 31.5z"/>
																				<path d="M17.8 37.3c-.6-2.5-2.6-4.5-5.1-5.1l.5-1.9c3.2.8 5.7 3.3 6.5 6.5l-1.9.5z"/>
																				<path d="M29.298 19.287l1.414 1.414-13.01 13.02-1.414-1.412z"/>
																				<path d="M11 39l2.9-.7c-.3-1.1-1.1-1.9-2.2-2.2L11 39z"/>
																				<path d="M35 22.4L27.6 15l3-3 .5.1c3.6.5 6.4 3.3 6.9 6.9l.1.5-3.1 2.9zM30.4 15l4.6 4.6.9-.9c-.5-2.3-2.3-4.1-4.6-4.6l-.9.9z"/>
																			</svg>
																		</div>
																	</div>`
		size_title(document.querySelector("#saved-article-cards .card__paragraph:last-of-type .card__title"));
		
		article_array[current_article_index]._id = res.data._id;
		
		saved_array.push(article_array[current_article_index]);

		if(saved_array.length > 1)
		{
			document.getElementById('notes-modal').style.display='none';
			document.getElementById("saved-article-cards").style.overflowX = "scroll";
			document.getElementById("saved-article-cards").style.overflowY = "hidden";
		}
	});
}

function todaysDate()
{
	var mydate = new Date();
	var year = mydate.getYear();
	
	if (year < 1000)
	{
		year += 1900;
	}

	var day = mydate.getDay();
	var month = mydate.getMonth();
	var day9 = mydate.getDate();

	if (day9 < 10)
	{
		day9 = "0" + day9;
	}
	var dayarray = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday")
	var montharray = new Array("January","February","March","April","May","June","July","August","September","October","November","December")

	return montharray[month] + " " + day9 + ", " + year;
}

function advanceArticle(amount)
{
	current_article_index = current_article_index + amount;
	
	if(current_article_index < 0)
	{
		current_article_index = 0;
		return;
	}
	else if(current_article_index > article_array.length - 1)
	{
		current_article_index-=1;
		return;
	}

	document.getElementById("title").textContent = article_array[current_article_index].title;
	document.getElementById("full-title").textContent = article_array[current_article_index].title;
	document.getElementById("card-link").onmouseup = function () { newTabLink(event, article_array[current_article_index].url) };
	
	if(window.innerWidth > 680)
	{
		size_title_ellipsis();
	}
	else
	{
		document.getElementById("title").classList.remove("ellipsis");
		size_title(document.getElementById("title"));
	}

	document.getElementById("author").firstChild.textContent = article_array[current_article_index].author + " ";
	document.getElementById("author").firstElementChild.textContent = article_array[current_article_index].date;
	
}

function showRemoveButton(element)
{
	element.classList.add("card__show-remove");
}

function hideRemoveButton(element)
{	
	element.classList.remove("card__show-remove");
}

function clickRemoveButton(element)
{
	let myId = saved_array.splice(Array.from(document.getElementById("saved-article-cards").children).indexOf(element), 1);
	axios.delete("/save/" + myId[0]._id).then((res) => {
		element.remove();
		
		if(saved_array.length < 2)
		{
			document.getElementById("saved-article-cards").style.overflowX = "hidden";
			document.getElementById("saved-article-cards").style.overflowY = "hidden";
		}
	});
}

function clickNotesButton(element)
{
	let newX = element.getBoundingClientRect().left;
	let newY = element.getBoundingClientRect().top;
	
	document.getElementById("saved-article-cards").style.overflowX = "hidden";
	
	document.getElementById("notes-modal").style.display = "block";
	document.getElementById("notes-modal").style.top = newY;
	document.getElementById("notes-modal").style.left = newX;
	
	document.getElementById("notes-list-ul").innerHTML = "";
	
	current_note_title = element.children[2].textContent.trim();
	current_note_element = element;
	
	var myArticleId = saved_array.find((value) => value.title === current_note_title)._id;
	
	axios.get("/note/" + myArticleId).then((res) => {
		
		var myNoteArray = res.data;
		
		if(myNoteArray.length > 0)
		{
			myNoteArray.forEach((db_object) => {
				clickAddNote(db_object);
			});
		}
	});
}

function clickAddNote(object_from_database)
{
	var myNoteText = object_from_database ? object_from_database.content : document.getElementById("note-add-input").value.trim();
	document.getElementById("note-add-input").value = "";
	
	var myArticleId = saved_array.find((value) => value.title === current_note_title)._id;
	
	var myNewListItem = document.createElement("li");
	myNewListItem.textContent = myNoteText;
	
	var myNewNoteObject = {
		article_id: myArticleId,
		content: myNoteText
	}
	
	
	var myDeleteButton = document.createElement("div");
	myDeleteButton.classList.add("note-delete-button");
	myDeleteButton.textContent = "X";
	
	if(!object_from_database)
	{
		axios.post("/note", myNewNoteObject).then((res) => {
			myDeleteButton.onclick = function (event) { clickDeleteNote(event.target.parentElement, res.data._id) };
		});
	}
	else
	{
		myDeleteButton.onclick = function (event) { clickDeleteNote(event.target.parentElement, object_from_database._id) };
	}
	
		myNewListItem.appendChild(myDeleteButton);
		
		document.getElementById("notes-list-ul").appendChild(myNewListItem);
}

function clickDeleteNote(element, note_id)
{
	axios.delete("/note/" + note_id).then((res) => {
		element.remove();
	});
}