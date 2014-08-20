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
	"Dinosaurs and Batman are my best design inspiration.",
	"I still have my wisdom teeth.",
	"I was born on my due date.",
	"My humanities capstone project is the most popular thing I&apos;ve ever written.",
	"My wrists are too small to effectively break out of handcuffs.",
	"It took me 216 tries to beat Spelunky.",
	"A lot of people think I have a Canadian accent (I&apos;m from California).",
	"I&apos;m allergic to bedbugs. Learning this was extraordinarily unpleasant."
];

var NewFact = function() {
	var rand = Math.floor(Math.random() * facts.length);
	var randomfact = facts[rand];

	$(".facts").remove();

	$("#description").append( $('<p class="facts">A true fact: ' + randomfact + ' <a style="cursor: pointer">(new fact)</a></p>' ) );

	$(".facts").bind('click', function() {
			NewFact();
		});
}

NewFact();