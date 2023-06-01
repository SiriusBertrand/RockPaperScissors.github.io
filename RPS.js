// Game logic and variables
let userScore = 0;
let computerScore = 0;

const rockButton = document.getElementById("rock");
const paperButton = document.getElementById("paper");
const scissorsButton = document.getElementById("scissors");
const userScoreElement = document.getElementById("user-score");
const computerScoreElement = document.getElementById("computer-score");
const playerChoiceElement = document.getElementById("player-choice");
const computerChoiceElement = document.getElementById("computer-choice");
const gameResultElement = document.getElementById("game-result");
const playAgainButton = document.getElementById("play-again");

// Function to show pop-up message
function showPopupMessage(message) {
  const popupBox = document.createElement("div");
  popupBox.setAttribute("id", "popup-box");
  popupBox.textContent = message;

  // Position the pop-up box to the right of the game box
  const gameContainer = document.getElementById("game-container");
  const gameRect = gameContainer.getBoundingClientRect();
  const popupBoxLeft = gameRect.right + 20;
  const popupBoxTop = gameRect.top;

  popupBox.style.position = "absolute";
  popupBox.style.left = `${popupBoxLeft}px`;
  popupBox.style.top = `${popupBoxTop}px`;

  document.body.appendChild(popupBox);

  // Remove the pop-up box after 3 seconds
  setTimeout(() => {
    popupBox.remove();
  }, 3000);
}

// Function to get computer's choice
function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
}

// Function to update the scores on the page
function updateScore() {
  userScoreElement.textContent = `User: ${userScore}`;
  computerScoreElement.textContent = `Computer: ${computerScore}`;
}

// Function to convert the choice text to the corresponding icon
function getChoiceIcon(choice) {
  if (choice === "rock") {
    return '<i class="fas fa-hand-rock"></i>';
  } else if (choice === "paper") {
    return '<i class="fas fa-hand-paper"></i>';
  } else if (choice === "scissors") {
    return '<i class="fas fa-hand-scissors"></i>';
  }
}

// Function to check the game result and update scores
function checkResult(playerChoice) {
  const computerChoice = getComputerChoice();
  const playerChoiceIcon = getChoiceIcon(playerChoice);
  const computerChoiceIcon = getChoiceIcon(computerChoice);

  playerChoiceElement.innerHTML = `Player chose: ${playerChoiceIcon}`;
  computerChoiceElement.innerHTML = `Computer chose: ${computerChoiceIcon}`;

  if (playerChoice === computerChoice) {
    gameResultElement.textContent = "It's a tie!";
    showPopupMessage("It's a tie!");
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    userScore++;
    gameResultElement.textContent = "You win!";
  } else {
    computerScore++;
    gameResultElement.textContent = "Computer wins!";
  }

  updateScore();

  // Check if it's best 2 out of 3
  if (userScore === 1 && computerScore === 1) {
    showPopupMessage("Best 2 out of 3!");
  }

  // Check if one player has won 2 games
  if (userScore === 2 || computerScore === 2) {
    if (userScore === 2) {
      showPopupMessage("Congratulations! You won 2 out of 3 games!");
    } else {
      showPopupMessage("Computer won 2 out of 3 games!");
    }
    // Disable the choice buttons and show "Play Again" button
    rockButton.disabled = true;
    paperButton.disabled = true;
    scissorsButton.disabled = true;
    playAgainButton.style.display = "block";
  }
}

// Event listeners for choice buttons
rockButton.addEventListener("click", () => {
  checkResult("rock");
});

paperButton.addEventListener("click", () => {
  checkResult("paper");
});

scissorsButton.addEventListener("click", () => {
  checkResult("scissors");
});

// Event listener for "Play Again" button
playAgainButton.addEventListener("click", () => {
  userScore = 0;
  computerScore = 0;
  updateScore();
  playerChoiceElement.textContent = "Player chose: ";
  computerChoiceElement.textContent = "Computer chose: ";
  gameResultElement.textContent = "";
  rockButton.disabled = false;
  paperButton.disabled = false;
  scissorsButton.disabled = false;
  playAgainButton.style.display = "none";
});
