const cellBlocks = document.querySelectorAll('.cell');
const board = document.getElementById('board');
const RESULT_MESSAGE = document.querySelector('.winning-message');
const RESTART_BUTTON = document.getElementById('restartButton');
let circleTurn;

const WINNING_COMBOS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
]

const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';

const showResult = 'show';

gameStart();

RESTART_BUTTON.addEventListener('click', () => {
	location.reload()
})

function gameStart() {
	circleTurn = false
	cellBlocks.forEach(cell => {
		cell.addEventListener('click', handleClick, { once: true });
	})
	hoverBoard();
}

function handleClick(e) {
	const cell = e.target;
	const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
	placeMarking(cell, currentClass);

	if (checkWin(currentClass)) {

		RESULT_MESSAGE.classList.add(showResult);

		console.log("winner!!");
	}

	// check for win
	// check for draw
	swapTurns();
	hoverBoard();

	console.log("OK!")
}

function placeMarking(cell, currentClass) {
	cell.classList.add(currentClass)
}

function swapTurns() {
	circleTurn = !circleTurn
}

function hoverBoard() {
	board.classList.remove(X_CLASS);
	board.classList.remove(CIRCLE_CLASS);

	if (circleTurn) {
		board.classList.add(CIRCLE_CLASS)
	} else {
		board.classList.add(X_CLASS)
	}
}

function checkWin(currentClass) {
	return WINNING_COMBOS.some(combinations => {
		return combinations.every(index => {
			return cellBlocks[index].classList.contains(currentClass)
		})
	})
}