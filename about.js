$(document).ready(function() {
	var facts = [
		"I once broke my toe by dropping a laptop on it.",
		"I didn&apos;t figure out I was a picky eater until I was 22.",
		"I can juggle (very badly).",
		"I got hit by a car... while riding on a bike trail.",
		"I got my black belt when I was 16.",
		"I played the clarinet for more than 10 years.",
		"I was 1 class away from a minor in Spanish (except that Olin doesn&apos;t have minors).",
		"On a good day, I know all of the countries of the world.",
		"My brother and I memorized the original 151 Pok&eacute;mon together.",
		"I made One Velociraptor Per Child because OLPC employees told me it was hilarious.",
		"If you refresh this page you will (probably) see a different fact.",
		"Dinosaurs and Batman are my best design inspiration."
	];
	var rand = Math.floor(Math.random() * facts.length);
	var randomfact = facts[rand];

	$("#description").append( $('<p class="facts">A true fact: ' + randomfact + '</p><p style="font-size: 75%">* facts chosen randomly</p>' ) );
});