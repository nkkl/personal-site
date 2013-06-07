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

var titleText = function(canvas) {
	var width = parseInt(canvas.attr("width")) - 50;
	console.log(width);

	canvas
	.drawText({
		fillStyle: "#000",
		x: 110, y: 20,
		font: "24pt Open Sans, sans-serif",
		align: "left",
		maxWidth: width,
		text: "What is all this?"
	})
	.drawText({
		fillStyle: "#000",
		x: 400, y: 60,
		font: "12pt Open Sans, sans-serif",
		align: "left",
		maxWidth: width,
		text: "I thought it would be fun to see how well my friends knew me! So, I made a 10 question survey and built this page to visualize the results. Hopefully this data is as entertaining for you as it is for me."
	})
}

var heightChart = function(canvas, answers, x, y) {
	// bucket heights; my height +/- 2 in
	var bucketIndex = [">5'4\"", "5'4\"", "5'3\"", "5'2\"", "5'1\"", "5'0\"", "<5'0\""],
		buckets = {
			">5'4\"": 0,
			"5'4\"":  0,
			"5'3\"":  0,
			"5'2\"":  0,
			"5'1\"":  0,
			"5'0\"":  0,
			"<5'0\"":  0
		};

	// iterate through and bucket heights
	for (var i=0, max=answers.height.length; i<max; i++) {
		console.log(answers.height[i]);

		if ( answers.height[i] > 64 ) {
			buckets[ bucketIndex[0] ] += 1;
		} else if ( answers.height[i] == 64 ) {
			buckets[ bucketIndex[1] ] += 1;
		} else if ( answers.height[i] == 63 ) {
			buckets[ bucketIndex[2] ] += 1;
		} else if ( answers.height[i] == 62 ) {
			buckets[ bucketIndex[3] ] += 1;
		} else if ( answers.height[i] == 61 ) {
			buckets[ bucketIndex[4] ] += 1;
		} else if ( answers.height[i] == 60 ) {
			buckets[ bucketIndex[5] ] += 1;
		} else {
			buckets[ bucketIndex[6] ] += 1;
		}
	}

	console.log(buckets);

	// add title and text answer
	canvas
	.drawText({
		fillStyle: "#000",
		x: x+120, y: y+20,
		font: "24pt Open Sans, sans-serif",
		align: "left",
		text: "1. How tall am I?"
	})
	.drawText({
		fillStyle: "#000",
		x: x+580, y: y+254,
		font: "18pt Open Sans, sans-serif",
		align: "left",
		maxWidth: 350,
		text: "As it turns out, I'm a whopping 5'2\" tall."
	})

	// draw buckets
	var newx = x + 80,
		newy = y + 50,
		color = "#666";

	for ( i = 0, max = bucketIndex.length; i<max; i++ ) {
		// calculate width, scaled by number of people
		width = Math.round( (buckets[ bucketIndex[i] ] / answers.height.length) * 100) * 10;

		// if it's the right answer, highlight!
		if ( bucketIndex[i] == "5'2\"" ) {
			color = "#000"
		};

		// draw label
		canvas.drawText({
			fillStyle: "#000",
			x: newx, y: newy+25,
			font: "12pt Open Sans, sans-serif",
			text: bucketIndex[i]
		})

		// draw rectangle
		canvas.drawRect({
			fillStyle: color,
			x: newx+30, y: newy,
			width: width,
			height: 50,
			fromCenter: false
		});

		newy += 60;
		color = "#666"
	}
}

// ** Main script! **
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

// associative array for storing all of our data
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
	titleText(canvas)
	heightChart(canvas, answers, 0, 110);
});

$(window).resize(function() {
	windowResize( canvas, $(window).width() );
});