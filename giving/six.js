var donations = [
	[
		["https://www.fistulafoundation.org/donate/", "Fistula Foundation"],
		["http://www.donorschoose.org/", "Donor&apos;s Choose"],
		["http://www.donorschoose.org/", "Donor&apos;s Choose"],
		["https://www.sfspca.org/get-involved/donate", "SF SPCA"],
		["http://www.accfb.org/donation/", "Alameda County Community Food Bank"],
		["http://www.pinestreetinn.org/donate", "Pine Street Inn"],
		["http://www.projectnightnight.org/Donate.html", "Project Night Night"],
		["https://secure2.convio.net/lirs/site/Donation2?df_id=1441&1441.donation=form1#.VDNg1q2vBhE", "Lutheran Immigration and Refugee Service"],
		["https://shop.stjude.org/GiftCatalog/donation.do?cID=14262&pID=24671", "St. Jude Children&apos;s Research Hospital"],
		["http://www.plantchicago.com/non-profit/donate/", "Plant Chicago"],
		["https://www.olin.edu/invest/ways/making-your-gift-olin-college/", "Olin College"],
		["http://www.stbaldricks.org/", "St. Baldrick&apos;s Foundation"],
		["http://eyfp.org/donate/", "Elmhurst&ndash;Yorkfield Food Pantry"],
		["https://secure3.convio.net/jdrf3/site/Donation2?2376.donation=form1&df_id=2376", "JDRF"]
	],
	[
		["http://adaywithouttouch.org/yaytiffany", "A Day Without Touch/Doctors Without Borders"],
		["http://www.nyyouthsymphony.org/support/donate", "New York Youth Symphony"],
		["http://www.nyyouthsymphony.org/support/donate", "New York Youth Symphony"],
		["http://www.projectnightnight.org/Donate.html", "Project Night Night"],
		["http://www.accfb.org/donation/", "Alameda County Community Food Bank"],
		["http://www.donorschoose.org/project/help-me-make-my-students-engineers-with/1377208/", "Donor&apos;s Choose"],
		["https://donate.wikimedia.org/w/index.php?title=Special:FundraiserLandingPage&country=US&uselang=en&utm_medium=sidebar&utm_source=donate&utm_campaign=C13_wikimediafoundation.org", "Wikimedia Foundation"],
		["https://donate.hrw.org/ea-action/action?ea.client.id=1908&ea.campaign.id=32607", "Human Rights Watch"],
		[],
		["https://secure.qgiv.com/for/cnt", "Center for Neighborhood Technology"],
		["https://donate.charitywater.org/donate", "Charity:Water"],
		["http://www.heifer.org/gift-catalog/animals-nutrition/index.html", "Heifer International"],
		["http://eyfp.org/donate/", "Elmhurst&ndash;Yorkfield Food Pantry"],
		[]
	],
	[
		["https://rally.org/theMOVE/c/dXCImx6EYOL#", "theMOVE"],
		["http://resiliencelaw.org/", "Resiliency Advocacy Project"],
		["https://www.commitchange.com//wa/olympia/capital-recovery-center", "Capital Recovery Center"],
		["https://supporters.eff.org/donate", "Electronic Frontier Foundation"],
		[],
		["http://twloha.com/donate", "To Write Love on Her Arms"],
		["https://www.olin.edu/invest/ways/making-your-gift-olin-college/", "Olin College"],
		["https://donatenow.networkforgood.org/1439676", "Harvard Square Homeless Shelter"],
		[],
		["http://www.workingbikes.org/about/", "Working Bikes"],
		["http://www.endowmentinstitute.org/support-our-work/", "Sustainable Endowments Institute"],
		["http://www.ferguson.lib.mo.us", "Ferguson Public Library"],
		["http://eyfp.org/donate", "Elmhurst&ndash;Yorkfield Food Pantry"],
		[]
	],
	[

		["http://www.arlboston.org/", "Animal Rescue League of Boston"],
		["http://www.theveraproject.org/", "The Vera Project"],
		["https://www.commitchange.com//wa/olympia/capital-recovery-center", "Capital Recovery Center"],
		["http://www.missionbit.com/donate/", "Mission Bit"],
		[],
		["http://neofuturists.org/get-involved/", "Neofuturists"],
		["http://csacares.org/", "Community Services Agency"],
		["http://www.sparechangenews.net/", "Spare Change News"],
		[],
		["http://www.solid-ground.org/Pages/Default.aspx", "Solid Ground"],
		[],
		["http://fosterkidscharity.org/How_You_Can_Help.html", "Foster Kids Charity"],
		["http://dupagepads.org/donate/", "DuPage Pads"],
		[]
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
	"ninth",
	"tenth",
	"eleventh",
	"twelfth",
	"thirteenth",
	"fourteenth"
]

var AddContent = function() {
	// modify table for large screens
	var rounds = donations.length;
	var people = classes.length;

	for (var i = 0; i < rounds; i++) {
		var currentRound = "round-" + (i+1);
		$("#scorecard table").append('<tr class="' + currentRound + '"><td>Round ' + (i+1) + '</td></tr>');

		for (var j = 0; j < people; j++) {
			if (donations[i][j].length > 0) {
				var charity = donations[i][j];

				// append to table for large screens
				$('#scorecard .' + currentRound).append('<td class="' + classes[j] + '"><a href="' + charity[0] + '"></a></td>');
				$('.touchable').append('<div class="' + classes[j] + '"><div class="flyout"><p>Round ' + (i+1) + ': <a href="' + charity[0] + '">' + charity[1] + '</a></p>');
			} else {
				$("#scorecard ." + currentRound).append('<td class="missing"></td>');
			}
		}
	}
}

AddContent();