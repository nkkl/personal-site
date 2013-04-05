var windowResize = function(canvas, width) {
	if ( width > 780 ) {
		// for 780+px, use 780x600 canvas
		canvas.attr("width", "780px");
		canvas.attr("height", "600px");
	} else if ( width > 480 ) {
		// for 480+px, use 480x600 canvas
		canvas.attr("width", "480px");
		canvas.attr("height", "600px")
	} else {
		// otherwise default to 360x600 canvas
		canvas.attr("width", "360px");
		canvas.attr("height", "600px");
	}

	// TODO: redraw all the things!
}

var heightChart = function(canvas, answers, x, y) {
	// bucket heights; my height +/- 2 in
	var buckets = {
		"under": 0,
		"60in":  0,
		"61in":  0,
		"62in":  0,
		"63in":  0,
		"64in":  0,
		"over":  0
	};

	// iterate through and bucket heights
	for (var i=0, max=answers.height.length; i<max; i++) {
		console.log(answers.height[i]);

		if ( answers.height[i] < 60 ) {
			buckets["under"] += 1;
		} else if ( answers.height[i] == 60 ) {
			buckets["60in"] += 1;
		} else if ( answers.height[i] == 61 ) {
			buckets["61in"] += 1;
		} else if ( answers.height[i] == 62 ) {
			buckets["62in"] += 1;
		} else if ( answers.height[i] == 63 ) {
			buckets["63in"] += 1;
		} else if ( answers.height[i] == 64 ) {
			buckets["64in"] += 1;
		} else {
			buckets["over"] += 1;
		}
	}

	console.log(buckets);

	canvas.drawText({
		fillStyle: "#9cf",
		x: 150, y: 100,
		font: "36pt Verdana, sans-serif",
		text: "Hello"
	});
}

$(document).ready(function() {
	// correctly size our canvas
	var canvas = $("#tenquestions");

	if ( $(window).width() > 780 ) {
		// for 780+px, use 780x600 canvas
		canvas.attr("width", "780px");
		canvas.attr("height", "600px");
	} else if ( $(window).width() > 480 ) {
		// for 480+px, use 480x600 canvas
		canvas.attr("width", "480px");
		canvas.attr("height", "600px")
	} // else default to 360x600 canvas

	var answers = {
		closeness: 	[],
		height: 	[],
		race: 		[],
		born: 		[],
		eyes: 		[],
		handedness: [],
		orientation:[],
		state: 		[],
		phoneOS: 	[],
		pets: 		[],
		travel: 	[]
	};

	// parse JSON and add answers to array
	$.getJSON("https://spreadsheets.google.com/feeds/list/0ArWU2T0HEMrldDc3YXg2TDYwcmFhTFFER0VnMmYtekE/od6/public/values?alt=json",
		function(data) {
			for (i=0;i<data.feed.entry.length;i++) {
				var entry = data.feed.entry[i];

				answers.closeness.push( parseInt(entry["gsx$howwelldoyouknowme"].$t) );
				answers.height.push( parseInt(entry["gsx$whatismyheight"].$t) );
				answers.race.push( entry["gsx$whatismyrace"].$t );
				answers.born.push( entry["gsx$whenwasiborn"].$t );
				answers.eyes.push( entry["gsx$whatismyeyecolor"].$t );
				answers.handedness.push( entry["gsx$amirightorlefthanded"].$t );
				answers.orientation.push( entry["gsx$whatismysexualorientation"].$t );
				answers.state.push( entry["gsx$whatstateamifrom"].$t );
				answers.phoneOS.push( entry["gsx$whatphoneosdoiuse"].$t );
				answers.pets.push( entry["gsx$doilikecatsordogs"].$t );
				answers.travel.push( parseInt(entry["gsx$howmanycountrieshaveibeento"]).$t );
			}

		// TODO: remove this
		console.log(answers);
		heightChart(canvas, answers, 0, 0);
	});

	$(window).resize(function() {
		windowResize( canvas, $(window).width() );
	});

})