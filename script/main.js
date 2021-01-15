// (globalData)
var gData;


// STEP 1

$.getJSON({
	url: "https://api.github.com/repos/thomasdavis/backbonetutorials/contributors"
	})
	.then(function (data) {

		// passing data to a global variable
		gData = data;
		return data;
	})
	.then(async function (data) {

		for(let x = 0; x < data.length; x++) {
			let userURL = data[x].url;
			let userData = await $.getJSON({ url: userURL });

			data[x].company = userData.company;
			data[x].location = userData.location;
			data[x].email = userData.email;
		}

		// format data to an inner tbody string (excluding <tbody></tbody> tags)
		let htmlStr = formatData("", data);

		// change content inside <tbody></tbody> tags to htmlStr
		document.getElementById("myTableBody").innerHTML = htmlStr;
	})

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
		"<td>" + data[i].company + "</td>" +
		"<td>" + data[i].location + "</td>" +
		"<td>" + data[i].email + "</td>" +
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
	//document.getElementById("myTableBody").innerHTML = formatData("", gData);
	//$('.silver').empty();
	//$('.bronze').empty();

	$('.gold').show();
	$('.silver').hide();
	$('.bronze').hide();
});

$('#showSilver').on('click', function() {
	//document.getElementById("myTableBody").innerHTML = formatData("", gData);
	$('.gold').hide();
	$('.silver').show();
	$('.bronze').hide();
});

$('#showBronze').on('click', function() {
	//document.getElementById("myTableBody").innerHTML = formatData("", gData);
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