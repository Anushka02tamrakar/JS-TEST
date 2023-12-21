// ...........................GAME RULE....................

var showRulesBtn = document.querySelector('.rulebutton');
var gameRules = document.querySelector('.rules-page');
var exitBtn = document.getElementById('exit');

showRulesBtn.addEventListener('click', function () {
  // Toggle the visibility of the rules
  gameRules.classList.toggle("open")

});
exitBtn.addEventListener('click', function () {
  // Toggle the visibility of the rules
  gameRules.classList.toggle("open")

})

/*.................game logic...................*/
let userScore = 0;
let computerScore = 0;

// Function to get computer's choice
function getComputerChoice() {
	const choices = ['stone', 'paper', 'scissor'];
	const randomIndex = Math.floor(Math.random() * 3);
	return choices[randomIndex];
}

// Function to determine the winner
function determineWinner(userChoice, computerChoice) {
	if (userChoice === computerChoice) {
	  return'It\'s a tie!';
	} else if (
	  (userChoice === 'stone' && computerChoice === 'scissor') ||
	  (userChoice === 'scissor' && computerChoice === 'paper') ||
	  (userChoice === 'paper' && computerChoice === 'stone')
	) {
	  return 'You win!';
	} else {
	  return 'Computer wins!';
	}
}

function click(userChoice) {
	const computerChoice = getComputerChoice();

	// Hide non-selected options
    document.querySelectorAll('.circle').forEach((element) => {
		if (!element.classList.contains(userChoice)) {
		  element.style.display = 'none';
		}
	});
	document.querySelectorAll('.line').forEach((element) => {
		if (!element.classList.contains(userChoice)) {
		  element.style.display = 'none';
		}
	});


    
	// Display user and computer choices (you can add your animation/transform styles here)
	console.log(`User Choice: ${userChoice}`);
	console.log(`Computer Choice: ${computerChoice}`);

	// Show computer's selected option on the screen
    const computerSelectedOption = document.getElementById('computer-selected-option');
    computerSelectedOption.innerHTML = `<img src="${computerChoice}.png" alt="${computerChoice}">`;

	// Apply styling to outer ring and inner ring
    const outerRing = document.querySelector('.outer-ring');
    const innerRing = document.querySelector('.inner-ring');
    
    // Add or remove styling based on computer's choice
    if (computerChoice === 'stone') {
      outerRing.style.borderColor = 'blue'; // Adjust styles as needed
      innerRing.style.backgroundColor = 'white'; // Adjust styles as needed
    } else if (computerChoice === 'paper') {
      outerRing.style.borderColor = 'orange'; // Adjust styles as needed
      innerRing.style.backgroundColor = 'white'; // Adjust styles as needed
    } else if (computerChoice === 'scissor') {
      outerRing.style.borderColor = 'purple'; // Adjust styles as needed
      innerRing.style.backgroundColor = 'white'; // Adjust styles as needed
    }


	// Determine the winner
	const result = determineWinner(userChoice, computerChoice);
	console.log(result);

	// Update scores and display
	if (result === 'You win!') {
	  userScore++;
	} else if (result === 'Computer wins!') {
	  computerScore++;
	}

	updateScoreDisplay();
}

// Function to update the score display
function updateScoreDisplay() {
	document.getElementById('user-score').textContent = userScore;
	document.getElementById('pc-score').textContent = computerScore;
}

// Show all options again after a brief delay (you can adjust the delay as needed)
setTimeout(() => {
	document.querySelectorAll('.circle').forEach((element) => {
	  element.style.display = 'block';
	});
     // Adjust the delay in milliseconds

    // Clear the computer's selected option display
    const computerSelectedOption = document.getElementById('computer-selected-option');
    computerSelectedOption.style.backgroundImage = 'none';

    // Reset styling for outer ring and inner ring
    const outerRing = document.querySelector('.outer-ring');
    const innerRing = document.querySelector('.inner-ring');
    outerRing.style.borderColor = '';
    innerRing.style.backgroundColor = '';
}); // Adjust the delay in milliseconds



