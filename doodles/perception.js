var AgeArr = [];
var HeightArr = [];
var HandArr = [];
var OrientationArr = [];
var RaceArr = [];

// grab the data
$.getJSON("https://spreadsheets.google.com/feeds/list/1l71KALwUMgPlJaDMovu68U4ggLQajUyENiM_xhUzdFE/od6/public/values?alt=json-in-script&callback=?",
		function(data) {
			// parse JSON and push data into the list of answers
			for (i=0;i<data.feed.entry.length;i++) {
				var entry = data.feed.entry[i];
				var response = {
					// pull out each person's responses
					age: entry["gsx$Age"].$t,
					ageConf: entry["gsx$AgeConf"].$t,
					height: entry["gsx$HeightConf"].$t,
					heightConf: entry["gsx$HeightConf"].$t,
					hand: entry["gsx$Hand"].$t,
					handConf: entry["gsx$HandConf"].$t,
					orient: entry["gsx$Orient"].$t,
					orientConf: entry["gsx$OrientConf"].$t,
					race: entry["gsx$Race"].$t,
					closeness: entry["gsx$Closeness"].$t,
					rAge: entry["gsx$RespAge"].$t,
					rHeight: entry["gsx$RespHeight"].$t,
					rHand: entry["gsx$RespHand"].$t,
					rOrient: entry["gsx$RespOrient"].$t,
					rRace: entry["gsx$RespRace"].$t
				};

				// capture age data
				

				// percentage of income donated
				var percentage = Math.round(10000*parseInt(donor.donation)/parseInt(donor.income))/100;

				donorList.push(donor);

				// capture relationship
				switch (donor.friendship) {
					case 'real life friends':
						irlDonors.push([parseInt(donor.income), parseInt(donor.donation)]);
						irlPercentages.push([parseInt(donor.income), percentage]);
						// capture income histogram
						irlIncomeDistribution[Math.ceil(donor.income/25000) - 1]++;
						// capture donation histogram
						irlDonationDistribution[Math.ceil(donor.donation/2500) - 1]++;
						// capture percentage histogram
						irlPercentageDistribution[Math.ceil(percentage/5) - 1]++;
						break;
					case 'internet friends':
						internetDonors.push([parseInt(donor.income), parseInt(donor.donation)]);
						internetPercentages.push([parseInt(donor.income), percentage]);
						// capture income histogram
						internetIncomeDistribution[Math.ceil(donor.income/25000) - 1]++;
						// capture donation histogram
						internetDonationDistribution[Math.ceil(donor.donation/2500) - 1]++;
						// capture percentage histogram
						internetPercentageDistribution[Math.ceil(percentage/5) - 1]++;
						break;
					case 'strangers':
						strangerDonors.push([parseInt(donor.income), parseInt(donor.donation)]);
						strangerPercentages.push([parseInt(donor.income), percentage]);
						// capture income histogram
						strangerIncomeDistribution[Math.ceil(donor.income/25000) - 1]++;
						// capture donation histogram
						strangerDonationDistribution[Math.ceil(donor.donation/2500) - 1]++;
						// capture percentage histogram
						strangerPercentageDistribution[Math.ceil(percentage/5) - 1]++;
						break;
				}

				
			}

	graphData();
});