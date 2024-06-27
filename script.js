const cardsArray = [
    { name: 'A', img: 'A' },
    { name: 'B', img: 'B' },
    { name: 'C', img: 'C' },
    { name: 'D', img: 'D' },
    { name: 'A', img: 'A' },
    { name: 'B', img: 'B' },
    { name: 'C', img: 'C' },
    { name: 'D', img: 'D' },
];

let gameBoard = document.getElementById('gameBoard');
let moveCounter = document.getElementById('moveCounter');
let restartButton = document.getElementById('restartButton');
let moves = 0;
let firstCard, secondCard;
let hasFlippedCard = false;
let lockBoard = false;

function shuffle(array) {
    array.sort(() => 0.5 - Math.random());
}

function createBoard() {
    gameBoard.innerHTML = '';
    shuffle(cardsArray);
    cardsArray.forEach((card, index) => {
        let cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.name = card.name;
        cardElement.innerHTML = `
            <div class="front"></div>
            <div class="back">${card.img}</div>
        `;
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
    revealAllCards();
}

function revealAllCards() {
    let cards = document.querySelectorAll('.card');
    cards.forEach(card => card.classList.add('flip'));
    setTimeout(() => {
        cards.forEach(card => card.classList.remove('flip'));
        lockBoard = false;
    }, 1000);
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;
    isMatch ? disableCards() : unflipCards();
    moves++;
    moveCounter.textContent = moves;
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function resetGame() {
    moves = 0;
    moveCounter.textContent = moves;
    createBoard();
}

restartButton.addEventListener('click', resetGame);

createBoard();
