// Categories with matching items
const categories = {
    fruits: ["🍎", "🍌", "🍇", "🍉", "🍓", "🥭", "🍑", "🍍"],
    animals: ["🐶", "🐱", "🐭", "🐰", "🐸", "🐼", "🦁", "🐷"],
    emojis: ["😀", "😎", "🤩", "🥶", "😂", "😭", "😡", "🤯"],
    planets: ["🌍", "🪐", "🌕", "☀️", "🌟", "🌑", "🌖", "🌌"]
};

let selectedCategory = [];
let firstCard, secondCard;
let hasFlippedCard = false;
let lockBoard = false;
let score = 0;
let timer;
let timeLeft = 30;

const gameBoard = document.getElementById("game-board");
const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");

// Function to start the game
function startGame(category) {
    selectedCategory = [...categories[category], ...categories[category]]; // Duplicate items for matching
    selectedCategory.sort(() => Math.random() - 0.5); // Shuffle array

    gameBoard.innerHTML = selectedCategory.map(item => `
        <div class="card" data-value="${item}">${item}</div>
    `).join("");

    document.getElementById("landing-page").classList.add("hidden");
    document.getElementById("game-container").classList.remove("hidden");

    score = 0;
    timeLeft = 30;
    updateScore();
    startTimer();

    document.querySelectorAll(".card").forEach(card => card.addEventListener("click", flipCard));
}

// Function to handle card flips
function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add("flipped");

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
    } else {
        secondCard = this;
        checkMatch();
    }
}

// Function to check for a match
function checkMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);
        score++;
        updateScore();
    } else {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            lockBoard = false;
        }, 1000);
    }

    hasFlippedCard = false;
    firstCard = secondCard = null;
}

// Function to start the timer
function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerText = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            alert(`Game Over! Your score: ${score}`);
        }
    }, 1000);
}

// Function to update score
function updateScore() {
    scoreElement.innerText = score;
}

// Restart game
restartBtn.addEventListener("click", () => location.reload());

// Event listener for category buttons
document.querySelectorAll(".category-btn").forEach(btn => {
    btn.addEventListener("click", () => startGame(btn.dataset.category));
});
