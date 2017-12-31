var facts = [
	"I once broke my toe by dropping a laptop on it.",
	"I didn&apos;t figure out I was a picky eater until I was 22.",
	"I can juggle (very badly).",
	"I got hit by a car... while riding on a bike trail.",
	"I got my black belt when I was 16.",
	"I played the clarinet for more than 10 years.",
	"I was 1 class away from a minor in Spanish (except that Olin doesn&apos;t have minors).",
	"I made One Velociraptor Per Child because OLPC employees told me it was hilarious.",
	"I still have my wisdom teeth.",
	"I was born on my due date.",
	"My humanities capstone project is one of most popular things I&apos;ve ever written.",
	"My wrists are too small to effectively break out of handcuffs.",
	"It took me 216 tries to beat Spelunky.",
	"A lot of people think I have a Canadian accent (I&apos;m from California).",
	"I&apos;m allergic to bedbugs. Learning this was extraordinarily unpleasant.",
	"I&apos;ve never been to Europe.",
	"I&apos;m a supertaster.",
	"I was the first person to rate the book Supercollaborators on Goodreads.",
	"I once tried to go to Rio de Janeiro and ended up in the Bahamas.",
	"I can&apos;t play on off beats.",
	"I got status with a hotel chain without realizing it.",
	"I got status with an airline without realizing it.",
	"First-person video games make me motion sick. So do many over-the-shoulder games.",
	"I'm good at magic eye puzzles."
];

var NewFact = function() {
	var rand = Math.floor(Math.random() * facts.length);
	var randomfact = facts[rand];

	$(".facts").remove();

	$("#description").append( $('<p class="facts">' + randomfact + '</p>' ) );

	$(".facts").bind('click', function() {
			NewFact();
		});
}

NewFact();