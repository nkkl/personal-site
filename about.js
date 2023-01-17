var facts = [
	"I once broke my toe by dropping a laptop on it.",
	"I didn\'t figure out I was a picky eater until I was 22.",
	"I can juggle (very badly).",
	"I got hit by a car... while riding on a bike trail.",
	"I got my black belt when I was 16.",
	"I played the clarinet for more than 10 years.",
	"I was 1 class away from a minor in Spanish (except that my alma mater doesn\'t have minors).",
	"I still have my wisdom teeth.",
	"I was born on my due date.",
	"My wrists are too small to effectively break out of handcuffs.",
	"It took me 216 tries to beat Spelunky.",
	"I\'m allergic to bedbugs. Learning this was extraordinarily unpleasant.",
	"I\'ve never been to Europe.",
	"I\'m a supertaster.",
	"I once tried to go to Rio de Janeiro and ended up in the Bahamas.",
	"I can\'t play on off beats.",
	"I got status with a hotel chain without realizing it.",
	"I got status with an airline without realizing it.",
	"First-person video games make me motion sick. So do many over-the-shoulder games.",
	"I'm good at magic eye puzzles.",
	"I\'ve taught several cats how to high five."
];

var NewFact = function() {
	var factDiv = document.getElementById('funfact');

	if (facts.length > 0) {
		// pick a pseudorandom fact
		var index = Math.round(Math.random() *(facts.length-1));
		var randomfact = facts[index];

		// update the div with the fact
		factDiv.lastElementChild.innerText = facts[index];

		// remove fact from array
		facts.splice(index, 1);
		return facts;
	} else {
		factDiv.lastElementChild.innerText = "That\'s all the facts I have right now.";
	}


}

document.getElementById('funfact').onclick = NewFact;
NewFact();