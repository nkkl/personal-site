// preinitialize our array of locations
var locations = [
	[{lat: 47.632066, lng: -122.320212}, 12],
	[{lat: 47.632066, lng: -122.320212}, 15],
	[{lat: 47.643159, lng: -122.320061}, 16],
	[{lat: 47.642039, lng: -122.316991}, 16],
	[{lat: 47.639701, lng: -122.313713}, 17],
	[{lat: 47.639701, lng: -122.313713}, 17],
	[{lat: 47.639701, lng: -122.313713}, 17],
	[{lat: 47.652733, lng: -122.320350}, 17],
	[{lat: 47.6492437, lng: -122.3063239}, 18]
]

var story = [
	["", ""],
	["09:30", "I leave my home on my bike towards Montlake, to catch the bike connector. It's sprinkling and a little chilly, so I have a long sleeve jacket, a raincoat, and gloves."],
	["09:35", "The road is pretty clear, and I make good time going down 10th. The hill there is quite steep, but the pavement is fairly smooth and the entire run is straight, so you can see far."],
	["09:37", "I turn onto Roanoke and then Delmar, which are in generally terrible condition. I notice that the bike lane is filled with debris after the previous night's rain. Since there are no cars in my direction, I take the lane."],
	["09:40", "This turns out to be a mistake. Coming down the last curve, I feel my wheel pull suddenly as I hit a crack in the road."],
	["10:00", "The next thing I know, I'm staring at the ceiling of an ambulance. The EMT asks me if I know what year it was. I am not sure if it's 2015 or 2016. Unless it's actually 2014. Hmm."],
	["10:02", "I have absolutely no memory of waking up that morning. From the gurney I can see my feet, with bike shoes on. I guess that this is somehow relevant. Just before we leave someone, I have no idea who, steps quickly into the back of the ambulance and puts my smartphone in my lap. I find this hilarious."],
	["10:05", "As we drive, the EMT asks me more questions. Do I know how old I am? No. Do I know where I work? Yes, in great detail. Do I know the date? I tell him it has just become September, right? He tells me that I am very calm."],
	["10:15", "We pull into the emergency room at UW Medical Center. At this point I remember getting up that morning, checking email, riding my bike, and then coming to in an ambulance. This is as much as I'll ever remember. (According to the folks who stopped to help, I was responsive but disoriented the whole time)"],
	["10:20", "The ER staff put a neck brace and hospital bracelet on me as they wheel me into an ER room. Within 5 minutes of talking to me, they take it back off."],
	["10:40", "I email my coworker: \"Got in a bike accident. Am in hospital. Please do not freak people out, but tell them I won't be in today.\" He texts me pictures of cute animals."],
	["10:48", "I take a picture to share with friends, who are texting me nonstop. <img src='../img/concussion.jpg'>"],
	["13:00", "Hospitals aren't a terribly exciting place to be if you are not in critical condition. The supervising doctor insists on a CT scan, which means that I am not allowed to have food, water, or painkillers as we wait for the results. I am starting to get cold, and tired, and my head hurts."],
	["14:40", "My CT results come back clean, and I am informed that I have not broken any facial bones. The nurse warns me that I should expect my eye to swell shut the next day. I'm mostly happy that I can finally have some water and ibuprofen. I get a tetanus shot and the nurse debates whether or not to do anything about my road rash before he sets me free, deciding that the paramedics have already put antibiotic cream on it."],
	["15:30", "My friend picks me up. Fortunately, her car has plenty of room for my bike, which has somehow made the entire journey with me. She buys me Gatorade and then leaves me to sleep it off."],
	["17:30", "Black eye blooming nicely, I begin the long, boring journey into recovery. <img src='../img/blackeye.jpg'>"],
	["Bonus", "Just a little bit of the damage. Long sleeves and pants definitely saved me some skin. <img src='../img/damage.jpg'>"]
]

var map;
var currentStep = 0;

function initMap() {
	var customMapType = new google.maps.StyledMapType([
	    	{
	        	stylers: [
		        	{visibility: 'simplified'},
		        	{saturation: -100},
		        	{weight: 5}
		        ]
	    	},
	    	{
	        	elementType: 'labels',
	        	stylers: [{visibility: 'off'}]
	    	},
	    	{
		        featureType: 'water',
		        stylers: [{color: '#a1a1a1'}]
	    	}
    	],
    	{
      		name: 'Custom Style'
		});

	var customMapTypeId = 'custom_style';
	
	map = new google.maps.Map(document.getElementById('map'), {
		center: locations[0][0],
		zoom: locations[0][1],
		disableDefaultUI: true,
		mapTypeControlOptions: {
	    	mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
	    }

	});

	map.mapTypes.set(customMapTypeId, customMapType);
	map.setMapTypeId(customMapTypeId);

	map.gotoStep = function(step) {
		if (step < locations.length ) {
			map.panTo(locations[step][0]);
			map.setZoom(locations[step][1]);
		}
	};
}

var nextStep = function() {
	var myTimestamp = document.getElementById("commentary").getElementsByTagName("H2")[0];
	var myParagraph = document.getElementById("commentary").getElementsByTagName("P")[0];

	// figure out if we should even keep going
	if (currentStep < locations.length) {
		currentStep++;

		myTimestamp.innerText = story[currentStep][0];
		myParagraph.innerHTML = story[currentStep][1];
		map.gotoStep(currentStep);

	} else {
		if (currentStep < story.length) {
			currentStep++;

			myTimestamp.innerText = story[currentStep][0];
			myParagraph.innerHTML = story[currentStep][1];

			// TODO: replace with a "start over" option
			// if we've reached the end, remove the next button
			if (currentStep == story.length-1) {
				document.getElementById("next").parentNode.removeChild(document.getElementById("next"));		
			}
		}
	}

}

// initialize
initMap();

// bind event listeners
document.getElementById("next").addEventListener("click",nextStep);