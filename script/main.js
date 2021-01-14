var gData;


// STEP 1

$.getJSON({
	url: "https://api.github.com/repos/thomasdavis/backbonetutorials/contributors",
	success: function(data) {

		gData = data;

		let htmlStr = "";

		htmlStr += formatData(htmlStr, data);

		document.getElementById("myTableBody").innerHTML = htmlStr;
	}

});

function formatData(tbodyStr, data) {

	for(let i = 0; i < data.length; i++) {

		// these if statements are part of Step 2
		if(data[i].contributions >= 10) {
			tbodyStr += "<tr class='gold'>";
		}
		else if (data[i].contributions >= 5) {
			tbodyStr += "<tr class='silver'>";
		}
		else {
			tbodyStr += "<tr class='bronze'>";
		}

		tbodyStr += "<td><img src='" + data[i].avatar_url + "'></img></td>" +
		"<td>" + data[i].id + "</td>" + 
		"<td>" + data[i].login + "</td>" + 
		"<td>" + data[i].url + "</td>" +
		"<td>" + data[i].contributions + "</td>" +
		"</tr>"
	}

	return tbodyStr;
}


// STEP 2

$('#showAll').on('click', function() {
	$('.gold').show();
	$('.silver').show();
	$('.bronze').show();
});

$('#showGold').on('click', function() {
	$('.gold').show();
	$('.silver').hide();
	$('.bronze').hide();
});

$('#showSilver').on('click', function() {
	$('.gold').hide();
	$('.silver').show();
	$('.bronze').hide();
});

$('#showBronze').on('click', function() {
	$('.gold').hide();
	$('.silver').hide();
	$('.bronze').show();
});


// STEP 3

$('#asc').on('click', function() {

	let sorted = gData.sort(function(a, b) {
		if(a.login.toLowerCase() < b.login.toLowerCase()) { return -1; }
		if(a.login.toLowerCase() > b.login.toLowerCase()) { return 1; }
		return 0;
	});

	let str = formatData("", sorted);
	document.getElementById("myTableBody").innerHTML = str;
});


$('#desc').on('click', function() {

	let sorted = gData.sort(function(a, b) {
		if(a.login.toLowerCase() > b.login.toLowerCase()) { return -1; }
		if(a.login.toLowerCase() < b.login.toLowerCase()) { return 1; }
		return 0;
	});

	let str = formatData("", sorted);
	document.getElementById("myTableBody").innerHTML = str;
});