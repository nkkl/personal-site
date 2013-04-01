$(document).ready(function() {
	var answers = [];

	$.getJSON("https://spreadsheets.google.com/feeds/list/0ArWU2T0HEMrldDc3YXg2TDYwcmFhTFFER0VnMmYtekE/od6/public/values?alt=json",
		function(data) {
			// parse JSON and push data into the list of responses
			for (i=0;i<data.feed.entry.length;i++) {
				var entry = data.feed.entry[i];
				var answer = {
					// pull out answers
					closeness: parseInt(entry["gsx$howwelldoyouknowme"].$t),
					height: parseInt(entry["gsx$whatismyheight"].$t),
					race: entry["gsx$whatismyrace"].$t,
					born: entry["gsx$whenwasiborn"].$t,
					eyes: entry["gsx$whatismyeyecolor"].$t,
					handedness: entry["gsx$amirightorlefthanded"].$t,
					orientation: entry["gsx$whatismysexualorientation"].$t,
					state: entry["gsx$whatstateamifrom"].$t,
					phoneOS: entry["gsx$whatphoneosdoiuse"].$t,
					pets: entry["gsx$doilikecatsordogs"].$t,
					travel: parseInt(entry["gsx$howmanycountrieshaveibeento"]).$t
				};

				answers.push(answer);
			}
		// TODO: remove this
		console.log(answers);
		// TODO: add callback to draw graphs
	});
})