// Example: Add click event listeners to the options
document.querySelector('.stone').addEventListener('click', () => click('stone'));
document.querySelector('.paper').addEventListener('click', () => click('paper'));
document.querySelector('.scissor').addEventListener('click', () => click('scissor'));






/*const optionsContainer = document.querySelector('.option-container');
const result = document.querySelector('.ResultScreen');
const loading = document.querySelector('.loading');
const pcScoreBoard = document.getElementById('pc-score');
const userScoreBoard = document.getElementById('user-score');
const result_id = document.getElementById('result_id');
const result_h1 = document.getElementById('head1');
const result_h2 = document.getElementById('head2');
const userTagline = document.querySelector('#usertagline');
const computerTagline = document.querySelector('#pctagline');
const closeButton = document.querySelector('.exitPage');
//const nextButton = document.querySelector('.nextbtn');
const playAgainButton = document.querySelector('.ResultScreen span');


let CLICKED_OPTION = '';
let COMPUTER_OPTION = '';
let clicked = false;
let PCScore = parseInt(localStorage.getItem('PC-score')) || 0;
let userScore = parseInt(localStorage.getItem('USER-score')) || 0;
pcScoreBoard.innerText = PCScore;
userScoreBoard.innerText = userScore;
userScore > PCScore ? (nextButton.style.display = 'block') : (nextButton.style.display = 'none');


function click(clickedOption) {
  console.log('Clicked option:', clickedOption);
	if (clicked) {
		return;
	}
	clicked = true;
	CLICKED_OPTION = clickedOption;
	const clickedCircle = document.querySelector(`.${clickedOption}`);
	console.log(clickedCircle);
	// disable all options and hide them
	const allCircles = document.querySelectorAll('.circle');
	allCircles.forEach((circle) => {
		if (circle !== clickedCircle) {
			circle.style.cursor;
			circle.style.transition = 'all 0.5s ease';
			circle.style.opacity = '0';
			circle.style.pointerEvents = 'none';
		}
	});

	const allLines = document.querySelectorAll('.line');
	allLines.forEach((line) => {
		line.style.transition = 'all 0.5s ease';
		line.style.opacity = '0';
	});

	clickedCircle.style.transition = 'all 1s ease';
	if (clickedOption === 'stone') {
		clickedCircle.style.top = '50%';
		clickedCircle.style.left = '-50%';
	} else if (clickedOption === 'paper') {
		clickedCircle.style.top = '50%';
		clickedCircle.style.left = '-50%';
	} else if (clickedOption === 'scissor') {
		clickedCircle.style.top = '50%';
		clickedCircle.style.left = '-50%';
	}

	const pcLoader = document.createElement('div');
	pcLoader.classList.add('pcLoader');
	optionsContainer.appendChild(pcLoader);

	setTimeout(() => {
		optionsContainer.removeChild(pcLoader);
		const computerCircle = generateComputerCircle();

		// check winner
		const winner = checker();
		console.log(winner);
		if (winner === 'computer') {
			PCScore += 1;
			localStorage.setItem('PC-score', PCScore);
			pcScoreBoard.innerText = PCScore;
			const rings = computerCircle.querySelector('.rings');
			rings.classList.add('winner');
		} else if (winner === 'user') {
			userScore += 1;
			localStorage.setItem('USER-score', userScore);
			userScoreBoard.innerText = userScore;
			const rings = clickedCircle.querySelector('.rings');
			rings.classList.add('winner');
		} else {
			playAgainButton.innerText = 'Replay';
		}

		setTimeout(() => {
			if (winner === 'user') {
				result_h1.innerText = 'You Win';
				result_h2.innerText = 'Against PC';
			} else if (winner === 'computer') {
				result_h1.innerText = 'You Lose';
				result_h2.innerText = 'Against PC';
			} else {
				result_h1.innerText = 'TIE UP';
				result_h2.innerText = '';
			}
			result.style.display = 'flex';
			userScore > PCScore
				? (nextButton.style.display = 'block')
				: (nextButton.style.display = 'none');
		}, 500);
	}, 1000);
}
//........................Computer random selecting code.........................
function computerRandomOption() {
	const options = ['stone', 'paper', 'scissor'];
	const randomIndex = Math.floor(Math.random() * options.length);
	COMPUTER_OPTION = options[randomIndex];
	return options[randomIndex];
}

//........................Computer circle.............................................


function generateComputerCircle() {
	const option = computerRandomOption();
	const circle = document.createElement('div');
	circle.classList.add('computerOption', 'circle', option);

	const ringOuter = document.createElement('div');
	ringOuter.classList.add('ringOuter');

	const ringInner = document.createElement('div');
	ringInner.classList.add('ringInner');

	const image = document.createElement('div');
	image.classList.add('image');

	const img = document.createElement('img');
	img.src = `"/../assets/images/${option}.png`;

	userTagline.innerText = 'You picked';
	computerTagline.innerText = 'PC picked';

	const ripple1 = document.createElement('div');
	const ripple2 = document.createElement('div');
	const ripple3 = document.createElement('div');
	ripple1.classList.add('ring', 'ripple1');
	ripple2.classList.add('ring', 'ripple2');
	ripple3.classList.add('ring', 'ripple3');

	const rings = document.createElement('div');
	rings.classList.add('rings');
	rings.appendChild(ripple1);
	rings.appendChild(ripple2);
	rings.appendChild(ripple3);

	image.appendChild(img);
	ringInner.appendChild(image);
	ringOuter.appendChild(ringInner);
	circle.appendChild(ringOuter);
	circle.appendChild(rings);

	setTimeout(() => {
		optionsContainer.appendChild(circle);
	}, 10);
	return circle;
}

//..............................compare win or lose.............................
function checker() {
	console.log('clickedOption', CLICKED_OPTION);
	console.log('computerOption', COMPUTER_OPTION);
	let winner = '';
	if (CLICKED_OPTION === COMPUTER_OPTION) {
		winner = 'draw';
		return winner;
	}

	if (CLICKED_OPTION === 'stone') {
		if (COMPUTER_OPTION === 'paper') {
			winner = 'computer';
			return winner;
		} else if (COMPUTER_OPTION === 'scissor') {
			winner = 'user';
			return winner;
		}
	}

	if (CLICKED_OPTION === 'paper') {
		if (COMPUTER_OPTION === 'stone') {
			winner = 'user';
			return winner;
		} else if (COMPUTER_OPTION === 'scissor') {
			winner = 'computer';
			return winner;
		}
	}

	if (CLICKED_OPTION === 'scissor') {
		if (COMPUTER_OPTION === 'stone') {
			winner = 'computer';
			return winner;
		} else if (COMPUTER_OPTION === 'paper') {
			winner = 'user';
			return winner;
		}
	}
}

setTimeout(() => {
	loading.style.display = 'none';
}, 2000);

//.......................Reset game.................................

function resetGame() {
	const allCircles = document.querySelectorAll('.circle');
	allCircles.forEach((circle) => {
		circle.style.transition = '';
		circle.style.opacity = '';
		circle.style.pointerEvents = 'auto';
		circle.style.top = '';
		circle.style.left = '';
	});

	const allLines = document.querySelectorAll('.line');
	allLines.forEach((line) => {
		line.style.transition = '';
		line.style.opacity = '';
	});

	const computerCircle = document.querySelector('.computerOption');
	computerCircle.remove();

	const Allrings = document.querySelectorAll('.rings');
	console.log('all rings : ', Allrings);
	Allrings.forEach((rings) => {
		rings.classList.remove('winner');
	});

	result.style.display = 'none';
	userTagline.innerText = '';
	computerTagline.innerText = '';
	CLICKED_OPTION = '';
	COMPUTER_OPTION = '';
	nextButton.style.display = 'none';
	playAgainButton.innerText = 'Play Again';
	clicked = false;
} */