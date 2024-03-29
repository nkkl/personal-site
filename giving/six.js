var donations = [
	[
		['PAWS Chicago', 'http://www.pawschicago.org/how-to-help/donate/'],
		['Olin College Alumni Merit Scholarship Fund','https://fundit.olin.edu/project/555a1d3109206579b4677801'],
		['Students Rising Above', 'http://studentsrisingabove.org/']
	],
	[
		['Slow Roll Chicago', 'http://www.slowrollchicago.org/donate/'],
		['MarketShare', 'http://buildthemarket.org/donate/'],
		['The Cara Program', 'https://cara.secure.force.com/donate']
	],
	[
		['Doctors Without Borders', 'http://www.doctorswithoutborders.org/'],
		['Central City Hospitality House', 'http://hospitalityhouse.org/'],
		['CHiPS', 'http://chipsonline.org/']
	],
	[
		['Revolutions Classroom Research Library', 'http://www.donorschoose.org/project/revolutions-classroom-research-library/1565268'],
		['Coping with Mental Illness and Disability', 'http://www.donorschoose.org/project/coping-with-mental-illness-and-disabilit/1577174/'],
		['Living Goods', 'http://livinggoods.org/donate-2/']
	],
	[
		['Code.org', 'https://code.org/donate'],
		['Olin College Alumni Merit Scholarship Fund','https://fundit.olin.edu/project/555a1d3109206579b4677801'],
		['Powerful Vocies', 'http://www.powerfulvoices.org/']
	],
	[
		['Olin College', 'https://www.olin.edu/invest/ways/making-your-gift-olin-college/'],
		['Women&apos;s Medical Fund', 'http://wmfwisconsin.org/'],
		['Lava Mae', 'http://www.lavamae.org/#!donate/cjiv']
	],
	[
		['Ada Initiative', 'https://adainitiative.org/donate/'],
		['charity: water', 'https://donate.charitywater.org/donate'],
		['City Harvest', 'http://www.cityharvest.org/']
	],
	[
		['App Camp for Girls', 'https://www.indiegogo.com/projects/app-camp-for-girls-3-0/x/3976761#/story'],
		['Girl Scouts of Western Washington', 'https://www.indiegogo.com/projects/girl-scouts-is-foreverygirl#/story']
	],
	[
		['This American Life', 'http://www.thisamericanlife.org/donate'],
		['Project VOICE', 'http://www.virgin.com/unite/donate/project-voice'],
		['Risig Sun', 'http://www.risingsunkent.com/']
	]
]

var classes = [
	"first",
	"second",
	"third",
	"fourth",
	"fifth",
	"sixth",
	"seventh",
	"eighth",
	"ninth"
]

var AddContent = function() {
	// modify table for large screens
	var rounds = 6;
	var people = classes.length;

	// appened a new row for each person
	// then append a new column for each donation
	for (var i = 0; i < people; i++) {
		$("#scorecard table").append('<tr class="' + classes[i] + '"><td>Person ' + (i+1) + '</td></tr>');

		for (var j = 0; j < rounds; j++) {
			if (donations[i][j]) {
				var charity = donations[i][j];

				// append to table for large screens
				$('#scorecard .' + classes[i]).append('<td><a href="' + charity[1] + '" title="' + charity[0] + '"></a></td>');

				// append to div for small screens
				$('.touchable').append('<div class="' + classes[i] + '"><div class="flyout"><p>Round ' + (j+1) + ': <a href="' + charity[1] + '">' + charity[0] + '</a></p>');
			} else {
				$("#scorecard ." + classes[i]).append('<td class="missing"></td>');
			}
		}
	}
}

AddContent();