var facts = [
	"I once broke my toe by dropping a laptop on it.",
	"I didn&apos;t figure out I was a picky eater until I was 22.",
	"I can juggle (very badly).",
	"I got hit by a car... while riding on a bike trail.",
	"I got my black belt when I was 16.",
	"I played the clarinet for more than 10 years.",
	"I was 1 class away from a minor in Spanish (except that my alma mater doesn&apos;t have minors).",
	"I still have my wisdom teeth.",
	"I was born on my due date.",
	"My humanities capstone project is one of most popular things I&apos;ve ever written.",
	"My wrists are too small to effectively break out of handcuffs.",
	"It took me 216 tries to beat Spelunky.",
	"I&apos;m allergic to bedbugs. Learning this was extraordinarily unpleasant.",
	"I&apos;ve never been to Europe.",
	"I&apos;m a supertaster.",
	"I was the first person to rate the book Supercollaborators on Goodreads.",
	"I once tried to go to Rio de Janeiro and ended up in the Bahamas.",
	"I can&apos;t play on off beats.",
	"I got status with a hotel chain without realizing it.",
	"I got status with an airline without realizing it.",
	"First-person video games make me motion sick. So do many over-the-shoulder games.",
	"I'm good at magic eye puzzles.",
	"I taught my cat to high five."
];

var NewFact = function() {
	var factbox = document.getElementById('fact');

	if (facts.length > 0) {
		//pick a pseudorandom fact
		var rand = Math.floor(Math.random() * facts.length);
		var randomfact = facts[rand];

		//add the fact to the header
		factbox.innerHTML = randomfact + ' (new fact)';

		//bind click to new fact function
		var clickable = document.getElementById('fact');
		clickable.addEventListener('click', NewFact);

		//remove our fact from the array
		facts.splice(rand, 1);
		return facts;
	} else {
		//if we're out of facts, say so
		factbox.innerHTML = "That's all the facts I have!"
	}
}

NewFact();